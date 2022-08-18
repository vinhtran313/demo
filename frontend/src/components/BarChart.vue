<template>
  <Bar
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
import { Bar } from "vue-chartjs/legacy";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 200,
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
      default: () => [ChartDataLabels],
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
      default: false,
    },
    showX: {
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
  },
  data() {
    return {
      chartOptions: {
        // Hide legend on the top of the chart
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            anchor: "end",
            align: "right",
            offset: 5,
          },
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
            display: this.showX,
          },
          y: {
            grid: {
              display: this.displayGridY,
            },
          },
        },
      },
    };
  },
};
</script>
