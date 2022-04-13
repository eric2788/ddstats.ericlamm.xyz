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
        <v-col cols="12" md="6" lg="4">
          <v-expansion-panel value="1" elevation=0 class="el-border">
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
        <v-col cols="12" md="6" lg="4">
          <v-expansion-panel value="2" elevation=0 class="el-border">
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
        <v-col cols="12" md="6" lg="4">
          <v-expansion-panel value="3" elevation=0 class="el-border">
            <v-expansion-panel-title>
              <v-icon large left>mdi-forum</v-icon>
              最常向该主播发送SC
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <leader-board-list
                :users="super_chat_message?.top_dd_vups"
                class="elevation-0"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <v-expansion-panel value="4" elevation=0 class="el-border">
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
        <v-col cols="12" md="6" lg="4">
          <v-expansion-panel value="5" elevation=0 class="el-border">
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
        <v-col cols="12" md="6" lg="4">
          <v-expansion-panel value="6" elevation=0 class="el-border">
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
  }),

  methods: {
    fetchData() {
      this.loading = true;
      const uid = this.vup.uid;
      return Promise.all([
        api.getUserStatsByCommand(uid, "DANMU_MSG"),
        api.getUserStatsByCommand(uid, "INTERACT_WORD"),
        api.getUserStatsByCommand(uid, "SUPER_CHAT_MESSAGE"),
      ])
        .then((res) => {
          const [danmu_msg, interact_word, super_chat_message] = res;
          this.commands = {
            DANMU_MSG: danmu_msg,
            INTERACT_WORD: interact_word,
            SUPER_CHAT_MESSAGE: super_chat_message,
          };
          console.log(this.commands);
        })
        .catch((err) => {
          console.error(err);
          this.$emit(
            "showError",
            "加载统计数据时错误: " + err?.response?.message ?? err
          );
        })
        .finally(() => (this.loading = false));
    },


    onMobilechanged(v) {
        if (v) {
            this.expands = [];
        }else{
            this.expands = ["1", "2", "3", "4", "5", "6"];
        }
    }
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
  },

  inject: ["observers"],

  mounted() {
    this.fetchData().then(() => this.onMobilechanged(this.$vuetify.display.smAndDown));
  },

  created() {
      this.observers[this.$options.name] = this.onMobilechanged
  }
};
</script>

<style>
.header-color {
  background-color: #474747;
  color: #e9e9e9;
}
</style>