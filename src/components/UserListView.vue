<template>
  <v-row class="pa-5 d-flex wrap">
    <v-col cols="4" md="3" lg="2">
      <slot name="avatar" :vup=vup>
        <router-link
          :to="link.replace('%uid%', vup.uid)"
          style="color: inherit"
        >
          <v-avatar
            class="float-right"
            :image="vup.face"
            rounded="0"
            size="86"
          />
        </router-link>
      </slot>
    </v-col>
    <v-col cols="8" md="9" lg="10">
      <v-row class="pt-2">
        <slot name="name" :vup=vup>
          <router-link :to="`/user/${vup.uid}`" style="color: inherit">
            <span class="text-h6 mr-2">{{ vup.name }}</span>
          </router-link>
        </slot>
        <v-chip rounded="0" color="green" v-if="vup.listening">直播间监听中</v-chip>
      </v-row>
      <v-row class="pt-1">
        <v-col cols="12" sm="6" md="6" lg="3">
          <v-row class="pt-5">
            <span class="text-caption">上次直播间监听时间</span>
          </v-row>
          <v-row class="pt-4">
            {{ vup.last_listened_at }}
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
          <v-row class="pt-5">
            <span class="text-caption">上次DD时间</span>
          </v-row>
          <v-row class="pt-4">
            {{ vup.last_behaviour_at }}
          </v-row>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="1">
          <v-row class="pt-5">
            <span class="text-caption">总DD次数</span>
          </v-row>
          <v-row class="pt-4">
            {{ vup.dd_count }}
          </v-row>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="1">
          <v-row class="pt-5">
            <span class="text-caption">总DD花费</span>
          </v-row>
          <v-row class="pt-4">
            {{ vup.total_spent }} 元
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
          <v-row class="pt-5">
            <span class="text-caption">初始监听时间</span>
          </v-row>
          <v-row class="pt-4">
            {{ vup.first_listen_at }}
          </v-row>
        </v-col>
      </v-row>
      <slot name="under"></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "UserListView",
  props: {
    vup: Object,
    link: {
      type: String,
      default: "/user/%uid%",
    },
  },
};
</script>

<style>
</style>