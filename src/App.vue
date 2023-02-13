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

    <!--- extra content -->
    <v-slide-y-transition>
      <v-snackbar multi-line timeout="30000" v-model="announcement" light vertical bottom left transition="slide-y-reverse-transition">
      <v-card color="transparent" elevation="0" class="pa-0 ma-0">
       <v-card-header>
          意见征集
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" size="x-small" icon variant="text" @click="announcement = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
       </v-card-header>
        <v-card-title>你觉得是否该解放仅限虚拟主播和闪电主播的记录限制？</v-card-title>
        <v-card-text>
          目前基于隐私问题限制了非虚拟主播和闪电主播的记录限制。现正考虑是否应该解放限制让记录行为扩大到普通B站用户。<br>
          通过后，直播间监控将基于目前仅限虚拟主播及闪电主播作为记录，但行为记录则会概括全体B站用户，并且进行统计化排行及分析。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" color="red" @click="noReminder()">不再提醒</v-btn>
          <v-btn variant="text" color="green" href="https://github.com/eric2788/ddstats.ericlamm.xyz/discussions/3" target="_blank">参与投票</v-btn>
        </v-card-actions>
      </v-card>
    </v-snackbar>
    </v-slide-y-transition>
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
        icon: "mdi-account-clock",
        text: "高亮行为记录",
        href: "/records",
      },
      /*
      {
        icon: 'mdi-account-search',
        text: 'B站用戶搜索',
        href: '/watchers'
      },
      */
    ],
    drawer: false,
    snackbar: false,
    text: "",
    mobileChangeObservers: {},
    installEvent: null,
    announcement: false,
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

      let errMsg;

      if (err?.response) {
        errMsg =
          err?.response?.data?.msg ??
          err?.response?.data?.message ??
          err?.response?.statusText;
      } else {
        errMsg = err?.message ?? err?.toString();
      }
      const message = `${msg}${errMsg}`;
      this.showSnackbar(message);
    },

    noReminder() {
      this.announcement = false;
      window.localStorage.setItem('no-reminder', 'true')
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
    return { observers: this.mobileChangeObservers };
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


    if (window.localStorage.getItem('no-reminder') !== 'true') {
      setTimeout(() => this.announcement = true, 1000)
    } else {
      console.debug('skipped reminder')
    }

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