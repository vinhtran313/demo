<template>
  <label
    :for="`ct-radio-check-${uuid}`"
    class="d-inline-flex align-items-center"
  >
    <input
      type="radio"
      class="ct-radio-check"
      :id="`ct-radio-check-${uuid}`"
      :name="getName"
      @change="change"
      :value="value"
      :checked="value === checked"
      :disabled="disabled"
    />
    <div class="ct-radio-check-label" />
    <slot />
  </label>
</template>

<script>
import Vue from "vue";
let uuid = 0;

export default Vue.extend({
  props: {
    value: { type: [String, Number], default: undefined },
    checked: { type: [String, Number], default: undefined },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: "" },
  },
  model: {
    prop: "checked",
  },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  computed: {
    getName() {
      return this.name || `ct-radio-check-id-${this.uuid}`;
    },
  },
  methods: {
    change(e) {
      this.$emit("change", e?.target?.value);
      this.$emit("input", e?.target?.value);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
@keyframes fade {
  0%,
  50% {
    opacity: 0;
    transform: scale(0);
  }
}

.ct-radio-check {
  display: none;
}

.ct-radio-check-label {
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  position: relative;
  background: $white-color;
  border: 4px solid $argent-color;
  transition: all 0.2s;
  margin-right: 4px;

  &:before {
    content: "";
    position: absolute;
    top: 40%;
    left: 20%;
    transform: rotate(45deg) scale(0) translate(-50%, -50%);
    width: 0.35em;
    height: 0.7em;
    border-bottom: 0.1em solid $white-color;
    border-right: 0.1em solid $white-color;
    background: transparent;
    animation-delay: 0s;
    transition: scale 0.4s;
  }

  &:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transform: scale(0);
  }
}

.ct-radio-check:checked + .ct-radio-check-label {
  animation-play-state: paused;
  background: $picton-blue-color;
  border-color: $picton-blue-color;
}

.ct-radio-check:checked + .ct-radio-check-label:after {
  background: transparent;
  transform: scale(1) translate(-50%, -50%);
  transition: all 0.4s;
}

.ct-radio-check:checked + .ct-radio-check-label:before {
  transform: rotate(45deg) scale(1) translate(-50%, -50%);
  transition: scale 0.4s;
}

.ct-radio-check:disabled + .ct-radio-check-label {
  background: $anti-flash-white-color;
}
</style>
