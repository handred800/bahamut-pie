<template>
  <div class="card chart-container">
    <div class="card-title">瀏覽/GP 離散圖</div>
    <v-chart :autoresize="true" :options="options"></v-chart>
  </div>
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
        },
        yAxis: {
          type: 'value',
        },
        dataset: {
          source: [],
        },
        tooltip: {},
        series: [
          {
            type: 'scatter',
            symbolSize: 10,
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
  created() {
    let scatterData = this._.cloneDeep(this.inputData);
    scatterData = scatterData.map((article) => ({
      title: article.title,
      gp: article.meta.gp,
      view: article.meta.view,
    }));

    this.options.dataset.source = scatterData;
    console.log(this.options.dataset.source);
  },
};
</script>
