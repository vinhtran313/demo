<template>
  <div class="background-bright-gray">
    <div class="progress-wrapper">
      <div class="progress-overlay background-white">
        <div class="battery-icon fs-20">
          <IconImage :src="batteryIcon" />
        </div>
        <div class="text-center">2022/04/09</div>
        <div class="async-icon fs-20" @click="renewOverall">
          <IconImage :src="updateIcon" />
        </div>

        <div class="ct-progress w-100 position-relative mt-10-px mb-10-px">
          <div class="arrow-left-icon">
            <a-icon type="left" class="fs-20 text-picton-blue" />
          </div>
          <div class="percent">
            <svg class="circle-wrapper">
              <circle cx="105" cy="105" r="100" />
              <circle cx="105" cy="105" r="100" style="--percent: 50" />
            </svg>
            <div class="number">
              <IconImage :src="footIcon" :classWrapper="'fs-20'" />
              <div class="fs-32 fw-7 mt-10-px mb-10-px">4,055</div>
              <div class="text-center">
                目標
                <br />
                10,000歩
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex w-100">
          <Statistics
            v-for="(statistic, index) in statistics"
            :key="index"
            :data="statistic.data"
            :title="statistic.title"
            :unit="statistic.unit"
          />
        </div>
      </div>
    </div>
    <div class="overalls">
      <OverallItem to="walks.index">
        <template v-slot:icon>
          <IconImage
            :width="60"
            :height="60"
            :src="walkIcon"
            :classWrapper="'fs-32 text-picton-blue'"
          />
        </template>
        <template v-slot:content>
          <BarChart
            :chartData="barChartData"
            :height="150"
            :show-x="false"
            indexAxis="y"
          />
        </template>
      </OverallItem>
      <OverallItem title="安静時脈拍数" content="60拍" to="heartbeats.index">
        <template v-slot:icon>
          <IconImage
            :width="60"
            :height="60"
            :src="pulseIcon"
            :classWrapper="'fs-32 text-picton-blue'"
          />
        </template>
      </OverallItem>
      <OverallItem to="sleeps.index">
        <template v-slot:icon>
          <IconImage
            :width="60"
            :height="60"
            :src="sleepIcon"
            :classWrapper="'fs-32 text-picton-blue'"
          />
        </template>
        <template v-slot:content>
          <div class="ml-20-px">
            <div class="fw-4">
              睡眠スコア
              <span class="ml-15-px">
                <span class="fw-7 fs-24 text-picton-blue mr-5-px">60</span>
                <sub>点</sub>
              </span>
            </div>
            <div class="ml-15-px fs-20 fw-7 text-picton-blue mt-10-px">
              8時間30分
            </div>
          </div>
        </template>
      </OverallItem>
      <OverallItem to="foods.index">
        <template v-slot:icon>
          <IconImage
            :width="60"
            :height="60"
            :src="foodIcon"
            :classWrapper="'fs-32 text-picton-blue'"
          />
        </template>
        <template v-slot:content>
          <div class="ml-20-px">
            <div class="fw-4">食事</div>
            <div
              v-if="overall.foodCount"
              class="ml-15-px fs-20 fw-7 text-picton-blue mt-10-px"
            >
              {{ overall.foodCount }}品目
            </div>
            <div v-else class="ml-15-px fs-16 fw-3 mt-10-px">
              データがありません
            </div>
          </div>
        </template>
      </OverallItem>
      <OverallItem to="knee-pains.index">
        <template v-slot:icon>
          <IconImage
            :width="60"
            :height="60"
            :src="kneeIcon"
            :classWrapper="'fs-32 text-picton-blue'"
          />
        </template>
        <template v-slot:content>
          <div class="ml-20-px">
            <div class="fw-4">膝の痛み</div>
            <div
              v-if="overall.kneePain"
              class="ml-15-px fs-20 fw-7 text-picton-blue mt-10-px"
            >
              {{ overall.kneePain | kneepain }}
            </div>
            <div v-else class="ml-15-px fs-16 fw-3 mt-10-px">
              データがありません
            </div>
          </div>
        </template>
      </OverallItem>
      <OverallItem to="moods.index">
        <template v-slot:icon>
          <IconImage
            :width="60"
            :height="60"
            :src="feelingIcon"
            :classWrapper="'fs-32 text-picton-blue'"
          />
        </template>
        <template v-slot:content>
          <div class="ml-20-px">
            <div class="fw-4">気分</div>
            <div
              v-if="overall.mood"
              class="ml-15-px fs-20 fw-7 text-picton-blue mt-10-px"
            >
              {{ overall.mood | mood }}
            </div>
            <div v-else class="ml-15-px fs-16 fw-3 mt-10-px">
              データがありません
            </div>
          </div>
        </template>
      </OverallItem>
      <OverallItem to="talks.index">
        <template v-slot:icon>
          <IconImage
            :width="60"
            :height="60"
            :src="''"
            :classWrapper="'fs-32 text-picton-blue'"
          />
        </template>
        <template v-slot:content>
          <div class="ml-20-px">
            <div class="fw-4">会話</div>
            <div
              v-if="overall.kneePain"
              class="ml-15-px fs-20 fw-7 text-picton-blue mt-10-px"
            >
              {{ overall.kneePain | kneepain }}
            </div>
            <div v-else class="ml-15-px fs-16 fw-3 mt-10-px">
              データがありません
            </div>
          </div>
        </template>
      </OverallItem>
      <OverallItem to="skin-temps.index">
        <template v-slot:icon>
          <IconImage
            :width="60"
            :height="60"
            :src="''"
            :classWrapper="'fs-32 text-picton-blue'"
          />
        </template>
        <template v-slot:content>
          <div class="ml-20-px">
            <div class="fw-4">皮膚温度</div>
            <div
              v-if="overall.kneePain"
              class="ml-15-px fs-20 fw-7 text-picton-blue mt-10-px"
            >
              {{ overall.kneePain | kneepain }}
            </div>
            <div v-else class="ml-15-px fs-16 fw-3 mt-10-px">
              データがありません
            </div>
          </div>
        </template>
      </OverallItem>
      <OverallItem :hasRightIcon="false">
        <template v-slot:icon>
          <a-icon type="cloud" class="fs-32 text-picton-blue" />
        </template>
        <template v-slot:content>
          <div class="d-flex">
            <div class="w-50 text-center">
              今日の天気
              <div class="text-persian-red temperature-separate">
                <span class="fw-7 fs-24">{{ weather.temperatureMax }}</span>
                ℃
              </div>
            </div>
            <div class="w-50 text-center">
              東京都港区
              <div class="text-silver-lake-blue">
                <span class="fw-7 fs-24">{{ weather.temperatureMin }}</span>
                ℃
              </div>
            </div>
          </div>
        </template>
      </OverallItem>
    </div>
  </div>
