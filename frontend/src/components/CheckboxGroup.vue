<template>
  <div class="ct-radio-group">
    <Checkbox
      v-for="option in options"
      :key="option.key"
      @change="(value) => change(value, option.key)"
      :disabled="disabled"
      :checked="checked(option.key)"
    >
      {{ option.label }}
    </Checkbox>
  </div>
</template>

<script>
import Vue from "vue";
import Checkbox from "@/components/Checkbox.vue";
let uuid = 0;
export default Vue.extend({
  components: {
    Checkbox,
  },
  props: {
    options: { type: Array, default: () => [] },
    value: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: "" },
  },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  methods: {
    checked(key) {
      console.log(this.value);
      return this.value && this.value.includes(key);
    },
    change(value, key) {
      let checkArr = this.value;
      if (value) checkArr.push(key);
      else {
        checkArr = checkArr.filter((id) => key !== id);
      }
      this.$emit("change", checkArr);
      this.$emit("input", checkArr);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.ct-radio-group {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
