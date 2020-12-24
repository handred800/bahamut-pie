<template>
<div>
  <transfer-box :inputData="transferOther" @returnData="createGroup"></transfer-box>
</div>
</template>
<style lang="scss">
  .el-transfer{
    margin: auto;
  }
  .el-transfer-panel{
    width: 400px;
  }
</style>
<script>
import transferBox from '../components/transferBox.vue';

export default {
  props: ['articlesData'],
  components: { transferBox },
  data() {
    return {
      transferOther: [],
    };
  },
  methods: {
    createGroup(temp) {
      console.log(temp);
    },
  },
  watch: {
    articlesData() {
      this.transferOther = this._.cloneDeep(this.articlesData);
    },
  },
  created() {
    this.transferOther = this._.cloneDeep(this.articlesData);
  },
};
</script>
