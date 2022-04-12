<template>
  <v-container class="pa-5">
    <h2>统计</h2>
    <v-divider></v-divider>
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
     <h2>DD风云榜</h2>
     <v-divider></v-divider>
    <v-row class="pt-5 pb-5">
      <v-col cols="12" md="6">
        <leader-board-list
             bgColor="#f52500"
             textColor="white"
             :users="stats.most_dd_vups" 
             subheader="访问最多的直播间"
             subtitle="共访问过 %count% 个不同的直播间"
             ></leader-board-list>
      </v-col>
      <v-col cols="12" md="6">
        <leader-board-list
              bgColor="#f56600"
              textColor="white"
              :users="stats.most_dd_behaviour_vups"
              subheader="进入直播间/往别的直播间发送SC/弹幕最多"
              subtitle="进入直播间/往别的直播间发送SC/弹幕共 %count% 次"
            />
      </v-col>
    </v-row>
    <h2>DD次数行为大赏</h2>
    <v-divider></v-divider>
    <v-row class="pt-5 pb-5">
      <v-col cols="12" md="4">
        <leader-board-list 
            bgColor="#006af5"
            textColor="white"
            :users="stats?.most_dd_behaviour_vup_commands?.DANMU_MSG"
            subheader="往别的直播间发送弹幕次数最多"
            subtitle="往别的直播间发送弹幕共 %count% 次"
        />
      </v-col>
      <v-col cols="12" md="4">
        <leader-board-list 
            bgColor="#5800e6"
            textColor="white"
            :users="stats?.most_dd_behaviour_vup_commands?.INTERACT_WORD"
            subheader="进入别人的直播间次数最多"
            subtitle="进入别人的直播间共 %count% 次"
        />
      </v-col>
      <v-col cols="12" md="4">
        <leader-board-list 
            bgColor="#50b352"
            textColor="white"
            :users="stats?.most_dd_behaviour_vup_commands?.SUPER_CHAT_MESSAGE"
            subheader="往别人的直播间发送SC次数最多"
            subtitle="往别人的直播间发送SC共 %count% 次"
        />
      </v-col>
    </v-row>
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
    };
  },

  mounted() {
    api
      .getGlobalStats()
      .then((data) => {
        this.stats = data;
      })
      .catch((err) => {
        console.error(err);
        this.$emit('showError', '加载统计数据时错误: ' + err?.message ?? err);
      });
  },
};
</script>
