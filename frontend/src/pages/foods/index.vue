<template>
  <div
    class="h-100 pt-5-px pl-15-px pr-15-px w-100 d-flex flex-column align-items-center justify-content-between"
  >
    <div
      class="w-100 d-flex align-items-center justify-content-between mt-10-px"
    >
      <Ribbon type="left" @click="() => dateRangeWeekSlide(DOWN)">前</Ribbon>
      <!-- <div class="flex-1 text-center fw-7 food-title">
        「食事日記」最近の1週間
      </div> -->
      <Ribbon
        type="right"
        @click="() => dateRangeWeekSlide(UP)"
        :disabled="endDate === endDateSlide"
      >
        次
      </Ribbon>
    </div>
    <div class="w-100 flex-1 mt-15-px">
      <table class="food-table">
        <thead>
          <th class="bg-th fw-7">食 品</th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="bg-th fw-7"
          >
            {{ column }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dataSource" :key="index">
            <td :class="`c-td-${index} fw-7`">{{ data.text }}</td>
            <td
              v-for="(item, index1) in data.items"
              :key="index1"
              :class="{ [`bg-td-${index}`]: item }"
            />
          </tr>
        </tbody>
      </table>
      <div
        class="w-100 d-flex align-items-center justify-content-center c-td-9 mt-10-px fw-7 fs-20 text-center"
      >
        色が塗ってあるところが、その日に食べたものだよ。あまり食べられなかった食品は何かな?
      </div>
    </div>
  </div>
</template>

<script>
import Ribbon from "@/components/Ribbon";
import DateChart from "../../mixins/DateChart";
import { getFood } from "@/apis/foods";
import moment from "moment";
import { UP, DOWN } from "@/constants";
export default {
  name: "Food",
  components: {
    Ribbon,
  },
  mixins: [DateChart],
  created() {
    this.UP = UP;
    this.DOWN = DOWN;
    this.fetchFood();
  },
  data() {
    return {
      columns: [],
      dataSource: [],
      startDateSlide: moment().subtract(7, "days").format("YYYY-MM-DD"),
      endDateSlide: moment().subtract(1, "days").format("YYYY-MM-DD"),
      endDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
    };
  },
  methods: {
    initDataSource() {
      this.dataSource = [
        {
          text: "肉",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          text: "魚",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          text: "卵",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          text: "豆類",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          text: "乳製品",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          text: "野菜",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          text: "海藻",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          text: "いも",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          text: "果物",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          text: "油料理",
          items: [0, 0, 0, 0, 0, 0, 0],
        },
      ];
    },
    async fetchFood() {
      try {
        this.$eventBus.emit("showLoading");
        this.getDateColumn();
        this.initDataSource();
        const params = {
          from: this.startDateSlide,
          to: this.endDateSlide,
        };
        const { data } = await getFood(params);
        if (data?.foods) {
          this.getDataSource(data.foods);
        }
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    dateRangeWeekSlide(type) {
      this.dateRangeSlide(type);
      this.fetchFood();
    },
    getDateColumn() {
      this.columns = [];
      var weekLength = 6;
      while (weekLength >= 0) {
        this.columns.push(
          moment(this.endDateSlide).subtract(weekLength, "days").format("M/D")
        );
        weekLength--;
      }
    },
    getDataSource(data) {
      if (data?.length > 0) {
        data.forEach((item) => {
          const indexDateInWeek = this.columns.findIndex(
            (_item) => _item === moment(item.date).format("M/D")
          );
          for (let i = 1; i <= 10; i++) {
            this.dataSource[i - 1].items[indexDateInWeek] = item[`food${i}`];
          }
          this.$forceUpdate();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.food-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  th,
  td {
    border: 1.5px solid black;

    @media screen and (max-width: 360px) {
      font-size: 1.5rem;
    }

    @media screen and (max-width: 340px) {
      font-size: 1.4rem;
    }

    @media screen and (max-width: 320px) {
      font-size: 1.2rem;
    }

    &:not(:first-child) {
      border-left: 0;
    }
  }

  tr:first-child {
    td {
      border-top: 0;
    }
  }
  tr:not(:last-child) {
    td {
      border-bottom: 0;
    }
  }
}
.bg-th {
  background: $thead-light-green-color;
}
.c-td-0 {
  color: $tbody-red-color;
}
.c-td-1 {
  color: $tbody-blue-color;
}
.c-td-2 {
  color: $tbody-gray-color;
}
.c-td-3 {
  color: $tbody-green-color;
}
.c-td-4 {
  color: $tbody-yellow-color;
}
.food-title,
.c-td-5 {
  color: $tbody-light-green-color;
}
.c-td-6 {
  color: $tbody-dark-green-color;
}
.c-td-7 {
  color: $tbody-dark-yellow-color;
}
.c-td-8 {
  color: $tbody-pink-color;
}
.c-td-9 {
  color: $tbody-orange-color;
}
.bg-td-0 {
  background: $tbody-red-color;
}
.bg-td-1 {
  background: $tbody-blue-color;
}
.bg-td-2 {
  background: $tbody-gray-color;
}
.bg-td-3 {
  background: $tbody-green-color;
}
.bg-td-4 {
  background: $tbody-yellow-color;
}
.bg-td-5 {
  background: $tbody-light-green-color;
}
.bg-td-6 {
  background: $tbody-dark-green-color;
}
.bg-td-7 {
  background: $tbody-dark-yellow-color;
}
.bg-td-8 {
  background: $tbody-pink-color;
}
.bg-td-9 {
  background: $tbody-orange-color;
}
</style>
