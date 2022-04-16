<template>
  <v-container class="pa-5">
    <div align="center" justify="center">
      <span align="center" class="text-h6">已记录的高亮行为列表</span> <br />
      <span class="text-h7">(经搜索共: {{ total }}个)</span>
    </div>
    <v-row align="center" class="mt-10 text-center" justify="center">
      <v-col cols="12" md="8" lg="5">
        <v-text-field
          v-model.lazy.trim="search"
          label="搜索关键词"
          variant="underlined"
          prepend-icon="mdi-account-search"
          :loading="loading"
          @input="onInputSearchBar"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" lg="2">
        <v-switch
          v-model="showSelf"
          label="显示自我行为"
          @change="searchRecords"
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
          <div class="text-center pa-5">
            <v-pagination
              v-model="page"
              :length="maxPage"
              text-color="black"
              @update:modelValue="onUpdatePage"
            ></v-pagination>
          </div>
        </template>
        <template v-else>
          <v-row justify="center" align="center"> 没有记录 </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../api/records";
import RecordListView from "../components/RecordListView.vue";

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
    showSelf: true,

    records: [],
  }),

  methods: {
    onUpdatePage(page) {
      this.page = page;
      this.searchRecords();
    },

    searchRecords() {
      this.loading = true;
      api
        .getGlobalRecords(this.search, this.page, this.showSelf)
        .then((records) => {
          this.records = records.list;
          this.maxPage = records.max_page;
          this.page = records.page;
          this.total = records.total;
        })
        .catch((err) => {
          console.error(err);
          this.$emit(
            "showError",
            "获取高亮记录列表时错误: " + err?.response?.data?.message ?? err
          );
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
        this.page = 1;
        this.searchRecords();
      }, 700);
    },
  },

  mounted() {
    this.searchRecords();
  },
};
</script>

<style>
</style>