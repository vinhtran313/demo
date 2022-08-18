<template>
  <label class="d-inline-flex align-items-center">
    <input
      type="radio"
      class="ct-radio"
      :id="`ct-radio-${uuid}`"
      :name="getName"
      @change="change"
      :disabled="disabled"
      :value="value"
      :checked="value === checked"
    />
    <div class="ct-radio-label" />
    <slot />
  </label>
</template>

<script>
import Vue from "vue";
let uuid = 0;

export default Vue.extend({
  props: {
    value: { type: [Boolean, Number, String], default: undefined },
    checked: { type: [Boolean, Number, String], default: undefined },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: "" },
  },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  computed: {
    getName() {
      return this.name || `ct-radio-id-${this.uuid}`;
    },
  },
  methods: {
    change() {
      this.$emit("change", this.value);
      this.$emit("input", this.value);
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

.ct-radio {
  display: none;
}

.ct-radio-label {
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  position: relative;
  background: white;
  border: 1px solid $argent-color;
  transition: all 0.2s;
  margin-right: 4px;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: scale(0) translate(-50%, -50%);
    width: 0.7em;
    height: 0.7em;
    background: $white-color;
    animation-delay: 0s;
    border-radius: 50%;
    transition: scale 0.4s;
  }

  &:hover:before {
    box-shadow: rgba(0, 0, 0, 0.0784314) 0 0 1vw 0,
      rgba(0, 0, 0, 0.239216) 0 1vw 1vw 0;
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

.ct-radio:checked + .ct-radio-label {
  animation-play-state: paused;
  background: $picton-blue-color;
  border-color: $picton-blue-color;
}

.ct-radio:checked + .ct-radio-label:after {
  background: transparent;
  transform: scale(1) translate(-50%, -50%);
  transition: all 0.4s;
}

.ct-radio:checked + .ct-radio-label:before {
  transform: scale(1) translate(-50%, -50%);
  transition: scale 0.4s;
}

.ct-radio:disabled + .ct-radio-label {
  background: $anti-flash-white-color;
}
</style>
