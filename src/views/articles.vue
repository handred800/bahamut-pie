<template>
<div>
  <div class="card">
    <el-input v-model="keyword" placeholder="關鍵字">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <span v-if="keyword!==''">找到{{articleListFilted.length}}篇文</span>
  </div>
  <div v-if="articlesData.length > 0">
    <transition-group name="article-list" class="row">
      <div class="col-33 article-list" v-for="(data,index) in articleListFilted" :key="`${data.meta.date}-${index}`">
        <a class="card card-hoverable" :href="data.url" target="_blank">
          <div class="card-title">{{data.title}}</div>
          <div class="card-meta">
            <span>{{data.meta.date}}</span>
            <span>gp: {{data.meta.gp}}</span>
            <span>瀏覽: {{data.meta.view}}</span>
          </div>
        </a>
      </div>
    </transition-group>
    <el-backtop></el-backtop>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
    };
  },
  computed: {
    articlesData() {
      return this._.cloneDeep(this.$store.state.allData);
    },
    articleListFilted() {
      const vm = this;
      const articles = vm._.cloneDeep(vm.articlesData);

      if (vm.keyword === '') return articles;
      return articles.filter((article) => article.title.toLowerCase().includes(vm.keyword.toLowerCase()));
    },
  },
};
</script>
