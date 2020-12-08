<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">儀錶板</router-link> |
      <router-link to="/articles">文章</router-link>
    </div>
    <router-view :allData="allData"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allData: [],
    };
  },
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
