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
          title="已记录的虚拟主播数量:"
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
          <v-col cols="12" md="6">
            <v-expansion-panel class="el-border" elevation="0" value="1-1">
              <v-expansion-panel-title>
                <v-icon large left>mdi-account-multiple</v-icon>
                访问最多的直播间
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  :users="stats.most_dd_vups"
                  subtitle="共访问过 %count% 个不同的直播间"
                  class="elevation-0"
                ></leader-board-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6">
            <v-expansion-panel class="el-border" elevation="0" value="1-2">
              <v-expansion-panel-title>
                <v-icon large left>mdi-alpha-d-box</v-icon>
                进入直播间/往别的直播间发送SC/弹幕最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="stats.most_dd_behaviour_vups"
                  subtitle="进入直播间/往别的直播间发送SC/弹幕共 %count% 次"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panels>

    <h3 class="mt-5 mb-3">DD次数行为大赏</h3>
    <v-expansion-panels theme="light" multiple v-model="expands_2">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12" md="6" lg="4">
            <v-expansion-panel class="el-border" elevation="0" value="2-1">
              <v-expansion-panel-title>
                <v-icon large left>mdi-email-send</v-icon>
                往别的直播间发送弹幕次数最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="stats?.most_dd_behaviour_vup_commands?.DANMU_MSG"
                  subtitle="往别的直播间发送弹幕共 %count% 次"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-expansion-panel class="el-border" elevation="0" value="2-2">
              <v-expansion-panel-title>
                <v-icon large left>mdi-location-enter</v-icon>
                进入别人的直播间次数最多
                </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  b
                  class="elevation-0"
                  :users="stats?.most_dd_behaviour_vup_commands?.INTERACT_WORD"
                  subtitle="进入别人的直播间共 %count% 次"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-expansion-panel class="el-border" elevation="0" value="2-3">
              <v-expansion-panel-title>
                <v-icon large left>mdi-chat-processing</v-icon>
                往别人的直播间发送SC次数最多
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  class="elevation-0"
                  :users="
                    stats?.most_dd_behaviour_vup_commands?.SUPER_CHAT_MESSAGE
                  "
                  subtitle="往别人的直播间发送SC共 %count% 次"
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
      message: "Hello Vue!",
      stats: {},
      expands_1: [],
      expands_2: [],


      refresh_interval: -1
    };
  },

  mounted() {
    this.fetchData().then(() => this.onMobileChanged(this.$vuetify.display.smAndDown));

    this.refresh_interval = setInterval(this.fetchData, 1000 * 60);
  },

  methods: {

    fetchData(){
      return api
      .getGlobalStats()
      .then((data) => {
        this.stats = data;
        console.debug('refresh completed.')
      })
      .catch((err) => {
        console.error(err);
        this.$emit(
          "showError",
          "加载统计数据时错误: " + err?.response?.message ??
            err?.response ??
            err
        );
      })
    },
    onMobileChanged(v) {
      if (v) {
        this.expands_1 = [];
        this.expands_2 = [];
      } else {
        this.expands_1 = ["1-1", "1-2"];
        this.expands_2 = ["2-1", "2-2", "2-3"];
      }
    },
  },

  inject: ["observers"],

  created() {
    this.observers[this.$options.name] = this.onMobileChanged;
  },

  beforeUnmount(){
    clearInterval(this.refresh_interval)
  },
};
</script>
