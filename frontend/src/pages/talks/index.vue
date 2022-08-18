<template>
  <div
    class="h-100 pt-5-px pl-15-px pr-15-px w-100 d-flex flex-column align-items-center justify-content-between"
  >
    <div
      class="w-100 d-flex align-items-center justify-content-between mb-10-px"
    >
      <Ribbon type="left" @click="() => dateRangeWeekSlide(DOWN)">次</Ribbon>
      <div class="flex-1 text-center">
        {{ endDateSlide }}
      </div>
      <Ribbon
        type="right"
        @click="() => dateRangeWeekSlide(UP)"
        :disabled="endDate === endDateSlide"
      >
        次
      </Ribbon>
    </div>
    <div class="w-100 flex-1 mb-10-px" ref="lineChart">
      <div v-if="this.lineChartHeight">
        <LineChart
          :chartData="lineChartData"
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
  KNEE_PAIN_STATUSES,
} from "@/constants";
import { getKneePainStatistics, getKneePain } from "@/apis/kneepains";
import DateChart from "../../mixins/DateChart";
import moment from "moment";
export default {
  name: "KneePain",
  components: {
    Ribbon,
    CalendarItem,
    LineChart,
    BarChart,
  },
  mixins: [DateChart],
  async created() {
    this.CALENDARS_WITHOUT_TODAY = CALENDARS_WITHOUT_TODAY;
    this.UP = UP;
    this.DOWN = DOWN;
    await Promise.all([
      this.handleSelectCalendar(WEEK_INFO),
      this.fetchKneePain(),
    ]);
  },
  mounted() {
    this.lineChartHeight = this.$refs.lineChart.clientHeight;
    this.barChartHeight = this.$refs.barChart.clientHeight;
  },
  data() {
    return {
      selectedCalendar: {},
      lineChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#EE7E34",
            data: [],
            borderColor: "#EE7E34",
          },
        ],
      },
      stepLineChartData: {
        labels: ["03/15", "03/16", "03/17", "03/18", "03/19", "03/20", "03/21"],
        datasets: [
          {
            backgroundColor: "#6DAB43",
            data: [1, 2, 3, 4, 5, 2, 1],
            borderColor: "#6DAB43",
            pointStyle: "line",
            fill: false,
            stepped: true,
          },
        ],
      },
      progressLineChartData: {
        labels: Array.from({ length: 200 }, (value, index) => {
          return "abc" + index;
        }),
        datasets: [
          {
            backgroundColor: "#6DAB43",
            data: Array.from({ length: 200 }, () => {
              return Math.random() * 10;
            }),
            borderWidth: 1,
            radius: 0,
            borderColor: "#6DAB43",
            pointStyle: "line",
            fill: false,
          },
        ],
      },
      progressLineChartData2: {
        labels: Array.from({ length: 200 }, (value, index) => {
          return "abc" + index;
        }),
        datasets: [
          {
            data: Array.from({ length: 200 }, (value, index) => {
              return { x: index, y: Math.random() * 10 };
            }),
            borderColor: "red",
            borderWidth: 1,
            radius: 0,
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
      this.fetchKneepainStatistics();
    },
    async fetchKneepainStatistics() {
      try {
        this.$eventBus.emit("showLoading");
        const params = {
          from: this.startDateBar,
          to: this.endDate,
        };
        const { data } = await getKneePainStatistics(params);
        if (data?.kneePains) {
          const labels = data.kneePains.map((item) => {
            return KNEE_PAIN_STATUSES.find(
              (_item) => item.kneePain === _item.id
            )?.text;
          });
          const datas = data.kneePains.map((item) => {
            return item.count;
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
    async fetchKneePain() {
      try {
        this.$eventBus.emit("showLoading");
        const params = {
          from: this.startDateSlide,
          to: this.endDateSlide,
        };
        const { data } = await getKneePain(params);
        if (data?.kneePains) {
          const labels = data.kneePains.map((item) => {
            return moment(item.insertTime).format("MM/DD");
          });
          const datas = data.kneePains.map((item) => {
            return item.kneePain;
          });
          this.lineChartData = {
            ...this.lineChartData,
            labels: labels,
            datasets: [
              {
                ...this.lineChartData.datasets[0],
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
    dateRangeWeekSlide(type) {
      this.dateRangeSlide(type);
      this.fetchKneePain();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
</style>
