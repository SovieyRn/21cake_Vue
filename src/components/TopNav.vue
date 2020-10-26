<template>
  <div class="head">
    <div class="nav">
      <div class="nav-top">
        <div class="nav-l">
          <div class="nav-ll"><i @click="changeShow" :class="{menu: show}"></i></div>  <!-- 菜单 -->
          <div class="nav-lr" @click="chooseCitys"><i></i>{{city}}</div>  <!-- 城市 -->
        </div>
        <div class="nav-c">
          <router-link to="/">
            <img src="https://static.21cake.com/themes/wap/img/logo.png" alt="21cake">
          </router-link>
        </div>
        <div class="nav-r">
          <router-link to="/message" class="nav-rl"><i></i></router-link>  <!-- 消息 -->
          <router-link to="/cart" class="nav-rr"><i></i></router-link>  <!-- 购物车 -->
        </div>
      </div>
      <div v-if="show" class="nav-bot">
        <router-link to="/" class="home">
          <i></i><span>首页</span>
        </router-link>
        <router-link to="/gallery/1" class="sort">
          <i></i><span>分类</span>
        </router-link>
        <router-link to="/user" class="mine">
          <i></i><span>个人</span>
        </router-link>
      </div>
    </div>
    <!-- 切换城市 -->
    <div class="city-box" v-if="chooseCity">
      <i @click="chooseCitys"></i>
      <div class="city-list">
        <p>选择城市</p>
        <ul>
          <li class="city" :class="{on: txt == item}" v-for="(item, index) in citys" :key="index" @click="changeCity(item)">{{item}}</li>
        </ul>
        <div class="btn-city" @click="sureCity">确定</div>
        <div class="txt"></div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'Gnav',
  inject:['reload'],
  data() {
    return {
      show: false,
      chooseCity: false,
      city: '上海',
      txt: '上海',
      citys: ['上海','北京','天津','杭州','无锡','苏州','广州','深圳']
    }
  },
  methods: {
    changeShow() {  // 菜单显示隐藏
      this.show = !this.show
    },
    chooseCitys() {  // 切换城市显示
      this.txt = this.city
      this.chooseCity = !this.chooseCity
    },
    changeCity(item) {  // 选择城市
      this.txt = item
    },
    sureCity() {  // 确定城市
      this.city = this.txt
      this.chooseCity = false
      this.reload();
    }
  },
  watch: {
    $route: {  // 监听路由变化，菜单隐藏
      handler() {
        this.show = false
      }
    }
  }
}
</script>

<style scoped>
.head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.nav {
  color: #442818;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
}
.nav .nav-top {
  position: relative;
  height: 0.96rem;
  line-height: 0.96rem;
  display: flex;
  justify-content: space-between;
}

.nav .nav-top .nav-l{
  display: flex;
}
.nav .nav-top .nav-ll {
  margin-left: 0.3rem;
  width: 0.36rem;
}
.nav .nav-top .nav-ll i {
  height: 0.28rem;
  width: 0.36rem;
  background: url(https://static.21cake.com/themes/wap/img/top-icon.png) no-repeat;
  background-size: cover;
  display: inline-block;
  vertical-align: middle;
}
.nav .nav-top .nav-ll i.menu {
  height: 0.3rem;
  width: 0.32rem;
  background: url(https://static.21cake.com/themes/wap/img/menu-hide.png) no-repeat;
  background-size: cover;
}
.nav .nav-top .nav-lr {
  margin-left: 0.28rem;
}
.nav .nav-top .nav-lr i {
  background: url(https://static.21cake.com/themes/wap/img/address.png);
  display: inline-block;
  height: 0.3rem;
  width: 0.24rem;
  background-size: cover;
  vertical-align: middle;
  margin-right: 4px;
  margin-top: -3px;
}

.nav .nav-top .nav-c {
  margin-left: -0.3rem;
}
.nav .nav-top .nav-c a {
  display: inline-flex;
  vertical-align: middle;
}
.nav .nav-top .nav-c img {
  display: inline-block;
  width: 0.6rem;
}

.nav .nav-top .nav-r a {
  display: inline-flex;
  vertical-align: middle;
}
.nav .nav-top .nav-rl,
.nav .nav-top .nav-rr {
  margin-left: 0.08rem;
}
.nav .nav-top .nav-rl {
  margin-right: 0.16rem;
}
.nav .nav-top .nav-rr {
  margin-right: 0.3rem;
}
.nav .nav-top .nav-r i {
  display: inline-block;
  height: 0.38rem;
  width: 0.38rem;
}
.nav .nav-top .nav-rl i {
  background: url(https://static.21cake.com/themes/wap/img/header_message.png) no-repeat;
  background-size: cover;
}
.nav .nav-top .nav-rr i {
  background: url(https://static.21cake.com/themes/wap/img/cart.png) no-repeat;
  background-size: cover;
}

.nav .nav-bot {
  display: flex;
  justify-content: center;
  height: 1.04rem;
  box-shadow: 0px 7px 10px 0px rgba(145, 145, 145, 0.50);
  position: relative;
}
.nav .nav-bot a {
  display: inline-block;
  width: 28%;
  padding-top: 0.1rem;
  text-align: center;
  line-height: 0;
}
.nav .nav-bot a i {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
}
.nav .nav-bot a.home i {
  background: url(https://static.21cake.com/themes/wap/img/menu-home.png) no-repeat center top;
  background-size: 25px 25px;
}
.nav .nav-bot a.sort i {
  background: url(https://static.21cake.com/themes/wap/img/menu-icon-class.png) no-repeat center top;
  background-size: 25px 25px;
}
.nav .nav-bot a.mine i {
  background: url(https://static.21cake.com/themes/wap/img/menu-icon-per.png) no-repeat center top;
  background-size: 25px 25px;
}
.nav .nav-bot a span {
  display: block;
  line-height: 0.4rem;
}

.city-box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #0007;
}
.city-box i {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 8;
}
.city-box .city-list {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  transform: translate(-50%,-50%);
  background: #fff;
  width: 94%;
  border-top: 3px solid #442818;
}
.city-box .city-list p {
  line-height: 0.5rem;
  font-size: 0.36rem;
  padding: 0.5rem 0.28rem 0.6rem;
  margin: 0;
  text-align: left;
}
.city-box .city-list ul {
  display: flex;
  flex-wrap: wrap;
}
.city-box .city-list ul .city {
  width: 22%;
  margin: 1.5%;
  line-height: 30px;
  border: 1px solid #fff;
  box-sizing: border-box;
}
.city-box .city-list ul .city.on {
  border-color: #442818;
  background: #fff url(https://static.21cake.com/themes/wap/img/icon_selected.png) no-repeat top left;
  background-size: 12px 12px;
}
.city-box .city-list .btn-city {
  background: #442818;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
  color: #fff;
  font-size: 0.3rem;
  width: 2.56rem;
  margin: 0.7rem auto 0.24rem;
}
.city-box .city-list .txt {
  line-height: 0.36rem;
  color: #D5BFA7;
  text-align: center;
  height: 0.36rem;
  line-height: 0.36rem;
  padding-bottom: 0.7rem;
}
</style>
