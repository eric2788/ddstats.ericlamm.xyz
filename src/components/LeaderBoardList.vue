<template>
  <template v-if="users">
    <v-list color="white" elevation="1" three-line height="400" class="scrollable">
      <v-list-subheader  v-if="subheader" :style="backgroundColor" :color="textColor">
        {{ subheader }}
      </v-list-subheader>
      <template v-if="users.length > 0">
        <template v-for="(vup, i) in users" :key="i">
          <v-list-item
            :height="i == 0 ? '100px' : '60px'"
            :prepend-avatar="vup.face.replace('http://','https://')"
            :title="vup.name"
            :subtitle="subtitle(vup)"
            :to="`/user/${vup.uid}`"
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
    color: {
      type: String,
      default: "white",
    },
    textColor: {
      type: String,
      default: "black",
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