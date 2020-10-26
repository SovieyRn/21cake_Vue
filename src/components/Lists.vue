<!-- 分类页商品列表 -->
<template>
  <div class="lists">
    <ul class="list-box">
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="'/produce/'+item.id">    <!-- 跳转详情组件 -->
          <div class="img">
            <img :src="item.img" alt="item.title">
          </div>
          <div class="info">
            <h4>{{item.name}}</h4>
            <p>{{item.title}}</p>
            <p class="price">¥{{item.price}}/{{item.grams[0]}}</p>
          </div>
        </router-link>
        <div class="cart-add" @click="showModel(index)">
          <img src="https://static.21cake.com//themes/wap/img/list-cart.png">
        </div>
      </li>
    </ul>
    <!-- 添加购物车时规格选项卡 -->
    <div class="model" v-if="active">
      <div class="model-box" v-if="!showMsg">
        <div class="card">
          <p class="card-price">￥{{card.price}}.00</p>
          <ul class="options">
            <li class="specs"><i></i>{{card.specs}}</li>
            <li v-if="card.amount" class="amount"><i></i>{{card.amount}}人</li>
            <li v-if="card.tableware" class="tableware"><i></i>{{card.tableware}}</li>
            <li class="date"><i></i>最早{{card.date}}配送</li>
          </ul>
          <div class="card-box spesc">
            <p>商品规格</p>
            <ul>
              <li v-for="(gram, g) in card.grams" :key="g" @click="grams(gram,g)" :class="{on: gn == g}">{{gram}}</li>
            </ul>
          </div>
          <div class="btn-cart">
            <div class="btn" @click="addCart(card.id)">加入购物车<span>(￥{{card.price}}.00)</span></div>
          </div>
          <i class="close" @click="unshow"></i>
        </div>
      </div>
      <div class="msg" v-if="showMsg">加入购物车成功</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lists',
  props: {
    val: {
      type: String | Number
    }
  },
  data() {
    return {
      items: [],
      card: {},
      gram: null,
      gn: 0,
      active: false,
      showMsg: false
    }
  },
  watch: {
    val: {
      handler(val) {
        if(typeof val == 'number') {
          this.getGallery(val + 1)
        }else if(typeof val == 'string') {
          this.getType(val)
        }
      },
      immediate: true
    }
  },
  methods: {
    getGallery(val) {  // tab变化动态获取数据
      this.axios.get('http://localhost:4000/gallery?type_id='+ val).then(res => {
        this.items = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    getType(val) {  // 获取tab
      this.axios.get('http://localhost:4000/type?type='+ val).then(res => {
        this.items = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    showModel(index) {  // 显示选项卡
      this.gn = 0
      this.card = this.items[index]
      this.card.index = index
      this.gram = this.items[index].grams[0]
      this.active = true
    },
    unshow() {  // 隐藏选项卡
      this.active = false
    },
    grams(gram, g) {  // 选择规格
      this.gn = g
      this.gram = gram
    },
    addCart(id) {
      if(localStorage.getItem('username')) {  // 是否登录
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
              this.active = false
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
.list-box {
  padding-left: 0.1rem;
  padding-right: 0.4rem;
  margin-bottom: 0.4rem;
  display: flex;
  flex-wrap: wrap;
}
.list-box li {
  width: 50%;
  padding-left: 0.3rem;
  box-sizing: border-box;
  position: relative;
}
.list-box li a {
  display: block;
  color: #442818;
}
.list-box li .img {
  width: 3.2rem;
  height: 3.52rem;
}
.list-box li .img img {
  display: block;
  width: 100%;
}
.list-box li .info {
  font-size: 0.26rem;
  line-height: 0.32rem;
  width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-box li .info h4 {
  font-weight: normal;
  margin: 0;
}
.list-box li .info p {
  font-size: 0.24rem;
  margin: 0;
}
.list-box li .info p.price {
  color: #BB9772;
  margin-top: 0.1rem;
  max-width: 80%;
}
.list-box li .cart-add {
  width: 0.44rem;
  height: 0.44rem;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 9;
}
.list-box li .cart-add img {
  display: block;
  width: 100%;
}

.model {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: #0007;
  text-align: left;
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
.model .model-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 92%;
  margin: 0 auto;
  background: #fff;
}
.model-box .card {
  background: #fff;
  width: 100%;
  z-index: 22;
  box-shadow: 0 -0.04rem 0.08rem 0 rgba(0,0,0,0.1);
  padding: 0.28rem 0.48rem 0.28rem;
  box-sizing: border-box;
}
.model-box .card .card-price {
  font-size: 0.3rem;
  line-height: 0.44rem;
  margin-top: 0;
  margin-bottom: 0.3rem;
  font-weight: bold;
}
.model-box .card .options {
  margin: 0;
  padding: 0.1rem 0 0.24rem;
}
.model-box .card .card-box p {
  margin: 5px 0 0;
  font-size: 0.22rem;
}
.model-box .card .card-box ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0.24rem 0 0.14rem;
}
.model-box .card .card-box li {
  flex-grow: 0;
  padding: 0 0.3rem;
  height: 0.6rem;
  background: #F7F7F7;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.3rem;
  margin-left: 0.12rem;
  margin-bottom: 0.16rem;
  border: 0.02rem solid #F7F7F7;
}
.model-box .card .card-box li.on {
  border-color: #000;
  background: url(https://static.21cake.com/themes/wap/img/icon_selected.png) no-repeat top left;
  background-size: 12px 12px;
}
.model-box .card .card-box.spesc li {
  font-size: 0.24rem;
  line-height: 0.56rem;
}
.model-box .card .close {
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

.btn-cart {
  width: 66%;
  margin: 0.56rem auto;
}
.btn-cart .btn {
  height: 0.88rem;
  font-size: 0.28rem;
  line-height: 0.88rem;
  color: #fff;
  text-align: center;
  padding: 0 3%;
  background: #442818;
}
.btn-cart .btn span {
  font-size: 11px;
  color: #dac1b5;
}
</style>