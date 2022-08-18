<template>
  <div class="default-layout">
    <Header />
    <div class="content-wrapper">
      <router-view />
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
// import Footer from "./components/Footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    Header,
    // Footer,
  },
};
</script>

<style scoped>
.content-wrapper {
}
</style>
