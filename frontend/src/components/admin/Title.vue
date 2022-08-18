<template>
  <h2 class="admin-title fw-7">
    <template v-if="message">{{ message }}</template>
    <slot v-else />
  </h2>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    message: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.admin-title {
  padding: 5px 10px;
  border-bottom: 5px solid $picton-blue-color;
}
</style>
