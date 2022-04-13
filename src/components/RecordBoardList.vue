<template>
  <v-list theme="light" class="el-border" three-line min-height="400">
    <template v-if="records && records.length > 0">
      <template v-for="(item, index) in records" :key="index">
        <v-list-item
          :title="new Date(item.created_at).toLocaleString()"
          :subtitle="item.display"
          :append-avatar="item.image?.String?.replace('http://','https://') ?? ''"
        ></v-list-item>
        <v-divider />
      </template>
    </template>
    <template v-else>
        <v-list-item align=center justify=center title="没有记录" />
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    records: Array,
  },
};
</script>

<style>
</style>