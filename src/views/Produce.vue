<!-- 商品详情 -->
<template>
  <div class="detail" v-wechat-title="$route.meta.title=items.title+'_21Cake蛋糕'">
    <!-- 图片长度大于 1 -->
    <div class="swiper" v-if="items.imgurl.length > 1">
      <swiper ref="mySwiper" :options="swiperOptions" class="swiper-box">
        <swiper-slide v-for="(img, index) in items.imgurl" :key="index">
          <img :src="img">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 图片长度为 1 -->
    <div class="swiper" v-else>
      <div class="swiper-box">
        <img :src="items.imgurl[0]">
      </div>
    </div>
    <div class="detail-box">
      <h3>{{items.name}}</h3>
      <p class="name">{{items.title}}</p>
      <p class="price">{{items.price}}</p>
      <div class="tag" v-if="items.tags">
        <span v-for="(tag, t) in items.tags" :key="t">{{tag}}</span>
      </div>
      <ul class="taste" v-if="items.formula" v-html="items.formula"></ul>
      <div class="select">
        <div class="selected" @click="show">
          已选择：{{style}} {{gram}}
          <i></i>
        </div>
        <ul class="options">
          <li class="specs"><i></i>{{items.specs}}</li>
          <li v-if="items.amount" class="amount"><i></i>{{items.amount}}人</li>
          <li v-if="items.tableware" class="tableware"><i></i>{{items.tableware}}</li>
          <li class="date"><i></i>最早{{items.date}}配送</li>
        </ul>
        <ul class="store">
          <li v-if="items.condition">
            <img src="https://static.21cake.com/themes/wap/img/fresh.png">
            <span>保鲜条件</span><span>{{items.condition}}</span>
          </li>
          <li v-if="items.sweet">
            <img src="https://m.21cake.com/themes/wap/img/sweet.png">
            <span>参考甜度</span><span>
              <i v-for="(sw, n) in 5" :key="n" :class="{on: n<items.sweet}"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 规格选项卡 -->
    <div class="select-card" :class="{on: active}">
      <i @click="unshow"></i>
      <div class="card">
        <p class="card-price">¥{{items.price}}</p>
        <ul class="options">
          <li class="specs"><i></i>{{items.specs}}</li>
          <li v-if="items.amount" class="amount"><i></i>{{items.amount}}人</li>
          <li v-if="items.tableware" class="tableware"><i></i>{{items.tableware}}</li>
          <li class="date"><i></i>最早{{items.date}}配送</li>
        </ul>
        <div class="card-box" v-if="items.styles">
          <p>口味</p>
          <ul>
            <li v-for="(style, st) in items.styles" :key="st" @click="styles(style, st)" :class="{on: st == sn}" >{{style}}</li>
          </ul>
        </div>
        <div class="card-box spesc">
          <p>商品规格</p>
          <ul>
            <li v-for="(gram, g) in items.grams" :key="g" @click="grams(gram, g)" :class="{on: g == gn}">{{gram}}</li>
          </ul>
        </div>
        <i class="close" @click="unshow"></i>
      </div>
    </div>
    <!-- 描述 -->
    <div class="desc">
      <p v-for="(desc, d) in items.describe" :key="d">/{{desc}}/</p>
    </div>
    <div class="det-img" v-html="items.det_img"></div>
    <div class="explain">
      <img v-if="items.tableware" src="https://static.21cake.com/public/images/d8/ab/48/5d7b742f3569a8cf26480f48a5395095.jpg?1484557670#w" alt="">
      <p style="text-align: center; color: #999;">以上图片仅供参考，请以收到实物为准。</p>
      <p>退改说明：</p>
      <p>1. 北京、上海、杭州、广州地区距配送时间6小时及以上的订单可修改、取消、退订；距配送时间不足5小时，订单不再支持修改、取消、退订。（22点之后不接受次日14点之前配送订单修改、退订）</p>
      <p>2. 苏州、无锡、深圳、天津距配送时间不足8小时，订单不再支持修改、取消、退订。（22点之后不接受次日16点之前配送订单修改、退订）</p>
    </div>
    <div class="btn-group">
      <div class="buy-btn">立即购买</div>
      <div class="add-btn" @click="addCart(items.id)">加入购物车</div>
    </div>
    <div class="model" v-if="showMsg">
      <div class="msg">加入成功！</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Produce',
  data() {
    return {
      items: {
        imgurl: [],
        styles: [],
        grams: []
      },
      gram: '',
      style: '',
      gn: 0,
      sn: 0,
      showMsg: false,
      active: false,
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          delay: 6000,
          disableOnInteraction: false
        },
        loop: true,
        spend: 800
      }
    }
  },
  mounted() {
    this.axios.get('http://localhost:4000/produce?id='+this.$route.params.id).then(res => {
      this.items = res.data.data[0]
      if(this.items.styles) {
        this.style = this.items.styles[0]
      }
      if(this.items.grams) {
        this.gram = this.items.grams[0]
      }

      // console.log(this.items)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    show() {
      this.active = true
    },
    unshow() {
      this.active = false
    },
    grams(gram, g) {
      this.gram = gram
      this.gn = g
    },
    styles(style, st) {
      this.style = style
      this.sn = st
    },
    addCart(id) {
      if(localStorage.getItem('username')) {
        let carts = {
          utel: localStorage.getItem('username'),
          cake_id: id,
          num: 1,
          gram: this.gram
        }
        this.axios(`http://localhost:4000/addcart?cart=${JSON.stringify(carts)}`).then(res => {
          if(res.data.message == '添加成功！') {
            this.showMsg = true
            setTimeout(() => {
              this.showMsg = false
            }, 1500)
          }
        }).catch(err => {
          console.log(err)
        })
      }else {
        this.$router.push({path: '/signin?returnUrl=' + this.$route.path})
      }
    }
  }
}
</script>

