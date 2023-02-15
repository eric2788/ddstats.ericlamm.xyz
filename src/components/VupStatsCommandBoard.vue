<template>
  <div class="mt-5 mb-3">
    <h3 class="pt-4 float-left">细节排行统计</h3>
    <v-switch
      class="float-right"
      color="warning"
      label="金额排行"
      v-model="priced"
      @change="fetchData"
    ></v-switch>
  </div>
  <v-expansion-panels
    :theme="theme()"
    class="elevation-0"
    multiple
    v-model="expands"
  >
    <v-container class="pa-0">
      <v-row v-if="dd_boards?.length">
        <v-col
          cols="12"
          md="6"
          :lg="dd_col"
          v-for="(b, i) in dd_boards"
          :key="i"
        >
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
      <v-row v-if="guest_boards?.length">
        <v-col
          cols="12"
          md="6"
          :lg="guest_col"
          v-for="(b, i) in guest_boards"
          :key="i"
        >
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
import { isPricable } from "../api/utils";

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
      // because both watchers and vups dd_boards are the same, so we can use the default value
      default: () => [
        {
          icon: "mdi-email-send",
          title: "最常向该主播发送弹幕",
          command: "DANMU_MSG",
          display: undefined,
          panel: "1",
        },
        {
          icon: "mdi-location-exit",
          title: "最常进入的直播间",
          command: "INTERACT_WORD",
          display: undefined,
          panel: "2",
        },
        {
          icon: "mdi-forum",
          title: "最常向该主播发送SC",
          command: "SUPER_CHAT_MESSAGE",
          display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
          panel: "3",
        },
        {
          icon: "mdi-ferry",
          title: "最常向该主播上舰",
          command: "USER_TOAST_MSG",
          display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
          panel: "4",
        },
        {
          icon: "mdi-gift",
          title: "最常向该主播打赏",
          command: "SEND_GIFT",
          display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
          panel: "5",
        },
      ],
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
      default: () => [],
    },

    fetcher: {
      type: Function,
      required: true,
      // example invoke
      default: async (cmd, price) => {
        await new Promise((res) => setTimeout(res, 3000));
        return {
          top_dd_vups: [],
          top_guest_vups: [],
        };
      },
    },
  },

  components: {
    LeaderBoardList,
  },

  data: () => ({
    loadings: {},
    commands: {},
    expands: [],
    priced: false,
  }),

  computed: {
    dd_col() {
      return Math.max(Math.ceil(12 / this.dd_boards.length), 3);
    },

    guest_col() {
      return Math.max(Math.ceil(12 / this.guest_boards.length), 3);
    },
  },

  methods: {
    async fetchStats(command, price = false) {
      this.loadings[command] = true;
      try {
        delete this.commands[command];
        if (!isPricable(command)) {
          price = false;
        }
        const res = await this.fetcher(command, price);
        this.commands[command] = res;
      } finally {
        this.loadings[command] = false;
      }
    },

    async fetchData() {
      const commandsToFetch = [
        ...new Set(
          this.dd_boards.concat(this.guest_boards).map((b) => b.command)
        ),
      ];
      return Promise.allSettled(
        commandsToFetch.map((b) => this.fetchStats(b, this.priced))
      ).then((results) => {
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
      });
    },

    onMobilechanged(v) {
      if (v) {
        this.expands = [];
      } else {
        this.expands = this.dd_boards
          .concat(this.guest_boards)
          .map((b) => b.panel);
      }
    },
  },

  inject: ["observers", "theme"],

  mounted() {
    this.onMobilechanged(this.$vuetify.display.smAndDown);
    this.fetchData();
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