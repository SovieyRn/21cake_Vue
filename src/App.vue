<template>
  <div id="app">
    <!-- 头部菜单导航组件 -->
    <TopNav></TopNav>
    <div style="height: 0.96rem"></div>
    <router-view v-if="isRouterAlive"></router-view>
    <div class="lost" v-if="flag">
      <div v-if="show">没了</div>
    </div>
    <Bottom v-if="flag"></Bottom>
    <div v-if="heig" style="height: 0.92rem"></div>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import Bottom from '@/components/Bottom.vue'


export default {
  name: 'App',
  components: {
    TopNav,
    Bottom
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    return {
      show: true,
      flag: true,
      heig: false,
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  },
  watch: {
    $route: {
      handler(to) {
        if(to.meta.hideNone) {
          this.show = false
        }else {
          this.show = true
        }
        if(to.meta.heig) {
          this.heig = true
        }else {
          this.heig = false
        }
        if(to.meta.flag) {
          this.flag = false
        }else {
          this.flag = true
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 0.24rem;
  color: #442818;
}
a {
  text-decoration: none;
  color: #442818;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.lost div {
  height: 1.44rem;
  padding-top: 0.5rem;
  margin: 0 0.4rem;
  padding-right: 0.8rem;
  background: url(https://static.21cake.com/themes/wap/img/list-empty.png) no-repeat right center;
  background-size: 34px 38px;
  text-align: right;
  line-height: 1.44rem;
  color: #D5D5D5;
}

</style>
