<template>
  <v-container class="pa-5">
    <template v-if="!vup || loading">
      <v-row align="center" justify="center" class="pt-15">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-row>
    </template>
    <template v-else>
      <user-list-view :vup="vup" link="https://space.bilibili.com/%uid%">
        <template v-slot:name="{ vup: v }">
          <a
            :href="`https://space.bilibili.com/${v.uid}`"
            target="_blank"
            style="color: inherit"
          >
            <span class="text-h6 mr-2">{{ v.name }}</span>
          </a>
        </template>
        <template v-slot:avatar="{ vup: v }">
          <a
            :href="`https://space.bilibili.com/${v.uid}`"
            target="_blank"
            style="color: inherit"
          >
            <v-avatar
              class="float-right"
              :image="vup.face"
              size="86"
              rounded="0"
            />
          </a>
        </template>
        <template v-slot:under>
          <v-row class="pt-1" align="center">
            <v-col cols="12" md="6" lg="4">
              <v-row class="pt-5">
                <span class="text-caption">个人简介</span>
              </v-row>
              <v-row class="pt-4">
                {{ vup.sign }}
              </v-row>
            </v-col>
            <v-col
              cols="0"
              sm="0"
              md="0"
              lg="2"
              v-if="!$vuetify.display.mdAndDown"
            ></v-col>
            <v-col cols="12" md="6" lg="4">
              <v-row class="pt-5">
                <span class="text-caption">直播间传送门</span>
              </v-row>
              <v-row class="pt-4">
                <a
                  :href="`https://live.bilibili.com/${vup.room_id}`"
                  target="_blank"
                >
                  {{ $vuetify.display.mdAndDown ? vup.room_id : `https://live.bilibili.com/${vup.room_id}` }}
                </a>
              </v-row>
            </v-col>
          </v-row>
        </template>
      </user-list-view>
      <v-divider />
      <v-row class="pa-5" justify="center"> </v-row>
      <vup-stats-board :vup="vup" />
      <vup-stats-command-board :vup="vup" />
      <vup-records-board :vup="vup" />
    </template>
  </v-container>
</template>

<script>
import UserListView from "../components/UserListView.vue";
import VupStatsBoard from "../components/VupStatsBoard.vue";
import VupStatsCommandBoard from "../components/VupStatsCommandBoard.vue";
import VupRecordsBoard from "../components/VupRecordsBoard.vue";

import userApi from "../api/user";

export default {
  name: "UserDetailView",

  components: {
    UserListView,
    VupStatsBoard,
    VupStatsCommandBoard,
    VupRecordsBoard,
  },

  data: () => ({
    vup: null,
    loading: true,
  }),

  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (!this.$route.params.uid) return;
        this.fetchData();
      },
      { immediate: true }
    );
  },

  methods: {
    fetchData() {
      this.loading = true;
      userApi
        .getUser(this.$route.params.uid)
        .then((res) => {
          this.vup = res;
        })
        .catch((err) => {
          console.error(err);
          this.$emit(
            "showError",
            "加载用户资讯时错误: " + err?.response?.data?.message ??
              err?.response?.data ??
              err
          );
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>