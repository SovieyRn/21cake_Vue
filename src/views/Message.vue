<template>
  <div class="message" :style="{'min-height': clientHeight + 'px'}">
    <ul class="message-tab">
      <li class="tab" v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)">
        <img :src="tab.icon" :alt="tab.tab">
        <br/>
        <span>{{tab.tab}}</span>
      </li>
    </ul>
    <!-- 消息 -->
    <ul class="message-list" v-if="ti == 0">
      <li class="msg">
        <div class="msg-l">
          <h4>您还未开启过纪念日提醒</h4>
          <p>去开启吧>></p>
        </div>
        <div class="msg-r">2020-10-17</div>
      </li>
    </ul>
    <!-- 物流 -->
    <ul class="message-list" v-if="ti == 1">
      <li class="empty">
        <img src="https://m.21cake.com/themes/wap/img/message_empty.png" alt="empty">
        <p>还没有通知～</p>
      </li>
    </ul>
    <!-- 客服 -->
    <div class="server" v-if="maxsize">
      <div class="server-box">
        <div class="top">
          <div class="top-l">
            <img src="https://dn-udeskpub.qbox.me/Fj5i54RVCsH-o1MZdjk9LNpv3efL">
            <h5>21cake在线客服<span></span></h5>
          </div>
          <div class="top-r">
            <div class="icon rad"></div>
            <div class="icon min" @click="minsize"></div>
          </div>
        </div>
        <div class="content" :style="{'min-height': (clientHeight-45) + 'px'}">
          <ul class="msg-list">
            <li class="item">
              <p class="sender"><span class="sender-txt">小廿</span><span class="time-txt">2020/10/20 20:04:00</span></p>
              <div class="msg-content">
                <p>您好，欢迎咨询21cake，人工客服很高兴为您服务~</p>
                <p>订单查询请点击：<span>https://m.21cake.com/t/xK6p</span></p>
              </div>
            </li>
          </ul>
          <div class="editor">
            <div class="ipt">
              <input type="text" placeholder="很高兴为您服务，请描述您的问题">
            </div>
            <div class="toolbar">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      clientHeight: null,
      ti: 0,
      maxsize: false,
      tabs: [
        {
          tab: '通知',
          icon: 'https://m.21cake.com/themes/wap/img/message_notice.png'
        },
        {
          tab: '物流',
          icon: 'https://m.21cake.com/themes/wap/img/message_logistics.png'
        },
        {
          tab: '客服',
          icon: 'https://m.21cake.com/themes/wap/img/message_kefu.png'
        }
      ],
    }
  },
  methods: {
    changeTab(index) {
      if(index == 2) {
        this.maxsize= true
      }else {
        this.ti = index
      }
    },
    minsize() {
      this.maxsize= false
    }
  },
  watch: {
    clientHeight: {
      handler() {
        let a = `${document.documentElement.clientHeight}`
        window.onresize = function temp() {
          a = `${document.documentElement.clientHeight}`;
        };
        this.clientHeight = a - 48
      },
      immediate: true
    }
  },
}
</script>

