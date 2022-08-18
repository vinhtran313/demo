<template>
  <div :class="getWrapperClass" @click="handleClick">
    <IconImage :src="getIcon" class="fs-24" :width="60" :height="60" />
  </div>
</template>

<script>
import Vue from "vue";
import CalendarTodayIcon from "@/assets/icons/another/calendar_today.svg";
import Calendar7Icon from "@/assets/icons/another/calendar_7av.svg";
import Calendar30Icon from "@/assets/icons/another/calendar_30av.svg";
import Calendar180Icon from "@/assets/icons/another/calendar_180days.svg";
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: "",
    },
    selected: {
      type: Boolean,
      default: false,
    },
    item: {
      type: [Object, Number, String],
      default: () => {},
    },
    handleSelectCalendar: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    getWrapperClass() {
      return `calendar-item-wrapper ${this.selected ? "selected" : ""}`;
    },
    getIcon() {
      var icon = null;
      switch (this.item.key) {
        case 1:
          icon = this.calendarTodayIcon;
          break;
        case 2:
          icon = this.calendar7Icon;
          break;
        case 3:
          icon = this.calendar30Icon;
          break;
        case 4:
          icon = this.calendar180Icon;
          break;
      }
      return icon;
    },
  },
  created() {
    this.calendarTodayIcon = CalendarTodayIcon;
    this.calendar7Icon = Calendar7Icon;
    this.calendar30Icon = Calendar30Icon;
    this.calendar180Icon = Calendar180Icon;
  },
  methods: {
    handleClick() {
      this.handleSelectCalendar(this.item);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";

.calendar-item-wrapper {
  background: $white-color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid $argent-color;
  background-color: $anti-flash-white-color;
  padding: 2px 10px;

  .calendar-title {
    line-height: 1;
  }

  &.selected {
    border-color: $american-yellow-color;
    background-color: $flavescent-color;
  }
}
</style>
