<template>
  <div
    class="min-height-100 p-15-px d-flex flex-column align-items-center justify-content-center"
  >
    <div class="policy-text">
      {{ text }}
    </div>
    <Checkbox class="mt-20-px" v-model="agreeWithPolicy">許諾します</Checkbox>
    <Button
      type="primary"
      class="mt-20-px mb-15-px"
      :disabled="!agreeWithPolicy"
      @click="showConfirmModal"
    >
      次へ
    </Button>
    <!-- <ConfirmModal
      :visible="visible"
      @handleCancel="handleCancel"
      @handleSubmit="handleSubmit"
    >
      <div class="text-left fs-16">
        アプリへの参加解除してよろしいですか。
        <br />
        <div class="mt-10-px">参加解除後は、</div>
        本アプリをアンインストールしてください。
      </div>
    </ConfirmModal> -->
  </div>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button.vue";
// import ConfirmModal from "@/components/ConfirmModal.vue";
export default {
  name: "Home",
  components: {
    Button,
    // ConfirmModal,
    Checkbox,
  },
  data() {
    return {
      text: `xxxxxxxxxxxxxxxxxxxxxxxxxxx
      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      xxxx`,
      agreeWithPolicy: false,
      visible: false,
    };
  },
  methods: {
    showConfirmModal() {
      this.handleSubmit();
      // this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleSubmit() {
      this.$router.push({ name: "signup", query: this.$route.query });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/common/variable.scss";
.policy-text {
  padding: 5px 10px;
  flex: 1;
  border: 1px solid $argent-color;
  word-break: break-all;
}
</style>
