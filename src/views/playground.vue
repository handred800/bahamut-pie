<template>
<div>
  <ul v-for="(groupArticles, groupName) in groups" :key="groupName">
    <h3>{{groupName}}</h3>
    <li v-for="article in groupArticles" :key="article.id">{{article.title}}</li>
    <el-button type="danger" @click="deleteGroup(groupName)">刪除群組</el-button>
  </ul>
  <el-dialog title="建立群組" :visible.sync="dialogVisible" width="80%" :destroy-on-close="true">
    <transfer-box :inputData="other" @returnData="createGroup"></transfer-box>
  </el-dialog>
  <el-button type="primary" @click="dialogVisible = true">建立群組</el-button>
  <div class="row">
    <div class="col-33" v-for="(value, name, index) in totalDataset" :key="name + index">
      <div class="card chart-container">
        <pie-chart :inputData="value"></pie-chart>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import transferBox from '../components/transferBox.vue';
import pieChart from '../components/chartPie.vue';

export default {
  components: { transferBox, pieChart },
  data() {
    return {
      dialogVisible: false,
      other: [],
      groups: {},
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
    createGroup(tempIdArray, tempName) {
      const vm = this;
      const tempGroup = [];
      vm.dialogVisible = false;

      tempIdArray.forEach((tempId) => {
        const targetIndex = vm._.findIndex(vm.other, (otherItem) => otherItem.id === tempId);
        const target = vm.other.splice(targetIndex, 1);
        tempGroup.push(...target);
      });
      console.log(tempGroup);
      vm.$set(vm.groups, tempName, tempGroup);
    },
    deleteGroup(groupName) {
      console.log(this.groups[groupName]);
      this.other = [...this.other, ...this.groups[groupName]];
      this.$delete(this.groups, groupName);
    },
  },
  computed: {
    articlesData() {
      return this._.cloneDeep(this.$store.state.allData);
    },
  },
  // watch: {
  //   articlesData: {
  //     immediate: true,
  //     handler() {
  //       this.other = this.articlesData;
  //     },
  //   },
  // },
  created() {
    this.other = this.articlesData;
  },
};
</script>
