<template>
  <div class="signup">
    <h3>用户注册</h3>
    <ul class="ipt-group">
      <li class="ipt">
        <input id="tel" type="text" maxlength="11" data-i="0" @input="changeValue" placeholder="请输入手机号">
        <i v-if="info[0].flag"></i>
      </li>
      <li class="ipt">
        <input id="psw1" type="password" minlength="8" maxlength="20" data-i="1" @input="changeValue" placeholder="密码：8～20字符，需同时包含英文和数字">
        <i class="weak" v-if="info[1].flag == 1"></i>
        <i class="moderate" v-if="info[1].flag == 2"></i>
        <i class="strong" v-if="info[1].flag == 3"></i>
      </li>
      <li class="ipt">
        <input id="psw2" type="password" minlength="8" maxlength="20" data-i="2" @input="changeValue" placeholder="确认密码">
        <i v-if="info[2].flag"></i>
      </li>
      <li class="ipt ver">
        <input id="ver" type="text" maxlength="6" data-i="3" @input="changeValue" placeholder="短信验证码">
        <span @click="sendVerify">{{times}}</span>
        <i v-if="info[3].flag"></i>
      </li>
      <li class="ipt err-txt">
        <div v-if="err"><i></i>{{errTxt}}</div>
      </li>
      <div class="btn-reg" @click="signUp">注册</div>
    </ul>
    <div class="remember">
      <label><input type="checkbox" checked>已阅读并同意</label><span>21客会员协议</span>和<span>隐私保护政策</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      info: [
        {tel: null, flag: false},
        {psw1: null, flag: false},
        {psw2: null, flag: false},
        {ver: null, flag: false}
      ],
      verify: null,
      err: false,
      errTxt: null,
      times: '发送验证码',
      enable: true,
      sign: false
    }
  },
  methods: {
    changeValue(e) {
      // console.log(e)
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
      else if(e.target.id == 'psw1') {
        this.info[i].psw1 = value
        if(value.match(/^[A-Za-z0-9]{17,20}$/)) {
          this.info[i].flag = 3
        }else if(value.match(/^[A-Za-z0-9]{8,16}$/)) {
          this.info[i].flag = 2
        }else if(value.match(/^[A-Za-z0-9]{1,7}$/)) {
          this.info[i].flag = 1
        }else {
          this.info[i].flag = false
          this.err = true
          this.errTxt = '密码：8～20字符，需同时包含英文和数字'
        }
      }
      else if(e.target.id == 'psw2') {
        this.info[i].psw2 = value
        if(this.info[1].psw1 !== value) {
          this.info[i].flag = false
          this.err = true
          this.errTxt = '两次密码输入不一致'
        }else {
          this.info[i].flag = true
          this.err = false
        }
      }
      else if(e.target.id == 'ver') {
        this.info[i].ver = value
        if(this.verify == value) {
          this.info[i].flag = true
          this.err = false
        }
      }
    },
    sendVerify() {
      if(!this.info[0].flag) {
        this.err = true
        this.errTxt = '请输入正确的手机号码'
      }else {
        if(this.enable) {    // 定时器结束前不能再次点击
          this.enable = false
          let time = 10
          let timer = setInterval(() => {
            time -= 1
            this.times = time + 's'
            if(time == -1) {
              clearInterval(timer)
              this.times= '发送验证码',
              this.enable = true
            }
          }, 1000)

          // 随机验证码
          let a = ''
          for(let j = 0; j < 6; j++) {
            a += parseInt(Math.random()*10)
          }
          this.verify = a
          this.err = true
          this.errTxt = this.verify
        }
      }
    },
    signUp() {
      if(!this.info[0].flag) {
        this.err = true
        this.errTxt = '请输入手机号！'
        return
      }
      else if(!this.info[1].flag) {
        this.err = true
        this.errTxt = '密码由8～20字符，需同时包含英文和数字！'
        return
      }
      else if(!this.info[2].flag) {
        this.err = true
        this.errTxt = '两次密码输入不一致！'
        return
      }
      else if(!this.info[3].flag) {
        this.err = true
        this.errTxt = '验证码错误！'
        return
      }else {
        this.axios(`http://localhost:4000/signin?name=${this.info[0].tel}`).then(res => {
          if(res.data.data[0]) {
            this.err = true
            this.errTxt = '用户已注册！'
          }else {
            this.axios(`http://localhost:4000/signup?name=${this.info[0].tel}&psw=${this.info[2].psw2}`).then(res => {
              if(res.data.message == '注册成功！') {
                localStorage.username = this.info[0].tel
                this.$router.push({path: '/'})
              }
            }).catch(err => {
              console.log(err)
            })
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
.signup {
  padding: 0.32rem 0.56rem 0;
  background: #fff;
}
.signup h3 {
  font-size: 0.3rem;
  color: #423e3c;
  text-align: center;
  font-weight: normal;
  margin: 0;
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
  text-align: left;
}
.remember input[type="checkbox"] {
  margin: 0 5px 0 0;
  vertical-align: middle;
}
.remember span {
  color: #2a99fa;
}
</style>