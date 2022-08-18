<template>
  <div class="ct-breadcrumb">
    <span class="fs-24" @click="backPrevious">
      <IconImage :src="backIcon" />
    </span>
    <div class="fw-7">
      {{ $route.meta.title }}
    </div>
    <router-link
      v-if="$route.meta.updateRouterName"
      :to="{ name: $route.meta.updateRouterName }"
    >
      <IconImage :src="inputBIcon" :classWrapper="'icon-primary-color fs-24'" />
    </router-link>
    <div v-else-if="$route.meta.callbackFunc" @click="$route.meta.callbackFunc">
      <IconImage :src="inputBIcon" :classWrapper="'icon-primary-color fs-24'" />
    </div>
    <div v-else />
  </div>
</template>

<script>
import BackIcon from "@/assets/icons/another/backB_256.svg";
import InputBIcon from "@/assets/icons/another/inputB_256.svg";
export default {
  name: "Breadcrumb",
  created() {
    this.backIcon = BackIcon;
    this.inputBIcon = InputBIcon;
  },
  data() {
    return {
      categories: [
        {
          text: "ホーム画面",
          iconName: "heart",
          to: "/home",
        },
        {
          text: "地話をかける",
          iconName: "phone",
          to: "/a",
        },
        {
          text: "問い合わせ",
          iconName: "mail",
          to: "/b",
        },
      ],
    };
  },
  methods: {
    backPrevious() {
      const routeName = this.$route.meta.back;
      if (routeName) {
        this.$router.push({ name: routeName });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/common/variable.scss";
.ct-breadcrumb {
  position: sticky;
  top: 0;
  z-index: 2;
  background: $bg-title-primary-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 10px;
  color: $primary-color;
  .icon-primary-color {
    color: $primary-color;
  }
}
</style>