<style scoped>
.detail {
  text-align: left;
}
.swiper .swiper-box img {
  display: block;
  width: 100%;
  height: 6.4rem;
}
.swiper >>> .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  border: none;
  background: #fff;
  border-radius: 0;
  opacity: 1;
}
.swiper >>> .swiper-pagination-bullet-active {
  background: #442818 !important;
}

.detail-box {
  padding: 0 0.48rem 20px;
}
.detail-box h3 {
  font-weight: normal;
  font-size: 0.48rem;
  color: #333;
  line-height: 0.58rem;
  padding-top: 0.2rem;
  margin: 0;
}
.detail-box p {
  margin: 0;
}
.detail-box .name {
  font-size: 0.28rem;
  line-height: 0.36rem;
}
.detail-box .price {
  font-size: 0.44rem;
  color: #C69C6D;
  line-height: 0.6rem;
  margin: 0.08rem 0 0.1rem;
}
.detail-box .tag {
  font-size: 0.24rem;
  padding: 0.1rem 0;
}
.detail-box .tag span {
  display: inline-block;
  line-height: 0.36rem;
  color: #D5BFA7;
  padding: 0 0.24rem;
  border: 1px solid #D5BFA7;
  border-radius: 2rem;
  margin-right: 0.16rem;
}
.detail-box .taste {
  padding-top: 0.2rem;
  display: flex;
}
.detail-box .taste >>> li {
  height: 0.64rem;
  line-height: 0.64rem;
  margin-right: 0.36rem;
  margin-bottom: 0.2rem;
  color: #442818;
}
.detail-box .taste >>> li img {
  width: 0.6rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.16rem;
}
.detail-box .select {
  background: #FFF;
  box-shadow: 0 0.06rem 0.2rem 0 rgba(0,0,0,0.10);
  border-radius: 0.08rem;
  overflow: hidden;
}
.detail-box .select .selected {
  background: rgba(199,178,153,0.20);
  padding-left: 0.28rem;
  height: 0.9rem;
  font-size: 0.26rem;
  line-height: 0.9rem;
  position: relative;
}
.detail-box .select .selected i {
  display: inline-block;
  height: 0.3rem;
  width: 0.2rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  background: url(https://static.21cake.com/themes/wap/img/Page-go.png) no-repeat;
  background-size: cover;
}
.select-card {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 100%;
  left: 0;
  z-index: 9;
  overflow: hidden;
}
.select-card.on {
  top: 0;
  transition: all 1s;
}
.select-card i {
  display: block;
  width: 100%;
  height: 100%;
}
.select-card .card {
  position: absolute;
  left: 0;
  bottom: 0;
  background: #fff;
  width: 100%;
  z-index: 22;
  box-shadow: 0 -0.04rem 0.08rem 0 rgba(0,0,0,0.1);
  padding: 0.28rem 0.48rem 1.2rem;
  box-sizing: border-box;
}
.select-card .card .card-price {
  font-size: 0.3rem;
  line-height: 0.44rem;
  margin-top: 0;
  margin-bottom: 0.3rem;
  font-weight: bold;
}
.select-card .card .options {
  margin: 0;
  padding: 0.1rem 0 0.24rem;
}
.select-card .card .card-box p {
  margin: 5px 0 0;
  font-size: 0.22rem;
}
.select-card .card .card-box ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0.24rem 0 0.14rem;
}
.select-card .card .card-box li {
  flex-grow: 0;
  padding: 0 0.3rem;
  height: 0.6rem;
  background: #F7F7F7;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.3rem;
  margin-left: 0.12rem;
  margin-bottom: 0.16rem;
  border: 1px solid #F7F7F7;
}
.select-card .card .card-box li.on {
  border-color: #000;
  background: url(https://static.21cake.com/themes/wap/img/icon_selected.png) no-repeat top left;
  background-size: 12px 12px;
}
.select-card .card .card-box.spesc li {
  width: 0.76rem;
  font-size: 0.24rem;
  line-height: 0.28rem;
  word-break: break-all;
}
.select-card .card .close {
  height: 0.28rem;
  width: 0.28rem;
  padding: 0.3rem;
  background: url(https://static.21cake.com/themes/wap/img/list-hide.png) no-repeat center;
  background-size: 14px 14px;
  position: absolute;
  top: 0;
  right: 0;
}

.options {
  display: flex;
  flex-wrap: wrap;
  margin: 0.36rem 0.28rem 0.16rem;
  border-bottom: 1px solid #D2D2D2;
}
.options li {
  width: 48%;
  margin-right: 2%;
  margin-bottom: 0.12rem;
  color: #482818;
}
.options li i {
  display: inline-block;
  height: 0.48rem;
  width: 0.48rem;
  background: url(https://static.21cake.com/themes/wap/img/goods-icon.png) no-repeat;
  background-size: 50px auto !important;
  vertical-align: middle;
  margin-right: 0.16rem;
}
.options li.specs i {
  background-position: 0 2px;
}
.options li.amount i {
  background-position: 0 -27px;
}
.options li.tableware i {
  background-position: -30px 0px;
}
.options li.date i {
  background-position: -30px -29px;
}

.detail-box .select .store {
  background-color: #fff;
  margin-bottom: 0.08rem;
  line-height: 0.32rem;
}
.detail-box .select .store li {
  margin-bottom: 0.16rem;
}
.detail-box .select .store li img {
  display: inline-block;
  height: 0.32rem;
  width: auto;
  margin: 0 0.2rem 0 0.34rem;
  vertical-align: -0.08rem;
}
.detail-box .select .store li span {
  display: inline-block;
  line-height: 0.32rem;
  text-align: center;
  margin-right: 10px;
}
.detail-box .select .store li i {
  display: inline-block;
  height: 0.32rem;
  width: 0.32rem;
  margin-right: 0.2rem;
  background: url(https://static.21cake.com/themes/wap/img/sweet-01.png) no-repeat center;
  background-size: 100%;
  vertical-align: -0.08rem;
}
.detail-box .select .store li i.on {
  background: url(https://static.21cake.com/themes/wap/img/sweet-02.png) no-repeat center;
  background-size: 100%;
}
.desc {
  padding: 15px;
  background: #FFFFFF;
  margin-top: 0.24rem;
}
.desc p {
  margin: 0;
  color: #442818;
}
.det-img {
  margin-top: 0.24rem;
  width: 100%;
  overflow: hidden;
}
.det-img >>> img {
  display: block;
  width: 100%;
}
.explain {
  width: 100%;
  margin-bottom: 1rem;
}
.explain img {
  display: block;
  width: 100%;
}
.explain p {
  font-size: 0.26rem;
  color: #666;
  margin: 0;
}
.btn-group {
  display: flex;
  height: 0.92rem;
  line-height: 0.92rem;
  text-align: center;
  font-size: 0.3rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  background: #fff;
  box-shadow: 0 -0.04rem 0.08rem 0 rgba(0,0,0,0.1);
}
.btn-group .buy-btn {
  width: 50%;
  height: 0.92rem;
  background: #fff;
  color: #442818;
}
.btn-group .add-btn {
  width: 50%;
  height: 0.92rem;
  background: #442818;
  color: #fff;
}
.model {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: #0007;
}
.model .msg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 4rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.32rem;
  text-align: center;
  background: #fff;
}
</style>