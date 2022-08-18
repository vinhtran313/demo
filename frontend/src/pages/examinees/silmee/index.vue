<template>
  <div>
    <Title class="d-flex justify-content-between">
      <span>Silmee登録</span>
      <div class="d-flex justify-content-end align-items-center fw-4 fs-16">
        1234567890123456 / 花子
      </div>
    </Title>
    <div class="h-100 p-15-px cur-p" @click="goToDetail">
      <label class="w-100 fs-14 text-blue-color">ユーザ情報</label>
      <div
        class="d-flex justify-content-between align-items-center ml-10-px mt-10-px mb-15-px flex-wrap"
      >
        <div>
          <div>{{ device.deviceId }}</div>
          <div>{{ device.deviceUser }}</div>
        </div>
        <div>
          詳細
          <a-icon type="right" class="fs-20 text-picton-blue" />
        </div>
      </div>
      <Button class="ml-10-px" type="primary" @click.stop="deleteDevice">
        登録解除
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Title from "@/components/admin/Title.vue";
export default {
  name: "Devices",
  components: {
    Button,
    Title,
  },
  data() {
    return {
      device: {
        deviceId: "xxxxxxxx",
        deviceUser: "00800984xx0C6D",
      },
      userId: this.$store.state.userID,
    };
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: "user.examinees.silmee.show",
        params: { silmee_id: 1 },
      });
    },
    deleteDevice() {
      this.device = {
        deviceId: "",
        deviceUser: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../../assets/styles/common/variable.scss";
.text-blue-color {
  color: $picton-blue-color;
}
</style>
