<template>
  <div class="home">
    <!-- 轮播组件 -->
    <SwiperWrap></SwiperWrap>
    <div class="home-context">
      <ul class="lists-box">
        <li><i></i>新客满298元赠送切块蛋糕</li>
        <li><i></i>满100包邮</li>
        <li><i></i>全程冷链配送</li>
      </ul>
      <ul class="home-menu">
        <li v-for="(menu, index) in menus" :key="index">
          <router-link :to="menu.href">
            <img :src="menu.img" :alt="menu.name">{{menu.name}}
          </router-link>
        </li>
      </ul>
      <!-- 首页商品组件 -->
      <Goods></Goods>
      <!-- 杂志组件 -->
      <Magiz></Magiz>
    </div>
  </div>
</template>

<script>
import SwiperWrap from '../components/Swiper.vue'
import Goods from '../components/Goods.vue'
import Magiz from '../components/Magiz.vue'


export default {
  name: "Index",
  components: {
    SwiperWrap,
    Goods,
    Magiz
  },
  data() {
    return {
      menus: [
        {
          href: '/gallery/1',
          img: 'https://static.21cake.com//upload/images/145995dff6c6458e0738ee2178a1a0df.png',
          name: '蛋糕'
        },
        {
          href: '/gallery/4',
          img: 'https://static.21cake.com//upload/images/561ca3d60f16a63299fd16d3e9e0c3c4.png',
          name: '面包'
        },
        {
          href: '/gallery/3',
          img: 'https://static.21cake.com//upload/images/3b70ed637c61fc696faa7e983726ed7d.png',
          name: '下午茶'
        },
        {
          href: '/gallery/6',
          img: 'https://static.21cake.com//upload/images/760d7a2fe4c5e1bede87389fc843de7f.png',
          name: '礼品'
        }
      ]
    };
  }
};
</script>

<style scoped>
.home-context {
  margin: 0 0.4rem;
}
.home-context .lists-box {
  margin: 0.18rem 0;
  height: 0.36rem;
  line-height: 0.36rem;
  color: #C69C6D;
  padding: 0;
  display: flex;
  /* justify-content: space-between; */
}
.home-context .lists-box li {
  margin-right: 0.16rem;
}
.home-context .lists-box i {
  display: inline-block;
  height: 0.28rem;
  width: 0.28rem;
  margin-top: -2px;
  vertical-align: middle;
  background: url(https://static.21cake.com/themes/wap/img/new-home-icon.png) no-repeat;
  background-position: 0 -15px;
  background-size: 90px auto;
}
@media screen and (max-width: 360px) {
  .home-context .lists-box li {
    margin-right: 0.6rem;
  }
  .lists-box li:last-child {
    display: none;
  }
}

.home-context .home-menu {
  display: flex;
  justify-content: space-between;
}
.home-context .home-menu li {
  width: 19%;
  line-height: 0.32rem;
  text-align: center;
  margin: 5px 0;
}
.home-context .home-menu li a {
  color: #442818;
}
.home-context .home-menu li img {
  display: block;
  width: 70%;
  margin: 0 auto;
}
</style>