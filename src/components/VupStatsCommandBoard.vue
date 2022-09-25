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
        <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="1" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-email-send</v-icon>
              最常向该主播发送弹幕
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="danmu_msg?.top_dd_vups"
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="2" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-location-exit</v-icon>
              最常进入的直播间
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="interact_word?.top_dd_vups"
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="3" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-forum</v-icon>
              最常向该主播发送SC
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="super_chat_message?.top_dd_vups"
                :subtitle="
                  (props) => `共 ${props.count} 次 (${props.price} 元)`
                "
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
         <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="4" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-ferry</v-icon>
              最常向该主播上舰
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="user_toast_msg?.top_dd_vups"
                :subtitle="
                  (props) => `共 ${props.count} 次 (${props.price} 元)`
                "
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="5" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-gift</v-icon>
              最常向该主播打赏
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="send_gift?.top_dd_vups"
                :subtitle="
                  (props) => `共 ${props.count} 次 (${props.price} 元)`
                "
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="6" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-email-receive</v-icon>
              最常发送弹幕的来客
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="danmu_msg?.top_guest_vups"
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="7" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-location-enter</v-icon>
              最常进入的来客
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="interact_word?.top_guest_vups"
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="8" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-chat-alert</v-icon>
              最常发送SC的来客
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="super_chat_message?.top_guest_vups"
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="9" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-ship-wheel</v-icon>
              最常上舰的来客
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="user_toast_msg?.top_guest_vups"
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-expansion-panel value="10" elevation="0" class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-gift-open</v-icon>
              最常打赏的来客
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="send_gift?.top_guest_vups"
                class="elevation-0"
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
    priced: new Set()
  }),

  methods: {


    switchPriced(command){
      if (this.priced.has(command)){
        this.priced.delete(command)
      }else{
        this.priced.add(command)
      }
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

  computed: {
    danmu_msg() {
      return this.commands["DANMU_MSG"];
    },

    interact_word() {
      return this.commands["INTERACT_WORD"];
    },

    super_chat_message() {
      return this.commands["SUPER_CHAT_MESSAGE"];
    },

    user_toast_msg() {
      return this.commands["USER_TOAST_MSG"];
    },

    send_gift() {
      return this.commands["SEND_GIFT"];
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