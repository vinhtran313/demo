<template>
  <div class="h-100">
    <Title class="d-flex justify-content-between">
      <span>Silmee情報</span>
      <div class="d-flex justify-content-end align-items-center fw-4 fs-16">
        1234567890123456 / 花子
      </div>
    </Title>
    <div class="p-25-px">{{ deviceDetail?.deviceUser || "xxxxxxxx" }}</div>
    <div class="pt-10-px pl-25-px pr-25-px pb-25-px">
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-160-px">デバイスID</div>
        <div class="flex-1">
          : {{ deviceDetail?.deviceId || "00800984xx0C6D" }}
        </div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-160-px">モデル名</div>
        <div class="flex-1">: {{ deviceDetail?.model || "XXXmodel" }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-160-px">バージョン</div>
        <div class="flex-1">: {{ deviceDetail?.version || "xxxxx" }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-160-px">バッテリー残量</div>
        <div class="flex-1">: {{ deviceDetail?.battery || "80%" }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-160-px">ゲートウェイID</div>
        <div class="flex-1">: {{ deviceDetail?.gateway || "xxxxxx" }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-160-px">製造番号</div>
        <div class="flex-1">: {{ deviceDetail?.label || "xxxxxxxxxxxx" }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-160-px">状態</div>
        <div class="flex-1">: {{ deviceDetail?.state || "状態" }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-160-px">エラー情報</div>
        <div class="flex-1">: {{ deviceDetail?.error || "0 (SUCCESS)" }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/admin/Title.vue";
export default {
  name: "DevicesDetail",
  components: {
    Title,
  },
  data() {
    return {
      deviceDetail: {},
      userId: this.$store.state.userID,
    };
  },
};
</script>
