<template>
  <Datepicker
    :minimumView="'month'"
    :maximumView="'year'"
    :initialView="'year'"
    :language="lang"
    :format="format"
    class="month-year-picker"
    calendar-button-icon="fa fa-calendar"
    ref="monthYearPicker"
  >
    <template slot="afterDateInput">
      <a-icon type="calendar" class="mr-10-px" @click="handleClickIcon" />
    </template>
  </Datepicker>
</template>

<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
import WalkIcon from "@/assets/icons/top/walk_256.svg";
export default {
  components: {
    Datepicker,
  },
  props: {
    language: {
      type: String,
      default: "ja",
    },
    format: {
      type: String,
      default: "yyyy年MM月",
    },
  },
  created() {
    this.WalkIcon = WalkIcon;
  },
  data() {
    return {
      lang: lang[`${this.language}`],
    };
  },
  methods: {
    handleClickIcon() {
      this.$refs.monthYearPicker.showCalendar();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.month-year-picker {
  border: 2px solid $argent-color;
  :deep(input) {
    border-radius: 0;
    font-size: 1.6rem;
    border: none;
    outline: none;
    height: 32px;
    padding: 4px 11px;
  }
}
</style>
