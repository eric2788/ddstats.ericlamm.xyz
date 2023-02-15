<template>
  <v-app>
    <!-- v-app-bar app density="compact" v-if="isMobile" hide-on-scroll>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>高亮用户统计</v-app-bar-title>
    </v-app-bar -->
    <v-btn
      v-if="$vuetify.display.mdAndDown"
      @click="drawer = !drawer"
      icon="mdi-format-list-bulleted"
      color="surface"
      class="floating-action-btn"
      elevation="3"
    ></v-btn>
    <v-navigation-drawer
      app
      v-model="drawer"
      elevation="5"
      :rail="!$vuetify.display.mdAndDown"
      expand-on-hover
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

        <v-list-item
          v-if="installEvent"
          title="安装手机应用"
          prepend-icon="mdi-download"
          @click="installApp"
        >
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list class="mx-auto" >
          <v-list-group fluid>
            <template v-slot:activator="{ props }">
              <v-list-item
                prepend-icon="mdi-palette"
                v-bind="props"
                title="风格设定"
              ></v-list-item>
            </template>
            <v-list-item
              lines="three"
              :title="`切换${$vuetify.theme.current.dark ? '白天': '暗黑'}模式`"
              subtitle="手动切换到暗黑/白天模式。"
              value="style"
            >
              <template v-slot:prepend>
                <v-list-item-action start>
                  <theme-switcher />
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-list-item
              lines="three"
              title="风格跟随系统"
              subtitle="本网站将会随着系统时间自动切换白天与黑暗模式。"
              value="follow"
            >
              <template v-slot:prepend>
                <v-list-item-action start>
                  <v-checkbox></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list>
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
      <router-view @error="handleErr" @show-msg="(msg) => showSnackbar(msg)" />
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
import { getErrorMessage } from "./api/utils";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

export default {
  name: "App",

  components: {
    ThemeSwitcher,
  },

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
        icon: "mdi-account-clock",
        text: "高亮行为记录",
        href: "/records",
      },
      {
        icon: "mdi-account-search",
        text: "B站用戶搜索",
        href: "/watchers",
      },
    ],
    drawer: false,
    snackbar: false,
    text: "",
    mobileChangeObservers: {},
    installEvent: null,
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

    handleErr({ msg, err }) {
      console.log(err.response);

      let errMsg = getErrorMessage(err);
      const message = `${msg}${errMsg}`;
      this.showSnackbar(message);
    },

    installApp() {
      if (this.installEvent) {
        this.installEvent.prompt();
        this.installEvent.userChoice.then(({ outcome }) => {
          if (outcome === "accepted") {
            this.showSnackbar("已成功安装 App");
          }
        });
      } else {
        this.showSnackbar("您的浏览器不支持 App 安装");
      }
    },
  },

  provide() {
    return {
      observers: this.mobileChangeObservers,
      theme: () => (this.$vuetify.theme.current.dark ? "dark" : "light"),
    };
  },

  watch: {
    isMobile() {
      this.drawer = true;
      Object.values(this.mobileChangeObservers).forEach((cb) =>
        cb(this.$vuetify.display.smAndDown)
      );
    },
  },

  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.installEvent = e;
    });

    const show = this.showSnackbar;
    window.addEventListener("pwa:updated", () => {
      show("有可用的新内容，请刷新页面");
    });

    if (!this.isMobile) {
      this.drawer = true;
    }
  },
};
</script>
<style>
.scrollable::-webkit-scrollbar {
  width: 5px;
}
.scrollable::-webkit-scrollbar-thumb {
  background-color: rgb(var(--v-theme-border));
}
.scrollable::-webkit-scrollbar-track {
  background-color: #fff;
}

.scrollable {
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--v-theme-border)) #fff;
}
.el-border {
  border: 1px solid rgb(var(--v-theme-border));
}
.floating-action-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 700;
  animation: scale-in 0.3s ease-out;
}

@keyframes scale-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>