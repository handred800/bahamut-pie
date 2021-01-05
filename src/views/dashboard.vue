<template>
  <section>
    <div class="row">
      <div class="col-25">
        <div class="card">
          <div class="card-meta">文章總數</div>
          <div class="hero">{{totalMeta.count | currency}}</div>
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
    <div class="row">
      <div class="col-auto">
        <div class="card chart-container calendar-container">
          <div class="card-title">文章年表</div>
          <el-select
            v-model="calendarchart.sessionRange"
            filterable
            placeholder="請選擇年分"
            no-match-text="查無年分"
            no-data-text="年分錯誤">
            <el-option
            v-for="option in calendarchart.options"
            :value="option.toString()"
            :label="option"
            :key="option">
            </el-option>
          </el-select>
          <calendar-chart :inputData="calenderDataset" :sessionRange="calendarchart.sessionRange" v-if="articlesData.length > 0"></calendar-chart>
          <p>年總數：{{calenderDataset.length}}篇</p>
          <p>月平均：{{_.round(calenderDataset.length / 12, 1)}}篇</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import uitil from '../uitil.vue';
import barChart from '../components/chartBar.vue';
import scatterChart from '../components/chartScatter.vue';
import calendarChart from '../components/chartCalendar.vue';

export default {
  // props: ['articlesData'],
  mixins: [uitil],
  components: { barChart, scatterChart, calendarChart },
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
      calendarchart: {
        options: [],
        sessionRange: '',
      },
    };
  },
  methods: {
    calculateMeta(targetArticles) {
      const sumFunc = this._.sumBy;
      return {
        count: targetArticles.length,
        gp: sumFunc(targetArticles, (item) => item.meta.gp),
        coin: sumFunc(targetArticles, (item) => item.meta.coin),
        view: sumFunc(targetArticles, (item) => item.meta.view),
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
      return this.articlesData.map((article) => ({
        title: article.title,
        gp: article.meta.gp,
        view: article.meta.view,
      }));
    },
    calenderDataset() {
      const vm = this;
      let dataset = this.articlesData.map((article) => ([
        article.meta.date,
        article.title,
        article.meta.view,
      ]));
      dataset = dataset.filter((item) => vm._.includes(item[0], vm.calendarchart.sessionRange));
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
  created() {
    const nowYear = new Date().getFullYear();
    this.calendarchart.sessionRange = nowYear.toString();
    this.calendarchart.options = (() => {
      const options = [];
      for (let i = 1996; i <= nowYear; i += 1) {
        options.push(i);
      }
      return options.reverse();
    })();
  },
};
</script>
