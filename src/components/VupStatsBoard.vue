<template>
  <v-row justify="center">
    <v-col cols="12" md="6" lg="6"> </v-col>
  </v-row>
  <h3 class="mt-5 mb-3">宏观排行统计</h3>
  <v-expansion-panels theme="light" multiple v-model="expands">
    <v-row>
      <v-col cols="12" md="6" :lg="lgCols">
        <v-table theme="light" class="elevation-0 el-border">
          <thead>
            <tr>
              <th class="text-left">行为类型</th>
              <th class="text-center">行为次数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(behaviour, index) in behaviours" :key="index">
              <td class="text-left">{{ behaviour.title }}</td>
              <td class="text-center">
                {{ showStats(behaviour) }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="12" md="6" :lg="lgCols" v-for="(b, i) in boards" :key="i">
        <v-expansion-panel :value="b.panel" elevation="0" class="el-border">
          <v-expansion-panel-title>
            <v-icon large left class="pr-3">{{ b.icon }}</v-icon>
            {{ b.title }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <leader-board-list :users="response[b.command]" :loading="loading" class="elevation-0" :subtitle="b.subtitle">
            </leader-board-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-col>
    </v-row>
  </v-expansion-panels>
</template>

<script>
import LeaderBoardList from "./LeaderBoardList.vue";

export default {
  name: "VupStatsBoard",

  props: {
    boards: {
      /* definition
      {
          title: "最常访问的主播", // String
          icon: "mdi-account-arrow-right", // String
          subtitle: undefined, // Function
          panel: "1", // String
          command: 'top_dd_vups', // String
        }
      */
      type: Array,
      default: () => [],
    },

    behaviours: {
      /* definition
      {
        title: '送礼' // String
        price: 5 // Number
        count: 2 // Number
      }
      */
      type: Array,
      default: () => [],
    },

    fetcher: {
      type: Function,
      required: true,
      default: async () => {
        // simulate getting data after 3 seconds
        await new Promise((res,) => setTimeout(res, 3000))
        return {
          top_dd_vups: [],
          top_guest_vups: [],
          top_spent_vups: [],
        }
      }
    },
  },

  components: {
    LeaderBoardList,
  },

  data: () => ({
    loading: false,
    response: {},
    expands: [],
  }),

  created() {
    this.observers[this.$options.name] = this.onMobileChanged;
  },

  computed: {
    lgCols(){
      return Math.max(Math.ceil(12 / (this.boards.length+1)), 3)
    }
  },

  methods: {
    showStats(stats) {
      return `${stats?.count} 次` + (stats.price > 0 ? ` (${stats.price} 元)` : "");
    },

    fetchData() {
      this.loading = true
      return this.fetcher()
        .then(res => {
          this.response = res
        })
        .catch((err) => {
          console.error(err);
          this.$emit("error", { msg: "加载统计数据时错误: ", err });
        })
        .finally(() => {
          this.loading = false;
          console.debug(this.behaviours)
        });
    },

    onMobileChanged(v) {
      if (v) {
        this.expands = [];
      } else {
        this.expands = this.boards.map(b => b.panel);
      }
    },
  },

  mounted() {
    this.onMobileChanged(this.$vuetify.display.smAndDown);
    this.fetchData();
  },

  inject: ["observers"],
};
</script>

<style>

</style>