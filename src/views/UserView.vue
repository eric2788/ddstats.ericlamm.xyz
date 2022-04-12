<template>
  <v-container class="pa-5">
    <h1>虚拟主播列表</h1>
    <v-row align="center" class="pt-10" justify="center">
      <v-col cols="12" md="5">
        <v-text-field
          v-model="search"
          label="搜索虚拟主播"
          variant="underlined"
          prepend-icon="mdi-account-search"
          @keypress.enter="searchVup"
          :loading="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-select
          v-model="orderBy"
          :items="orderByList"
          :rules="[(v) => !!v || 'Item is required']"
          label="排序方式"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" md="1">
        <v-switch v-model="desc" :label="desc ? '反序' : '顺序'"></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserView",

  data: () => ({
    search: "",
    desc: true,
    loading: false,

    orderBy: 'last_listened_at',
    test: [
        ['1', 'a'],
        ['2', 'b'],
        ['3', 'c']
    ],
    orderByList: [
      {
        "text": "总DD次数",
        "value": "dd_count",
      },
      {
        "text": "上次监听时间",
        "value": "last_listened_at",
      },
      {
        "text": "上次DD时间",
        "value": "last_behaviour_at",
      },
    ],
  }),

  methods: {
    searchVup() {
      alert("Searching " + this.search);
    },
  },
};
</script>