<template>
  <div class="type" v-wechat-title="$route.meta.title=title+'_21Cake蛋糕'">
    <div class="top" v-for="(item, index) in types" :key="index">
      <div v-if="title == item.type">
        <div class="img">
          <img :src="item.img" :alt="item.type">
        </div>
        <div class="type-title">
          <h3>{{item.type}}
            <p v-if="item.desc">{{item.desc}}</p>
          </h3>
        </div>
      </div>
    </div>
    <Lists :val="title"></Lists>
  </div>
</template>

<script>
import Lists from '../components/Lists'

export default {
  name: 'Type',
  components: {
    Lists
  },
  data() {
    return {
      type: 'new',
      types: [
        {
          type: '新品',
          img: 'https://m.21cake.com/upload/images/7e0b37d9030d72f029b1feb97cdd667f.jpg',
          desc: '新品尝鲜'
        },
        {
          type: '人气',
          img: 'https://m.21cake.com/upload/images/86372db0924d70abad20ff94efef881d.jpg',
          desc: '人气精选'
        },
        {
          type: '生日',
          img: 'https://m.21cake.com/upload/images/5744b541d02a07f54018d09b8e971bcb.jpg',
          desc: '庆祝感甜点，赞叹生日、生命'
        }
        
        
        
      ]
    }
  },
  mounted() {
    this.type = this.$route.params.type
  },
  computed: {
    title() {
      return this.$route.params.type == 'new' ? '新品': this.$route.params.type == 'popular' ? '人气' : this.$route.params.type == 'birth' ? '生日' : '面包'
    }
  }
}
</script>

<style scoped>
.top .img {
  width: 100%;
}
.top .img img {
  display: block;
  width: 100%;
  height: 3rem;
}
.type-title {
  text-align: center;
}
.type-title h3 {
  padding: 0.16rem 0;
  font-size: 0.3rem;
  font-weight: normal;
  height: 0.6rem;
  margin: 0;
  line-height: 0.3rem;
  background: rgba(213,191,167,0.10);
  border-bottom: 1px solid #E9E9E9;
}
.type-title h3 p {
  font-size: 0.2rem;
  line-height: 0.26rem;
  margin-top: 0.04rem;
  margin-bottom: 0;
  color: #D5BFA7;
}
</style>