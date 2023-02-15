<template>
  <v-container class="pa-5">
    <div align="center" justify="center">
      <span align="center" class="text-h6">已记录的高亮行为列表</span> <br />
      <span class="text-h7">(经搜索共: {{ total }}个)</span>
    </div>
    <v-row align="center" class="mt-10 text-center" justify="center">
      <v-col cols="12" md="6" lg="5">
        <v-text-field
          v-model.lazy.trim="search"
          label="搜索关键词"
          variant="underlined"
          prepend-icon="mdi-account-search"
          :loading="loading"
          @update:modelValue="onInputSearchBar"
          :disabled="disabled"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-select
          v-model="command"
          :items="commands"
          :rules="[(v) => !!v || 'Item is required']"
          label="过滤行为"
          @change="searchRecords()"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-switch
          color="indigo"
          v-model="showSelf"
          label="显示自我行为"
          @change="searchRecords()"
        ></v-switch>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="maxPage"
        text-color="black"
        @update:modelValue="onUpdatePage"
      ></v-pagination>
    </div>
    <v-row class="pt-5">
      <v-col cols="12">
        <template v-if="loading">
          <v-row align="center" justify="center">
            <v-progress-circular indeterminate color="blue" />
          </v-row>
        </template>
        <template v-else-if="records?.length > 0">
          <template v-for="(record, index) in records" :key="index">
            <record-list-view :record="record"></record-list-view>
            <v-divider />
          </template>
        </template>
        <template v-else>
          <v-row justify="center" align="center"> 没有记录 </v-row>
        </template>
      </v-col>
    </v-row>
    <div v-if="!loading && records?.length > 0" class="text-center pa-5">
      <v-btn rounded="0" variant="text" @click="toTop">
        <v-icon left>mdi-arrow-up</v-icon>
        返回頂部
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import api from "../api/records";
import RecordListView from "../components/RecordListView.vue";
import { convertRecords, getTitles, getCommandByTitle } from "../api/utils";

export default {
  name: "RecordsView",

  components: {
    RecordListView,
  },

  data: () => ({
    search: "",
    loading: false,
    page: 1,
    maxPage: 1,
    total: 0,
    showSelf: false,

    records: [],
    command: '所有',

    searchingQueue: [],
    searching: false,
    disabled: false,
  }),

  methods: {

    toTop(){
      window.scroll({top: 0, behavior: 'smooth'})
    },

    onUpdatePage(page) {
      this.page = page;
      this.searchRecords();
    },

    searchRecords(search = this.search) {
      this.loading = true;
      console.debug(`searching: ${search}`)
      return api
        .getGlobalRecords(search, this.page, this.showSelf, getCommandByTitle(this.command))
        .then((records) => {
          this.records = convertRecords(records.list);
          this.maxPage = records.max_page;
          this.page = records.page;
          this.total = records.total;
        })
        .catch((err) => {
          console.error(err);
          this.$emit("error", { msg: "获取高亮记录列表时错误: ", err });
        })
        .finally(() => (this.loading = false));
    },

    onInputSearchBar() {
      const current = this.search;
      this.loading = true;
      setTimeout(() => {
        if (this.search != current) {
          return;
        }
        this.searchingQueue.push(this.search)
        this.pollSearchs().then(() => console.log(`searching completed`))
      }, 1000);
    },

    async pollSearchs(){
      if (this.searching) return
      this.searching = true
      this.page = 1;
      while (this.searchingQueue.length > 0){
        const search = this.searchingQueue.shift()
        await this.searchRecords(search)
      }
      this.searching = false
    }
  },

  computed: {
    commands(){
      return getTitles()
    }
  },

  mounted() {
    this.disabled = true
    this.searchRecords().finally(() => (this.disabled = false));
  },

  watch: {
    command() {
      this.page = 1;
      this.searchRecords();
    }
  },
};
</script>

<style>
</style>