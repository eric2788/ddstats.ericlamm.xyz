<template>
  <v-row justify="center">
    <v-col cols="12" md="6" lg="6">
      
    </v-col>
  </v-row>
  <h3 class="mt-5 mb-3">宏观排行统计</h3>
  <v-expansion-panels theme="light" multiple v-model="expands">
    <v-row>
      <v-col cols="12" md="3">
        <v-table theme="light" class="elevation-0 el-border">
        <thead>
          <tr>
            <th class="text-left">行为类型</th>
            <th class="text-center">行为次数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">发送弹幕</td>
             <td class="text-center">
              {{ showStats('DANMU_MSG') }}
            </td>
          </tr>
          <tr>
            <td class="text-left">发送SC</td>
            <td class="text-center">
              {{ showStats('SUPER_CHAT_MESSAGE', true) }}
            </td>
          </tr>
          <tr>
            <td class="text-left">进入直播间</td>
            <td class="text-center">
              {{ showStats('INTERACT_WORD') }}
            </td>
          </tr>

          <tr>
            <td class="text-left">上舰</td>
            <td class="text-center">
              {{ showStats('USER_TOAST_MSG', true) }}
            </td>
          </tr>
          <tr>
            <td class="text-left">送礼</td>
            <td class="text-center">
              {{ showStats('SEND_GIFT', true) }}
            </td>
          </tr>
        </tbody>
      </v-table>
      </v-col>
      <v-col cols="12" md="3">
        <v-expansion-panel value="1" elevation=0 class="el-border">
          <v-expansion-panel-title>
            <v-icon large left>mdi-account-arrow-right</v-icon>
            最常访问的主播
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <leader-board-list :users="top_dd_vups" class="elevation-0">
            </leader-board-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-col>
      <v-col cols="12" md="3">
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
      <v-col cols="12" md="3">
        <v-expansion-panel value="2" elevation=0 class="el-border">
          <v-expansion-panel-title>
            <v-icon large left>mdi-account-arrow-left</v-icon>
            最高花费的主播
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <leader-board-list :users="top_spent_vups" class="elevation-0" :subtitle="(props) => `共花费 ${props.price} 元`">
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
    top_spent_vups: null,

    expands: [],
  }),

  created() {
    this.observers[this.$options.name] = this.onMobileChanged;
  },

  methods: {

    showStats(command, showPrice = false){
      const stats = this.vup?.behaviours_count[command]
      return `${stats?.count} 次` + (showPrice ? ` (${stats?.price} 元)` : '')
    },

    fetchData() {
      return api
        .getUserStats(this.vup.uid)
        .then((res) => {
          this.top_dd_vups = res.top_dd_vups;
          this.top_guest_vups = res.top_guest_vups;
          this.top_spent_vups = res.top_spent_vups;
        })
        .catch((err) => {
          console.error(err);
          this.$emit("error",{ msg: "加载统计数据时错误: ", err});
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