<template>
  <div class="footer">
    <div class="footer-cell" v-for="(item, index) in items" :key="index">
      <div class="cell-hd" :class="{on: item.flag}" @click="changeOn(index)">{{item.title}}<i></i></div>
      <ul class="cell-bd" :class="{on: item.flag}" >
        <li v-for="(content, i) in item.contents" :key="i">{{content}}</li>
      </ul>
    </div>
    <div class="footer-brand">
      <img src="https://static.21cake.com/themes/wap/img/footer-logo.png">
      <ul>
        <li><img src="https://static.21cake.com/themes/wap/img/footer-icon-tel.png"></li>
        <li><img src="https://static.21cake.com/themes/wap/img/footer-icon-weibo.png"></li>
        <li><img src="https://static.21cake.com/themes/wap/img/footer-icon-app.png"></li>
      </ul>
    </div>
    <div class="footer-copyright">
      Copyright© 21Cake蛋糕官网商城 2007-2020,版权所有
      <a>京ICP备14006254号-1</a>
      <a>京公网安备11030102010682号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  data() {
    return {
      items: [
        {
          title: '关于我们',
          flag: false,
          contents: ['全站公告 >', '生产资质 >']
        },
        {
          title: '网站运营',
          flag: false,
          contents: [
            '网站注册公司名称: 北京廿一客食品有限公司',
            '网站运营：廿一客（上海）电子商务有限公司',
            '上海廿一客食品有限公司分公司',
            '杭州廿一客食品有限公司',
            '广州廿一客食品有限公司',
            '北京廿一客食品有限公司',
            '深圳廿一客食品有限公司',
            '天津廿一客食品有限公司',
            '广州廿一客食品贸易有限公司',
            '举实（上海）食品有限公司',
          ]
        }
      ]
    }
  },
  methods: {
    changeOn(i) {
      this.items[i].flag = !this.items[i].flag
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  background: #333;
  padding: 0.2rem 0.36rem;
  color: #BEBEBE;
  box-sizing: border-box;
  text-align: left;
}
.footer .cell-hd {
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.footer .cell-bd {
  overflow: hidden;
  max-height: 0;
  transition: .35s;
}
.footer .cell-bd li {
  color: #BEBEBE;
  line-height: 0.36rem;
}
.footer .cell-bd.on {
  height: auto;
  max-height: 3.6rem;
}
.footer .cell-hd i {
  width: 0.8rem;
  height: 0.8rem;
  flex-shrink: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAAqklEQVRIDWNgoDFgJNb8////KwDVckPVv2dkZHxGrF6i1AEtOAzEMDCHKE1ARUzEKiRX3agFBENuNIgIBhE4owETtwpQ5QwCqo2B8gJQNaBMdp2Aeh9gZvwBs8AIqPgsAQ2kSvMALfhK80hmgTrrHZBeQsCJ7kB5UaiaO0D6BAH1fwjIo0oD42m0LEINEmrxaJ6KRi0gGFWkVPp8QNNgGfMnqBggaDo9FAAAkzY5VwL2ItAAAAAASUVORK5CYII=) no-repeat right center;
  background-size: 12px;
}
.footer .cell-hd.on i {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAABAAAAADSPWd/AAAAF0lEQVQYGWP8DwQMVARMVDQLbNTgNxAAB5kEBANHX0UAAAAASUVORK5CYII=) no-repeat right center;
  background-size: 12px;
}

.footer .footer-brand {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.26rem 0;
}
.footer .footer-brand img {
  display: inline-block;
  width: 2.8rem;
  flex-shrink: 0;
}
.footer .footer-brand ul {
  display: flex;
  justify-content: flex-end;
}
.footer .footer-brand ul li {
  width: 0.68rem;
  margin-left: 0.32rem;
}
.footer .footer-brand ul li img {
  display: block;
  width: 100%;
}
.footer .footer-copyright {
  color: #676767;
}
.footer .footer-copyright a {
  color: #676767;
  margin: 0 0.08rem;
}
</style>