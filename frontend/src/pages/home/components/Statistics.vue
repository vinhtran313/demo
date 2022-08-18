<template>
  <div
    class="flex-1 d-flex flex-column align-items-center justify-content-center"
  >
    <div class="fs-28 fw-7 text-picton-blue">{{ data }}</div>
    <div class="fs-10 fw-3">{{ unit }}</div>
    <div class="fw-7 fs-14-sp">{{ title }}</div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    unit: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    data: {
      type: Number,
      default: 0,
    },
  },
});
</script>
<style lang="scss" scoped>
@media (max-width: 320px) {
  .fs-14-sp {
    font-size: 14px;
  }
}
</style>
