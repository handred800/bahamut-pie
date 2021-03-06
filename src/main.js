import Vue from 'vue';
import ElementUI from 'element-ui';
import '@/assets/theme/index.css';
// import 'element-ui/lib/theme-chalk/index.css';
import ECharts from 'vue-echarts';
import _ from 'lodash';
import VueGtag from 'vue-gtag';
import Hotjar from 'vue-hotjar';
import '@/assets/scss/main.scss';
import App from './App.vue';
import router from './router';

// echart 元件
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/dataset';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/calendar';
import 'echarts/lib/component/visualMap';
import store from './store';

Vue.prototype._ = _;
Vue.use(ElementUI);
Vue.component('v-chart', ECharts);
Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: 'G-BNX0T2NJ85' },
}, router);

Vue.use(Hotjar, {
  id: '2194240',
});

router.beforeEach((to, from, next) => {
  if (to.meta.needData) {
    if (store.state.allData.length === 0) {
      const allData = sessionStorage.cacheData ? JSON.parse(sessionStorage.cacheData) : [];
      if (allData.length === 0) {
        next('/');
      } else {
        store.commit('setData', allData);
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
