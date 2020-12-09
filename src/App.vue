<template>
  <div id="app">
    <div class="nav">
      <router-link to="/dashboard">儀表板</router-link> |
      <router-link to="/articles">文章</router-link>
    </div>
    <router-view :articlesData="allData"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allData: [],
    };
  },
  methods: {},
  created() {
    const vm = this;
    fetch('https://bahamut-home-article-cralwer.herokuapp.com/')
      .then((res) => res.json())
      .then((data) => {
        vm.allData = data.data;
      });
  },
};
</script>
