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
  name: "ProgressLineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "progress-line-chart",
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
  },
  data() {
    return {
      chartOptions: {
        // Hide legend on the top of the chart
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            type: "linear",
          },
        },
        // Self-stretch to the width of the parent
        responsive: true,
        maintainAspectRatio: false,
        // The position of the label is on the indexAxis
        indexAxis: this.indexAxis,
      },
    };
  },
};
</script>
