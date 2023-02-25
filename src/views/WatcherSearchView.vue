<template>
  <v-container class="pa-5" fluid style="height: 100%">
    <v-row
      align="center"
      justify="center"
      align-content="center"
      style="height: 100%"
    >
      <v-col>
        <div align="center" justify="center">
          <span align="center" class="text-h6">搜索B站用戶的高亮统计</span>
          <br />
          <span v-if="total > 0" class="text-h7"
            >(已收录行为数量共: {{ total }} 則)</span
          >
        </div>
        <v-form ref="form" v-model="form" @submit.prevent="onSubmit">
          <v-row align="center" class="mt-3 text-center" justify="center">
            <v-col cols="11" md="6" lg="4">
              <v-text-field
                ref="input"
                density="compact"
                single-line
                v-model="search"
                placeholder="输入用户UID后按下Enter"
                :rules="[(v) => validateUID(v), (v) => errorMessage || true]"
                clearable
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                :loading="loading"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-col cols="12" class="text-center" justify="center">
            <v-btn
              to="/watchers/stats"
              size="small"
              variant="outlined"
              prepend-icon="mdi-view-dashboard"
              >查看宏观统计</v-btn
            >
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { getErrorMessage } from "../api/utils";
import watcher from "../api/watcher";

export default {
  name: "WatcherSearchView",
  data: () => ({
    total: 0,
    search: "",
    loading: false,
    form: false,
    errorMessage: "",
  }),

  methods: {
    onSubmit() {
      if (!this.$refs.form.validate() || !this.form) return;
      this.$refs.input.blur();
      this.loading = true;
      const uid = this.search;
      this.$router
        .push(`/watcher/${uid}`)
        .then((r) => {
          if (r) {
            console.debug(r);
            this.showError(r.message);
          }
        })
        .catch((err) => {
          console.warn(err);
          this.showError(getErrorMessage(err));
          if (err.response?.status === 404) {
            return; // no need to send snackbar
          }
          this.$emit("error", { msg: "加载用户资讯时错误: ", err });
        })
        .finally(() => (this.loading = false));
    },

    showError(error) {
      this.errorMessage = error;
      this.$refs.input?.validate();
      setTimeout(() => (this.errorMessage = ""), 1000);
    },

    validateUID(v) {
      if (!v) {
        return "UID不能为空";
      }
      if (isNaN(v)) {
        return "UID必须是数字";
      }
      return true;
    },
  },

  mounted() {
    watcher
      .getGlobalStats("count")
      .then((r) => {
        this.total = r;
      })
      .catch((err) => {
        console.warn(err);
        this.$emit("error", { msg: "加载用户资讯时错误: ", err });
      });
  },
};
</script>