</template>

<script>
import OverallItem from "../../components/OverallItem.vue";
import Statistics from "./components/Statistics.vue";
import BarChart from "@/components/BarChart";
import { getOverall } from "@/apis/home";
import { getCurrentWeather } from "@/apis/weathers";
import UpdateIcon from "@/assets/icons/top/update_256.svg";
import FootIcon from "@/assets/icons/top/foot.svg";
import WalkIcon from "@/assets/icons/top/walk_256.svg";
import PulseIcon from "@/assets/icons/top/pulse_256.svg";
import SleepIcon from "@/assets/icons/top/sleep_256.svg";
import FoodIcon from "@/assets/icons/top/food_256.svg";
import KneeIcon from "@/assets/icons/top/knee_256.svg";
import FeelingIcon from "@/assets/icons/top/feeling_256.svg";
import BatteryIcon from "@/assets/icons/top/battery_256.svg";
// import { KNEE_PAIN_STATUSES, EMOTION_STATUSES } from "@/constants";
export default {
  name: "Home",
  components: {
    Statistics,
    OverallItem,
    BarChart,
  },
  created() {
    this.fetchBulkApi();
    this.updateIcon = UpdateIcon;
    this.footIcon = FootIcon;
    this.walkIcon = WalkIcon;
    this.pulseIcon = PulseIcon;
    this.sleepIcon = SleepIcon;
    this.foodIcon = FoodIcon;
    this.kneeIcon = KneeIcon;
    this.feelingIcon = FeelingIcon;
    this.batteryIcon = BatteryIcon;
  },
  data() {
    return {
      statistics: [
        {
          title: "歩行速度",
          unit: "m/分",
          data: 70.1,
        },
        {
          title: "歩行リズム",
          unit: "歩数/分",
          data: 109.9,
        },
        {
          title: "エネルギー消費",
          unit: "歩",
          data: 36,
        },
      ],
      overall: {},
      weather: {},
      barChartData: {
        labels: ["しっかり歩行", "せいかつ歩行", "座っている"],
        datasets: [
          {
            backgroundColor: ["#339900", "#99CC00", "#FFFF00"],
            data: [2, 5, 7],
          },
        ],
      },
    };
  },
  methods: {
    async fetchBulkApi() {
      try {
        this.$eventBus.emit("showLoading");
        await Promise.all([this.fetchOverall(), this.fetchCurrentWeather()]);
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    async fetchOverall() {
      const { data } = await getOverall();
      this.overall = data;
    },
    async fetchCurrentWeather() {
      const params = {
        lat: this.$store.state.lat,
        lon: this.$store.state.long,
      };
      const { data } = await getCurrentWeather(params);
      this.weather = data.weather;
    },
    renewOverall() {
      this.fetchBulkApi();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/common/variable.scss";
.progress-wrapper {
  width: 100%;
  position: relative;

  .progress-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;

    .async-icon {
      position: absolute;
      top: 2px;
      right: 10px;
      color: $white-color;
      padding: 8px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .battery-icon {
      position: absolute;
      top: 0px;
      left: 10px;
      color: $white-color;
      padding: 5px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &::after {
        position: absolute;
        content: "Silmee";
        top: 30px;
        left: -2px;
        padding: 5px;
        color: $text-color;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
      }
    }

    .arrow-left-icon {
      position: absolute;
      top: 50%;
      left: 10px;
    }
  }
}

.overalls {
  padding: 10px;
}

.temperature-separate {
  border-right: 2px solid $argent-color;
}
</style>
