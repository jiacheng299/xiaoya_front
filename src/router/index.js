import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useStateStore } from "../stores/state"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: HomeView,
      children: [
        {
          path: '/home',
          name: '首页',
          component: () => import('../views/HomePage.vue')
        },
        {
          path: '/data',
          name: '数据导入',
          component: () => import('../views/DataUpload.vue')
        },
        {
          path: '/data-observation',
          name: '数据观察',
          component: () => import('../views/DataObservation.vue'),
        },
        {
          path: '/data-preprocess',
          name: '数据预处理',
          component: () => import('../views/DataPreProcess.vue'),
        },
        {
          path: '/data-analyse',
          name: '数据分析',
          component: () => import('../views/DataAnalyse.vue'),
        },
        {
          path: '/model',
          name: '模型部分',
          component: () => import('../views/Model.vue'),
        },
        {
          path: '/predict',
          name: 'AI模型预测',
          component: () => import('../views/Predict.vue')
        },
        {
          path: '/uncertainty',
          name: '不确定性量化',
          component: () => import('../views/Uncertainty.vue')
        },
        {
          path: '/unfairness',
          name: '不公平性挖掘',
          component: () => import('../views/UnfairnessAnalysis.vue')
        },
        {
          path: '/statistics',
          name: '统计分析',
          component: () => import('../views/Statistics.vue')
        },
        {
          path: '/indicator',
          name: '指标预测',
          component: () => import('../views/indicator/Indicator.vue')
        }
      ]
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('../views/account/Login.vue'),
      children: [
        // 登录
        {
          path: '/login',
          name: 'Login',
          meta: {
            transition: "animate__fadeInDown"
          },
          component: () => import('../components/account/LoginForm.vue')
        },
        // 注册
        {
          path: '/register',
          name: 'Register',
          meta: {
            transition: "animate__fadeInDown"
          },
          component: () => import('../components/account/RegisterForm.vue'),
        },
      ]
    },
    {
      path: '/cases',
      name: '用户病例详细信息',
      component:()=> import('../views/BaseInfo.vue')
    }
  ]
})
router.beforeEach((to, from) => {
  // const state = useStateStore();
  // if(!state.isAuth&&to.name!="Login"&&to.name!="Register"){
  //   ElNotification({
  //     title: "很遗憾",
  //     message: "请先登录",
  //     type: "error",
  //     duration: 3000
  //   })
  //   return{name:"Login"};
  // }
})
export default router
