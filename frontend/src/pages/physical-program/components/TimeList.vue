<template>
  <div
    class="min-height-100 p-15-px w-100 d-flex flex-column align-items-center justify-content-center"
  >
    <div class="fs-18 w-100 p-20-px">実施時間を選択してください。</div>
    <div class="d-flex flex-column w-100 flex-1">
      <SelectCard
        v-for="(time, index) in times"
        :key="index"
        :item="time"
        :title="time.text"
        :handleSelect="handleSelect"
        :selected="selectedTime.id === time.id"
      />
    </div>

    <div class="d-flex justify-content-center mt-30-px">
      <Button type="primary" class="mr-10-px" @click="() => {}">
        キャンセル
      </Button>
      <Button
        type="primary"
        class="ml-10-px"
        :disabled="!selectedTime.id"
        @click="handleSubmit"
      >
        実行
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import SelectCard from "@/components/SelectCard.vue";
export default {
  name: "Mypage",
  components: {
    Button,
    SelectCard,
  },
  props: {
    submitTime: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      selectedTime: {},
      times: [
        {
          id: 1,
          text: "10分",
          time: 10,
        },
        {
          id: 2,
          text: "20分",
          time: 20,
        },
        {
          id: 3,
          text: "30分",
          time: 30,
        },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      this.selectedTime = item;
    },
    handleSubmit() {
      this.submitTime(this.selectedTime);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
</style>
