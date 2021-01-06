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
    dashboardConfig: {
      barchartFilterConfig: {
        dataType: 'view',
        dataSortBy: 'date',
        dataLength: -1,
        dataRange: false,
        dataRangeMin: 0,
        dataRangeMax: 99999999,
      },
    },
    allData: [],
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setData(state, payload) {
      state.allData = payload;
    },
  },
  actions: {
    fetchUser({ commit }, payload) {
      commit('setIsLoading', true);
      fetch(`https://bahamut-home-article-cralwer.herokuapp.com?owner=${payload}`)
        .then((res) => res.json())
        .then(({ data }) => {
          sessionStorage.setItem('cacheData', JSON.stringify(data));
          commit('setData', data);
          commit('setIsLoading', false);
          router.push('/dashboard');
        });
    },
  },
  modules: {
  },
});
