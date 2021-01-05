<template>
  <v-chart :autoresize="true" :options="options"></v-chart>
</template>

<script>
export default {
  props: ['inputData'],
  data() {
    return {
      options: {
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0],
          },
          {
            type: 'slider',
            xAxisIndex: [0],
          },
          {
            type: 'inside',
            yAxisIndex: [0],
          },
          {
            type: 'slider',
            yAxisIndex: [0],
          },
        ],
        xAxis: {
          type: 'value',
          minInterval: 1,
          name: 'GP',
        },
        yAxis: {
          type: 'value',
          name: '觀看數',
        },
        dataset: {
          source: this.inputData,
        },
        tooltip: {},
        series: [
          {
            type: 'scatter',
            symbolSize: 10,
            large: true,
            encode: {
              x: 'gp',
              y: 'view',
            },
            tooltip: {
              formatter(obj) {
                const { title, gp, view } = obj.data;
                return `${title} <br> GP: ${gp} <br> 瀏覽: ${view}`;
              },
            },
          },
        ],
      },
    };
  },
  watch: {
    inputData(newData) {
      this.options.dataset.source = newData;
    },
  },
};
</script>
