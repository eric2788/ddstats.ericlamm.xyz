<template>
  <v-container class="pa-5">
    <template v-if="!vup || loading">
      <template v-if="!!error">
        <v-alert border type="error">
          <v-alert-title>用戶资讯加载失败: </v-alert-title>
          {{ error }}{{ not_found_user ? ', 要转用B站用户搜索吗?' : '' }}
        </v-alert>
        <v-btn
          class="mt-5"
          color="blue"
          variant="outlined"
          prepend-icon="mdi-arrow-left"
          @click="$router.replace('/users')"
        >
          返回列表
        </v-btn>
        <v-btn
          v-if="not_found_user"
          class="ml-3 mt-5"
          color="teal"
          variant="outlined"
          prepend-icon="mdi-account-search"
          @click="$router.replace('/watcher/'+$route.params.uid)"
         >
          转到B站用户搜索
        </v-btn>
      </template>
      <template v-else>
        <v-row align="center" justify="center" class="pt-15">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-row>
      </template>
    </template>
    <template v-else>
      <user-list-view :vup="vup" link="https://space.bilibili.com/%uid%">
        <template v-slot:name="{ vup: v }">
          <a
            :href="`https://space.bilibili.com/${v.uid}`"
            target="_blank"
            style="color: inherit"
          >
            <span class="text-h6 mr-2">{{ v.name }}</span>
          </a>
        </template>
        <template v-slot:avatar="{ vup: v }">
          <a
            :href="`https://space.bilibili.com/${v.uid}`"
            target="_blank"
            style="color: inherit"
          >
            <v-avatar
              class="float-right"
              :image="vup.face"
              size="86"
              rounded="0"
            />
          </a>
        </template>
        <template v-slot:under>
          <v-row class="pt-1" align="center">
            <v-col cols="12" md="6" lg="4">
              <v-row class="pt-5">
                <span class="text-caption">个人简介</span>
              </v-row>
              <v-row>
                <span style="overflow-wrap: break-word;"> {{ vup.sign }} </span>
              </v-row>
            </v-col>
            <v-col
              cols="0"
              sm="0"
              md="0"
              lg="2"
              v-if="!$vuetify.display.mdAndDown"
            ></v-col>
            <v-col cols="12" md="6" lg="4">
              <v-row class="pt-5">
                <span class="text-caption">直播间传送门</span>
              </v-row>
              <v-row>
                <a
                  style="color: inherit"
                  :href="`https://live.bilibili.com/${vup.room_id}`"
                  target="_blank"
                >
                  {{
                    $vuetify.display.mdAndDown
                      ? vup.room_id
                      : `https://live.bilibili.com/${vup.room_id}`
                  }}
                </a>
              </v-row>
            </v-col>
          </v-row>
        </template>
      </user-list-view>
      <v-divider />
      <v-row class="pa-5" justify="center"> </v-row>
      <vup-stats-board :boards="global_boards" :behaviours="global_behaviours" :fetcher="fetchUserStats"/>
      <vup-fans-board :boards="fans_boards" :fetcher="fetchFanStats" />
      <vup-stats-command-board :guest_boards="guest_boards" :fetcher="fetchCommandStats" />
      <vup-records-board :vup="vup" />
    </template>
  </v-container>
</template>

<script>
import UserListView from "../components/UserListView.vue";
import VupStatsBoard from "../components/VupStatsBoard.vue";
import VupFansBoard from "../components/VupFansBoard.vue";
import VupStatsCommandBoard from "../components/VupStatsCommandBoard.vue";
import VupRecordsBoard from "../components/VupRecordsBoard.vue";

import user from "../api/user";
import stats from '../api/stats'

import { convertUsers, getErrorMessage, convertBehaviours } from "../api/utils"

