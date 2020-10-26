<!-- 首页商品列表 -->
<template>
  <div class="mould-goods">
    <div class="mould-goods-content" v-for="(items, index) in goods" :key="index">
      <!-- 列表头部 -->
      <h3 class="goods-title">
        <span>{{index == 0?'新品':index == 1?'人气':index == 2?'生日':'面包'}}</span>
        <router-link :to="'/type/'+(index == 0?'new':index == 1?'popular':index == 2?'birth':'bread')">更多<i></i></router-link>
      </h3>
      <!-- 列表主体 -->
      <ul class="goods-list">
        <li v-for="(item, i) in items" :key="i">
          <router-link :to="'/produce/'+item.cake_id" class="img">
            <img :src="item.img">
          </router-link>
          <div class="goods-info">
            <router-link :to="'/produce/'+item.cake_id">
              <h4>
                <span class="title">{{item.title}}</span>
                <span class="price">{{item.price}}</span>
                <span>元/{{item.grams}})</span>
              </h4>
              <p>{{item.describe}}</p>
            </router-link>
            <div class="btn-cart" @click="addCart(item.cake_id, item.grams)"><i></i></div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 活动 -->
    <div class="mould-activity">
      <h3 class="activity-title">
        <span>廿一客·活动</span>
      </h3>
      <div class="activity-box">
        <router-link to="/magazine/7">
          <div class="left">
            <h6>新客权益</h6>
            <p>点击查看</p>
            <span>只剩71天</span>
          </div>
          <div class="right">
            <img src="https://static.21cake.com//upload/images/9bfa8ea6a193c5877646c375119515ef.jpg">
          </div>
        </router-link>
      </div>
    </div>
    <div class="model" v-if="show">
      <div class="msg">加入成功！</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data() {
    return {
      show: false,
      goods: [[],[],[],[]]
    }
  },
  mounted() {
    this.axios.get('http://localhost:4000/home').then(res => {
      res.data.data.forEach(val => {
        if(val.type == 'new') {
          this.goods[0].push(val)
        }else if(val.type == 'popular') {
          this.goods[1].push(val)
        }else if(val.type == 'birth') {
          this.goods[2].push(val)
        }else if(val.type == 'bread') {
          this.goods[3].push(val)
        }
      });
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    addCart(id, gram) {
      if(localStorage.getItem('username')) {
        let carts = {
          utel: localStorage.getItem('username'),
          cake_id: id,
          num: 1,
          gram: gram
        }
        this.axios(`http://localhost:4000/addcart?cart=${JSON.stringify(carts)}`).then(res => {
          if(res.data.message == '添加成功！') {
            this.show = true,
            setTimeout(() => {
              this.show = false
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

<style>
.mould-goods {
  width: 100%;
  padding-top: 0.2rem;
}
.mould-goods-content{
  border-top: 1px solid #E5E5E5;
}
.mould-goods .goods-title {
  font-weight: normal;
  line-height: 0.4rem;
  padding-top: 0.2rem;
  margin: 0;
  display: flex;
  justify-content: space-between;
}
.mould-goods .goods-title span {
  display: inline-block;
  height: 0.4rem;
  color: #322418;
  font-size: 0.26rem;
  background: #F4EBE2;
  border-radius: 2rem;
  padding: 0 0.2rem;
}
.mould-goods .goods-title a {
  color: #808080;
  font-size: 0.24rem;
}
.mould-goods .goods-title a i {
  display: inline-block;
  width: 0.12rem;
  height: 0.24rem;
  vertical-align: middle;
  background: url(https://static.21cake.com/activity/wap/home/img/more.png) no-repeat center;
  background-size: auto 0.14rem;
  margin-top: -0.04rem;
}
.mould-goods .goods-list {
  margin-top: 0.2rem;
}
.mould-goods .goods-list li {
  background: #FFF;
  border: 1px solid #F2EAE4;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.06);
  border-radius: 0.1rem;
  margin-bottom: 0.4rem;
  overflow: hidden;
}
.mould-goods .goods-list li .img {
  display: block;
}
.mould-goods .goods-list li .img img {
  display: block;
  width: 100%;
}
.mould-goods .goods-list .goods-info {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.28rem;
  text-align: left;
}
.mould-goods .goods-list .goods-info a {
  margin: 0.2rem 0.2rem 0;
}
.mould-goods .goods-list .goods-info h4 {
  margin: 0;
  font-weight: normal;
  line-height: 0.4rem;
  color: #A6A6A6;
}
.mould-goods .goods-list .goods-info .title {
  font-size: 0.3rem;
  font-weight: bold;
  color: #322418;
  display: inline-block;
  margin-right: 0.16rem;
}
.mould-goods .goods-list .goods-info .price {
  font-size: 0.3rem;
  color: #C69C6D;
  display: inline-block;
  vertical-align: middle;
  margin-top: -0.12rem;
}
.mould-goods .goods-list .goods-info p {
  text-align: left;
  line-height: 0.34rem;
  margin: 0.14rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mould-goods .goods-list .goods-info .btn-cart {
  margin: 0.2rem 0.2rem 0 0;
  width: 0.9rem;
  height: 0.9rem;
}
.mould-goods .goods-list .goods-info .btn-cart i {
  display: inline-block;
  width: 100%;
  height: 100%;
  background: url(https://static.21cake.com/themes/wap/img/new-home-icon.png) no-repeat;
  background-position: -35px 3px;
  background-size: 80px auto;
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

.mould-goods .activity-title {
  font-weight: normal;
  line-height: 0.4rem;
  margin: 0 0 0.3rem;
  text-align: left;
}
.mould-goods .activity-title span {
  display: inline-block;
  height: 0.4rem;
  color: #322418;
  font-size: 0.26rem;
  background: #F4EBE2;
  border-radius: 2rem;
  padding: 0 0.2rem;
}
.mould-goods .activity-box {
  box-shadow: 0 0 0.2rem 0 rgba(0,0,0,0.10);
  border-radius: 0.1rem;
  position: relative;
  margin-left: 0.06rem;
}
.mould-goods .activity-box a {
  display: flex;
  width: 100%;
  background: #fff;
}
.mould-goods .activity-box a .left {
  flex-shrink: 0;
  width: 40%;
  background: #fff;
  text-align: left;
}
.mould-goods .activity-box a .left h6 {
  font-size: 0.3rem;
  line-height: 0.44rem;
  height: 0.44rem;
  padding: 0 0.2rem;
  margin: 0.24rem 0 0;
  font-weight: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.mould-goods .activity-box a .left p {
  font-size: 0.24rem;
  color: #999;
  height: 1.4rem;
  background: #fff;
  padding: 0 0.2rem;
  margin: 0;
}
.mould-goods .activity-box a .left span {
  font-size: 0.26rem;
  color: #C2A185;
  float: left;
  display: block;
  padding-left: 0.2rem;
  margin-top: 0.2rem;
}
.mould-goods .activity-box a .right {
  flex-shrink: 0;
  width: 60%;
  border-radius: 0 0.1rem 0.1rem 0;
}
.mould-goods .activity-box a .right img {
  display: block;
  width: 100%;
}
</style>