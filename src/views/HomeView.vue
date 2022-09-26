<template>
  <v-container class="pa-5">
    <v-row class="pt-5 pb-5">
      <v-col cols="12" sm="12" md="4">
        <statistic-count-board
          icon="mdi-account-supervisor-outline"
          title="正在监听的房间数量:"
          color="blue"
          :value="stats.current_listening_count"
        ></statistic-count-board>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <statistic-count-board
          icon="mdi-account-box-multiple"
          title="已记录的主播数量:"
          color="green"
          :value="stats.total_vup_recorded"
        ></statistic-count-board>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <statistic-count-board
          icon="mdi-alpha-d-box"
          title="已记录的DD行为数量:"
          color="purple"
          :value="stats.total_dd_behaviours"
        ></statistic-count-board>
      </v-col>
    </v-row>
    <v-divider />
    <h3 class="mt-5 mb-3">DD风云榜</h3>
    <v-expansion-panels theme="light" multiple v-model="expands_1">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12" md="4">
            <v-expansion-panel class="el-border" elevation="0" value="1-1">
              <v-expansion-panel-title>
                <v-icon large left>mdi-account-multiple</v-icon>
                访问最多的直播间
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  :users="stats.most_dd_vups"
                  :subtitle="
                    (props) => `共访问过 ${props.count} 个不同的直播间`
                  "
                  class="elevation-0"
                ></leader-board-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="4">
            <v-expansion-panel class="el-border" elevation="0" value="1-2">
              <v-expansion-panel-title>
                <v-icon large left>mdi-alpha-d-box</v-icon>
                DD行为次数最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="stats.most_dd_behaviour_vups"
                  :subtitle="(props) => `所有行为合共 ${props.count} 次`"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="4">
            <v-expansion-panel class="el-border" elevation="0" value="1-3">
              <v-expansion-panel-title>
                <v-icon large left>mdi-cash-multiple</v-icon>
                打赏金额最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="stats.most_spent_vups"
                  :subtitle="(props) => `共打赏 ${props.spent} 元`"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panels>

    <h3 class="mt-5 mb-3">DD细节行为大赏</h3>
    <v-expansion-panels theme="light" multiple v-model="expands_2">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12" md="6" lg="3">
            <v-expansion-panel class="el-border" elevation="0" value="2-1">
              <v-expansion-panel-title>
                <v-icon large left>mdi-email-send</v-icon>
                往别的直播间发送弹幕次数最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="commands?.DANMU_MSG"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-expansion-panel class="el-border" elevation="0" value="2-2">
              <v-expansion-panel-title>
                <v-icon large left>mdi-location-enter</v-icon>
                进入别人的直播间次数最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="commands?.INTERACT_WORD"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-expansion-panel class="el-border" elevation="0" value="2-3">
              <v-expansion-panel-title>
                <v-icon large left>mdi-chat-processing</v-icon>
                往别人的直播间发送SC次数最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="commands?.SUPER_CHAT_MESSAGE"
                  :subtitle="
                    (props) => `共 ${props.count} 次 (${props.price} 元)`
                  "
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-expansion-panel class="el-border" elevation="0" value="2-4">
              <v-expansion-panel-title>
                <v-icon large left>mdi-cash-100</v-icon>
                往别人的直播间发送SC金额最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="commands?.SUPER_CHAT_MESSAGE_PRICED"
                  :subtitle="
                    (props) => `共花费 ${props.price} 元 (${props.count} 次)`
                  "
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-expansion-panel class="el-border" elevation="0" value="3-1">
              <v-expansion-panel-title>
                <v-icon large left>mdi-ferry</v-icon>
                往别人的直播间上舰次数最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="commands?.USER_TOAST_MSG"
                  :subtitle="
                    (props) => `共 ${props.count} 次 (${props.price} 元)`
                  "
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-expansion-panel class="el-border" elevation="0" value="3-2">
              <v-expansion-panel-title>
                <v-icon large left>mdi-currency-usd</v-icon>
                往别人的直播间上舰金额最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="commands?.USER_TOAST_MSG_PRICED"
                  :subtitle="
                    (props) => `共花费 ${props.price} 元 (${props.count} 次)`
                  "
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-expansion-panel class="el-border" elevation="0" value="3-3">
              <v-expansion-panel-title>
                <v-icon large left>mdi-gift</v-icon>
                往别人的直播间送礼次数最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="commands?.SEND_GIFT"
                  :subtitle="
                    (props) => `共 ${props.count} 次 (${props.price} 元)`
                  "
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <v-expansion-panel class="el-border" elevation="0" value="3-4">
              <v-expansion-panel-title>
                <v-icon large left>mdi-cash</v-icon>
                往别人的直播间送礼金额最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="commands?.SEND_GIFT_PRICED"
                  :subtitle="
                    (props) => `共花费 ${props.price} 元 (${props.count} 次)`
                  "
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import StatisticCountBoard from "../components/StatisticCountBoard.vue";
import LeaderBoardList from "../components/LeaderBoardList.vue";

import api from "../api/stats";

export default {
  name: "HomeView",

  components: {
    StatisticCountBoard,
    LeaderBoardList,
  },

  data() {
    return {
      stats: {},
      commands: {},
      expands_1: [],
      expands_2: [],

      refresh_interval: -1,

      commands_to_show: [
        "DANMU_MSG",
        "INTERACT_WORD",
        "SUPER_CHAT_MESSAGE",
        "USER_TOAST_MSG",
        "SEND_GIFT",
      ],

      commands_price_to_show: [
        "SUPER_CHAT_MESSAGE",
        "USER_TOAST_MSG",
        "SEND_GIFT",
      ],
    };
  },

  mounted() {
    this.onMobileChanged(this.$vuetify.display.smAndDown);
    this.fetchData();
    this.refresh_interval = setInterval(this.fetchData, 1000 * 60);
  },

  methods: {
    async fetchGlobal() {
      const res = await api.getGlobalStats();
      this.stats = res;
    },

    async fetchCommand(command) {
      const res = await api.getCommandStatus(command);
      this.commands[command] = res;
    },

    async fetchCommandPrice(command) {
      const res = await api.getCommandStatus(command, true);
      this.commands[`${command}_PRICED`] = res;
    },

    async fetchData() {
      const results = await Promise.allSettled([
        this.fetchGlobal(),
        ...this.commands_to_show.map(this.fetchCommand),
        ...this.commands_price_to_show.map(this.fetchCommandPrice),
      ]);
      for (const result of results) {
        if (result.status === "rejected") {
          console.error(result.reason);
          this.$emit("error", {msg: `加载统计数据时错误: ${result.reason}`, err: result.reason});
          break;
        }
      }
    },
    onMobileChanged(v) {
      if (v) {
        this.expands_1 = [];
        this.expands_2 = [];
      } else {
        this.expands_1 = ["1-1", "1-2", "1-3"];
        this.expands_2 = ["2-1", "2-2", "2-3", "2-4", "3-1", "3-2", "3-3", "3-4"];
      }
    },
  },

  inject: ["observers"],

  created() {
    this.observers[this.$options.name] = this.onMobileChanged;
  },

  beforeUnmount() {
    clearInterval(this.refresh_interval);
  },
};
</script>
