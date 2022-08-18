<template>
  <div
    class="w-100 h-100 pb-15-px d-flex flex-column align-items-center justify-content-center overflow-hidden"
  >
    <div class="countdown-message">
      <div class="mt-20-px fw-7 fs-18 text-white">体力づくりプログラム</div>
      <div class="mt-5-px text-white">BPM 110</div>
      <div class="mt-5-px fw-7 primary-color">実行中</div>
    </div>
    <div class="mt-30-px timer-wrapper position-relative flex-1 w-100">
      <svg class="timer">
        <circle class="progress-frame" cx="120" cy="120" r="116" />
        <circle ref="progress" class="progress" cx="120" cy="120" r="116" />
      </svg>
      <div class="time">
        <span class="seconds">
          {{ minute }}
          <span class="d-inline-block mr-1-px ml-1-px" />
          {{ second }}
        </span>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-30-px">
      <Button type="primary" @click="handleStop">終了</Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import {
  getMinuteFromSecond,
  getSecondFromSecond,
  strPadLeft,
} from "@/utils/helper";
export default {
  name: "Mypage",
  components: {
    Button,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    showTimeList: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      countDown: this.item.time,
    };
  },
  computed: {
    second() {
      return strPadLeft(getSecondFromSecond(this.countDown), "0", 2);
    },
    minute() {
      return strPadLeft(getMinuteFromSecond(this.countDown), "0", 2);
    },
  },
  mounted() {
    this.countDownTimer();
  },
  methods: {
    countDownTimer() {
      let progressElm = this.$refs.progress;
      let circumference = 2 * Math.PI * progressElm.getAttribute("r");
      progressElm.style.strokeDasharray = circumference;
      progressElm.style.strokeDashoffset = circumference * 0;

      let totalTime = this.item.time;

      const count = () => {
        if (this.countDown === 0) return;
        this.countDown -= 1;
        let percentage = (this.countDown / totalTime) * 100;
        progressElm.style.strokeDashoffset =
          circumference - (percentage / 100) * circumference;
        setTimeout(count, 1000);
      };

      count();
    },
    handleStop() {
      this.showTimeList();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.countdown-message {
  background: $picton-blue-color;
  width: 100%;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    right: 0;
    left: 50%;
    transform: translateX(-50%);
    border-width: 15px 250px;
    border-color: $picton-blue-color transparent transparent transparent;
    border-style: solid;
  }
}

.timer-wrapper {
  .timer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 240px;
    height: 240px;
    transform: translate(-50%, -50%) rotate(90deg) scaleX(-1);
  }

  .progress-frame {
    fill: transparent;
    stroke: rgb(245, 78, 142);
    stroke-width: 5px;
  }

  .progress {
    fill: transparent;
    stroke: $argent-color;
    stroke-width: 5px;
    stroke-linecap: butt;
    transition: stroke-dashoffset 1s;
  }

  .time {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5.5rem;
    font-weight: bold;
    color: $primary-color;
  }
}
</style>
