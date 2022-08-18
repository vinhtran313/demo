<template>
  <div class="mt-10-px">
    <Title class="d-flex justify-content-between">
      <span>被験者データ</span>
      <div class="d-flex justify-content-end align-items-center fw-4 fs-16">
        1234567890123456 / 花子
      </div>
    </Title>
    <div class="overalls">
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <OverallItem class="overall-item" to="user.examinees.steps">
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
                :height="110"
                :show-x="false"
                indexAxis="y"
              />
            </template>
          </OverallItem>
        </a-col>
        <a-col :span="12">
          <OverallItem
            class="overall-item"
            title="安静時脈拍数"
            content="60拍"
            to="user.examinees.hrs"
          >
            <template v-slot:icon>
              <IconImage
                :width="60"
                :height="60"
                :src="pulseIcon"
                :classWrapper="'fs-32 text-picton-blue'"
              />
            </template>
          </OverallItem>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <OverallItem class="overall-item" to="user.examinees.sleeps">
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
        </a-col>
        <a-col :span="12">
          <OverallItem class="overall-item" to="user.examinees.skin-temps">
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
                <div class="fw-4">会話</div>
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
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <OverallItem class="overall-item" to="user.examinees.talks">
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
        </a-col>
      </a-row>
    </div>
    <Title class="d-flex justify-content-between w-100">
      <span>デバイス登録</span>
      <div class="d-flex justify-content-end align-items-center fw-4 fs-16" />
    </Title>
    <div class="overalls">
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <OverallItem class="overall-item" to="user.examinees.silmee">
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
                <div class="fw-4">Silmee登録</div>
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
        </a-col>
        <a-col :span="12">
          <OverallItem class="overall-item" to="user.examinees.walk">
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
                <div class="fw-4">Walk登録</div>
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
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import OverallItem from "@/components/OverallItem.vue";
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
import Title from "@/components/admin/Title.vue";

// import { KNEE_PAIN_STATUSES, EMOTION_STATUSES } from "@/constants";
export default {
  name: "ExamineesShow",
  components: {
    OverallItem,
    BarChart,
    Title,
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
@import "@/assets/styles/common/variable.scss";
.overall-item {
  border: 2px solid $bg-title-primary-color;
  height: 120px;

  /deep/ .arrow-right-icon {
    margin-right: 10px;
    i {
      font-size: 2.5rem !important;
    }
  }
}
</style>
