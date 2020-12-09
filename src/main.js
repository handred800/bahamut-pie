import Vue from 'vue';
import ECharts from 'vue-echarts';
import '@/assets/scss/main.scss';
import App from './App.vue';
import router from './router';

import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';

Vue.component('v-chart', ECharts);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
