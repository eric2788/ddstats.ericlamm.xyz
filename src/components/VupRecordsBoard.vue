<template>
  <h3 class="mt-5 mb-3">最近的记录</h3>
  <v-row>
    <v-col cols="12" sm=6 md="4" v-for="(r, i) in records" :key="i">
      <template v-if="r.records">
        <h4 class="mb-3">{{ r.title }} (最近 {{ top }} 条)</h4>
        <record-board-list :records="r.records" />
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
    guest_records: null,
    top: 15,
  }),

  computed: {
    records() {
      return [
        {
          title: "DD 行为记录",
          records: this.dd_records
        },
        {
          title: "来客行为记录",
          records: this.guest_records
        },
        {
          title: "自我行为记录",
          records: this.self_records
        }
      ]
    }
  },

  methods: {},

  mounted() {
    const uid = this.vup.uid;
    const top = this.top
    Promise.all([api.getRecordsByType(uid, 'dd', top), api.getRecordsByType(uid, 'self', top), api.getRecordsByType(uid, 'guest', top)])
      .then((res) => {
        const [dd_records, self_records, guest_records] = res;
        this.dd_records = dd_records;
        this.self_records = self_records;
        this.guest_records = guest_records
      })
      .catch((err) => {
        console.error(err);
        this.$emit("error",{ msg: "获取记录讯息时错误: ", err});
      });
  },
};
</script>

<style>
</style>