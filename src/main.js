import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueWechatTitle from 'vue-wechat-title'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(VueAwesomeSwiper)
Vue.use(VueWechatTitle)

router.beforeEach((to, from, next) => {
  if(to.meta.title) {    // 动态网页title
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  render: h => h(App),
  mounted() {
    this.v()
  },
  methods: {
    v() {
      const r = document.documentElement;
      let a = r.getBoundingClientRect().width;
      if (a > 750) a = 750;
      r.style.fontSize = a / 7.5 + 'px';
      window.addEventListener('resize', () => {
        this.v()
      }, false)
    }
  }
}).$mount('#app')
