<template>
  <header class="header-wrapper fw-7">
    <div class="header-content">
      <Button type="blue" @click="$router.go(-1)">戻る</Button>
      <div class="header-title">{{ helloText }}</div>
      <router-link :to="{ name: 'admin.login' }" class="header-notification">
        ログアウト
      </router-link>
    </div>
  </header>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  name: "AdminLayoutHeader",
  components: {
    Button,
  },
  data() {
    return {
      helloText: "",
      intervalFunc: null,
    };
  },
  mounted() {
    this.checkTime();
    // Run per a minute
    this.intervalFunc = setInterval(this.checkTime, 60000);
  },
  beforeDestroy() {
    clearInterval(this.intervalFunc);
  },
  methods: {
    checkTime() {
      const d = new Date();
      const hours = d.getHours();
      if (hours >= 4 && hours < 10) {
        this.helloText = "おはようごさいます";
      } else if (hours >= 10 && hours < 18) {
        this.helloText = "こんにちは";
      } else {
        this.helloText = "こんばんは";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../../assets/styles/common/variable.scss";
.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 2;

  .header-content {
    background: $bg-title-primary-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 10px;
    color: $primary-color;
    .header-notification {
      color: $picton-blue-color;
      text-decoration: underline;
    }
  }
}
</style>
