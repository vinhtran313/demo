<template>
  <div
    class="h-100 pt-5-px pl-15-px pr-15-px w-100 d-flex flex-column align-items-center justify-content-between"
  >
    <div
      class="w-100 d-flex align-items-center justify-content-between mb-10-px"
    >
      <Ribbon
        :disabled="!hasPreviousData"
        type="left"
        @click="() => handleChangeOffset(DOWN)"
      >
        前
      </Ribbon>
      <Ribbon
        type="right"
        @click="() => handleChangeOffset(UP)"
        :disabled="!hasNextData"
      >
        次
      </Ribbon>
    </div>
    <div class="w-100 flex-1 mb-10-px" ref="lineChart">
      <div v-if="this.lineChartHeight">
        <LineChart
          :chartData="stepLineChartData"
          :displayGridX="false"
          :height="lineChartHeight"
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
    <div
      class="w-100 d-flex align-items-center justify-content-between gap-5-px"
    >
      <CalendarItem
        class="flex-1"
        v-for="calendar in CALENDARS_WITHOUT_TODAY"
        :key="calendar.key"
        :title="calendar.label"
        :item="calendar"
        :selected="calendar.key === selectedCalendar.key"
        :handleSelectCalendar="handleSelectCalendar"
      />
    </div>
  </div>
</template>

<script>
import Ribbon from "@/components/Ribbon";
import CalendarItem from "@/components/CalendarItem";
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import {
  CALENDARS_WITHOUT_TODAY,
  WEEK_INFO,
  UP,
  DOWN,
  EMOTION_STATUSES,
} from "@/constants";
import { getMoodStatistics, getMood } from "@/apis/moods";
import DateChart from "../../mixins/DateChart";
import GetDataByOffset from "../../mixins/GetDataByOffset";
import moment from "moment";
export default {
  name: "Mood",
  components: {
    Ribbon,
    CalendarItem,
    LineChart,
    BarChart,
  },
  mixins: [DateChart, GetDataByOffset],
  async created() {
    this.CALENDARS_WITHOUT_TODAY = CALENDARS_WITHOUT_TODAY;
    this.UP = UP;
    this.DOWN = DOWN;
    await Promise.all([this.handleSelectCalendar(WEEK_INFO), this.fetchMood()]);
  },
  mounted() {
    this.lineChartHeight = this.$refs.lineChart.clientHeight;
    this.barChartHeight = this.$refs.barChart.clientHeight;
  },
  data() {
    return {
      selectedCalendar: {},

      stepLineChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#FF62FF",
            data: [],
            borderColor: "#FF62FF",
          },
        ],
      },
      barChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#339900",
              "#99CC00",
              "#FFFF00",
              "#FF6600",
              "#FF0000",
            ],
            data: [],
          },
        ],
      },
      lineChartHeight: 0,
      barChartHeight: 0,
    };
  },
  methods: {
    handleSelectCalendar(calendar) {
      this.dateRangeBar(calendar.key);
      this.selectedCalendar = calendar;
      this.fetchMoodStatistics();
    },
    async fetchMoodStatistics() {
      try {
        this.$eventBus.emit("showLoading");
        const params = {
          from: this.startDateBar,
          to: this.endDate,
        };
        const { data } = await getMoodStatistics(params);
        if (data?.moods) {
          const labels = EMOTION_STATUSES.map((item) => {
            return item.text;
          });
          let datas = [null, null, null, null, null];
          data.moods.forEach((item) => {
            const index = EMOTION_STATUSES.findIndex(
              (_item) => item.mood === _item.id
            );
            if (index > -1) {
              datas[index] = item.count;
            }
          });
          this.barChartData = {
            ...this.barChartData,
            labels: labels,
            datasets: [
              {
                ...this.barChartData.datasets[0],
                data: datas,
              },
            ],
          };
        }
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    async fetchMood() {
      try {
        this.$eventBus.emit("showLoading");
        const params = {
          from: this.startDateSlide,
          to: this.endDateSlide,
          offset: this.offset,
        };
        const { data } = await getMood(params);
        this.total = data?.total;
        if (data?.moods) {
          const labels = data.moods.map((item) => {
            return moment(item.insertTime).format("MM/DD");
          });
          const datas = data.moods.map((item) => {
            return item.mood;
          });
          this.stepLineChartData = {
            ...this.stepLineChartData,
            labels: labels,
            datasets: [
              {
                ...this.stepLineChartData.datasets[0],
                data: datas,
              },
            ],
          };
        }
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    handleChangeOffset(type) {
      this.changeOffset(type);
      this.fetchMood();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
</style>
