<template>
  <div class="user">
    <div class="top">
      <h3>我的廿一客</h3>
    </div>
    <div class="person">
      <div class="myinfo">
        <div class="logo">
          <img src="https://m.21cake.com/wap_themes/21cake/images/icon/ico_member.png" alt="">
        </div>
        <div class="info">
          <p class="title">21cake</p>
          <p class="desc">当前等级：{{info.grade}}</p>
          <p class="phone">{{info.username}}</p>
          <div class="update">修改个人信息 ></div>
        </div>
        <div class="activity">
          <ul class="balance">
            <li class="tit">￥{{info.money}}</li>
            <li>果实币余额</li>
          </ul>
          <ul class="coupon">
            <li class="tit">{{info.coupon}}张</li>
            <li>优惠券</li>
          </ul>
        </div>
        <ul class="menu-list">
          <li class="menu">
            <p>全部订单</p>
          </li>
          <li class="menu">
            <p>地址管理</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="ad">
      <img src="https://static.21cake.com//upload/images/20200317/7649161442134eb493c5d60fbfe84540.jpeg">
    </div>
    <div class="exit" @click="exitLogin">退出登录</div>
    <div class="bottom">
      <div class="contact-us">
        <p class="info">订购专线：400-650-2121</p>
        <p class="copyright">
          COPYRIGHT 2013  京ICP备06069127号  京公网安备
          <span>11011202001547</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      info: {}
    }
  },
  mounted() {
    let name = localStorage.getItem('username')

    this.axios(`http://localhost:4000/signin?name=${name}`).then(res => {
      this.info = res.data.data[0]
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    exitLogin() {
      localStorage.removeItem('username')
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
.top h3 {
  width: 100%;
  margin: 0;
  font-size: 0.32rem;
  line-height: 0.88rem;
  color: #8e6a55;
  font-weight: normal;
  border-bottom: 0.02rem solid #fbeeef;
}
.person {
  margin-top: 0.46rem;
  color: #684029;
  font-size: 0.24rem;
}
.myinfo .logo {
  width: 100%;
}
.myinfo .logo img {
  display: inline-block;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 auto;
}
.myinfo .info p {
  margin: 0 auto;
}
.myinfo .info .title {
  line-height: 0.5rem;
  color: #442818;
}
.myinfo .info .desc {
  color: #8e6a55;
  margin-top: -0.08rem;
  line-height: 0.56rem;
}
.myinfo .info .phone {
  color: #442818;
  width: 2.2rem;
  margin-bottom: 0.16rem;
  line-height: 0.56rem;
  background: url(https://mold.21cake.com/wap_themes/21cake/images/icon/Phone.png) 0px center no-repeat;
  background-size: 10px 14px;
}
.myinfo .info .update {
  color: #8e6a55;
  width: 2.4rem;
  line-height: 0.48rem;
  border: 0.02rem solid #684029;
  border-radius: 0.08rem;
  margin: 0 auto;
  padding: 0.04rem;
}
.myinfo .activity {
  display: flex;
  margin-top: 0.4rem;
  text-align: center;
  padding-top: 0.1rem;
  border-top: 0.02rem solid #efefef;
}
.myinfo .activity ul {
  width: 50%;
}
.myinfo .activity ul li {
  color: #8e6a55;
}
.myinfo .activity ul li.tit {
  color: #442818;
  font-size: 0.28rem;
}
.myinfo .menu-list {
  margin-top: 0.7rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.myinfo .menu-list .menu {
  padding-left: 0.88rem;
  line-height: 0.96rem;
  background: url(https://m.21cake.com/wap_themes/21cake/images/icon/member2.png) 12px center no-repeat;
  background-size: 23px;
}
.myinfo .menu-list .menu p {
  margin: 0 0.3rem 0 0;
  line-height: 0.94rem;
  font-size: 0.28rem;
  color: #8e6a55;
  border-top: 1px solid #eee;
  background: url(https://mold.21cake.com/wap_themes/21cake/images/icon/go_next.png) right center no-repeat;
  background-size: 10px;
}
.ad {
  background: #f6f6f6;
  width: 100%;
  padding: 0.3rem 0.24rem;
  box-sizing: border-box;
}
.ad img {
  display: block;
  width: 100%;
}
.exit {
  text-align: center;
  height: 0.94rem;
  line-height: 0.94rem;
  font-size: 0.28rem;
  background: #fff;
}
.bottom {
  width: 100%;
  background: #333333;
  padding: 0.2rem 5%;
  color: #BEBEBE;
  font-size: 0.24rem;
  box-sizing: border-box;
}
.bottom .contact-us {
  padding: 0.26rem 0 0.54rem;
}
.bottom .contact-us .info {
  color: #a77746;
  font-size: 0.22rem;
  line-height: 18px;
  margin: 0.2rem 0 0;
}
.bottom .contact-us .copyright {
  color: #c6a37c;
  font-size: 10px;
  line-height: 0.32rem;
  margin: 0.2rem 0 0;
}
</style>