<template>
  <template v-if="!loading && watchers">
    <v-list color="white" elevation="1" three-line height="400" class="scrollable">
      <v-list-subheader  v-if="subheader" :style="backgroundColor" :color="textColor">
        {{ subheader }}
      </v-list-subheader>
      <template v-if="watchers?.length">
        <template v-for="(watcher, i) in watchers" :key="i">
          <v-list-item
            :height="i == 0 ? '100px' : '60px'"
            :title="watcher.u_name"
            :subtitle="subtitle(watcher)"
            :to="`/watcher/${watcher.uid}`"
            :append-icon="i == 0 ? 'mdi-crown' : `mdi-numeric-${i + 1}`"
          >
          </v-list-item>
          <v-divider />
        </template>
      </template>
      <template v-else>
        <v-list-item class="text-center" title="没有记录"></v-list-item>
      </template>
    </v-list>
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
    textColor: {
      type: String,
      default: "black",
    },
    watchers: {
      type: Array,
      default: undefined,
    },
    subtitle: {
      type: Function,
      default: (props) => `共 ${props.count} 次`,
    },
    subheader: String,
    bgColor: {
      type: String,
      default: "",
    },
  },

  computed: {
    backgroundColor() {
      return this.bgColor
        ? `background-color: ${this.bgColor}; font-weight: bold`
        : "";
    },
  },
};
</script>