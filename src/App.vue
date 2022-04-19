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
          prepend-avatar="/img/dd.png"
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
            prepend-avatar="/img/author.jpg"
            title="关于本网站"
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
        text: "主播列表",
        href: "/users",
      },
      {
        icon: 'mdi-account-clock',
        text: '高亮行为记录',
        href: '/records'
      }
    ],
    drawer: true,
    snackbar: false,
    text: "",

    mobileChangeObservers: {},
  }),

  computed: {
    isMobile() {
      return this.$vuetify.display.smAndDown;
    },
  },

  methods: {
    showSnackbar(text) {
      this.snackbar = true;
      this.text = text;
    },
  },

  provide() {
    return { observers: this.mobileChangeObservers };
  },

  watch: {
    isMobile() {
      this.drawer = true;
      console.log("mobile: " + this.$vuetify.display.smAndDown);
      Object.values(this.mobileChangeObservers).forEach((cb) =>
        cb(this.$vuetify.display.smAndDown)
      );
    },
  },

  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      e.prompt();
    });
  },
};
</script>
<style>
.scrollable::-webkit-scrollbar {
  width: 5px;
}
.scrollable::-webkit-scrollbar-thumb {
  background-color: #e9e9e9;
}
.scrollable::-webkit-scrollbar-track {
  background-color: #fff;
}

.scrollable {
  scrollbar-width: thin;
  scrollbar-color: #e9e9e9 #fff;
}
.el-border {
  border: 1px solid #e9e9e9;
}
</style>