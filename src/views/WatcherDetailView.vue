<template>
  <v-container class="pa-5">
    <template v-if="!watcher">
      <template v-if="!!error">
        <v-alert border type="error">
          <v-alert-title>用戶资讯加载失败: </v-alert-title>
          {{ error }}
        </v-alert>
        <v-btn
          class="mt-5"
          color="blue"
          variant="outlined"
          @click="$router.replace('/watchers')"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          返回搜索
        </v-btn>
      </template>
      <template v-else>
        <v-row align="center" justify="center" class="pt-15">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-row>
      </template>
    </template>
    <template v-else>
      <v-row class="pt-1 pa-5" justify="center" align="center">
        <v-col cols="12" sm="6" md="6" lg="3">
          <v-row class="pt-5">
            <span class="text-caption">UID:{{ watcher.uid }} 的名称</span>
          </v-row>
          <v-row>
            {{ watcher.u_names }}
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
          <v-row class="pt-5">
            <span class="text-caption">上次DD时间</span>
          </v-row>
          <v-row>
            {{ new Date(watcher.last_behaviour_at).toLocaleString() }}
          </v-row>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="1">
          <v-row class="pt-5">
            <span class="text-caption">总DD次数</span>
          </v-row>
          <v-row>
            {{ watcher.dd_count }}
          </v-row>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="1">
          <v-row class="pt-5">
            <span class="text-caption">总DD花费</span>
          </v-row>
          <v-row> {{ watcher.total_spent }} 元 </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
          <v-row class="pt-5">
            <span class="text-caption">首次记录时间</span>
          </v-row>
          <v-row>
            {{ new Date(watcher.first_listen_at).toLocaleString() }}
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mt-5" />
      <vup-stats-board
        :boards="global_boards"
        :behaviours="global_behaviours"
        :fetcher="fetchUserStats"
      />
      <vup-stats-command-board
        :dd_boards="dd_boards"
        :fetcher="fetchCommandStats"
      />
      <v-divider class="mt-5" />
      <h3 class="mt-5 mb-3">高亮行为记录</h3>
      <v-row class="pt-5" justify="center">
        <v-col cols="12" md="4" lg=2>
          <v-select
            v-model="command"
            :items="commands"
            density="comfortable"
            :rules="[(v) => !!v || 'Item is required']"
            label="过滤行为"
            @change="fetchRecords()"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="8" lg=10>
          <v-pagination
            v-if="maxPage > 1"
            v-model="page"
            :length="maxPage"
            text-color="black"
            @update:modelValue="fetchRecords"
          ></v-pagination>
        </v-col>
      </v-row>
      <v-row class="pt-5">
        <v-col cols="12">
          <template v-if="loading">
            <v-row align="center" justify="center">
              <v-progress-circular indeterminate color="blue" />
            </v-row>
          </template>
          <template v-else-if="records?.length > 0">
            <template v-for="(record, index) in records" :key="index">
              <v-row class="pa-5 d-flex wrap" align="center">
                <v-col cols="8" sm="10" md="6" lg="8">
                  <v-row class="pt-2">
                    <span class="text-h7 mr-2">{{ record.display }}</span>
                  </v-row>
                  <v-row class="text-caption">
                    {{ new Date(record.created_at).toLocaleString() }}
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" md="2" lg="2">
                  <v-row class="pt-2" justify="center" justify-md="start">
                    <v-avatar
                      v-if="record.image.Valid"
                      :image="record.image.String"
                      rounded="0"
                      size="86"
                    />
                    <v-sheet
                      v-else-if="!$vuetify.display.mobile"
                      height="50"
                      color="transparent"
                    >
                    </v-sheet>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="2">
                  <v-row class="text-center" justify="center">
                    <v-col cols="12">
                      <v-btn
                        rounded="0"
                        variant="text"
                        block
                        @click="$router.push(`/user/${record.target_uid}`)"
                      >
                        <v-icon left>mdi-account-arrow-left</v-icon>
                        查看直播间用户
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider />
            </template>
          </template>
          <template v-else>
            <v-row justify="center" align="center"> 没有记录 </v-row>
          </template>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
