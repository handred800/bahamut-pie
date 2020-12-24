<template>
  <div>
    <el-transfer filterable v-model="transferTemp" :data="transferData"></el-transfer>
    <el-button type="primary" @click="returnTemp">新增</el-button>
  </div>
</template>
<style lang="scss">
.el-transfer {
  margin: auto;
}
.el-transfer-panel {
  width: 400px;
}
</style>
<script>
export default {
  props: ['inputData'],
  data() {
    const generateData = () => {
      const data = this.inputData.map((item, index) => ({
        key: `${item.meta.date}${index}`,
        label: item.title,
      }));
      return data;
    };
    return {
      transferData: generateData(),
      transferTemp: [],
    };
  },
  methods: {
    returnTemp() {
      this.$emit('returnData', this.transferTemp);
    },
  },
};
</script>
