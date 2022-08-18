<template>
  <div
    class="min-height-100 d-flex flex-column align-items-center justify-content-center"
  >
    <TimeList v-if="!isCounting" :submitTime="onSubmitTime" />
    <!-- <Countdown v-else :item="item" :showTimeList="showTimeList" /> -->
  </div>
</template>

<script>
import TimeList from "./components/TimeList.vue";
import { postDataToNativeApp } from "../../utils/helper";
// import Countdown from "./components/Countdown.vue";

export default {
  name: "PhysicalProgram",
  components: {
    TimeList,
    // Countdown,
  },
  created() {},
  data() {
    return {
      isCounting: false,
      item: null,
    };
  },
  methods: {
    onSubmitTime(minutes) {
      this.item = minutes;
      // this.isCounting = true;
      postDataToNativeApp("viewPhysical", { minutes: minutes.time, bpm: 110 });
    },
    showTimeList() {
      this.isCounting = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
/deep/ .user-info-form {
  .ant-form-item {
    margin-bottom: 12px;
  }
  .ant-form-item-label label {
    font-size: 1.2rem;
    margin-left: 10px;
  }
}
.btn-user {
  width: 140px;
}
</style>
