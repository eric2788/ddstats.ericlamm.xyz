<template>
  <v-container class="pa-5">
    <div align="center" justify="center">
      <span align="center" class="text-h6">已记录的主播列表</span> <br />
      <span class="text-h7">(经搜索共: {{ total }}个)</span>
    </div>
    <v-row align="center" class="mt-10" justify="center">
      <v-col cols="12" md="8" lg="5">
        <v-text-field
          v-model.lazy.trim="search"
          label="搜索主播"
          variant="underlined"
          prepend-icon="mdi-account-search"
          :loading="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="5" lg="2">
        <!-- any event of v-select is not working at vue3, so I decided to use watch -->
        <v-select
          v-model="orderBy"
          :items="orderByList"
          :rules="[(v) => !!v || 'Item is required']"
          label="排序方式"
          @change="searchVup"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" md="3" lg="1">
        <v-switch
          color="indigo"
          v-model="desc"
          :label="desc ? '反序' : '顺序'"
          @change="searchVup"
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
        <template v-else-if="users?.length > 0">
          <template v-for="(vup, index) in users" :key="index">
            <user-list-view :vup="vup"></user-list-view>
            <v-divider />
          </template>
        </template>
        <template v-else>
          <v-row justify="center" align="center"> 没有记录 </v-row>
        </template>
      </v-col>
    </v-row>
    <div v-if="!loading && users?.length > 0" class="text-center pa-5">
      <v-btn rounded="0" variant="text" @click="toTop">
        <v-icon left>mdi-arrow-up</v-icon>
        返回頂部
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import api from "../api/user";
import UserListView from "../components/UserListView.vue";
import { convertUsers } from "../api/utils";

export default {
  name: "UserView",

  components: { UserListView },

  data: () => ({
    search: "",
    desc: true,
    loading: true,

    orderBy: "上次DD时间",

    orderMap: {
      总DD次数: "dd_count",
      上次监听时间: "last_listened_at",
      上次DD时间: "last_behaviour_at",
      初始监听时间: "first_listen_at",
      总金额打赏: "total_spent"
    },

    users: [],
    page: 1,
    maxPage: 1,
    total: 0,
  }),

  methods: {

    toTop(){
      window.scroll({top: 0, behavior: 'smooth'})
    },

    searchVup() {
      this.loading = true;
      return api
        .searchUser(
          this.search,
          this.page,
          this.orderMap[this.orderBy],
          this.desc
        )
        .then((users) => {
          this.users = convertUsers(users.list);
          this.maxPage = users.max_page;
          this.page = users.page;
          this.total = users.total;
        })
        .catch((err) => {
          console.error(err);
          this.$emit("error", { msg: "获取主播列表时错误: ", err });
        })
        .finally(() => (this.loading = false));
    },

    onUpdatePage(page) {
      this.page = page;
      this.searchVup();
    },

    onInputSearchBar() {
      const current = this.search;
      this.loading = true;
      setTimeout(() => {
        if (this.search != current) {
          return;
        }
        this.page = 1;
        this.searchVup()
      }, 1000);
    },
  },

  computed: {
    orderByList(){ 
      return Object.keys(this.orderMap)
    }
  },

  mounted() {
    this.searchVup();
  },

  watch: {
    orderBy() {
      this.page = 1;
      this.searchVup();
    },
    search(){
      this.page = 1;
      this.searchVup()
    }
  },
};
</script>