<template>
  <div :class="getRibbonClass" @click="click"><slot /></div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    type: { type: String, default: "left" },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    getRibbonClass() {
      return `ribbon ribbon-${this.type} ${this.disabled ? "disabled" : ""}`;
    },
  },
  methods: {
    click(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.ribbon {
  $ribbon-height: 20px;
  $half-ribbon-height: $ribbon-height / 2;
  position: relative;
  text-align: center;
  font-size: 1rem;
  line-height: $ribbon-height;
  margin: 0px $half-ribbon-height;
  z-index: auto;
  cursor: default;
  display: inline-block;
  word-break: keep-all;
  background-color: $american-yellow-color;
  color: $white-color;
  padding: 0 8px;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:before,
  &:after {
    content: "";
    display: none;
    position: absolute;
    height: 0;
    width: 0;
    border-style: solid;
    border-width: 0;
    border-color: transparent $american-yellow-color;
  }
  &:before {
    left: -$half-ribbon-height;
    border-width: $half-ribbon-height $half-ribbon-height $half-ribbon-height 0;
  }
  &:after {
    right: -$half-ribbon-height;
    border-width: $half-ribbon-height 0 $half-ribbon-height $half-ribbon-height;
  }
  &.ribbon-left {
    padding-right: 7px;
    margin-right: 0;
    &:before {
      display: inline-block;
    }
  }
  &.ribbon-right {
    padding-left: 7px;
    margin-left: 0;
    &:after {
      display: inline-block;
    }
  }
}
</style>
