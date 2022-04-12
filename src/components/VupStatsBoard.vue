<template>
  <v-row class="pa-5">
    <v-col cols="12" md="12" lg="4">
      <v-table theme="light" style="border: solid 1px #e9e9e9">
        <thead>
          <tr>
            <th>DD行为类型</th>
            <th>次数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>发送弹幕</td>
            <td>{{ vup.behaviours_count?.DANMU_MSG }}</td>
          </tr>
          <tr>
            <td>发送SC</td>
            <td>{{ vup.behaviours_count?.SUPER_CHAT_MESSAGE }}</td>
          </tr>
          <tr>
            <td>进入直播间</td>
            <td>{{ vup.behaviours_count?.INTERACT_WORD }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    <v-col cols="12" md="6" lg="4">
      <leader-board-list
        :users="top_dd_vups"
        bgColor="#383838"
        textColor="white"
        subheader="最常访问的虚拟主播"
      >
      </leader-board-list>
    </v-col>
    <v-col cols="12" md="6" lg="4">
      <leader-board-list
        :users="top_guest_vups"
        bgColor="#383838"
        textColor="white"
        subheader="最常访问的来客"
      >
      </leader-board-list>
    </v-col>
  </v-row>
</template>

<script>
import api from "../api/stats";
import LeaderBoardList from "./LeaderBoardList.vue";

export default {
  name: "VupStatsBoard",

  props: {
    vup: Object,
  },

  components: {
    LeaderBoardList,
  },

  data: () => ({
    loading: false,
    top_dd_vups: null,
    top_guest_vups: null,
  }),

  created() {
    this.$watch(
      "vup",
      () => {
        this.fetchData();
      },
      { immediate: true }
    );
  },

  methods: {
    fetchData() {
      api
        .getUserStats(this.vup.uid)
        .then((res) => {
          this.top_dd_vups = res.top_dd_vups;
          this.top_guest_vups = res.top_guest_vups;
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
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
</style>