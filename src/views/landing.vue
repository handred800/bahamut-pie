<template>
  <main class="landing-page">
    <div class="landing-panel">
      <form class="landing-searchbar" @submit.prevent="searchUser">
        <input type="text" v-model="ownerId" placeholder="請輸入巴哈ID(帳號)" required>
        <el-button
          type="primary"
          native-type="submit"
          @click="searchUser"
          :loading="isLoading">
        {{isLoading ? '烘焙中...' : '來點派！'}}
        </el-button>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      ownerId: '',
    };
  },
  methods: {
    searchUser() {
      this.$store.dispatch('fetchUser', this.ownerId);
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
