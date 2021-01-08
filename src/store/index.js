import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dictionary: {
      count: '文章數',
      coin: '巴幣',
      gp: 'GP',
      view: '觀看數',
    },
    ownerId: '',
    allData: [],
    isLoading: false,
    dashboardConfig: {
      barchartFilterConfig: {
        dataType: 'view',
        dataSortBy: 'date',
        dataLength: -1,
        dataRange: false,
        dataRangeMin: 0,
        dataRangeMax: 99999999,
      },
      scatterchartFilterConfig: {
        dataType: 'date',
        dataLength: -1,
        viewRange: false,
        viewRangeMin: 0,
        viewRangeMax: 99999999,
        gpRange: false,
        gpRangeMin: 0,
        gpRangeMax: 99999999,
      },
    },
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setOwnerId(state, payload) {
      state.ownerId = payload;
    },
    setData(state, payload) {
      state.allData = payload;
    },
    clearData(state) {
      state.allData = [];
      sessionStorage.clear('cacheData');
    },
    createNotify(state, payload) {
      const options = {
        duration: 3000,
        offset: 80,
      };

      Object.assign(options, payload);
      this._vm.$notify(options);// eslint-disable-line
    },
  },
  actions: {
    fetchData({ commit }, payload) {
      commit('setIsLoading', true);
      fetch(`https://bahamut-home-article-cralwer.herokuapp.com?owner=${payload}`)
        .then((res) => res.json())
        .then(({ data }) => {
          sessionStorage.setItem('cacheData', JSON.stringify(data));
          commit('setData', data);
          commit('setIsLoading', false);
          commit('createNotify', {
            title: '資料載入完成',
            type: 'success',
          });
          router.push('/dashboard');
        })
        .catch((error) => {
          console.log(error);
          commit('createNotify', {
            title: '載入錯誤，請看console',
            type: 'error',
          });
        });
    },
  },
  modules: {
  },
});
