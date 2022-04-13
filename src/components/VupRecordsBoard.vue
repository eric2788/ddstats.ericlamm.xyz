<template>
  <h3 class="mt-5 mb-3">最近的记录</h3>
  <v-row>
    <v-col cols="12" md="6">
      <template v-if="dd_records">
        <h4 class="mb-3">别的直播间的记录 (最近 {{ top }} 条)</h4>
        <record-board-list :records="dd_records" />
      </template>
      <template v-else>
        <div align="center" justify="center">
          <v-progress-circular indeterminate color="blue" />
        </div>
      </template>
    </v-col>
    <v-col cols="12" md="6">
      <template v-if="dd_records">
        <h4 class="mb-3">自己直播间的记录 (最近 {{ top }}条)</h4>
        <record-board-list :records="self_records" />
      </template>
      <template v-else>
        <div align="center" justify="center">
          <v-progress-circular indeterminate color="blue" />
        </div>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import api from "../api/records";
import RecordBoardList from '../components/RecordBoardList.vue'

export default {
  name: "VupRecordsBoard",

  props: {
    vup: Object,
  },

  components: {
      RecordBoardList
  },

  data: () => ({
    dd_records: null,
    self_records: null,
    top: 7,
  }),

  methods: {},

  mounted() {
    const uid = this.vup.uid;
    Promise.all([api.getDDRecords(uid, this.top), api.getSelfRecords(uid, this.top)])
      .then((res) => {
        const [dd_records, self_records] = res;
        this.dd_records = dd_records;
        this.self_records = self_records;
      })
      .catch((err) => {
        console.error(err);
        this.$emit(
          "showError",
          "获取记录讯息时错误: " + err?.response?.data?.message ??
            err?.response ??
            err
        );
      });
  },
};
</script>

<style>
</style>