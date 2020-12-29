import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allData: [],
    ownerId: '',
    isLoading: false,
  },
  mutations: {
    setOwnerId(state, payload) {
      state.ownerId = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setData(state, payload) {
      state.allData = payload;
      router.push('/dashboard');
    },
  },
  actions: {
    fetchUser({ commit }, payload) {
      commit('setIsLoading', true);
      commit('setOwnerId', payload);
      fetch(`https://bahamut-home-article-cralwer.herokuapp.com?owner=${payload}`)
        .then((res) => res.json())
        .then(({ data }) => {
          commit('setData', data);
          commit('setIsLoading', false);
        });
    },
  },
  modules: {
  },
});
