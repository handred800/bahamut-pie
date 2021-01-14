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
    <el-dialog title="關於巴哈姆派" width="650px" top="20vh" :visible.sync="dialogAbout" @opened="gaOpenDialog">
      <el-scrollbar wrapStyle="max-height:500px;" class="fz-18">
        <p>
          安安你好！我是巴哈姆派的作者 <a class="fw-bold" href="https://home.gamer.com.tw/homeindex.php?owner=handred800" target="_blank">handred800</a><br>
        </p>
        <p>
          本人在巴哈小屋創作遊戲心得有一段時間了，身為一個創作者想知道流量數據或讀者偏好是很正常的事！<br>
          但站方沒提供什麼有用的數據面板功能，那自己就跳下來做一個吧～<br>
        </p>
        <p>
          如果你在烤派時遇到任何問題或是有任何功能建議，歡迎至 <a class="fw-bold" href="https://peing.net/zh-TW/handred800" target="_blank">提問箱</a> 留言。<br>
          最後，如果你是工程師大大也很歡迎來此專案的 <a class="fw-bold" href="https://github.com/handred800/bahamut-pie" target="_blank">gh-page</a> 指教或發PR。
        </p>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <a href="https://www.buymeacoffee.com/handred800" target="_blank" class="el-button el-button--primary" @click="donateLink">🥧 贊助烤派</a>
      </div>
    </el-dialog>
    <transition :name="transitionName" mode="out-in">
      <router-view :class="{'container': this.$router.currentRoute.path !== '/'}"/>
    </transition>
    <el-button
      v-if="this.$router.currentRoute.path === '/'"
      class="float-btn"
      type="link"
      icon="el-icon-info"
      @click="dialogAbout = true;">
    </el-button>
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
    gaOpenDialog() {
      this.$gtag.event('開啟', {
        event_category: '非功能',
        event_label: '關於視窗',
        value: 5,
      });
    },
    donateLink() {
      this.$gtag.event('點擊', {
        event_category: '非功能',
        event_label: '贊助',
        value: 30,
      });
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
