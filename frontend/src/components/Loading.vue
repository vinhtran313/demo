<template>
  <div v-if="visible" class="loading-container">
    <a-spin />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      visible: false,
    };
  },
  created() {
    this.$eventBus.on("showLoading", this.showLoading);
    this.$eventBus.on("hideLoading", this.hideLoading);
  },
  destroyed() {
    this.$eventBus.on("showLoading", this.showLoading);
    this.$eventBus.on("hideLoading", this.hideLoading);
  },
  methods: {
    showLoading() {
      this.visible = true;
    },
    hideLoading() {
      this.visible = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.loading-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
