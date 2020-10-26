<template>
  <div class="cart">
    <!-- 购物车不为空时 -->
    <div v-if="goods.length" class="have">
      <p class="top-tip">· 满100元免配送服务费 ·</p>
      <ul class="cart-list">
        <!-- 商品 -->
        <li class="cart-item" v-for="(item, index) in goods" :key="index">
          <div class="cart-info">
            <router-link :to="'/produce/'+item.id">
              <img :src="item.img" :alt="item.title">
            </router-link>
            <div class="info">
              <h4>{{item.name}}</h4>
              <p>{{item.title}}</p>
              <div class="select" v-if="item.grams.length == 1">规格：{{item.gram}}<i></i></div>
              <div class="select bor" v-else @click="show(index)">规格：{{item.gram}}<i></i></div>
              <p class="price">￥{{item.price * item.num}}</p>
            </div>
            <div class="cart-num">
              <!-- 商品数量为1时 -->
              <div class="num num-l del" v-if="item.num == 1"  @click="del(index, item.cid)">
                <img src="https://static.21cake.com/themes/wap/img/delect-min.png" alt="">
              </div>
              <!-- 商品数量大于1时 -->
              <div class="num num-l even" v-else @click="evenNum(index)">
                <img src="https://static.21cake.com//themes/wap/img/-.png" alt="">
              </div>
              <div class="num-c">{{item.num}}</div>
              <!-- add -->
              <div class="num num-r" @click="addNum(index)">
                <img src="https://static.21cake.com//themes/wap/img/+.png" alt="">
              </div>
            </div>
          </div>
          <p v-if="item.tableware" class="laid-count">每份{{item.tableware}}</p>
          <div style="border-top: 1px solid #f0f0f0"></div>
        </li>
        <!-- 规格选择 -->
        <div class="select-card" :class="{on: active}">
          <i @click="unshow"></i>
          <div class="box">
            <div class="card">
              <p class="card-price">{{card.price}}.00</p>
              <ul class="options">
                <li class="specs"><i></i>{{card.specs}}</li>
                <li v-if="card.amount" class="amount"><i></i>{{card.amount}}人</li>
                <li v-if="card.tableware" class="tableware"><i></i>{{card.tableware}}</li>
                <li class="date"><i></i>最早{{card.date}}配送</li>
              </ul>
              <div class="card-box spesc">
                <p>商品规格</p>
                <ul>
                  <li v-for="(gram, g) in card.grams" :key="g" @click="grams(gram)" :class="{on: card.gram == gram}">{{gram}}</li>
                </ul>
              </div>
              <i class="close" @click="unshow"></i>
            </div>
            <div class="btn-group">
              <div class="btn cancel" @click="unshow">取消</div>
              <div class="btn sure" @click="sure(card.index)">确定</div>
            </div>
          </div>
        </div>
      </ul>

      <!-- 底部 -->
      <div class="bottom">
        <div class="bot-l" @click="removeAll"></div>
        <div class="bot-r">
          <div class="bot-rl">
            <p class="price"><span>￥</span>{{totil}}</p>
            <p>商品</p>
          </div>
          <div class="bot-rr">去结算</div>
        </div>
      </div>

    </div>

    <!-- 购物车为空时 -->
    <div v-else class="none">
      <img src="https://static.21cake.com/themes/wap/img/cart-empty.png">
      <p>您的购物车里还没有商品</p>
      <router-link to="/">去购物 >>></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      goods: [],
      card: {},
      totil: 0,
      active: false,
    }
  },
  mounted() {
    let utel = localStorage.getItem('username')
    this.axios(`http://localhost:4000/selcart?utel=${utel}`).then(res => {
      this.goods = res.data.data
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    goods: {
      handler(val) {
        if(val.length) {
          this.totil = 0
          for(let i = 0; i < val.length; i++) {
            this.totil += val[i].price * val[i].num
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    show(index) {
      this.card = this.goods[index]
      this.card.index = index
      this.active = true
    },
    unshow() {
      this.active = false
    },
    grams(gram) {
      this.card.gram = gram
    },
    sure(index) {
      this.goods[index].gram = this.card.gram
      this.active = false
    },
    addNum(index) {
      this.goods[index].num = this.goods[index].num + 1
      this.totil += this.goods[index].price
    },
    evenNum(index) {
      this.goods[index].num = this.goods[index].num - 1
      this.totil -= this.goods[index].price
    },
    del(index, id) {
      this.axios(`http://localhost:4000/delcart?id=${id}`).then(res => {
        if(res.data.message == '删除成功！') {
          this.totil -= this.goods[index].price
          this.goods.splice(index, 1)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    removeAll() {
      let utel = localStorage.getItem('username')
      this.axios(`http://localhost:4000/remove?utel=${utel}`).then(res => {
        if(res.data.message == '删除成功！') {
          this.goods = []
          this.totil = 0
        }
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
.have {
  padding-bottom: 1.36rem;
  background: #f6f6f6;
}
.have .top-tip {
  height: 0.76rem;
  line-height: 0.76rem;
  margin: 0;
  text-align: center;
}
.have .cart-list {
  margin-top: 0.2rem;
}
.have .cart-list .cart-item {
  background: #fff;
  margin-bottom: 0.3rem;
  padding: 0 0.4rem;
  padding-bottom: 0.3rem;
  position: relative;
}
.have .cart-list .cart-info {
  display: flex;
  position: relative;
}
.have .cart-list .cart-info a {
  display: inline-block;
  width: 2.18rem;
  height: 2.4rem;
}
.have .cart-list .cart-info a img {
  display: block;
  width: 100%;
  height: 100%;
}
.have .cart-list .cart-info .info {
  margin-left: 0.36rem;
  width: 4.16rem;
  text-align: left;
}
.have .cart-list .cart-info h4 {
  margin-top: 0.3rem;
  margin-bottom: 0;
  font-weight: normal;
}
.have .cart-list .cart-info p {
  margin-top: 0;
  margin-bottom: 0.12rem;
}
.have .cart-list .cart-info .select {
  display: inline-block;
  border: 0.02rem solid #fff;
  font-size: 0.22rem;
  color: #969696;
}
.have .cart-list .cart-info .select.bor {
  padding: 0.04rem 0.04rem 0.02rem 0.1rem;
  margin-top: 0.04rem;
  border-color: #E2E2E2;
}
.have .cart-list .cart-info .bor i {
  display: inline-block;
  height: 0.18rem;
  width: 0.36rem;
  background: url(https://static.21cake.com/themes/wap/img/cart-select-pound.png) no-repeat center center;
  background-size: 11px;
}
.have .cart-list .cart-info .price {
  margin-top: 0.2rem;
  margin-bottom: 0;
  font-size: 0.22rem;
  color: #969696;
}
.have .cart-list .cart-info .cart-num {
  display: flex;
  position: absolute;
  top: 1.6rem;
  right: 0;
  height: 0.52rem;
  width: 1.56rem;
  overflow: hidden;
}
.have .cart-list .cart-info .cart-num .num {
  display: inline-block;
  height: 0.52rem;
  width: 0.52rem;
}
.have .cart-list .cart-info .cart-num .num {
  display: inline-block;
  height: 0.52rem;
  width: 0.52rem;
  background: #f0f0f0;
}
.have .cart-list .cart-info .cart-num .num img {
  display: block;
  margin: 0 auto;
}
.have .cart-list .cart-info .cart-num .even img {
  width: 0.24rem;
  margin-top: 0.24rem;
}
.have .cart-list .cart-info .cart-num .num-r img {
  width: 0.24rem;
  margin-top: 0.14rem;
}
.have .cart-list .cart-info .cart-num .del img {
  width: 0.2rem;
  margin-top: 8px;
}
.have .cart-list .cart-info .cart-num .num-c {
  display: inline-block;
  height: 0.52rem;
  width: 0.52rem;
  font-size: 0.24rem;
  line-height: 0.52rem;
  background: #F7F7F7;
  color: #969696;
}
.have .cart-item .laid-count {
  height: 0.92rem;
  line-height: 0.92rem;
  background: url(https://static.21cake.com/themes/wap/img/cart-laid.png) no-repeat left;
  background-size: 46px 46px;
  padding-left: 1.1rem;
  margin: 0;
  text-align: left;
}
.have .bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 0.88rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 88;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px -2px 4px 0px rgba(0,0,0,0.10);
}
.have .bottom .bot-l {
  flex-shrink: 0;
  height: 0.88rem;
  width: 0.88rem;
  background: url(https://static.21cake.com/themes/wap/img/cart-order-delete.png) no-repeat center center;
  background-size: 14px auto;
}
.have .bottom .bot-r {
  flex-shrink: 0;
  display: flex;
}
.have .bottom .bot-rl {
  flex-shrink: 0;
  margin-right: 0.24rem;
}
.have .bottom .bot-rl p {
  margin: 0;
  line-height: 0.32rem;
  font-size: 0.2rem;
  color: #707070;
  text-align: right;
}
.have .bottom .bot-rl p.price {
  margin-top: 0.16rem;
  font-size: 0.32rem;
  font-weight: bold;
  color: #442818;
}
.have .bottom .bot-rl p.price span {
  font-size: 0.24rem;
}
.have .bottom .bot-rr {
  flex-shrink: 0;
  height: 0.88rem;
  width: 1.92rem;
  line-height: 0.88rem;
  text-align: center;
  color: #fff;
  background: #442818;
}


.select-card {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 100%;
  left: 0;
  z-index: 999;
  overflow: hidden;
  text-align: left;
}
.select-card.on {
  top: 0;
}
.select-card i {
  display: block;
  width: 100%;
  height: 100%;
  background: #00000099;
}
.select-card .box {
  position: absolute;
  left: 0;
  bottom: -40%;
}
.select-card.on .box {
  bottom: 0;
  transition: all .5s;
}
.select-card .card {
  background: #fff;
  width: 100%;
  z-index: 22;
  box-shadow: 0 -0.04rem 0.08rem 0 rgba(0,0,0,0.1);
  padding: 0.28rem 0.48rem 0.28rem;
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
  font-size: 0.24rem;
  line-height: 0.56rem;
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
.select-card .btn-group {
  display: flex;
  height: 0.92rem;
  width: 100%;
  text-align: center;
  box-shadow: 0px -2px 4px 0px rgba(0,0,0,0.1);
}
.select-card .btn-group .btn {
  width: 50%;
  height: 0.92rem;
  line-height: 0.92rem;
  font-size: 0.3rem;
}
.select-card .btn-group .btn.cancel {
  color: #442818;
  background: #fff;
}
.select-card .btn-group .btn.sure {
  background: #442818;
  color: #fff;
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



.none {
  margin-top: 2.64rem;
  text-align: center;
}
.none img {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
}
.none p {
  margin: 0.2rem 0;
  font-size: 0.28rem;
  color: #D5BFA7;
}
</style>