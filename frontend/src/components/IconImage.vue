<template>
  <span class="icon-image" :class="classWrapper">
    <img :src="src || ''" alt="" :width="width" :height="height" />
    <slot />
  </span>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    src: { type: String, default: "" },
    width: { type: [String, Number], default: "36" },
    height: { type: [String, Number], default: "36" },
    classWrapper: { type: [String], default: "" },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.icon-image {
  position: relative;
}
</style>
