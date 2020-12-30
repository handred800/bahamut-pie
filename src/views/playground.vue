<template>
<div>
  <div class="row" v-if="_.keys(groups).length > 1">
    <div class="col-33" v-for="(value, name, index) in totalDataset" :key="name + index">
      <div class="card chart-container">
        {{ $store.state.dictionary[name] }}
        <pie-chart :inputData="value"></pie-chart>
      </div>
    </div>
  </div>
  <el-button type="primary" @click="dialogVisible = true">建立群組</el-button>
  <el-dialog title="建立群組" :visible.sync="dialogVisible" width="80%" :destroy-on-close="true">
    <transfer-box :inputData="other" @returnData="createGroup"></transfer-box>
  </el-dialog>

  <div class="row">
    <div v-for="(groupArticles, groupName) in groups" :key="groupName" class="col-33">
      <div class="card">
        <h3>{{groupName}}(共{{groupArticles.length}}篇)</h3>
        <ul>
          <li v-for="article in groupArticles" :key="article.id">{{article.title}}</li>
        </ul>
        <el-button type="danger" @click="deleteGroup(groupName)" v-if="groupName !== '其他'">刪除群組</el-button>
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
      this.other = [...this.other, ...this.groups[groupName]];
      this.$delete(this.groups, groupName);
    },
  },
  computed: {
    articlesData() {
      return this._.cloneDeep(this.$store.state.allData);
    },
    totalDataset() {
      const vm = this;
      const keynames = ['count', 'gp', 'view'];
      const totalData = {};

      keynames.forEach((keyname) => {
        totalData[keyname] = [];
        vm._.forEach(vm.groups, (groupData, groupname) => {
          let total = 0;
          if (keyname === 'count') {
            total = groupData.length;
          } else {
            total = vm._.sumBy(groupData, (item) => item.meta[keyname]);
            // total = groupData.reduce((totalVal, currentObj) => totalVal + currentObj.meta[keyname], 0);
          }
          totalData[keyname].push([groupname, total]);
        });
      });
      console.log(totalData);

      return totalData;
    },
  },
  watch: {
    other: {
      immediate: true,
      handler() {
        this.$set(this.groups, '其他', this.other);
      },
    },
  },
  created() {
    this.other = this.articlesData;
  },
};
</script>
