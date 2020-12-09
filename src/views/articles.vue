<template>
  <div class="row" v-if="articlesData.length > 0">
    <div class="col-33" v-for="(data,index) in articlesData" :key="index">
      <a class="card card-hoverable" :href="data.url">
        <div class="card-title">{{data.title}}</div>
        <div class="card-meta">
          <span>{{data.meta.date}}</span>
          <span>{{data.meta.gp}}</span>
          <span>{{data.meta.view}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articlesData'],
  data() {
    return {};
  },
};
</script>
