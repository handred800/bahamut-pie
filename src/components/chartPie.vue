<template>
  <v-chart :autoresize="true" :options="options"></v-chart>
</template>

<script>
export default {
  props: ['inputData'],
  data() {
    return {
      options: {
        tooltip: {},
        legend: {},
        dataset: {
          source: this.inputData,
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
            },
            encode: {
              itemName: 0,
              value: 1,
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
      console.log('refresh');
    },
  },
};
</script>
