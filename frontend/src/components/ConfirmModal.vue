<template>
  <a-modal
    :visible="getVisible"
    :closable="false"
    :width="width"
    :wrap-class-name="wrapClassName"
    :z-index="zIndex"
    @cancel="handleCancel"
  >
    <template v-if="message">
      {{ message }}
    </template>
    <template v-else>
      <slot />
    </template>
    <template #footer>
      <div class="d-flex align-items-center justify-content-between">
        <div
          class="flex-1 text-center fw-7 text-picton-blue button-cancel"
          @click="handleCancel"
        >
          {{ cancelBtnText }}
        </div>
        <div
          class="flex-1 text-center fw-7 text-picton-blue button-submit"
          @click="handleSubmit"
        >
          {{ submitBtnText }}
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    // value prop is the value of v-model
    value: { type: Boolean, default: undefined },
    width: { type: [String, Number], default: 500 },
    visible: { type: Boolean, default: undefined },
    submitBtnText: { type: String, default: "はい" },
    cancelBtnText: { type: String, default: "いいえ" },
    message: { type: String, default: "" },
    wrapClassName: { type: String, default: "" },
    zIndex: { type: Number, default: 1000 },
  },
  computed: {
    getVisible() {
      // In case using visile prop
      if (this.visible !== undefined) {
        return this.visible;
      }
      // In case using v-model
      if (this.value !== undefined) {
        return this.value;
      }
      // Default
      return false;
    },
  },
  methods: {
    handleSubmit(event) {
      this.$emit("handleSubmit", event);
      // Pass value for using v-model
      this.$emit("input", false);
    },
    handleCancel(event) {
      this.$emit("handleCancel", event);
      // Pass value for using v-model
      this.$emit("input", false);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
::v-deep {
  .ant-modal-content {
    border-radius: 20px;
  }

  .ant-modal-body {
    text-align: center;
    color: $text-color;
  }

  .ant-modal-footer {
    padding-top: 0;
    padding-bottom: 0;
    border-top: 1px solid $argent-color;

    .button-cancel,
    .button-submit {
      padding: 10px 0;
      cursor: pointer;
    }

    .button-cancel {
      border-right: 1px solid $argent-color;
    }
  }
}
</style>
