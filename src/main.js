import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ECharts from 'vue-echarts';
import _ from 'lodash';
import '@/assets/scss/main.scss';
import App from './App.vue';
import router from './router';

// echart 元件
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataset';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import store from './store';

Vue.prototype._ = _;
Vue.use(ElementUI);
Vue.component('v-chart', ECharts);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
