import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ControlPanel from '../views/ControlPanel.vue'
import OnlineTable from '../views/OnlineTable.vue'
import Config from '../views/Config.vue'
import { nextTick } from 'vue'
// 异步加载
const SchedulePanel = ()=>import('../views/daily_config/Index.vue')
const Schedule = ()=>import('../views/daily_config/Schedule.vue')
const Program = ()=>import('../views/daily_config/Program.vue')
const DailyConfiguration = ()=>import('../views/daily_configuration/Index.vue')
const Production = ()=>import('../views/daily_configuration/Production.vue')
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
const routes = [
  {
    path: '',
    component: Index,
    // 路由元信息
    meta:{
      isLogin: true,
    },
    children:[
      {
        path:'/home',
        name:'Home',
        component: Home
      },
      {
        path:'/control-panel',
        name:'ControlPanel',
        component: ControlPanel
      },
      {
        path:'/online-table',
        name:'OnlineTable',
        component: OnlineTable
      },
      {
        path:'/config',
        name:'Config',
        component: Config
      },
      {
        path:'/daily-config',
        name:'daily-config',
        component: SchedulePanel,
        redirect:'/daily-config/program',
        children:[
          {
            path:'schedule',
            component: Schedule,
          },
          {
            path:'program',
            component: Program,
          },
        ]
      },
      {
        path:'/daily-configuration',
        name:'DailyConfiguration',
        component: DailyConfiguration,
        redirect:'/daily-configuration/production',
        children:[
          {
            path:'production',
            component: Production,
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由拦截
router.beforeEach((to,from,next)=>{
  console.log("路由拦截")
  // 判断是否需要登录
  if(to.matched.some(ele=>ele.meta.isLogin)){
    // 判断当前用户是否已经登录
    let token = localStorage.getItem("token")
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{ // 不需要登录
    next();
  }
})

export default router
