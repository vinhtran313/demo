<template>
  <div class="ct-radio-group">
    <RadioButton
      v-for="option in options"
      :key="option.key"
      :value="option.key"
      @change="change"
      :disabled="disabled"
      :name="getName"
      :checked="value"
    >
      {{ option.label }}
    </RadioButton>
  </div>
</template>

<script>
import Vue from "vue";
import RadioButton from "@/components/RadioButton.vue";
let uuid = 0;
export default Vue.extend({
  components: {
    RadioButton,
  },
  props: {
    options: { type: Array, default: () => [] },
    value: { type: [String, Number], default: undefined },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: "" },
  },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  computed: {
    getName() {
      return this.name || `ct-group-radio-id-${this.uuid}`;
    },
  },
  methods: {
    change(value) {
      this.$emit("change", value);
      this.$emit("input", value);
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
