<template>
  <h3 class="mt-5 mb-3">细节排行统计</h3>
  <v-expansion-panels
    theme="light"
    class="elevation-0"
    multiple
    v-model="expands"
  >
    <v-container class="pa-0">
      <v-row v-if="dd_board?.length">
        <v-col cols="12" md="6" lg="3" v-for="(b, i) in dd_board" :key="i">
          <v-expansion-panel :value="b.panel" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left class="pr-3">{{ b.icon }}</v-icon>
              {{ b.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :loading="loadings[b.command]"
                :users="commands[b.command]?.top_dd_vups"
                class="elevation-0"
                :subtitle="b.display"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
      <v-row v-if="guest_board?.length">
        <v-col cols="12" md="6" lg="3" v-for="(b, i) in guest_board" :key="i">
          <v-expansion-panel :value="b.panel" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left class="pr-3">{{ b.icon }}</v-icon>
              {{ b.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :loading="loadings[b.command]"
                :users="commands[b.command]?.top_guest_vups"
                class="elevation-0"
                :subtitle="b.display"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
    </v-container>
  </v-expansion-panels>
</template>

<script>
import LeaderBoardList from "../components/LeaderBoardList.vue";

export default {
  name: "VueStatsCommandBoard",

  props: {
    
    dd_boards: {
      /* definition
      {
          icon: 'mdi-email-send', // String
          title: '最常向该主播发送弹幕', // String
          command: 'DANMU_MSG', // String
          display: undefined, // Function
          panel: '1' // String
      },
      */
      type: Array,
      default: () => []
    },

    // watcher will not have guest_board
    guest_boards: {
      /* definition
      {
          icon: 'mdi-email-receive', // String
          title: '最常发送弹幕的来客', // String
          command: 'DANMU_MSG', // String
          display: undefined, // Function
          panel: '6' // String
      },
      */
      type: Array,
      default: () => []
    },

    fetcher: {
      type: Function,
      required: true,
      // example invoke
      default: async (cmd, price) => {
        await new Promise((res,) => setTimeout(res, 3000))
        return {
          top_dd_vups: [],
          top_guest_vups: [],
        }
      }
    }

  },

  components: {
    LeaderBoardList,
  },

  data: () => ({
    loadings: {},
    commands: {},
    expands: [],
    priced: new Set(),
  }),

  methods: {
    async switchPriced(command){
      if (this.priced.has(command)){
        this.priced.delete(command)
      }else{
        this.priced.add(command)
      }
      await this.fetchStats(command, this.priced.has(command))
    },

    async fetchStats(command, price = false) {
      this.loadings[command] = true;
      try {
        delete this.commands[command]
        const res = await this.fetcher(command, price);
        this.commands[command] = res;
      } finally {
        this.loadings[command] = false;
      }
    },

    async fetchData() {
      const commandsToFetch = [...new Set(this.dd_boards.concat(this.guest_boards).map(b => b.command))]
      return Promise.allSettled(commandsToFetch.map(this.fetchStats))
        .then((results) => {
          for (const result of results) {
            if (result.status === "rejected") {
              console.error(result.reason);
              this.$emit("error", {
                msg: `加载统计数据时错误: ${result.reason}`,
                err: result.reason,
              });
              break;
            }
          }
        })
    },

    onMobilechanged(v) {
      if (v) {
        this.expands = [];
      } else {
        this.expands = this.dd_boards.concat(this.guest_boards).map(b => b.panel)
      }
    },
  },

  inject: ["observers"],

  mounted() {
    this.onMobilechanged(this.$vuetify.display.smAndDown)
    this.fetchData()
  },

  created() {
    this.observers[this.$options.name] = this.onMobilechanged;
  },
};
</script>

<style>
.header-color {
  background-color: #474747;
  color: #e9e9e9;
}
</style>