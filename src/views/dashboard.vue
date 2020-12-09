<template>
  <section>
    <div class="row">
      <div class="col-25">
        <div class="card">
          <div class="card-meta">文章總數</div>
          <div class="hero">{{totalMeta.articleLength | currency}}</div>
        </div>
      </div>
      <div class="col-25">
        <div class="card">
          <div class="card-meta">總觀看數</div>
          <div class="hero">{{totalMeta.view | currency}}</div>
        </div>
      </div>
      <div class="col-25">
        <div class="card">
          <div class="card-meta">總GP數</div>
          <div class="hero">{{totalMeta.gp | currency}}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-50">
        <div class="card chart-container">
          <div class="form-inline">
            <select class="form-select" v-model="barchart.dataType">
              <option value="view">瀏覽數</option>
              <option value="gp">GP數</option>
            </select>
            <span class="card-title">圖表 </span>
            <select class="form-select" v-model="barchart.dataOrderBy">
              <option value="default">預設排列</option>
              <option value="view">依觀看數排列</option>
              <option value="gp">依gp排列</option>
            </select>
          </div>
          <v-chart :autoresize="true" :options="chartsOption.barchart" v-if="articlesData.length > 0"></v-chart>
        </div>
      </div>
      <div class="col-50">
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
  </section>
</template>

<script>
import uitil from '../uitil.vue';

export default {
  props: ['articlesData'],
  mixins: [uitil],
  data() {
    return {
      totalMeta: {},
      barchart: {
        dataType: 'view',
        dataOrderBy: 'default',
      },
      chartsOption: {
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
            axixTick: {
              inside: true,
            },
          },
          series: [
            {
              type: 'bar',
              large: true,
            },
          ],
        },
      },
    };
  },
  methods: {
    calculateMeta(targetArticles) {
      return {
        articleLength: targetArticles.length,
        gp: targetArticles.reduce((totalVal, currentObj) => totalVal + currentObj.meta.gp, 0),
        view: targetArticles.reduce((totalVal, currentObj) => totalVal + currentObj.meta.view, 0),
      };
    },
    updateChart() {
      const vm = this;
      const { dataType, dataOrderBy } = vm.barchart;
      const articlesData = vm._.cloneDeep(vm.articlesData);
      if (dataOrderBy !== 'default') {
        articlesData.sort((a, b) => b.meta[dataOrderBy] - a.meta[dataOrderBy]);
      }

      const data = {
        xAxis: {
          data: articlesData.map((article) => article.title),
        },
        yAxis: {
          max: Math.max(...articlesData.map((article) => article.meta[dataType])),
        },
        series: [
          {
            name: dataType,
            data: articlesData.map((article) => article.meta[dataType]),
          },
        ],
      };

      vm.chartsOption.barchart = vm._.merge(vm._.cloneDeep(vm.chartsOption.barchart), data);
    },
  },
  watch: {
    articlesData() {
      this.totalMeta = this.calculateMeta(this.articlesData);
    },
    barchart: {
      deep: true,
      handler() {
        this.updateChart();
      },
    },
  },
  mounted() {},
};
</script>
