<template>
  <div class="landing-page">
    <form class="card" @submit.prevent="searchUser">
      <div class="form-inline">
        <input type="text" class="form-input" placeholder="請輸入巴哈ID" v-model="ownerId" required/>
        <button type="submit" class="btn btn-primary">上車！</button>
      </div>
    </form>
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
