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
      <div class="col-25">
        <div class="card">
          <div class="card-meta">總巴幣</div>
          <div class="hero">{{totalMeta.coin | currency}}</div>
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
            圖表，依照
            <select class="form-select" v-model="barchart.dataOrderBy">
              <option value="default">預設排列</option>
              <option value="view">觀看數排列</option>
              <option value="gp">gp排列</option>
            </select>
            顯示
            <select class="form-select" v-model.number="barchart.dataLength">
              <option value="10">前10筆</option>
              <option value="30">前30筆</option>
              <option value="50">前50筆</option>
              <option value="100">前100筆</option>
              <option value="-1">全部</option>
            </select>

            <input type="checkbox" class="form-checkbox" v-model="barchart.dataCap">
            去掉資料
            <select class="form-select" v-model="barchart.dataCapType">
              <option value="less">小於</option>
              <option value="more">大於</option>
            </select>
            <input type="number" class="form-input" min="0" v-model.number="barchart.dataCapValue">
          </div>

          <bar-chart :inputData="barChartDataset" v-if="articlesData.length > 0"></bar-chart>
        </div>
      </div>
      <div class="col-50">
        <div class="card chart-container">
          <div class="card-title">瀏覽 / GP 散佈圖</div>
          <scatter-chart :inputData="scatterDataset" v-if="articlesData.length > 0"></scatter-chart>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import uitil from '../uitil.vue';
import barChart from '../components/chartBar.vue';
import scatterChart from '../components/chartScatter.vue';

export default {
  // props: ['articlesData'],
  mixins: [uitil],
  components: { barChart, scatterChart },
  data() {
    return {
      totalMeta: {},
      barchart: {
        dataType: 'view',
        dataOrderBy: 'default',
        dataLength: -1,
        dataCap: false,
        dataCapValue: 0,
        dataCapType: 'less',
      },
    };
  },
  methods: {
    calculateMeta(targetArticles) {
      return {
        articleLength: targetArticles.length,
        gp: targetArticles.reduce((totalVal, currentObj) => totalVal + currentObj.meta.gp, 0),
        coin: targetArticles.reduce((totalVal, currentObj) => totalVal + currentObj.meta.coin, 0),
        view: targetArticles.reduce((totalVal, currentObj) => totalVal + currentObj.meta.view, 0),
      };
    },
  },
  computed: {
    articlesData() {
      return this._.cloneDeep(this.$store.state.allData);
    },
    barChartDataset() {
      const vm = this;
      const {
        dataType, dataOrderBy, dataLength, dataCap, dataCapType, dataCapValue,
      } = vm.barchart;

      let dataset = vm.articlesData;
      // 有設定數值漏斗
      if (dataCap) {
        if (dataCapType === 'less') {
          dataset = dataset.filter((item) => item.meta[dataType] >= dataCapValue);
        } else {
          dataset = dataset.filter((item) => item.meta[dataType] <= dataCapValue);
        }
      }
      // 有設定排序類型
      if (dataOrderBy !== 'default') dataset.sort((a, b) => b.meta[dataOrderBy] - a.meta[dataOrderBy]);
      // 有設定顯示筆數
      if (dataLength !== -1) dataset = dataset.slice(0, dataLength);

      dataset = [
        ['title', dataType],
        ...dataset.map((article) => [article.title, article.meta[dataType]]),
      ];

      return dataset;
    },
    scatterDataset() {
      let dataset = this.articlesData;
      dataset = dataset.map((article) => ({
        title: article.title,
        gp: article.meta.gp,
        view: article.meta.view,
      }));

      return dataset;
    },
  },
  watch: {
    articlesData: {
      immediate: true,
      handler() {
        this.totalMeta = this.calculateMeta(this.articlesData);
      },
    },
  },
  // created() {
  //   this.totalMeta = this.calculateMeta(this.articlesData);
  // },
};
</script>
