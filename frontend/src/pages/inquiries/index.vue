<template>
  <div class="h-100 p-15-px d-flex flex-column justify-content-center">
    <label class="w-100 fs-14 ml-10-px">電話でのお問い合わせ</label>
    <div
      class="d-flex justify-content-between align-items-center mt-10-px mb-10-px ml-10-px flex-wrap"
    >
      <div class="text-phone-number fs-24">{{ phoneNumber }}</div>
      <a href="tel:phoneNumber">
        <Button type="primary">電話をかける</Button>
      </a>
    </div>
    <div class="ml-10-px">メールでのお問い合わせ</div>
    <Textarea
      class="h-100"
      placeholder="お問い合わせ内容をご記入ください。"
      v-model="content"
    />

    <div class="w-100 d-flex justify-content-center mt-30-px">
      <Button type="primary" class="mr-20-px" @click="() => {}">
        キャンセル
      </Button>
      <Button type="primary" class="ml-20-px" @click="showConfirmModal">
        送信
      </Button>
    </div>
    <ConfirmModal
      :visible="visible"
      @handleCancel="handleCancel"
      @handleSubmit="handleSubmit"
    >
      送信してよろしいですか。
    </ConfirmModal>
  </div>
</template>

<script>
import Textarea from "@/components/Textarea.vue";
import Button from "@/components/Button.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
export default {
  name: "Home",
  components: {
    Button,
    ConfirmModal,
    Textarea,
  },
  data() {
    return {
      content: "",
      visible: false,
      phoneNumber: "03-xxxx-xxxx",
    };
  },
  methods: {
    showConfirmModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleSubmit() {
      // TODO: Handle submit
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/common/variable.scss";
.text-phone-number {
  color: $picton-blue-color;
  font-weight: bold;
}
</style>
