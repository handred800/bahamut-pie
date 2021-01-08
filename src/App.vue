<template>
  <div id="app">
    <transition name="slide-down">
      <header v-if="this.$router.currentRoute.path !== '/'">
        <div class="nav">
          <router-link class="nav-link" to="/dashboard">儀表板</router-link>
          <router-link class="nav-link" to="/articles">文章</router-link>
          <router-link class="nav-link" to="/playground">Playground</router-link>
          <el-dropdown trigger="click" @command="handleCommand" class="btn-more">
            <el-button size="small" icon="el-icon-menu"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-dish" command="landing">重新烤派</el-dropdown-item>
              <el-dropdown-item icon="el-icon-refresh" command="refetch">刷新內餡</el-dropdown-item>
              <el-dropdown-item icon="el-icon-info" command="about">關於巴哈姆派</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
    </transition>
    <el-dialog title="關於巴哈姆派" width="500px" top="20vh" :visible.sync="dialogAbout">
    </el-dialog>
    <transition :name="transitionName" mode="out-in">
      <router-view :class="{'container': this.$router.currentRoute.path !== '/'}"/>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAbout: false,
      transitionName: '',
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'landing':
          this.$store.commit('clearData');
          this.$router.push('/');
          break;
        case 'refetch':
          this.$store.commit('createNotify', {
            title: '資料更新中...',
          });
          this.$store.dispatch('fetchData', this.$store.state.ownerId);
          break;
        case 'about':
          this.dialogAbout = true;
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route(to, from) {
      const toIndex = to.meta.index;
      const fromIndex = from.meta.index;
      if (from.name) this.transitionName = toIndex > fromIndex ? 'slide-right' : 'slide-left';
    },
  },
};
</script>
