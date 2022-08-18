<template>
  <a-button
    :disabled="disabled"
    :ghost="ghost"
    :html-type="htmlType"
    :icon="icon"
    :loading="loading"
    :shape="shape"
    :size="size"
    :type="type"
    :block="block"
    @click="click"
    :class="getClass"
  >
    <slot />
  </a-button>
</template>

<script>
import Vue from "vue";
import { BUTTON_TYPES } from "@/constants";
export default Vue.extend({
  props: {
    disabled: { type: Boolean, default: false },
    ghost: { type: Boolean, default: false },
    htmlType: { type: String, default: "button" },
    icon: { type: String, default: undefined },
    loading: { type: Boolean, default: false },
    shape: { type: String, default: undefined },
    size: { type: String, default: "default" },
    type: { type: String, default: "default" },
    block: { type: Boolean, default: false },
  },
  computed: {
    getClass() {
      return BUTTON_TYPES[this.type]?.className;
    },
  },
  methods: {
    click(event) {
      this.$emit("click", event);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.ant-btn-primary {
  background-color: $primary-color;
  border-color: $primary-color;
  width: 140px;
  padding-top: 6px;
  padding-bottom: 6px;
  border-radius: 8px;
  font-size: 1.8rem;
  font-weight: bold;
  height: unset;

  &:disabled {
    opacity: 0.5;
    background-color: $primary-color;
    border-color: $primary-color;
    color: $white-color;
  }
}
.ct-button-blue {
  background: $picton-blue-color;
  color: white;
  &:disabled {
    opacity: 0.5;

    &:hover {
      background: $picton-blue-color;
      color: white;
    }
  }
}
.ct-button-gray {
  background: $chinese-silver-color;
  color: white;

  &:hover {
    background: $chinese-silver-color;
    color: white;
  }
}
</style>
