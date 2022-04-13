<template>
  <v-row justify="center">
    <v-col cols="12" md="12" lg="12">
      <v-table theme="light" class="elevation-0 el-border">
        <thead>
          <tr>
            <th class="text-left">行为类型</th>
            <th class="text-center">发送弹幕</th>
            <th class="text-center">发送SC</th>
            <th class="text-center">进入直播间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">次数</td>
            <td class="text-center">
              {{ vup.behaviours_count?.DANMU_MSG }} 次
            </td>
            <td class="text-center">
              {{ vup.behaviours_count?.SUPER_CHAT_MESSAGE }} 次
            </td>
            <td class="text-center">
              {{ vup.behaviours_count?.INTERACT_WORD }} 次
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
  <h3 class="mt-5 mb-3">宏观排行统计</h3>
  <v-expansion-panels theme="light" multiple v-model="expands">
    <v-row>
      <v-col cols="12" md="6">
        <v-expansion-panel value="1" elevation=0 class="el-border">
          <v-expansion-panel-title>
            <v-icon large left>mdi-account-arrow-right</v-icon>
            最常访问的虚拟主播
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <leader-board-list :users="top_dd_vups" class="elevation-0">
            </leader-board-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-col>
      <v-col cols="12" md="6">
        <v-expansion-panel value="2" elevation=0 class="el-border">
          <v-expansion-panel-title>
            <v-icon large left>mdi-account-arrow-left</v-icon>
            最常访问的来客
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <leader-board-list :users="top_guest_vups" class="elevation-0">
            </leader-board-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-col>
    </v-row>
  </v-expansion-panels>
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

    expands: [],
  }),

  created() {
    this.observers[this.$options.name] = this.onMobileChanged;
  },

  methods: {
    fetchData() {
      return api
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

    onMobileChanged(v) {
      if (v) {
        this.expands = [];
      } else {
        this.expands = ['1', '2'];
      }
    },
  },
  mounted() {
    this.fetchData().then(() => this.onMobileChanged(this.$vuetify.display.smAndDown));
  },

  inject: ["observers"],
};
</script>

<style>
</style>