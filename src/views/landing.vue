<template>
  <div class="landing-page">
    <div class="landing-panel">
      <el-form class="card" :inline="true" @submit.prevent.native="searchUser">
        <el-form-item>
          <el-input type="text" placeholder="請輸入巴哈ID" v-model="ownerId" :required="true"></el-input>
          <!-- <input type="text" placeholder="請輸入巴哈ID" v-model="ownerId" required/> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="searchUser" :loading="isLoading">上車！</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
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
