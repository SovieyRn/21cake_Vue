import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Gallery from '../views/Gallery.vue'
import Produce from '../views/Produce.vue'
import Type from '../views/Type.vue'
import Cart from '../views/Cart.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import User from '../views/User.vue'
import Magazine from '../views/Magazine.vue'
import Magazines from '../views/Magazines.vue'
import Message from '../views/Message.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '21Cake蛋糕_5小时新鲜送达'
    }
  },
  {
    path: '/gallery/:id?',
    name: 'Gallery',
    component: Gallery,
    meta: {
      title: '网上订购_21Cake'
    }
  },
  {
    path: '/produce/:id?',
    name: 'Produce',
    component: Produce,
    meta: {
      title: '21Cake蛋糕',
      hideNone: true,
      heig: true
    }
  },
  {
    path: '/type/:type?',
    name: 'Type',
    component: Type,
    meta: {
      title: '21Cake蛋糕'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      title: '购物车_21Cake',
      flag: true,
      auth: true
    }
  },
  {
    path: '/magazine/:mid?',
    name: 'Magazine',
    component: Magazine,
    meta: {
      title: '21Cake蛋糕',
      hideNone: true
    }
  },
  {
    path: '/magazines',
    name: 'Magazines',
    component: Magazines,
    meta: {
      title: '廿一客·文章_21Cake蛋糕',
      hideNone: true
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {
      title: '消息中心_21Cake蛋糕',
      auth: true,
      hideNone: true
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      title: '用户登录_21Cake',
      flag: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      title: '用户注册_21Cake',
      flag: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: '会员中心_21Cake',
      flag: true,
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition){
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next)=> {
  if(to.meta.auth){
    if(localStorage.getItem('username')) {
      next()
    }else {
      next('/signin?returnUrl=' + to.path)
    }
  }else {
    next()
  }
})
export default router
