<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center area-item-wrapper mt-30-px"
  >
    <div
      class="d-flex align-items-center area-item-wrapper"
      v-for="area in NOTICE_AREAS"
      :key="area.id"
    >
      <div class="radio-area d-flex align-items-center fw-7">
        <RadioButtonCheck v-model="areaId" :value="area.id" name="areaId">
          {{ area.name }}
        </RadioButtonCheck>
      </div>
      <Button
        :type="getButtonType(area.id)"
        :disabled="areaId != area.id"
        @click="handleChooseArea"
      >
        {{ area.buttonText }}
      </Button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Button from "@/components/Button.vue";
import RadioButtonCheck from "@/components/RadioButtonCheck.vue";
import { NOTICE_AREAS } from "@/constants";
export default Vue.extend({
  components: {
    Button,
    RadioButtonCheck,
  },
  created() {
    this.NOTICE_AREAS = NOTICE_AREAS;
  },
  data() {
    return {
      areaId: null,
    };
  },
  methods: {
    getButtonType(areaId) {
      return this.areaId == areaId ? "blue" : "gray";
    },
    handleChooseArea() {
      this.$emit("onChooseArea", this.areaId);
    },
  },
});
</script>

<style lang="scss" scoped>
.area-item-wrapper {
  gap: 20px;
  .radio-area {
    width: 120px;
  }
}

.ct-button-blue,
.ct-button-gray {
  width: 120px;
}
</style>
