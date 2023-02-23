<template>
  <v-row justify="center">
    <v-col cols="12" md="6" lg="6"> </v-col>
  </v-row>
  <h3 class="mt-5">粉丝排行统计</h3>
  <small class="mb-3">(每24小时更新一次)</small>
  <v-expansion-panels class="mt-5" :theme="theme()" multiple v-model="expands">
    <v-row>
      <v-col cols="12" md="6" :lg="lgCols" v-for="(b, i) in boards" :key="i">
        <v-expansion-panel :value="b.panel" elevation="0" class="el-border">
          <v-expansion-panel-title>
            <v-icon large left class="pr-3">{{ b.icon }}</v-icon>
            {{ b.title }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <watcher-board-list :watchers="response[b.command]" :loading="loading" class="elevation-0" :subtitle="b.subtitle">
            </watcher-board-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-col>
    </v-row>
  </v-expansion-panels>
</template>

<script>
import WatcherBoardList from './WatcherBoardList.vue';

export default {
  name: "VupFansBoard",

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

    fetcher: {
      type: Function,
      required: true,
      default: async () => {
        // simulate getting data after 3 seconds
        await new Promise((res,) => setTimeout(res, 3000))
        return {}
      }
    },
  },

  components: {
    WatcherBoardList,
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
      return Math.max(Math.ceil(12 / (this.boards.length)), 3)
    },
  },

  methods: {
    fetchData() {
      this.loading = true
      return this.fetcher()
        .then(res => {
          console.debug('response', res)
          this.response = res
        })
        .catch((err) => {
          console.error(err);
          this.$emit("error", { msg: "加载统计数据时错误: ", err });
        })
        .finally(() => {
          this.loading = false;
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

  inject: ["observers", "theme"],
};
</script>

<style>

</style>