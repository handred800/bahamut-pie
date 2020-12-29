<template>
  <div class="landing-page">
    <form class="card" @submit.prevent="searchUser">
      <div class="form-inline">
        <input type="text" class="form-input" placeholder="請輸入巴哈ID" v-model="ownerId" required/>
        <el-button type="primary">上車！</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      ownerId: '',
    };
  },
  methods: {
    searchUser() {
      this.isLoading = true;
      this.$emit('search', this.ownerId);
    },
  },
};
</script>
