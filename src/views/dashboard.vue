<template>
  <section>
    <div class="row">
      <div class="col-25" v-for="(val,name,index) in totalMeta" :key="name+index">
        <div class="card card-with-icon">
          <i class="card-icon" :class="['el-icon-document-copy','el-icon-view','el-icon-star-off','el-icon-coin'][index]"></i>
          <div class="card-content">
            <div class="card-meta">總{{$store.state.dictionary[name]}}</div>
            <div class="hero">{{val | currency}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-50">
        <div class="card chart-container">
          <div class="card-title">
            {{$store.state.dictionary[barchartFilterConfig.dataType]}}圖表
            <el-popover title="資料篩選" trigger="click" width="300" placement="right-start">
              <el-button class="float-right" icon="el-icon-setting" @click="dialogBarchart = true;" slot="reference"></el-button>
              <el-form size="mini" label-position="top">
                <el-form-item>
                  <el-select v-model="barchartFilterConfig.dataType">
                    <el-option value="view" label="觀看數圖表"></el-option>
                    <el-option value="gp" label="GP圖表"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="排列依據">
                  <el-select v-model="barchartFilterConfig.dataSortBy">
                    <el-option value="date" label="時間：新→舊"></el-option>
                    <el-option value="view" label="觀看數：高→低"></el-option>
                    <el-option value="gp" label="GP：高→低"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="顯示筆數">
                  <el-select v-model.number="barchartFilterConfig.dataLength">
                    <el-option :value="-1" label="全部"></el-option>
                    <el-option :value="10" label="前10筆"></el-option>
                    <el-option :value="30" label="前30筆"></el-option>
                    <el-option :value="50" label="前50筆"></el-option>
                    <el-option :value="100" label="前100筆"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-switch v-model="barchartFilterConfig.dataRange" active-text="套用區間"></el-switch>
                </el-form-item>
                <el-form-item>
                  <el-col :span="11">
                    <el-input-number controls-position="right" :min="0" v-model="barchartFilterConfig.dataRangeMin"></el-input-number>
                  </el-col>
                  <el-col :span="2"> ~ </el-col>
                  <el-col :span="11">
                    <el-input-number controls-position="right" :min="barchartFilterConfig.dataRangeMin" v-model="barchartFilterConfig.dataRangeMax"></el-input-number>
                  </el-col>
                </el-form-item>
                <el-button size="small" icon="el-icon-refresh" @click="resetChaetConfig('barchartFilterConfig')">重置</el-button>
              </el-form>
            </el-popover>
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
      dialogBarchart: false,
      barchartFilterConfig: {},
      calendarchart: {
        options: [],
        sessionRange: '',
      },
    };
  },
  methods: {
    resetChaetConfig(chartName) {
      this[chartName] = this._.cloneDeep(this.$store.state.dashboardConfig[chartName]);
    },
  },
  computed: {
    articlesData() {
      return this._.cloneDeep(this.$store.state.allData);
    },
    totalMeta() {
      const sumFunc = this._.sumBy;
      return {
        count: this.articlesData.length,
        view: sumFunc(this.articlesData, (item) => item.meta.view),
        gp: sumFunc(this.articlesData, (item) => item.meta.gp),
        coin: sumFunc(this.articlesData, (item) => item.meta.coin),
      };
    },
    barChartDataset() {
      const vm = this;
      const {
        dataType, dataSortBy, dataLength, dataRange, dataRangeMin, dataRangeMax,
      } = vm.barchartFilterConfig;

      let dataset = vm.articlesData;
      // 有套用數值區間
      if (dataRange) {
        dataset = dataset.filter((item) => vm._.inRange(item.meta[dataType], dataRangeMin, dataRangeMax));
      }
      // 有設定排序類型
      // if (dataSortBy !== 'default') dataset.sort((a, b) => b.meta[dataSortBy] - a.meta[dataSortBy]);
      if (dataSortBy === 'date') {
        dataset = vm._.sortBy(dataset, (item) => new Date(item.meta[dataSortBy])).reverse();
      } else {
        dataset = vm._.sortBy(dataset, (item) => item.meta[dataSortBy]).reverse();
      }
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

    this.barchartFilterConfig = this._.cloneDeep(this.$store.state.dashboardConfig.barchartFilterConfig);
  },
};
</script>
