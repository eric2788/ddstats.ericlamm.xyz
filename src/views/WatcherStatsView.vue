<template>
  <v-container class="pa-5">
    <v-row justify="center" align="center">
      <v-col cols=12 md=10 lg=10>
        <h2 >用户统计排行</h2>
        <small>(每24小时更新一次)</small>
      </v-col>
      <v-col cols="12" md=2 lg=2 class="text-center mb-3" >
        <v-btn
          prepend-icon="mdi-magnify"
          variant="plain"
          elevation="0"
          to="/watchers"
          :block="$vuetify.display.smAndDown"
          >返回搜索</v-btn
        >
      </v-col>
    </v-row>
    <v-divider />
    <h3 class="mt-5 mb-3">DD风云榜</h3>
    <v-expansion-panels :theme="theme()" multiple v-model="expands_1">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12" md="4" v-for="(b, i) in global_board" :key="i">
            <v-expansion-panel class="el-border" elevation="0" :value="b.panel">
              <v-expansion-panel-title>
                <v-icon large left class="pr-3">{{ b.icon }}</v-icon>
                {{ b.title }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <watcher-board-list
                  :watchers="stats[b.key]"
                  :subtitle="b.display"
                  class="elevation-0"
                ></watcher-board-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panels>

    <h3 class="mt-5 mb-3">主播人气榜</h3>
    <v-expansion-panels :theme="theme()" multiple v-model="expands_3">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12" md="4" v-for="(b, i) in famous_board" :key="i">
            <v-expansion-panel class="el-border" elevation="0" :value="b.panel">
              <v-expansion-panel-title>
                <v-icon large left class="pr-3">{{ b.icon }}</v-icon>
                {{ b.title }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <leader-board-list
                  :users="stats[b.key]"
                  :subtitle="b.display"
                  class="elevation-0"
                ></leader-board-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panels>

    <h3 class="mt-5 mb-3">DD细节行为大赏</h3>
    <v-expansion-panels :theme="theme()" multiple v-model="expands_2">
      <v-container class="pa-0">
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="3"
            v-for="(b, i) in detail_board"
            :key="i"
          >
            <v-expansion-panel class="el-border" elevation="0" :value="b.panel">
              <v-expansion-panel-title>
                <v-icon large left class="pr-3">{{ b.icon }}</v-icon>
                {{ b.title }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <watcher-board-list
                  class="elevation-0"
                  :watchers="commands[b.key]"
                  :subtitle="b.display"
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
import api from "../api/watcher";
import WatcherBoardList from "../components/WatcherBoardList.vue";
import LeaderBoardList from "../components/LeaderBoardList.vue";

export default {
  name: "WatcherStatsView",

  components: {
    WatcherBoardList,
    LeaderBoardList,
  },

  data() {
    return {
      stats: {},
      commands: {},
      expands_1: [],
      expands_2: [],
      expands_3: [],

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

      statistics_board: [
        {
          icon: "mdi-account-supervisor-outline",
          title: "正在监听的房间数量:",
          color: "blue",
          key: "current_listening_count",
        },
        {
          icon: "mdi-account-box-multiple",
          title: "已记录的主播数量:",
          color: "green",
          key: "total_vup_recorded",
        },
        {
          icon: "mdi-alpha-d-box",
          title: "已记录的主播行为数量:",
          color: "purple",
          key: "total_dd_behaviours",
        },
      ],

      global_board: [
        {
          icon: "mdi-account-multiple",
          title: "访问最多的直播间",
          key: "most_dd_watchers",
          display: (props) => `共访问过 ${props.count} 个不同的直播间`,
          panel: "1-1",
        },
        {
          icon: "mdi-alpha-d-box",
          title: "DD行为次数最多",
          key: "most_dd_behaviour_watchers",
          display: (props) => `所有行为合共 ${props.count} 次`,
          panel: "1-2",
        },
        {
          icon: "mdi-cash-multiple",
          title: "打赏金额最多",
          key: "most_spent_watchers",
          display: (props) => `共打赏 ${props.price} 元`,
          panel: "1-3",
        },
      ],

      famous_board: [
        {
          icon: "mdi-account-multiple",
          title: "访客人数最多",
          key: "most_famous_watchers",
          display: (props) => `共有 ${props.count} 个不同的访客`,
          panel: "3-1",
        },
        {
          icon: "mdi-alpha-d-box",
          title: "被互动次数最多",
          key: "most_interacted_watchers",
          display: (props) => `共有 ${props.count} 次互动`,
          panel: "3-2",
        },
        {
          icon: "mdi-cash-multiple",
          title: "被打赏的金额最多",
          key: "most_earned_watchers",
          display: (props) => `共被打赏 ${props.price} 元`,
          panel: "3-3",
        },
      ],

      detail_board: [
        {
          icon: "mdi-email-send",
          title: "往别的直播间发送弹幕次数最多",
          key: "DANMU_MSG",
          panel: "2-1",
          display: undefined,
        },
        {
          icon: "mdi-location-enter",
          title: "进入别的直播间次数最多",
          key: "INTERACT_WORD",
          panel: "2-2",
          display: undefined,
        },
        {
          icon: "mdi-chat-processing",
          title: "往别的直播间发送SC次数最多",
          key: "SUPER_CHAT_MESSAGE",
          panel: "2-3",
          display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        },
        {
          icon: "mdi-cash-100",
          title: "往别人的直播间发送SC金额最多",
          key: "SUPER_CHAT_MESSAGE_PRICED",
          panel: "2-4",
          display: (props) => `共花费 ${props.price} 元 (${props.count} 次)`,
        },
        {
          icon: "mdi-ferry",
          title: "往别人的直播间上舰次数最多",
          key: "USER_TOAST_MSG",
          panel: "3-1",
          display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        },
        {
          icon: "mdi-currency-usd",
          title: "往别人的直播间上舰金额最多",
          key: "USER_TOAST_MSG_PRICED",
          panel: "3-2",
          display: (props) => `共花费 ${props.price} 元 (${props.count} 次)`,
        },
        {
          icon: "mdi-gift",
          title: "往别人的直播间送礼次数最多",
          key: "SEND_GIFT",
          panel: "3-3",
          display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        },
        {
          icon: "mdi-cash",
          title: "往别人的直播间送礼金额最多",
          key: "SEND_GIFT_PRICED",
          panel: "3-4",
          display: (props) => `共花费 ${props.price} 元 (${props.count} 次)`,
        },
      ],
    };
  },

  mounted() {
    this.onMobileChanged(this.$vuetify.display.smAndDown);
    this.fetchData();
    this.refresh_interval = setInterval(this.fetchData, 1000 * 60);
  },

  methods: {
    async fetchStats(type, key = "") {
      const res = await api.getGlobalStats(type);
      if (key) {
        this.stats[key] = res;
      } else {
        this.stats = {
          ...this.stats,
          ...res,
        };
      }
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
        this.fetchStats("dd", "most_dd_watchers"),
        this.fetchStats("behaviours", "most_dd_behaviour_watchers"),
        this.fetchStats("spent", "most_spent_watchers"),
        this.fetchStats("famous", "most_famous_watchers"),
        this.fetchStats("interacted", "most_interacted_watchers"),
        this.fetchStats("earned", "most_earned_watchers"),
        ...this.commands_to_show.map(this.fetchCommand),
        ...this.commands_price_to_show.map(this.fetchCommandPrice),
      ]);
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
      console.log("stats", this.stats);
    },
    onMobileChanged(v) {
      if (v) {
        this.expands_1 = [];
        this.expands_2 = [];
        this.expands_3 = [];
      } else {
        this.expands_1 = this.global_board.map((b) => b.panel);
        this.expands_2 = this.detail_board.map((b) => b.panel);
        this.expands_3 = this.famous_board.map((b) => b.panel);
      }
    },

    onScroll(e) {
      console.log(e);
    },

    onWheel(e) {
      console.log(e);
      /*
      if (e.deltaY < -100) {
        this.$router.push('/watchers')
      }
      */
    },
  },

  inject: ["observers", "theme"],

  created() {
    this.observers[this.$options.name] = this.onMobileChanged;
    window.addEventListener("wheel", this.onWheel);
  },

  beforeUnmount() {
    window.removeEventListener("wheel", this.onWheel);
    clearInterval(this.refresh_interval);
  },
};
</script>
<style scoped>
.wall-btn {
  position: absolute;
  top: 0;
}
</style>