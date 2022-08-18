<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: 200,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    indexAxis: {
      type: String,
      default: "x",
    },
    displayGridX: {
      type: Boolean,
      default: true,
    },
    displayGridY: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          datasets: [
            {
              backgroundColor: "red",
              data: [],
            },
          ],
        };
      },
    },
    customLabels: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chartOptions: {
        // Hide legend on the top of the chart
        plugins: {
          legend: {
            display: false,
          },
          display: false,
        },
        // Self-stretch to the width of the parent
        responsive: true,
        maintainAspectRatio: false,
        // The position of the label is on the y-axis
        indexAxis: this.indexAxis,
        scales: {
          x: {
            grid: {
              display: this.displayGridX,
            },
          },
          y: {
            display: true,
            grid: {
              display: this.displayGridY,
            },
            ticks: {
              beginAtZero: false,
              callback: (value, index) => {
                const xLabels = [
                  "しっかり 歩行",
                  "せいかつ 歩行",
                  "座っている",
                  "横になって いる",
                ];
                if (Number.isInteger(value)) {
                  if (this.customLabels) {
                    return xLabels[index];
                  }
                  return value;
                }
              },
              stepSize: 1,
            },
          },
        },
      },
    };
  },
};
</script>
