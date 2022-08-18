<template>
  <div :class="getWrapperClass" @click="handleClick">
    <div class="select-title flex-1 text-left fs-20">
      {{ title }}
    </div>
    <div class="arrow-icon flex-shink-0">
      <div class="check-icon">
        <a-icon v-if="selected" type="check" class="fs-24" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: "",
    },
    selected: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {},
    },
    handleSelect: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    getWrapperClass() {
      return `card-wrapper w-100 d-flex align-items-center background-white mb-5-px ${
        this.selected ? "selected" : ""
      }`;
    },
  },
  methods: {
    handleClick() {
      this.handleSelect(this.item);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";

.card-wrapper {
  background: $bright-gray-color;
  cursor: pointer;

  .select-title {
    padding: 20px 0 20px 30px;
  }

  .check-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    margin-right: 10px;
    background: $white-color;
    border: 1px solid $argent-color;
  }

  &.selected {
    background: $picton-blue-color;
    .check-icon {
      background: $american-yellow-color;
      color: $white-color;
    }

    .select-title {
      color: white;
    }
  }
}
</style>
