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
</div>
</template>
<script>
import transferBox from '../components/transferBox.vue';

export default {
  props: ['articlesData'],
  components: { transferBox },
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

      vm.$set(vm.groups, tempName, tempGroup);
    },
    deleteGroup(groupName) {
      console.log(this.groups[groupName]);
      this.other = [...this.other, ...this.groups[groupName]];
      this.$delete(this.groups, groupName);
    },
  },
  watch: {
    articlesData() {
      this.other = this._.cloneDeep(this.articlesData);
    },
  },
  created() {
    this.other = this._.cloneDeep(this.articlesData);
  },
};
</script>