export default {
  name: "UserDetailView",

  components: {
    UserListView,
    VupStatsBoard,
    VupStatsCommandBoard,
    VupRecordsBoard,
    VupFansBoard,
  },

  data: () => ({
    vup: null,
    loading: true,
    error: "",
    not_found_user: false,

    global_boards: [
        {
          title: "最常访问的主播",
          icon: "mdi-account-arrow-right",
          subtitle: undefined,
          panel: "1",
          command: 'top_dd_vups',
        },
        {
          title: "最常访问的来客",
          icon: "mdi-account-arrow-left",
          subtitle: undefined,
          panel: "2",
          command: 'top_guest_vups',
        },
        {
          title: "最高花费的主播",
          icon: "mdi-cash-multiple",
          subtitle: (props) => `共花费 ${props.spent} 元`,
          panel: "3",
          command: 'top_spent_vups',
        },
    ],

    fans_boards: [
      {
        title: '互动最多的粉丝',
        icon: 'mdi-account-heart',
        subtitle: undefined,
        panel: '1',
        command: 'top_behaviours_fans',
      },
      {
        title: '打赏金额最多的粉丝',
        icon: 'mdi-cash-multiple',
        subtitle: (props) => `共打赏 ${props.price} 元`,
        panel: '2',
        command: 'top_spent_fans',
      }
    ],

    guest_boards: [
        {
          icon: 'mdi-email-receive',
          title: '最常发送弹幕的来客',
          command: 'DANMU_MSG',
          display: undefined,
          panel: '6'
        },
        {
          icon: 'mdi-location-enter',
          title: '最常进入的来客',
          command: 'INTERACT_WORD',
          display: undefined,
          panel: '7'
        },
        {
          icon: 'mdi-chat-alert',
          title: '最常发送SC的来客',
          command: 'SUPER_CHAT_MESSAGE',
          display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
          panel: '8'
        },
        {
          icon: 'mdi-ship-wheel',
          title: '最常上舰的来客',
          command: 'USER_TOAST_MSG',
          display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
          panel: '9'
        },
        {
          icon: 'mdi-gift-open',
          title: '最常打赏的来客',
          command: 'SEND_GIFT',
          display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
          panel: '10'
        }
    ],

  }),

  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (!this.$route.params.uid || !this.$route.path.startsWith('/user')) return;
        if (this.$route.params.uid.toLocaleLowerCase().startsWith('uid')){
          this.$router.replace({ path: `/user/${this.$route.params.uid.slice(3)}` })
          return;
        }
        this.fetchData();
      },
      { immediate: true }
    );
  },

  computed: {
    global_behaviours() {

      // TODO: remove this after the backend response is changed to array
      let behaviours = []

      if (!(this.vup?.behaviours_count instanceof Array)) {
        behaviours = Object.values(this.vup?.behaviours_count ?? {})
      } else {
        behaviours = this.vup?.behaviours_count
      }

      //

      console.debug('global_behaviours: ', behaviours)

      return convertBehaviours(behaviours)
    }
  },

  methods: {
    fetchData() {
      this.loading = true;
      user
        .getUser(this.$route.params.uid)
        .then((res) => {
          this.vup = res;
          convertUsers([ this.vup ])
        })
        .catch((err) => {
          console.error(err);
          this.error = getErrorMessage(err)
          if (err.response?.status === 404) {
            this.not_found_user = true;
            return;
          }
          this.$emit("error",{ msg: "加载用户资讯时错误: ", err});
        })
        .finally(() => (this.loading = false));
    },

    async fetchUserStats() {
      return await stats.getUserStats(this.vup.uid)
    },

    async fetchFanStats() {
      const result = {}

      const fetchFans = async (type, command) => {
        const data = await stats.getFanStatsForVup(this.vup.uid, type)
        result[command] = data
      }
      const results = await Promise.allSettled([
        fetchFans('behaviours', 'top_behaviours_fans'),
        fetchFans('spent', 'top_spent_fans'),
      ])

      for (const result of results) {
        if (result.status === "rejected") {
          console.error(result.reason);
          this.$emit("error", {msg: `加载统计数据时错误: ${result.reason}`, err: result.reason});
          break;
        }
      }
      console.log(result)
      return result
    },

    async fetchCommandStats(command, price) {
      return await stats.getUserStatsByCommand(this.vup.uid, command, price)
    }
  }
};
</script>