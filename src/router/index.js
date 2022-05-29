import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ControlPanel from '../views/ControlPanel.vue'
import OnlineTable from '../views/OnlineTable.vue'
// 异步加载
const SchedulePanel = ()=>import('../views/schedule_panel/Index.vue')
const Schedule = ()=>import('../views/schedule_panel/Schedule.vue')
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
        path:'/schedule-panel',
        name:'schedule-panel',
        component: SchedulePanel,
        redirect:'/schedule-panel/schedule',
        children:[
          {
            path:'schedule',
            component: Schedule,
          }
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

export default router
