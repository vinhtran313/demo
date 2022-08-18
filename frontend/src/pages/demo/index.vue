<template>
  <div class="m-15-px">
    <RadioButton v-model="a" :key="1">a</RadioButton>
    <RadioButton v-model="b" :key="2">b</RadioButton>
    <RadioButton v-model="c" :key="3" disabled>c</RadioButton>
    <RadioButton v-model="d" :key="4">c</RadioButton>
    <Checkbox v-model="e">c</Checkbox>
    <Button @click="visible = true">show</Button>
    <ConfirmModal
      title="顧客施設登録"
      :visible="visible"
      :show-footer="false"
      @handleCancel="handleCancel"
      @handleSubmit="handleSubmit"
    >
      ahihi
    </ConfirmModal>
    <div class="mt-5-px" />
    <Textarea v-model="text" />
    <Input v-model="input" />
  </div>
</template>

<script>
import RadioButton from "@/components/RadioButton.vue";
import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import Textarea from "@/components/Textarea.vue";
import Input from "@/components/Input.vue";
export default {
  name: "Home",
  components: {
    RadioButton,
    Checkbox,
    Button,
    ConfirmModal,
    Textarea,
    Input,
  },
  data() {
    return {
      a: false,
      b: true,
      c: false,
      d: true,
      e: true,
      text: "afds",
      input: "afds",
      visible: false,
    };
  },
  methods: {
    handleCancel() {
      this.visible = false;
      console.log("cancel");
    },
    handleSubmit() {
      this.visible = false;
      console.log("handle ok");
    },
  },
};
</script>

<style lang="scss" scoped></style>
