<template>
  <div class="h-100 d-flex flex-column">
    <Title class="d-flex justify-content-between">
      <span>会話状態</span>
      <div class="d-flex justify-content-end align-items-center fw-4 fs-16">
        1234567890123456 / 花子
      </div>
    </Title>
    <div class="d-flex h-100 gap-30-px">
      <div class="w-160-px d-flex flex-column gap-10-px h-fit-content">
        <CalendarItem
          class="flex-1"
          v-for="calendar in CALENDARS"
          :key="calendar.key"
          :title="calendar.label"
          :item="calendar"
          :selected="calendar.key === selectedCalendar.key"
          :handleSelectCalendar="handleSelectCalendar"
        />
      </div>
      <div
        class="h-100 w-100 d-flex flex-column align-items-center justify-content-between"
      >
        <div
          class="w-100 d-flex align-items-center justify-content-between mb-10-px"
        >
          <Ribbon type="left">次</Ribbon>
          <div class="flex-1 text-center">2022/04/09</div>
          <Ribbon type="right" disabled>次</Ribbon>
        </div>
        <div class="w-100 flex-1 mb-10-px" ref="progressLineChart">
          <div v-if="progressLineChartHeight">
            <ProgressLineChart
              :chartData="progressLineChartData"
              :displayGridX="false"
              :height="progressLineChartHeight"
            />
          </div>
        </div>
        <div class="w-100 flex-1 mb-10-px" ref="barChart">
          <div v-if="barChartHeight">
            <BarChart
              :chartData="barChartData"
              indexAxis="y"
              :height="barChartHeight"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/admin/Title.vue";
import Ribbon from "@/components/Ribbon";
import CalendarItem from "@/components/CalendarItem";
import ProgressLineChart from "@/components/ProgressLineChart";
import BarChart from "@/components/BarChart";
import { CALENDARS } from "@/constants";
export default {
  name: "ExamineesTalks",
  components: {
    Title,
    Ribbon,
    CalendarItem,
    ProgressLineChart,
    BarChart,
  },
  created() {
    this.CALENDARS = CALENDARS;
  },
  mounted() {
    this.progressLineChartHeight = this.$refs.progressLineChart.clientHeight;
    this.barChartHeight = this.$refs.barChart.clientHeight;
  },
  data() {
    return {
      selectedCalendar: {},
      progressLineChartData: {
        labels: ["0", "3", "6", "9", "12", "15", "18", "21"],
        datasets: [
          {
            backgroundColor: "#EE7E34",
            data: Array.from({ length: 21 }, (value, index) => {
              return { x: index, y: Math.random() * 125 };
            }),
            borderWidth: 1,
            radius: 0,
            borderColor: "#EE7E34",
            pointStyle: "line",
            fill: false,
          },
        ],
      },
      barChartData: {
        labels: ["しっかり歩行", "せいかつ歩行", "座っている"],
        datasets: [
          {
            backgroundColor: ["#FFFF00", "#99CC00", "#339900"],
            data: [10, 30, 70],
          },
        ],
      },
      progressLineChartHeight: 0,
      barChartHeight: 0,
    };
  },
  methods: {
    handleSelectCalendar(calendar) {
      this.selectedCalendar = calendar;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
</style>
