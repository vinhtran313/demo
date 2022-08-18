<template>
  <router-link :to="category.to" class="footer-item">
    <a-icon :type="category.iconName" class="fs-24" />
    <div class="footer-item__text fs-12 text-center">
      {{ category.text }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: "DefaultLayoutFooterItem",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/common/variable.scss";
.footer-item {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 5px;
  padding: 5px 10px;
  color: $chinese-silver-color;
  flex: 1;
  height: 100%;

  &.router-link-exact-active {
    background: $argent-color;
    color: $primary-color;
  }
}
</style>
