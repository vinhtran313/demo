import Vue from "vue";
import moment from "moment";

Vue.filter("formatDateMonth", (time) => moment(time).format("MM月DD日"));
Vue.filter("formatDateMonthHourMinute", (time) =>
  moment(time).format("MM月DD日 HH:MM")
);
Vue.filter("formatDateFull", (time) => moment(time).format("YYYY/MM/DD HH:mm"));

Vue.filter("area", (areaId) => {
  switch (areaId) {
    case 1:
      return "板橋";
    case 2:
      return "千代田";
    case 3:
      return "外来";
  }
});

Vue.filter("mood", (moodId) => {
  switch (moodId) {
    case 1:
      return "とても気分がいい";
    case 2:
      return "少し気分がいい";
    case 3:
      return "普通";
    case 4:
      return "少し気分が悪い";
    case 5:
      return "とても気分が悪い";
  }
});

Vue.filter("kneepain", (kneepainId) => {
  switch (kneepainId) {
    case 1:
      return "全く痛くない";
    case 2:
      return "あまり痛くない";
    case 3:
      return "やや痛い";
    case 4:
      return "かなり痛い";
    case 5:
      return "とても痛い";
  }
});
