<template>
  <label class="d-flex align-items-center" :for="getName">
    <span class="ct-checkbox-wrapper">
      <input
        class="ct-checkbox"
        type="checkbox"
        hidden
        :id="getName"
        :name="getName"
        @change="change"
        :checked="getValue"
        :disabled="disabled"
      />
      <span class="icon-tick" />
    </span>
    <slot />
  </label>
</template>

<script>
import Vue from "vue";
let uuid = 0;

export default Vue.extend({
  props: {
    value: { type: Boolean, default: undefined },
    checked: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: "" },
  },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  computed: {
    getValue() {
      const value = this.checked || this.value;
      if (typeof value === "boolean") {
        return value;
      } else {
        return false;
      }
    },
    getName() {
      return this.name || `ct-checkbox-id-${this.uuid}`;
    },
  },
  methods: {
    change(e) {
      this.$emit("change", e?.target?.checked);
      this.$emit("input", e?.target?.checked);
      console.log(e.target.checked);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.ct-checkbox-wrapper {
  cursor: pointer;
  user-select: none;
  width: 1.1em;
  height: 1.1em;
  border: 0.1em solid $text-color;
  display: inline-block;
  position: relative;
  margin-right: 4px;
}

.ct-checkbox:checked + .icon-tick::before {
  content: "\2713";
  position: absolute;
  top: 50%;
  left: 50%;
  font-weight: bold;
  font-size: 0.7em;
  line-height: 1;
  transform: translate(-50%, -50%);
}
</style>
