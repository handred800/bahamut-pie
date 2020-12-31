<template>
<div class="row">
  <div class="col-33">
    <div class="card">
      <el-button icon="el-icon-plus" type="primary" @click="dialogVisible = true">建立群組</el-button>
      <el-dialog title="建立群組" :visible.sync="dialogVisible" width="80%" :destroy-on-close="true">
        <transfer-box :inputData="other" :groupsName="allGroupsName" @returnData="createGroup"></transfer-box>
      </el-dialog>

      <el-collapse>
        <el-collapse-item :title="`${groupName}(${groupArticles.length}篇)`" v-for="(groupArticles, groupName) in groups" :key="groupName">
          <el-scrollbar wrapStyle="max-height:300px;">
            <ul>
              <li v-for="article in groupArticles" :key="article.id">{{article.title}}</li>
            </ul>
          </el-scrollbar>
          <el-button :type="_.includes(disabledGroups,groupName) ? 'success' : 'danger'" @click="toggleGroup(groupName)">
            {{ _.includes(disabledGroups,groupName) ? '放回群組' : '抽離群組' }}
          </el-button>
          <el-button type="danger" @click="deleteGroup(groupName)" v-if="groupName !== '其他'">刪除群組</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>

  <div class="col-66 row" v-if="allGroupsName.length > 1">
    <div class="col-50" v-for="(value, name, index) in totalDataset" :key="name + index">
      <div class="card chart-container">
        <h3 class="card-title">{{ $store.state.dictionary[name] }}</h3>
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
      disabledGroups: [],
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
      vm.$set(vm.groups, tempName, tempGroup);
    },
    deleteGroup(groupName) {
      const index = this._.indexOf(this.disabledGroups, groupName);
      if (index !== -1) this.disabledGroups.splice(index, 1);

      this.other = [...this.other, ...this.groups[groupName]];
      this.$delete(this.groups, groupName);
    },
    toggleGroup(groupName) {
      const index = this._.indexOf(this.disabledGroups, groupName);
      if (index !== -1) {
        console.log('沒有，所以加入');
        this.disabledGroups.splice(index, 1);
      } else {
        console.log('有，所以移除');
        this.disabledGroups.push(groupName);
      }
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
      const activeGroups = (() => {
        const tempGroups = vm._.cloneDeep(vm.groups);
        vm.disabledGroups.forEach((groupName) => {
          delete tempGroups[groupName];
        });
        return tempGroups;
      })();

      keynames.forEach((keyname) => {
        totalData[keyname] = [];
        vm._.forEach(activeGroups, (groupData, groupname) => {
          let total = 0;
          if (keyname === 'count') {
            total = groupData.length;
          } else {
            total = vm._.sumBy(groupData, (item) => item.meta[keyname]);
          }
          totalData[keyname].push([groupname, total]);
        });
      });

      return totalData;
    },
    allGroupsName() {
      return this._.keys(this.groups);
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
