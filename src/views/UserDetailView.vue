<template>
  <v-container class="pa-5">
    <template v-if="!vup">
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
      </user-list-view>
      <v-divider />
      <vup-stats-board :vup="vup" />
    </template>
  </v-container>
</template>

<script>
import UserListView from "../components/UserListView.vue";
import VupStatsBoard from "../components/VupStatsBoard.vue";

import userApi from "../api/user";
import statsApi from "../api/stats";
import recordsApi from "../api/records";

export default {
  name: "UserDetailView",

  components: { UserListView, VupStatsBoard },

  data: () => ({
    vup: null,
    loading: true,
  }),

  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (!this.$route.params.uid) return
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
          console.log(res);
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