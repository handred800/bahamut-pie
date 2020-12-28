<template>
  <div class="landing-page">
    <el-form class="card" :inline="true">
      <el-form-item>
        <el-input type="text" placeholder="請輸入巴哈ID" v-model="ownerId" :required="true"></el-input>
        <!-- <input type="text" placeholder="請輸入巴哈ID" v-model="ownerId" required/> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchUser">上車！</el-button>
      </el-form-item>
    </el-form>
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
      this.$emit('search', this.ownerId);
    },
  },
};
</script>
