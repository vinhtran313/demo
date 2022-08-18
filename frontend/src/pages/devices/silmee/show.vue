<template>
  <div class="h-100 bg-content-detail">
    <div class="bg-title-detail p-15-px">{{ deviceDetail.deviceUser }}</div>
    <div class="pt-10-px pl-25-px pr-25-px pb-25-px">
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-130-px">デバイスID</div>
        <div class="flex-1">: {{ deviceDetail.deviceId }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-130-px">モデル名</div>
        <div class="flex-1">: {{ deviceDetail?.model }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-130-px">バージョン</div>
        <div class="flex-1">: {{ deviceDetail?.version }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-130-px">バッテリー残量</div>
        <div class="flex-1">: {{ deviceDetail?.battery }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-130-px">ゲートウェイID</div>
        <div class="flex-1">: {{ deviceDetail?.gateway }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-130-px">製造番号</div>
        <div class="flex-1">: {{ deviceDetail?.label }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-130-px">状態</div>
        <div class="flex-1">: {{ deviceDetail?.state }}</div>
      </div>
      <div class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="w-130-px">エラー情報</div>
        <div class="flex-1">: {{ deviceDetail?.error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSilmee, getSilmeeState } from "../../../apis/silmees";
export default {
  name: "DevicesDetail",
  data() {
    return {
      deviceDetail: {},
      userId: this.$store.state.userID,
    };
  },
  created() {
    this.checkAndGetSilmeeState();
  },
  methods: {
    async checkAndGetSilmeeState() {
      try {
        this.$eventBus.emit("showLoading");
        const { data } = await getSilmee(this.userId);
        if (data?.silmee?.deviceId && data?.silmee?.deviceUser) {
          const silmeeState = await getSilmeeState(this.userId);
          this.deviceDetail = silmeeState?.data?.silmee;
        } else {
          this.$router.push({
            name: "devices.silmee.index",
          });
        }
        console.log(this.deviceDetail);
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../../assets/styles/common/variable.scss";
.bg-title-detail {
  height: 50px;
  background-color: $white-color;
}
.bg-content-detail {
  background-color: $anti-flash-white-color;
}
</style>
