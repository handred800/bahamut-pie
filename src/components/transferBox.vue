<template>
  <el-form :model="transferForm" :rules="rules" ref="form" status-icon>
    <el-form-item label="群組名稱" prop="tempName">
      <el-input v-model="transferForm.tempName" placeholder="請輸入群組名稱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-transfer filterable v-model="transferTemp" :data="transferData" :titles="['可選文章', transferForm.tempName]" filter-placeholder="關鍵字"></el-transfer>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="returnTemp" :disabled="transferTemp.length <= 0">新增</el-button>
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
  props: ['inputData', 'groupsName'],
  data() {
    const validateTempName = (rule, value, callback) => {
      const isDuplicate = this._.includes(this.groupsName, value);

      if (value === '') return callback(new Error('請輸入群組名稱'));
      if (isDuplicate) {
        return callback(new Error('群組名稱不能重複'));
      }
      return callback();
    };

    return {
      transferForm: {
        tempName: '',
      },
      rules: {
        tempName: [{ validator: validateTempName, trigger: 'blur' }],
      },
      transferTemp: [],
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
      this.$refs.form.validate((valid) => {
        if (valid) this.$emit('returnData', this.transferTemp, this.transferForm.tempName);
      });
    },
  },
};
</script>
