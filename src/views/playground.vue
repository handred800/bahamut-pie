<template>
<div class="row">
  <div class="col-33">
    <!-- <el-button icon="el-icon-plus" type="primary" @click="dialogTransfer = true">建立群組</el-button> -->
    <el-dialog title="建立群組" :visible.sync="dialogTransfer" width="80%" :destroy-on-close="true">
      <transfer-box :inputData="other" :groupsName="allGroupsName" @returnData="createGroup"></transfer-box>
    </el-dialog>
    <div v-if="allGroupsName.length > 1">
      <div class="card"
        :class="{'card-muted': _.includes(disabledGroups,groupName)}"
        v-for="(groupArticles, groupName) in groups"
        :key="groupName">
        <div class="row">
          <div class="col-50 card-title">
            {{`${groupName}(${groupArticles.length}篇)`}}
          </div>
          <div class="col-50">
            <el-tooltip :content="_.includes(disabledGroups,groupName) ? '加入比對' : '抽離比對'">
              <el-button
                :type="_.includes(disabledGroups,groupName) ? 'success' : 'danger'"
                :icon="_.includes(disabledGroups,groupName) ? 'el-icon-circle-plus-outline' : 'el-icon-remove-outline'"
                @click="toggleGroup(groupName)">
              </el-button>
            </el-tooltip>
            <el-tooltip content="群組資訊">
              <el-button
                type="primary"
                icon="el-icon-s-data"
                @click="detailGroup(groupName)"></el-button>
            </el-tooltip>
            <el-tooltip content="刪除群組">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteGroup(groupName)"
                v-if="groupName !== '其他'"></el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
      <el-dialog
        :title="`${detailGroupName} - (${groups[this.detailGroupName].length}篇)`"
        :visible.sync="dialogDetail"
        width="80%"
        :destroy-on-close="true"
        v-if="detailGroupName.length !== 0"
        @closed="detailGroupName = ''">
        <div class="row">
          <div class="col-33">
            <el-scrollbar wrapStyle="max-height:500px;">
              <ul class="list">
                <li v-for="article in groups[this.detailGroupName]" :key="article.id">{{article.title}}</li>
              </ul>
            </el-scrollbar>
          </div>
          <div class="col-66">
            <div class="chart-container">
              <scatter-chart :inputData="detailGroupDataset" v-if="detailGroupName !== ''"></scatter-chart>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="btn-placeholder" @click="dialogTransfer = true">
      <i class="el-icon-plus"></i> 新增群組
    </div>
  </div>

  <div class="col-66">

    <div class="row">
      <div class="col-50" v-for="(value, name, index) in totalDataset" :key="name + index">
        <div class="card chart-container">
          <h3 class="card-title">{{ $store.state.dictionary[name] }}</h3>
          <pie-chart v-if="allGroupsName.length > 1" :inputData="value"></pie-chart>
          <div v-else class="bg-nodata">沒有群組資料</div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>
<script>
import transferBox from '../components/transferBox.vue';
import pieChart from '../components/chartPie.vue';
import scatterChart from '../components/chartScatter.vue';

export default {
  components: { transferBox, pieChart, scatterChart },
  data() {
    return {
      dialogTransfer: false,
      dialogDetail: false,
      other: [],
      groups: {},
      disabledGroups: [],
      detailGroupName: '',
    };
  },
  methods: {
    createGroup(tempIdArray, tempName) {
      const vm = this;
      const tempGroup = [];
      vm.dialogTransfer = false;

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
        this.disabledGroups.splice(index, 1);
      } else {
        this.disabledGroups.push(groupName);
      }
    },
    detailGroup(groupName) {
      this.dialogDetail = true;
      this.detailGroupName = groupName;
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
    detailGroupDataset() {
      const dataset = this.groups[this.detailGroupName].map((article) => ({
        title: article.title,
        gp: article.meta.gp,
        view: article.meta.view,
      }));

      return dataset;
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
