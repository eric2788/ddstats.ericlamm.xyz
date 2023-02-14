<template>
  <h3 class="mt-5 mb-3">细节排行统计</h3>
  <v-expansion-panels
    theme="light"
    class="elevation-0"
    multiple
    v-model="expands"
  >
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12" md="6" lg="3" v-for="(b, i) in dd_board" :key="i">
          <v-expansion-panel :value="b.panel" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left class="pr-3">{{ b.icon }}</v-icon>
              {{ b.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="commands[b.command]?.top_dd_vups"
                class="elevation-0"
                :subtitle="b.display"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="3" v-for="(b, i) in guest_board" :key="i">
          <v-expansion-panel :value="b.panel" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left class="pr-3">{{ b.icon }}</v-icon>
              {{ b.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
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
import api from "../api/stats";

export default {
  name: "VueStatsCommandBoard",

  props: {
    vup: Object,
  },

  components: {
    LeaderBoardList,
  },

  data: () => ({
    loading: true,
    commands: {},
    expands: [],
    priced: new Set(),

    dd_board: [
      {
        icon: 'mdi-email-send',
        title: '最常向该主播发送弹幕',
        command: 'DANMU_MSG',
        display: undefined,
        panel: '1'
      },
      {
        icon: 'mdi-location-exit',
        title: '最常进入的直播间',
        command: 'INTERACT_WORD',
        display: undefined,
        panel: '2'
      },
      {
        icon: 'mdi-forum',
        title: '最常向该主播发送SC',
        command: 'SUPER_CHAT_MESSAGE',
        display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        panel: '3'
      },
      {
        icon: 'mdi-ferry',
        title: '最常向该主播上舰',
        command: 'USER_TOAST_MSG',
        display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        panel: '4'
      },
      {
        icon: 'mdi-gift',
        title: '最常向该主播打赏',
        command: 'SEND_GIFT',
        display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        panel: '5'
      }
    ],

    guest_board: [
      {
        icon: 'mdi-email-receive',
        title: '最常发送弹幕的来客',
        command: 'DANMU_MSG',
        display: undefined,
        panel: '6'
      },
      {
        icon: 'mdi-location-enter',
        title: '最常进入的来客',
        command: 'INTERACT_WORD',
        display: undefined,
        panel: '7'
      },
      {
        icon: 'mdi-chat-alert',
        title: '最常发送SC的来客',
        command: 'SUPER_CHAT_MESSAGE',
        display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        panel: '8'
      },
      {
        icon: 'mdi-ship-wheel',
        title: '最常上舰的来客',
        command: 'USER_TOAST_MSG',
        display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        panel: '9'
      },
      {
        icon: 'mdi-gift-open',
        title: '最常打赏的来客',
        command: 'SEND_GIFT',
        display: (props) => `共 ${props.count} 次 (${props.price} 元)`,
        panel: '10'
      }
    ]
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
      delete this.commands[command]
      const res = await api.getUserStatsByCommand(this.vup.uid, command, price);
      this.commands[command] = res;
    },

    fetchData() {
      this.loading = true;
      return Promise.allSettled([
        this.fetchStats("DANMU_MSG"),
        this.fetchStats("INTERACT_WORD"),
        this.fetchStats("SUPER_CHAT_MESSAGE"),
        this.fetchStats("USER_TOAST_MSG"),
        this.fetchStats("SEND_GIFT"),
      ])
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
        .finally(() => (this.loading = false));
    },

    onMobilechanged(v) {
      if (v) {
        this.expands = [];
      } else {
        this.expands = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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