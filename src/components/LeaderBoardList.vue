<template>
  <template v-if="users">
    <v-list color="white" elevation="1" three-line>
      <v-list-subheader :style="backgroundColor" :color="textColor">
        {{ subheader }}
      </v-list-subheader>
      <template v-for="(vup, i) in users" :key="i">
        <v-list-item
         
          :height="i == 0 ? '100px' : 'auto'"
          :prepend-avatar="vup.face"
          :title="vup.name"
          :subtitle="subtitle.replace('%count%', vup.count)"
        >
        <v-list-item-icon v-if="i == 0">
            <v-icon large >mdi-crown</v-icon>
        </v-list-item-icon>
        </v-list-item>
        <v-divider />
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
      type: String,
      default: "共 %count% 次",
    },
    subheader: String,
    bgColor: {
      type: String,
      default: "",
    },
  },

  computed: {
    backgroundColor() {
      return this.bgColor ? `background-color: ${this.bgColor}; font-weight: bold` : "";
    },
  },
};
</script>