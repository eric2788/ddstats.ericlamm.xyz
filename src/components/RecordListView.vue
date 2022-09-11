<template>
  <v-row class="pa-5 d-flex wrap">
    <v-col cols="4" sm=2 md="2" lg="2">
      <router-link :to="`/user/${record.uid}`" style="color: inherit">
        <v-avatar
          class="float-right"
          rounded="0"
          size="86"
        >
          <v-img
            :src="record.vup_face"
            alt="Avatar"
            lazy-src="/img/dd.png"
          >
        </v-avatar>
      </router-link>
    </v-col>
    <v-col cols="8" sm=10 md="4" lg="4">
      <v-row class="pt-2">
        <span class="text-h7 mr-2">{{ record.display }}</span>
      </v-row>
      <v-row class="pt-3 text-caption">
        {{ record.created_at }}
      </v-row>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="2">
      <v-row class="pt-2" justify="center" justify-md="start">
        <v-avatar
          v-if="record.image.Valid"
          :image="record.image.String"
          rounded="0"
          size="86"
        />
        <v-sheet
          v-else-if="!$vuetify.display.mobile"
          height="50"
          color="transparent"
        >
        </v-sheet>
      </v-row>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="2">
      <v-row class="text-center" justify="center">
        <v-col cols="12" sm=6 md="12">
          <v-btn
            rounded="0"
            variant="text"
            block
            @click="$router.push(`/user/${record.target_uid}`)"
          >
            <v-icon left>mdi-account-arrow-left</v-icon>
            查看直播间用户
          </v-btn>
        </v-col>
        <v-col cols="12" sm=6 md="12">
          <v-btn
            rounded="0"
            variant="text"
            block
            @click="$router.push(`/user/${record.uid}`)"
          >
            <v-icon left>mdi-account-arrow-right</v-icon>
            查看高亮用户
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RecordListView",
  props: {
    record: Object,
  },
};
</script>

<style>
</style>