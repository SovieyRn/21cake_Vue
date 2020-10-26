<template>
  <div class="magiz">
    <h3 class="magiz-title">
      <span>廿一客·文章</span>
    </h3>
    <div class="magiz-content">
      <ul class="magiz-list">
        <!-- 杂志列表 -->
        <li v-for="(magiz, index) in magizs.slice(0,4)" :key="index">
          <router-link :to="'/magazine/'+ magiz.mid">
            <div class="img">
              <img :src="magiz.img" :alt="magiz.head">
            </div>
            <h3>{{magiz.head}}</h3>
            <p></p>
          </router-link>
        </li>
        <!-- 更多 -->
        <li class="more">
          <router-link to="/magazines">查看更多</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Magiz',
  data() {
    return {
      magizs: []
    }
  },
  mounted() {
    this.axios(`http://localhost:4000/magiz`).then(res => {
      this.magizs = res.data.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.magiz {
  margin-top: 0.2rem;
  background: #fff;
}
.magiz .magiz-title {
  font-weight: normal;
  line-height: 0.4rem;
  margin: 0;
  text-align: left;
}
.magiz .magiz-title span {
  display: inline-block;
  height: 0.4rem;
  color: #322418;
  font-size: 0.26rem;
  background: #F4EBE2;
  border-radius: 2rem;
  padding: 0 0.2rem;
}
.magiz .magiz-content {
  overflow: auto;
  padding-bottom: 0.4rem;
  padding-top: 0.1rem;
  width: 100%;
}
.magiz .magiz-content .magiz-list {
  width: 20.66rem;
  padding: 0.2rem 0;
  display: flex;
}
.magiz .magiz-content .magiz-list li {
  width: 4.49rem;
  height: 3.5rem;
  margin: 0 0.1rem;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  border-radius: 0.1rem;
}
.magiz .magiz-content .magiz-list li a {
  display: block;
  width: 100%;
}
.magiz .magiz-content .magiz-list li .img {
  width: 100%;
  height: 2.4rem;
  border-radius: 0.1rem 0.1rem 0 0;
  overflow: hidden;
}
.magiz .magiz-content .magiz-list li .img img {
  display: block;
  width: 100%;
  height: 100%;
}
.magiz .magiz-content .magiz-list li h3 {
  font-size: 0.3rem;
  color: #383838;
  margin: 0.26rem 0 0;
  height: 0.44rem;
  padding: 0 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
  text-align: left;
}
.magiz .magiz-content .magiz-list li p {
  line-height: 0.36rem;
  height: 0.44rem;
  color: #A6A6A6;
  margin: 0 0 0.12rem;
  padding: 0 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
  text-align: left;
}

.magiz .magiz-content .magiz-list li.more {
  width: 2rem;
  line-height: 3.5rem;
  text-align: center;
}
.magiz .magiz-content .magiz-list li.more a {
  display: block;
  width: 100%;
  font-size: 0.3rem;
}
</style>