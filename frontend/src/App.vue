<template>
  <div class="page-wrapper">
    <router-view />
    <SuccessModal />
    <Loading />
  </div>
</template>

<script>
import SuccessModal from "@/components/SuccessModal.vue";
import Loading from "@/components/Loading.vue";
export default {
  name: "App",
  components: {
    SuccessModal,
    Loading,
  },
  mounted() {
    // Fix error display on mobile
    window.addEventListener("resize", this.documentHeight);
    this.documentHeight();
  },
  methods: {
    documentHeight() {
      // Get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Set --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },
};
</script>

<style lang="scss">
@import "./assets/styles/application.scss";
</style>
