<template>
  <div
    class="min-height-100 p-15-px w-100 d-flex flex-column align-items-center justify-content-center"
  >
    <div class="fs-18 w-100 pl-15-px pr-10-px pb-10-px">
      膝の痛みはいかがですか?
      <br />
      ※主観的に5段階でお答えください。
    </div>
    <div class="d-flex flex-column w-100 flex-1">
      <SelectCard
        v-for="(status, index) in EMOTION_STATUSES"
        :key="index"
        :item="status"
        :title="status.text"
        :handleSelect="handleSelect"
        :selected="selectedStatus.id === status.id"
      />
    </div>

    <div class="d-flex justify-content-center mt-10-px">
      <Button type="primary" class="ml-10-px" @click="handleSubmit">OK</Button>
    </div>
  </div>
</template>

<script>
import { updateMood } from "@/apis/moods";
import Button from "@/components/Button.vue";
import SelectCard from "@/components/SelectCard.vue";
import { EMOTION_STATUSES } from "@/constants";
export default {
  name: "EditKneePain",
  components: {
    Button,
    SelectCard,
  },
  created() {
    this.EMOTION_STATUSES = EMOTION_STATUSES;
  },
  data() {
    return {
      selectedStatus: {},
    };
  },
  methods: {
    handleSelect(item) {
      this.selectedStatus = item;
    },
    async handleSubmit() {
      try {
        this.$eventBus.emit("showLoading");
        await updateMood({ mood: this.selectedStatus?.id });
        this.$eventBus.emit("showModalSuccess", "登録に成功しました。", () => {
          this.$router.push({ name: "moods.index" });
        });
      } catch (error) {
        this.$handleError(error, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
</style>
