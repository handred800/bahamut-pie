<template>
  <el-form>
    <el-form-item label="群組名稱">
      <el-input v-model="transferTempName" placeholder="請輸入群組名稱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-transfer filterable v-model="transferTemp" :data="transferData" :titles="['可選文章', transferTempName]" filter-placeholder="關鍵字"></el-transfer>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="returnTemp" :disabled="transferTempName === '' || transferTemp.length <= 0">新增</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss">
.el-transfer {
  margin: auto;
}
.el-transfer-panel {
  width: 450px;
}
</style>
<script>
export default {
  props: ['inputData'],
  data() {
    return {
      transferTemp: [],
      transferTempName: '',
    };
  },
  computed: {
    transferData() {
      const data = this.inputData.map((item) => ({
        key: `${item.id}`,
        label: item.title,
      }));
      return data;
    },
  },
  methods: {
    returnTemp() {
      this.$emit('returnData', this.transferTemp, this.transferTempName);
    },
  },
};
</script>