<style scoped>
.message {
  background: #f6f6f6;
}
.message-tab {
  height: 1.9rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
}
.message-tab .tab {
  width: 33%;
  font-size: 0.24rem;
  text-align: center;
  padding-top: 0.24rem;
  position: relative;
}
.message-tab .tab img {
  display: inline-block;
  width: 42%;
}
.message-list {
  margin-top: 0.2rem;
  background: #fff;
}
.message-list .msg {
  display: flex;
  justify-content: space-between;
  height: 1.28rem;
  width: 100%;
  padding-left: 1.5rem;
  background: url(https://static.21cake.com/themes/wap/img/message_date.png) no-repeat 15px 10px/40px 40px;
  border-bottom: 1px solid #f1f1f1;
  box-sizing: border-box;
}
.message-list .msg .msg-l {
  padding-top: 0.1rem;
  width: 70%;
  text-align: left;
}
.message-list .msg .msg-l h4 {
  font-size: 0.3rem;
  font-weight: normal;
  line-height: 0.6rem;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.message-list .msg .msg-l p {
  font-size: 0.24rem;
  line-height: 0.32rem;
  margin: 0;
  color: #B4B4B4;
}
.message-list .msg .msg-r {
  padding: 0.3rem 0.3rem 0 0;
  width: 30%;
  text-align: right;
  box-sizing: border-box;
  color: #B4B4B4;
}
.message-list .empty {
  background: #f6f6f6;
}
.message-list .empty img {
  display: block;
  margin: 1.8rem auto 0.16rem;
  width: 2.04rem;
}
.message-list .empty p {
  text-align: center;
  color: #B4B4B4;
  font-size: 0.28rem;
  margin: 0;
}
.server .server-box {
  position: fixed;
  top: 0.6rem;
  left: 0;
  right: 0;
  z-index: 999;
}
.server .server-box .top {
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 0;
  padding: 0.22rem;
  background: rgb(213, 191, 167);
  border-radius: 5px 5px 0 0;
}
.server .server-box .top .top-l {
  line-height: 0.8rem;
}
.server .server-box .top .top-l img {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.1rem;
  border-radius: 50%;
  vertical-align: middle;
}
.server .server-box .top .top-l h5 {
  display: inline-block;
  font-size: 0.28rem;
  font-weight: normal;
  margin: 0 0 0 12px;
  vertical-align: middle;
}
.server .server-box .top .top-l h5 span {
  padding-left: 8px;
  font-size: 0.24rem;
  color: rgba(255,255,255,.5);
}
.server .server-box .top .top-r {
  display: flex;
}
.server .server-box .top .top-r .icon {
  font-size: 18px;
  padding: 5px 5px 5px 10px;
}
.server .server-box .top .top-r .icon::before {
  display: block;
  width: 0.36rem;
  height: 0.36rem;
}
/* .server .server-box .top .top-r .icon.rad::before {
  content: "\e7b1";
} */
.server .server-box .top .top-r .icon.min::before {
  line-height: 0.6rem;
  content: "\2014";
}
.server .server-box .content {
  background: #f6f6f6;
  padding: 0.24rem 0.24rem 1.68rem 0.24rem;
  box-sizing: border-box;
}
.server .server-box .content .item {
  margin-top: 0.2rem;
  text-align: left;
}
.server .server-box .content .item .sender {
  margin: 0;
  font-size: 12px;
  line-height: 0.36rem;
  color: rgba(36,46,51,.4);
}
.server .server-box .content .item .sender .time-txt {
  margin-left: 0.24rem;
}
.server .server-box .content .item .msg-content {
  padding: 0.16rem 0.24rem;
  -webkit-border-radius: 0.36rem;
  border-radius: 0.36rem;
  box-shadow: 0 0 16px 0 rgba(8,23,26,.04);
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  background-color: #fff;
  max-width: 5.6rem;
  box-sizing: border-box;
}
.server .server-box .content .item .msg-content p {
  margin: 0;
  font-size: 0.28rem;
  color: #222;
  line-height: 0.4rem;
}
.server .server-box .content .item .msg-content p span {
  color: #307ae8;
}
.server .server-box .content .editor {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.24rem;
  height: 1.2rem;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.10);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.server .server-box .content .editor .ipt {
  width: 78%;
}
.server .server-box .content .editor input {
  padding: 0.14rem 0.1rem;
  width: 100%;
  margin: 0;
  border: none;
  outline: none;
  height: 36px;
  line-height: 24px;
  box-sizing: border-box;
}
.server .server-box .content .editor .toolbar {
  width: 22%;
  text-align: right;
}
.server .server-box .content .editor .toolbar span {
  display: inline-block;
}
.server .server-box .content .editor .toolbar span::before {
  display: block;
  width: 0.72rem;
  height: 0.72rem;
  line-height: 0.6rem;
  font-size: 38px;
  color: rgba(36,46,51,.7);
}
.server .server-box .content .editor .toolbar span:first-child::before {
  content: '\263a';
}
.server .server-box .content .editor .toolbar span:last-child::before {
  font-size: 0.52rem;
  line-height: 0.76rem;
  content: '\2795';
}
</style>