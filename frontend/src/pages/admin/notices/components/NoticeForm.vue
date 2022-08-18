<template>
  <div>
    <a-form-model class="notice-form">
      <a-form-model-item label="送信对象">全体</a-form-model-item>
      <a-form-model-item label="タイトル">
        <Input placeholder="タイトル" v-model="title" />
      </a-form-model-item>
      <a-form-model-item label="お知らせ内容">
        <Textarea placeholder="お知らせ内容" :rows="12" v-model="description" />
      </a-form-model-item>

      <a-form-model-item>
        <div class="d-flex justify-content-center mt-30-px">
          <Button type="blue" class="mr-20-px" @click="() => {}" disabled>
            キャンセルー
          </Button>
          <Button type="blue" class="ml-20-px" @click="confirmForm">
            お知らせ送信
          </Button>
        </div>
      </a-form-model-item>
    </a-form-model>
    <ConfirmModal
      :visible="visible"
      @handleCancel="closeModal"
      @handleSubmit="submitNotice"
      submitBtnText="OK"
      cancelBtnText="キャンセル"
      :width="300"
    >
      送信してよろしいですか。
    </ConfirmModal>
  </div>
</template>

<script>
import Vue from "vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Textarea from "@/components/Textarea.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default Vue.extend({
  components: {
    Input,
    Textarea,
    Button,
    ConfirmModal,
  },
  data() {
    return {
      title: "",
      description: "",
      visible: false,
    };
  },
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    confirmForm() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    submitNotice() {
      // TODO: Call api create notice
      this.onSubmit(this.title, this.description);
      this.closeModal();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";

/deep/ .notice-form {
  padding: 0 10px;
  .ant-form-item-label {
    width: 100px;
    font-size: 16px;
    text-align: left;
    font-weight: 600;
  }

  .ant-form-item {
    display: flex;
    margin-bottom: 5px;
  }
  .ant-form-item-control-wrapper {
    flex: 1;
  }
}
</style>
