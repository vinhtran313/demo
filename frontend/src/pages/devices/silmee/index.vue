<template>
  <div>
    <div v-if="device" class="h-100 p-15-px cur-p" @click="goToDetail">
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
    <div v-else class="h-100 p-15-px">
      <div class="w-100 fs-14 text-blue-color">ユーザ情報</div>
      <div class="p-12-px">xxxxxxxx</div>
      <div class="w-100 fs-14 text-blue-color mt-30-px">ユーザ登録する</div>
      <div class="p-12-px">MACアドレス</div>
      <div class="d-flex justify-content-center align-items-center gap-10">
        <Input
          :classWrapper="`h-40-px`"
          v-model="MAC"
          :placeholder="'MACアドレスを入力してください。'"
        />
        <Button
          class="ml-10-px"
          type="primary"
          :disabled="!MAC"
          @click="addDevice"
        >
          登録
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { getSilmee, getSilmeeState, createSilmee } from "../../../apis/silmees";
export default {
  name: "Devices",
  components: {
    Button,
    Input,
  },
  data() {
    return {
      device: null,
      MAC: "",
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
        const silmee = await getSilmee(this.userId);
        if (
          silmee?.data?.silmee?.deviceId &&
          silmee?.data?.silmee?.deviceUser
        ) {
          const silmeeState = await getSilmeeState(this.userId);
          this.device = silmeeState?.data?.silmee;
        } else {
          this.device = null;
        }
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    goToDetail() {
      this.$router.push({
        name: "devices.silmee.show",
        params: { id: this.device?.deviceId },
      });
    },
    async addDevice() {
      try {
        this.$eventBus.emit("showLoading");
        await createSilmee(this.userId, {
          deviceId: this.MAC,
          deviceUser: "xxxxxxxx",
        });
        this.$eventBus.emit("showModalSuccess", "登録に成功しました。", () => {
          this.MAC = "";
          this.checkAndGetSilmeeState();
        });
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    deleteDevice() {
      this.device = null;
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
