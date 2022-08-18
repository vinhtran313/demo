<template>
  <div />
</template>

<script>
export default {
  created() {
    this.$eventBus.emit("showLoading");
    document.addEventListener("nativeUserinfoGPS", () => {
      this.$router.go(-1);
    });
    document.addEventListener("nativeUserinfo", () => {
      this.$router.go(-1);
    });
  },
  beforeDestroy() {
    this.$eventBus.emit("hideLoading");
  },
};
</script>
