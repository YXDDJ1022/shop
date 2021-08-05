//
import Vue from 'vue'

// 引入路由模块
import VueRouter from 'vue-router'
// 组件
import home from '../components/home/Home.vue'
import login from '../components/login/Login.vue'
import users from '../components/users/Users.vue'
import roles from '../components/roles/Roles.vue'
import rights from '../components/rights/Rights.vue'
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/home',
      component: home,
      children: [{ path: '/users', component: users },
        { path: '/roles', component: roles },
        { path: '/rights', component: rights }
      ]
    },
    { path: '/login', component: login }
  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
// 导出路由
export default router
