<template>
  <div class="row" v-if="allData.length > 0">
    <div class="column" v-for="(data,index) in allData" :key="index">
      <a class="card" :href="data.url">{{data.title}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['allData'],
  data() {
    return {};
  },
};
</script>
