<template>
  <div class="detail-layout">
    <Breadcrumb />
    <div class="content-wrapper">
      <router-view />
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
// import Footer from "./components/Footer.vue";
import Breadcrumb from "./components/Breadcrumb.vue";

export default {
  name: "DefaultLayout",
  components: {
    // Footer,
    Breadcrumb,
  },
};
</script>

<style lang="scss" scoped>
.detail-layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  .content-wrapper {
    flex: 1;
    overflow: auto;
  }
}
</style>
