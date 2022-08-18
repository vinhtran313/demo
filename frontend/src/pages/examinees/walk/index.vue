<template>
  <div>
    <Title class="d-flex justify-content-between">
      <span>WalkX登録</span>
      <div class="d-flex justify-content-end align-items-center fw-4 fs-16">
        1234567890123456 / 花子
      </div>
    </Title>
    <div class="h-100 p-15-px cur-p" @click="goToDetail">
      <label class="w-100 fs-14 text-blue-color">登録済デバイス</label>
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
    </div>
    <div class="h-100 pl-15-px pr-15-px pb-15-px">
      <div class="w-100 fs-14 text-blue-color mt-20-px">デバイスを登録する</div>
      <div class="p-12-px">デバイスID</div>
      <div class="d-flex justify-content-center align-items-center gap-10">
        <Input
          :classWrapper="`h-40-px`"
          v-model="MAC"
          :placeholder="'デバイスIDを入力してください'"
        />
        <Button class="ml-10-px" type="primary" :disabled="!MAC">登録</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Title from "@/components/admin/Title.vue";
export default {
  name: "Devices",
  components: {
    Button,
    Title,
    Input,
  },
  data() {
    return {
      device: {
        deviceId: "WALKX_51400000xx",
        deviceUser: "XXXXXXXXXXXXXXXXXXXXXXXXX...",
      },
      userId: this.$store.state.userID,
      MAC: "",
    };
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: "user.examinees.walk.show",
        params: { walk_id: 1 },
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
