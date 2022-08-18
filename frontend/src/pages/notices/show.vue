<template>
  <div class="m-20-px">
    <div class="">
      {{ notice.title }}
    </div>
    <div class="text-right mt-30-px fs-14">
      {{ notice.createdAt | formatDateMonthHourMinute }}
    </div>
    <div class="mt-15-px">
      {{ notice.description }}
    </div>
  </div>
</template>

<script>
import { getNotice, markNoticeRead } from "@/apis/notices";
export default {
  name: "DetailNotice",
  components: {},
  props: {
    id: {
      type: Number,
    },
  },
  data() {
    return {
      notice: {},
    };
  },
  created() {
    this.fetchNotice();
  },
  mounted() {
    this.updateReadStatus();
  },
  methods: {
    async fetchNotice() {
      try {
        this.$eventBus.emit("showLoading");
        const res = await getNotice(this.id);
        this.notice = res.data.notice;
        console.log(res);
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    async updateReadStatus() {
      try {
        this.$eventBus.emit("showLoading");
        const res = await markNoticeRead(this.id);
        console.log(res);
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
