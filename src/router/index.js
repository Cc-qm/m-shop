import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  // 首页
  {
    path: '/home',
    component: () => import('@/views/Home')
  },
  // 分类页面
  {
    path: '/category',
    component: () => import('@/views/Category')
  },
  // 购物车页面
  {
    path: '/cart',
    component: () => import('@/views/Cart')
  },
  // 我的页面
  {
    path: '/member',
    component: () => import('@/views/Member')
  },
  // 登录页面
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    component: () => import('@/views/Error')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/member') {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
