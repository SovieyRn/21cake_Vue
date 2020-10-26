<!-- 杂志内容 -->
<template>
  <div class="magazine" v-wechat-title="$route.meta.title=magiz.head+'_21Cake蛋糕'">
    <h2 class="title">{{magiz.head}}</h2>
    <p class="date">发布时间：{{magiz.date}}</p>
    <div class="content" v-html="magiz.content"></div>
  </div>
</template>

<script>
export default {
  name: 'Magazine',
  data() {
    return {
      magiz: {}
    }
  },
  mounted() {
    console.log(this.$route)
    this.axios(`http://localhost:4000/magazine?mid=${this.$route.params.mid}`).then(res => {
      this.magiz = res.data.data[0]
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.magazine {
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  text-align: left;
}
.magazine .title {
  font-size: 0.48rem;
  line-height: 0.68rem;
  font-weight: normal;
  margin: 0;
}
.magazine .date {
  font-size: 0.24rem;
  color: #8c8c8c;
  margin: 0;
}
.magazine .content {
  margin-top: 15px;
}
.magazine .content >>> img {
  display: block;
  width: 100%;
}
.magazine .content >>> p {
  margin: 0;
}
</style>