<template>
  <v-chart :autoresize="true" :options="options"></v-chart>
</template>

<script>
export default {
  props: ['inputData', 'sessionRange'],
  data() {
    return {
      options: {
        tooltip: {
          formatter(params) {
            return `<b>${params.value[0]}</b> <br> ${params.value[1]}`;
          },
        },
        visualMap: {
          show: false,
        },
        dataset: {
          source: this.inputData,
        },
        calendar: {
          range: this.sessionRange,
          cellSize: ['auto', 30],
          yearLabel: {
            position: 'top',
            margin: 40,
          },
          monthLabel: {
            nameMap: 'cn',
            margin: 20,
          },
          dayLabel: {
            firstDay: 1,
            nameMap: 'cn',
          },
        },
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            encode: {
              value: 2,
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
    sessionRange(newRange) {
      this.options.calendar.range = newRange;
    },
  },
};
</script>
