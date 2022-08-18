<template>
  <a-input
    :id="id"
    :value="value"
    :placeholder="placeholder"
    :allow-clear="allowClear"
    :disabled="disabled"
    :size="size"
    :max-length="maxLength"
    :type="type"
    :class="classWrapper"
    @change="handleChange"
    @pressEnter="pressEnter"
  />
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    value: { type: [String, Number], default: undefined },
    placeholder: { type: String, default: undefined },
    allowClear: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    maxLength: { type: Number, default: undefined },
    pressEnter: { type: Function, default: () => {} },
    size: { type: String, default: "default" },
    type: { type: String, default: "text" },
    id: { type: String, default: undefined },
    classWrapper: { type: String, default: "" },
  },
  methods: {
    handleChange(event) {
      this.$emit("change", event?.target?.value);
      // Pass value for v-model
      this.$emit("input", event?.target?.value);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.ant-input {
  border-radius: 0;
  font-size: 1.6rem;
  border: 2px solid $argent-color;
}
</style>
