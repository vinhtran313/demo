<template>
  <footer class="footer-wrapper">
    <FooterItem
      v-for="(category, index) in categories"
      :category="category"
      :key="index"
    />
  </footer>
</template>

<script>
import FooterItem from "./FooterItem.vue";
export default {
  name: "DefaultLayoutFooter",
  components: {
    FooterItem,
  },
  data() {
    return {
      categories: [
        {
          text: "ホーム画面",
          iconName: "heart",
          to: "/",
        },
        {
          text: "地話をかける",
          iconName: "phone",
          to: "/a",
        },
        {
          text: "問い合わせ",
          iconName: "mail",
          to: "/inquiries",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/common/variable.scss";
.footer-wrapper {
  background: $primary-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  height: 60px;
}
</style>
