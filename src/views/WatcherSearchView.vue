<template>
  <v-container class="pa-5">
    <v-sheet class="pa-10" color="transparent" height="200"></v-sheet>
    <div align="center" justify="center">
      <span align="center" class="text-h6">搜索B站用戶的高亮统计</span> <br />
      <!-- span class="text-h7">(已收录行为数量共: {{ total }}个)</span -->
    </div>
    <v-form ref="form" v-model="form" @submit.prevent="onSubmit">
    <v-row align="center" class="mt-10 text-center" justify="center">
      <v-col cols="11" md="6" lg="4">
        <v-text-field
          ref="input"
          density="compact"
          single-line
          v-model="search"
          placeholder="输入用户UID后按下Enter"
          :rules="[v => !!v || 'UID不能为空', v => errorMessage || true]"
          clearable
          variant="outlined"
          type="number"
          prepend-inner-icon="mdi-magnify"
          :loading="loading"
        ></v-text-field>
      </v-col>
    </v-row>
  
    </v-form>
  </v-container>
</template>
<script>
import api from "../api/watcher";

export default {
  name: "WatcherSearchView",
  data: () => ({
    total: 0,
    search: "",
    loading: false,
    form: false,
    errorMessage: ''
  }),

  methods: {
    onSubmit(){
        if (!this.$refs.form.validate() || !this.form) return
        console.log('searching....')
        this.$refs.input.blur()
        this.loading = true
        setTimeout(() => {
            this.loading = false
            this.showError('用户不存在')
        }, 2000)
    },

    showError(error){
        this.errorMessage = error
        this.$refs.input.validate()
        setTimeout(() => this.errorMessage = '', 1000)
    }
  },

  mounted() {
    api.getWatcherStats('count').then(console.log)
  }
};
</script>