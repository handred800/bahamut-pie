<template>
  <div id="app">
    <div class="nav" v-if="this.$router.currentRoute.path !== '/'">
      <router-link to="/dashboard">儀表板</router-link> |
      <router-link to="/articles">文章</router-link> |
      <router-link to="/playground">Playground</router-link>
    </div>
    <router-view :class="{'container': this.$router.currentRoute.path !== '/'}"/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
