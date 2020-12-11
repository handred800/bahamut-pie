<template>
  <div id="app">
    <div class="nav">
      <router-link to="/dashboard">儀表板</router-link> |
      <router-link to="/articles">文章</router-link> |
      <router-link to="/playground">Playground</router-link>
    </div>
    <router-view :articlesData="allData" @search="searchUser"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allData: [],
    };
  },
  methods: {
    searchUser(id) {
      const vm = this;
      fetch(`https://bahamut-home-article-cralwer.herokuapp.com?owner=${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          vm.allData = data.data;
          vm.$router.push('/dashboard');
        });
    },
  },
  created() {

  },
};
</script>
