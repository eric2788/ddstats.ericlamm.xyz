<template>
  <template v-if="!loading && users">
    <div>
      <v-list
        color="white"
        elevation="0"
        :lines="lines()"
        height="400"
        class="scrollable"
      >
        <template v-if="users?.length">
          <template v-for="(vup, i) in topUsers" :key="i">
            <v-list-item
              :height="i == 0 ? '100px' : '60px'"
              :prepend-avatar="vup.face.replace('http://', 'https://')"
              :title="vup.name"
              :subtitle="subtitle(vup)"
              :to="`/user/${vup.uid}`"
              :append-icon="i == 0 ? 'mdi-crown' : `mdi-numeric-${i + 1}`"
            >
            </v-list-item>
            <v-divider />
          </template>
          <v-btn
            variant="text"
            block
            v-if="users.length > 10"
            @click="dialog = true"
            >查看更多</v-btn
          >
        </template>
        <template v-else>
          <v-list-item class="text-center" title="没有记录"></v-list-item>
        </template>
      </v-list>
      <v-dialog v-model="dialog" width="800" class="overflow-hidden">
        <v-card>
          <v-card-text>
            <v-list class="scrollable" max-height="800">
              <v-list-subheader v-if="subheader">
                {{ subheader }}
              </v-list-subheader>
              <recycle-scroller
                :items="users"
                :item-size="60"
                key-field="uid"
                v-slot="{ item: vup, index: i }"
              >
                <v-lazy
                  :min-height="20"
                  :options="{ threshold: 0.5 }"
                  transition="fade-transition"
                >
                  <v-list-item
                    class="user"
                    height="60px"
                    :prepend-avatar="vup.face.replace('http://', 'https://')"
                    :title="i + 1 + '. ' + vup.name"
                    :subtitle="subtitle(vup)"
                    :to="`/user/${vup.uid}`"
                  >
                  </v-list-item>
                </v-lazy>
              </recycle-scroller>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <h5>{{ subheader }}</h5>
            <v-spacer></v-spacer>
            <v-btn color="gray-darken-1" variant="text" @click="dialog = false">
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template v-else>
    <loading-grid :color="color"></loading-grid>
  </template>
</template>

<script>
import LoadingGrid from "../components/LoadingGrid.vue";

export default {
  name: "LeaderBoardList",

  components: { LoadingGrid },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "white",
    },
    users: {
      type: Array,
      default: undefined,
    },
    subtitle: {
      type: Function,
      default: (props) => `共 ${props.count} 次`,
    },
    subheader: String,
  },

  data: () => ({
    dialog: false,
  }),

  inject: ["lines"],

  computed: {
    backgroundColor() {
      return this.bgColor
        ? `background-color: ${this.bgColor}; font-weight: bold`
        : "";
    },
    topUsers() {
      return this.users.slice(0, 10);
    },
  },
};
</script>
<style scoped>
.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>