import { TODAY, WEEK, MONTH, SEMIANUAL, UP, DOWN } from "@/constants";
import moment from "moment";
export default {
  data() {
    return {
      startDateSlide: moment().subtract(6, "days").format("YYYY-MM-DD"),
      endDateSlide: moment().format("YYYY-MM-DD"),
      startDateSelected: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    };
  },
  methods: {
    dateRangeBar(type) {
      switch (type) {
        case TODAY:
          this.startDateBar = moment().format("YYYY-MM-DD");
          break;
        case WEEK:
          this.startDateBar = moment().subtract(6, "days").format("YYYY-MM-DD");
          break;
        case MONTH:
          this.startDateBar = moment()
            .subtract(30, "days")
            .format("YYYY-MM-DD");
          break;
        case SEMIANUAL:
          this.startDateBar = moment()
            .subtract(180, "days")
            .format("YYYY-MM-DD");
          break;
      }
    },
    dateRangeSlide(type) {
      switch (type) {
        case UP:
          if (this.endDateSlide !== this.endDate) {
            this.startDateSlide = moment(this.endDateSlide)
              .add(1, "days")
              .format("YYYY-MM-DD");
            this.endDateSlide = moment(this.startDateSlide)
              .add(6, "days")
              .format("YYYY-MM-DD");
          }
          break;
        case DOWN:
          this.endDateSlide = moment(this.startDateSlide)
            .subtract(1, "days")
            .format("YYYY-MM-DD");
          this.startDateSlide = moment(this.endDateSlide)
            .subtract(6, "days")
            .format("YYYY-MM-DD");
          break;
      }
    },
  },
};
