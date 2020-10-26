<template>
  <div class="signin">
    <ul class="title">
      <li class="way1 active">帐号密码登录</li>
      <li class="way2">手机验证码登录</li>
    </ul>
    <ul class="ipt-group">
      <li class="ipt">
        <input id="tel" type="text" maxlength="11" data-i="0" @input="changeValue" placeholder="手机号">
        <i v-if="info[0].flag"></i>
      </li>
      <li class="ipt">
        <input id="psw" type="password" minlength="8" maxlength="20" data-i="1" @input="changeValue" placeholder="密码">
        <i v-if="info[1].flag"></i>
      </li>
      <li class="ipt err-txt">
        <div v-if="err"><i></i>{{errTxt}}</div>
      </li>
      <div class="btn-reg" @click="signIn">登录</div>
    </ul>
    <div class="remember">
      <span>忘记密码</span>
      <router-link to="/signup">去注册>>></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      info: [
        {tel: null, flag: false},
        {psw: null, flag: false}
      ],
      err: false,
      errTxt: null,
      sign: false
    }
  },
  methods: {
    changeValue(e) {
      let value = e.target.value
      let i = e.target.dataset.i

      if(e.target.id == 'tel') {
        this.info[i].tel = value
        if(!value.match(/^1(3|4|5|6|7|8|9)\d{9}$/)) {
          this.info[i].flag = false
          this.err = true
          this.errTxt = '请输入正确的手机号码'
        }else {
          this.info[i].flag = true
          this.err = false
        }
      }
      else if(e.target.id == 'psw') {
        this.info[i].psw = value
        if(!value.match(/^[A-Za-z0-9]{8,20}$/)) {
          this.info[i].flag = false
          this.err = true
          this.errTxt = '密码：8～20字符，需同时包含英文和数字'
        }else {
          this.err = false
          this.info[i].flag = true
        }
      }
    },
    signIn() {
      if(!this.info[0].flag) {
        this.err = true
        this.errTxt = '请输入手机号！'
        return
      }
      else if(!this.info[1].flag) {
        this.err = true
        this.errTxt = '请输入密码！'
        return
      }else {
        this.axios(`http://localhost:4000/signin?name=${this.info[0].tel}`).then(res => {
          if(res.data.data[0].password !== this.info[1].psw) {
            this.err = true
            this.errTxt = '密码错误！'
          }else {
            localStorage.username = this.info[0].tel
            this.$router.push(this.$route.query.returnUrl)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped>
.signin {
  padding: 0.32rem 0.56rem 0;
  background: #fff;
}
.title {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #D5D5D5;
}
.title li {
  width: 50%;
  padding: 0.16rem 0;
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.28rem;
  color: #969696;
  border-bottom: 1px solid #fff;
}
.title li.active {
  color: #333;
  border-color: #442818;
}

.ipt-group {
  margin-top: 0.5rem;
  font-size: 0.28rem;
}
.ipt-group .ipt {
  height: 0.92rem;
  border-bottom: 1px solid #D5D5D5;
  position: relative;
}
.ipt-group .ipt:last-child {
  border-bottom: none;
}
.ipt-group .ipt input {
  display: block;
  width: 100%;
  height: 0.92rem;
  line-height: 0.88rem;
  padding: 0.2rem 0;
  outline: none;
  border: none;
  box-sizing: border-box;
}
.ipt-group .ipt input::placeholder {
  color: #C69C6D;
}
.ipt-group .ipt i {
  display: inline-block;
  height: 0.34rem;
  width: 0.34rem;
  background: url(https://static.21cake.com/themes/wap/img/pass.png) right center;
  background-size: cover;
  position: absolute;
  top: 0.28rem;
  right: 0.2rem;
}
.ipt-group .ipt i.weak {
  background: url(https://static.21cake.com/themes/wap/img/weak.png) right center;
  background-size: cover;
}
.ipt-group .ipt i.moderate {
  background: url(https://static.21cake.com/themes/wap/img/moderate.png) right center;
  background-size: cover;
}
.ipt-group .ipt i.strong {
  background: url(https://static.21cake.com/themes/wap/img/strong.png) right center;
  background-size: cover;
}
.ipt-group .ipt.ver {
  display: flex;
}
.ipt-group .ipt.ver input {
  display: inline-block;
  width: 60%;
}
.ipt-group .ipt.ver i {
  right: 2.76rem;
}
.ipt-group .ipt.ver span {
  display: inline-block;
  width: 40%;
  font-size: 0.28rem;
  text-align: center;
  line-height: 0.76rem;
  height: 0.76rem;
  margin-top: 0.08rem;
  background: #442818;
  color: #fff;
}
.ipt-group .ipt.err-txt {
  color: #FF714D;
  text-align: left;
  text-indent: 0.44rem;
  line-height: 0.92rem;
}
.ipt-group .ipt.err-txt i {
  background: url(https://static.21cake.com/themes/wap/img/tip.png) right center;
  background-size: cover;
  left: 0;
}
.btn-reg {
  width: 100%;
  height: 0.84rem;
  background: #442818;
  color: #fff;
  font-size: 0.28rem;
  line-height: 0.84rem;
  text-align: center;
}

.remember {
  margin-top: 0.5rem;
  height: 0.36rem;
  font-size: 0.24rem;
  line-height: 0.36rem;
  color: #744F3A;
  text-align: right;
}
.remember a {
  margin-left: 0.36rem;
}
</style>