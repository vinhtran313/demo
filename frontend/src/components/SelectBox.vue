<template>
  <a-select
    label-in-value
    :value="getValue"
    :placeholder="placeholder"
    :size="size"
    :mode="mode"
    :disabled="disabled"
    @change="handleChange"
  >
    <a-select-option
      v-for="option in options"
      :key="option[keyName || 'key']"
      :value="option[keyName || 'key']"
    >
      {{ preText }} {{ option[labelName || "label"] }}
    </a-select-option>
  </a-select>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    options: { type: Array, default: () => [] },
    value: { type: [String, Number], default: undefined },
    defaultValue: { type: [String, Number], default: undefined },
    placeholder: { type: String, default: undefined },
    size: { type: String, default: "default" },
    mode: { type: String, default: "default" },
    keyName: { type: String, default: undefined },
    labelName: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    preText: { type: String, default: "" },
  },
  computed: {
    getValue() {
      const value = this.defaultValue || this.value;
      if (value !== undefined && value !== null) {
        return { key: value };
      } else {
        return undefined;
      }
    },
  },
  methods: {
    handleChange(value) {
      this.$emit("change", value);
      // Pass value for v-model
      this.$emit("input", value.key);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
/deep/ .ant-select-selection {
  border-radius: 0;
  font-size: 1.6rem;
  border: 2px solid $argent-color;
}
</style>
