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
            size="86"
            rounded="0"
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
        <v-chip rounded="0" color="green" v-if="vup.listening">监听中</v-chip>
      </v-row>
      <v-row class="pt-5">
        <v-col cols="12" sm="6" md="6" lg="3">
          <v-row>
            <span class="text-caption">上次监听时间</span>
          </v-row>
          <v-row class="pt-4">
            {{
              vup.listening
                ? "现在"
                : new Date(vup.last_listened_at).toLocaleString()
            }}
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
          <v-row>
            <span class="text-caption">上次DD时间</span>
          </v-row>
          <v-row class="pt-4">
            {{
              vup.last_behaviour_at
                ? new Date(vup.last_behaviour_at).toLocaleString()
                : "无"
            }}
          </v-row>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-row>
            <span class="text-caption">总DD次数</span>
          </v-row>
          <v-row class="pt-4">
            {{ vup.dd_count }}
          </v-row>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-row>
            <span class="text-caption">初始监听时间</span>
          </v-row>
          <v-row class="pt-4">
            {{ new Date(vup.first_listen_at).toLocaleString() }}
          </v-row>
        </v-col>
      </v-row>
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