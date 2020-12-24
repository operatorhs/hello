import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/class'
  },
  {
    path: '/class',
    component: Layout,
    redirect: '/class/list',
    meta: { title: '班级管理' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/class/class-list/list'),
        hidden: true,
        meta: { activeMenu: '/class', title: '班级管理' }
      },
      {
        path: 'certificate/:classID',
        name: 'certificate',
        component: () => import('@/views/class/certificate'),
        hidden: true,
        meta: { activeMenu: '/class', title: '证书管理' }
      },
      {
        path: 'level/:classID',
        name: 'level',
        component: () => import('@/views/class/level'),
        hidden: true,
        meta: { activeMenu: '/class', title: '证书管理' }
      },
      {
        path: 'student/:classID',
        name: 'student',
        component: () => import('@/views/class/students'),
        hidden: true,
        meta: { activeMenu: '/class', title: '学员管理' }
      },
      {
        path: 'created-certificate',
        name: 'created-certificate',
        component: () => import('@/views/class/students/created-certificate'),
        hidden: true,
        meta: { activeMenu: '/class', title: '学员管理' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/list',
    meta: { title: '会员管理' },
    children: [
      {
        path: 'list',
        name: 'member-list',
        component: () => import('@/views/member/list'),
        hidden: true,
        meta: { activeMenu: '/class', title: '学员管理' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
