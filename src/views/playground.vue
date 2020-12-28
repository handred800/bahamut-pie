<template>
<div>
  <div class="row">
    <div class="col-33" v-for="(value, name, index) in totalDataset" :key="name + index">
      <div class="card chart-container">
        <pie-chart :inputData="value"></pie-chart>
      </div>
    </div>
  </div>
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
import pieChart from '../components/chartPie.vue';

export default {
  props: ['articlesData'],
  components: { transferBox, pieChart },
  data() {
    return {
      transferOther: [],
      totalDataset: {
        count: [
          ['其他', 30],
          ['group1', 8],
        ],
        gp: [
          ['其他', 60],
          ['group1', 40],
        ],
        view: [
          ['其他', 1500],
          ['group1', 850],
        ],
      },
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
