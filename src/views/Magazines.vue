<!-- 杂志列表 -->
<template>
  <div class="magazines">
    <ul>
      <li v-for="(magiz, index) in magazs.slice(0, 6)" :key="index">
        <p class="date"><span>2018.11.23</span></p>
        <div class="info">
          <router-link :to="'/magazine/' + magiz.mid">
            <div class="title">
              <h3>{{magiz.head}}</h3>
              <p>{{magiz.date}}</p>
            </div>
            <div class="img">
              <img :src="magiz.img" :alt="magiz.head">
            </div>
            <p class="desc"></p>
            <div class="read">阅读全文</div>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Magazines',
  data() {
    return {
      magazs: []
    }
  },
  mounted() {
    this.axios(`http://localhost:4000/magiz`).then(res => {
      this.magazs = res.data.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.magazines {
  margin: 0 0.24rem;
}
.magazines li {
  margin: 0.4rem 0;
}
.magazines li .date {
  margin: 0 0 0.3rem;
}
.magazines li .date span {
  display: inline-block;
  background: #cecece;
  color: #fff;
  font-size: 0.24rem;
  line-height: 0.4rem;
  border-radius: 0.06rem;
  padding: 0.02rem 0.12rem;
}
.magazines li .info {
  border: 1px solid #d3d3d3;
  border-radius: 0.12rem;
  padding: 0.3rem;
  background: #fff;
  text-align: left;
}
.magazines li .info a {
  display: block;
}
.magazines li .info .title {
  height: 0.9rem;
  width: 100%;
  margin-bottom: 0.2rem;
}
.magazines li .info .title h3 {
  color: #101010;
  font-size: 0.36rem;
  font-weight: normal;
  margin: 0;
}
.magazines li .info .title p {
  font-size: 0.24rem;
  color: #919191;
  line-height: 0.32rem;
  margin: 0.06rem 0 0;
}
.magazines li .info .img {
  width: 100%;
}
.magazines li .info .img img {
  display: block;
  width: 100%;
}
.magazines li .info .desc {
  font-size: 0.28rem;
  color: #909090;
  margin: 0.2rem 0;
  overflow: hidden;
}
.magazines li .info .read {
  height: 0.8rem;
  line-height: 0.8rem;
  color: #040404;
  border-top: 1px solid #efefef;
  background: url(https://m.21cake.com/themes/wap/img/Page-go.png) no-repeat center right;
  background-size: 8px;
  margin-bottom: -5px;
}
</style>