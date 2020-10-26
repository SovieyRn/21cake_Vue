<template>
  <div class="sort">
    <ul class="sort_nav">
      <li v-for="(tab, index) in tabs" :key="index" :class="{active: act== index}">
        <span @click="changeTab(index)">{{tab.type}}</span>
      </li>
    </ul>
    <div class="title">
      <h3>{{tabs[act].type}}</h3>
      <p>{{tabs[act].intro}}</p>
    </div>
    <!-- 分类列表组件 -->
    <Lists :val="act"></Lists>
  </div>
</template>

<script>
import Lists from '../components/Lists'

export default {
  name: 'Gallery',
  components: {
    Lists
  },
  data() {
    return {
      act: 0,
      tabs: [
        {type: '蛋糕', intro: '新鲜乳脂奶油蛋糕'},
        {type: '蛋糕', intro: '新鲜乳脂奶油蛋糕'},
        {type: '蛋糕', intro: '新鲜乳脂奶油蛋糕'},
        {type: '蛋糕', intro: '新鲜乳脂奶油蛋糕'},
        {type: '蛋糕', intro: '新鲜乳脂奶油蛋糕'},
        {type: '蛋糕', intro: '新鲜乳脂奶油蛋糕'}
      ],
      items: []
    }
  },
  mounted() {
    this.axios.get('http://localhost:4000/tab').then(res => {
      this.tabs = res.data.data
    }).catch(err => {
      console.log(err)
    })

    this.act = this.$route.params.id - 1
  },
  methods: {
    changeTab(index) {
      this.act = index
    }
  }
}
</script>

<style>
.sort_nav {
  display: flex;
  overflow: auto;
}
.sort_nav::-webkit-scrollbar {
  display:none
}
.sort_nav li {
  flex-shrink: 0;
}
.sort_nav li span {
  display: inline-block;
  color: #707070;
  font-size: 0.28rem;
  line-height: 0.76rem;
  margin: 0 0.4rem;
}
.sort_nav li.active span {
  border-bottom: #442818 2px solid;
  color: #442818;
}
.sort .title {
  padding: 8px 0;
  height: 0.6rem;
  line-height: 0.3rem;
  background: rgba(213,191,167,0.10);
  border-bottom: 1px solid #E9E9E9;
}
.sort .title h3 {
  font-size: 0.3rem;
  font-weight: normal;
  margin: 0;
  color: #442818;
}
.sort .title p {
  font-size: 0.2rem;
  line-height: 0.26rem;
  margin: 0.04rem 0 0;
  color: #D5BFA7;
}
</style>