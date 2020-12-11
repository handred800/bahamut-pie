<template>
  <v-chart :autoresize="true" :options="options"></v-chart>
</template>

<script>
const themeColor = '#42b983';
export default {
  props: ['inputData'],
  data() {
    return {
      options: {
        color: [themeColor],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: [
          { type: 'inside' },
          {
            type: 'slider',
            fillerColor: 'rgba(66,185,131,0.25)',
            textStyle: {
              color: '#999',
            },
            dataBackground: {
              lineStyle: {
                color: 'rgba(66,185,131,0.5)',
              },
              areaStyle: {
                color: 'rgba(66,185,131,0.5)',
              },
            },
          },
        ],
        xAxis:
        {
          type: 'category',
          show: false,
        },
        yAxis:
        {
          type: 'value',
        },
        dataset: {
          source: this.inputData,
        },
        series: [
          {
            type: 'bar',
            encode: {
              x: 0,
              y: 1,
              tooltip: [1],
            },
          },
        ],
      },
    };
  },
  watch: {
    inputData(newData) {
      this.options.dataset.source = newData;
      const allData = newData.slice(1, -1);
      this.options.yAxis.max = Math.max(...allData.map((item) => item[1]));
    },
  },
};
</script>
