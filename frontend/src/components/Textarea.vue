<template>
  <a-textarea
    :value="value"
    :placeholder="placeholder"
    :allow-clear="allowClear"
    :rows="rows"
    :disabled="disabled"
    @change="handleChange"
    class="ct-textarea"
  />
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    value: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    allowClear: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    rows: { type: Number, default: 5 },
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
.ct-textarea {
  border-radius: 0;
  resize: none;
  border: 2px solid $argent-color;
  font-size: 1.6rem;
}
</style>
