<template>
  <div class="h-100">
    <Title class="d-flex justify-content-between">
      <span>WalkX情報</span>
      <div class="d-flex justify-content-end align-items-center fw-4 fs-16">
        1234567890123456 / 花子
      </div>
    </Title>
    <div class="p-25-px">
      {{ deviceDetail?.deviceUser || "WALKX_51400000xx" }}
    </div>
    <div class="pt-10-px pl-25-px pr-25-px pb-25-px">
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-160-px">エラー情報</div>
        <div class="flex-1">: {{ deviceDetail?.deviceId || "異常なし" }}</div>
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