<script>
import VupStatsBoard from "../components/VupStatsBoard.vue";
import VupStatsCommandBoard from "../components/VupStatsCommandBoard.vue";

import watcher from "../api/watcher";
import { toTitle, convertRecords, getErrorMessage } from "../api/utils";

export default {
  name: "WatcherDetailView",

  components: {
    VupStatsBoard,
    VupStatsCommandBoard,
  },

  data: () => ({
    watcher: null,
    loading: false,
    error: "",

    page: 1,
    maxPage: 2,
    total: 0,
    command: '所有',

    commands_map: {
      '所有': "",
      '发送弹幕': "DANMU_MSG",
      '进入直播间': "INTERACT_WORD",
      '上舰': "USER_TOAST_MSG",
      '送礼': "SEND_GIFT",
      '发送SC': "SUPER_CHAT_MESSAGE",
    },

    records: [],

    // watcher will not have guest
    global_boards: [
      {
        title: "最常访问的主播",
        icon: "mdi-account-arrow-right",
        subtitle: undefined,
        panel: "1",
        command: "top_dd_vups",
      },
      {
        title: "最高花费的主播",
        icon: "mdi-cash-multiple",
        subtitle: (props) => `共花费 ${props.spent} 元`,
        panel: "2",
        command: "top_spent_vups",
      },
    ],

    dd_boards: [
      {
        icon: "mdi-email-send",
        title: "最常向该主播发送弹幕",
        command: "DANMU_MSG",
        display: undefined,
        panel: "1",
      },
      {
        icon: "mdi-location-exit",
        title: "最常进入的直播间",
        command: "INTERACT_WORD",
        display: undefined,
        panel: "2",
      },
      {
        icon: "mdi-forum",
        title: "最常向该主播发送SC",
        command: "SUPER_CHAT_MESSAGE",
        display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        panel: "3",
      },
      {
        icon: "mdi-ferry",
        title: "最常向该主播上舰",
        command: "USER_TOAST_MSG",
        display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        panel: "4",
      },
      {
        icon: "mdi-gift",
        title: "最常向该主播打赏",
        command: "SEND_GIFT",
        display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        panel: "5",
      },
    ],
  }),

  beforeRouteEnter(to, from, next) {
    // access from direct link
    if (from.path !== "/watchers") {
      console.debug("fetch from direct link");
      next((vm) => {
        vm.loading = true;
        watcher
          .getWatcher(to.params.uid)
          .then((res) => {
            vm.watcher = res;
            vm.fetchRecords();
          })
          .catch((err) => {
            vm.error = getErrorMessage(err)
            vm.$emit("error", { msg: "加载用户资讯时错误: ", err });
          })
          .finally(() => (vm.loading = false));
      });
      return;
    }

    return watcher.getWatcher(to.params.uid).then((res) => {
      next((vm) => {
        vm.watcher = res;
        vm.fetchRecords();
      });
    });
  },

  methods: {
    fetchRecords() {
      this.loading = true;
      watcher
        .getWatcherRecords(this.watcher.uid, this.page, this.commands_map[this.command])
        .then((res) => {
          this.page = res.page;
          this.maxPage = res.max_page;
          this.total = res.total;
          this.records = convertRecords(res.list);
        })
        .catch((err) => {
          console.error(err);
          this.$emit("error", { msg: "加载高亮行为记录时错误: ", err });
        }).finally(() => this.loading = false);
    },

    async fetchUserStats() {
      return await watcher.getWatcherStats(this.watcher.uid);
    },

    async fetchCommandStats(command, price) {
      const res = await watcher.getWatcherStatsByCommand(
        this.watcher.uid,
        command,
        price
      );
      return {
        top_dd_vups: res,
      };
    },
  },

  computed: {
    global_behaviours() {
      return this.watcher?.behaviours?.map((b) => {
        return {
          ...b,
          title: toTitle(b.command),
        };
      });
    },
    commands() {
      return Object.keys(this.commands_map);
    },
  },
};
</script>>