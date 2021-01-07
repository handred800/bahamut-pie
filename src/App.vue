<template>
  <div id="app">
    <header v-if="this.$router.currentRoute.path !== '/'">
      <div class="nav">
        <router-link class="nav-link" to="/dashboard">儀表板</router-link>
        <router-link class="nav-link" to="/articles">文章</router-link>
        <router-link class="nav-link" to="/playground">Playground</router-link>
        <el-dropdown trigger="click" @command="handleCommand" class="btn-more">
          <el-button size="small" icon="el-icon-menu"></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-dish" command="landing">重新點派</el-dropdown-item>
            <el-dropdown-item icon="el-icon-info" command="about">關於巴哈姆派</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <el-dialog title="關於巴哈姆派" width="500px" top="20vh" :visible.sync="dialogAbout">
      <p class="heading-1">巴哈姆派超好吃</p>
    </el-dialog>
    <router-view :class="{'container': this.$router.currentRoute.path !== '/'}"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAbout: false,
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'landing':
          this.$store.commit('clearData');
          this.$router.push('/');
          break;
        case 'about':
          this.dialogAbout = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>
