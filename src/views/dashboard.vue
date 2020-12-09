<template>
  <div class="row">
    <div class="col-auto">
      <div class="card chart-container">
        <h2 class="card-title">圖表</h2>
        <button class="btn btn-primary" @click="updateChart('gp')">GP</button>
        <button class="btn btn-primary" @click="updateChart('view')">瀏覽</button>
        <v-chart :options="barchart" v-if="articlesData.length > 0"></v-chart>
      </div>
    </div>
    <div class="col-33">
      <div class="side-bar">
        <div class="card card-hoverable" v-for="(data, index) in articlesData" :key="index">
          <div class="card-title">{{ data.title }}</div>
          <div class="card-meta">
            <span>{{ data.meta.date }}</span>
            <span>gp: {{ data.meta.gp }}</span>
            <span>瀏覽: {{ data.meta.view }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articlesData'],
  data() {
    return {
      totalMeta: {},
      barchart: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: [
          { type: 'inside' },
          { type: 'slider' },
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
        series: [
          {
            type: 'bar',
            large: true,
          },
        ],
      },
    };
  },
  methods: {
    calculateMeta(targetArticles) {
      return {
        gp: targetArticles.reduce((totalVal, currentObj) => totalVal + currentObj.meta.gp, 0),
        view: targetArticles.reduce((totalVal, currentObj) => totalVal + currentObj.meta.view, 0),
      };
    },
    updateChart(name) {
      const vm = this;
      const data = {
        xAxis: {
          data: vm.articlesData.map((article) => article.title),
        },
        yAxis: {
          max: Math.max(...vm.articlesData.map((article) => article.meta[name])),
        },
        series: [
          {
            name,
            data: vm.articlesData.map((article) => article.meta[name]),
          },
        ],
      };

      vm.barchart = Object.assign(vm.barchart, data);
    },
  },
  watch: {
    articlesData() {
      this.totalMeta = this.calculateMeta(this.articlesData);
      console.log(this.totalMeta);
    },
  },
  mounted() {},
};
</script>
