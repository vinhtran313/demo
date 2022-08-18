<template>
  <a-modal
    :visible="visible"
    :closable="false"
    :width="300"
    :z-index="1000"
    @cancel="closeModal"
  >
    <template>
      {{ messageModal }}
    </template>
    <template #footer>
      <div class="d-flex align-items-center justify-content-between">
        <div
          class="flex-1 text-center fw-7 text-picton-blue button-cancel"
          @click="closeModal"
        >
          OK
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      visible: false,
      messageModal: "",
      callback: null,
    };
  },
  created() {
    this.$eventBus.on("showModalSuccess", this.showModalSuccess);
  },
  destroyed() {
    this.$eventBus.off("showModalSuccess", this.showModalSuccess);
  },
  methods: {
    showModalSuccess(message, callback) {
      this.callback = callback;
      this.messageModal = message;
      this.visible = true;
    },
    closeModal() {
      if (this.callback) {
        this.callback();
      }
      this.visible = false;
      this.clearData();
    },
    clearData() {
      this.messageModal = "";
      this.callback = null;
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

    .button-cancel {
      padding: 10px 0;
      cursor: pointer;
    }
  }
}
</style>
