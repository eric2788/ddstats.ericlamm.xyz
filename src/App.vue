<template>
  <v-app>
    <!--v-app-bar app color="primary" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>高亮用户统计</v-app-bar-title>
    </v-app-bar-->
    <v-navigation-drawer
      app
      v-model="drawer"
      elevation="5"
      rail
      expand-on-hover
      permanent
    >
      <v-list>
        <v-list-item
          prepend-avatar="../img/dd.png"
          title="高亮用户统计"
          subtitle="ddstats.ericlamm.xyz"
        ></v-list-item>
      </v-list>
      <v-divider color="#9e9e9e"></v-divider>
      <v-list density="compact">
        <template v-for="(item, i) in menus" :key="i">
          <v-list-item
            :title="item.text"
            :to="item.href"
            :prepend-icon="item.icon"
          />
        </template>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item
            to="/about"
            prepend-avatar="https://avatars.githubusercontent.com/u/6276840?v=4"
            title="关于作者"
            subtitle="Eric Lam"
          ></v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view @show-error="(msg) => showSnackbar(msg)" />
    </v-main>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          max-width="100%"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    menus: [
      {
        icon: "mdi-view-dashboard",
        text: "宏观",
        href: "/",
      },
      {
        icon: "mdi-account-multiple",
        text: "虛擬主播列表",
        href: "/users",
      },
    ],
    drawer: true,
    snackbar: false,
    text: ''
  }),

  computed: {
    isMobile() {
      return this.$vuetify.display.mobile;
    },
  },

  methods: {
    showSnackbar(text) {
      this.snackbar = true;
      this.text = text;
    },
  },

  watch: {
    isMobile() {
      this.drawer = true;
    },
  },
};
</script>
