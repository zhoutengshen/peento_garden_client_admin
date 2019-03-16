import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
import Order from '@/views/order/index'
import User from '@/views/user/index'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/order',
    component: Layout,
    alwaysShow: false, // will always show the root menu
    meta: {
      title: '订单管理',
      roles: ['ADMIN', 'SUPER_ADMIN'] // you can set roles in root nav
    },
    children: [
      {
        path: '/order',
        component: Order,
        name: 'order',
        meta: {
          title: '订单管理',
          roles: ['ADMIN', 'SUPER_ADMIN']
        }
      }
    ]
  },
  {
    path: '/fruit',
    component: Layout,
    alwaysShow: false, // will always show the root menu
    meta: {
      title: '水果管理',
      roles: ['ADMIN', 'EDTOR', 'SUPER_ADMIN'] // you can set roles in root nav
    },
    children: [
      {
        path: '/edited',
        component: () => import('@/views/fruit/edited/EditeFruit'),
        name: 'edited',
        meta: {
          title: '修改水果',
          roles: ['ADMIN', 'EDTOR', 'SUPER_ADMIN'] // you can set roles in root nav
        }
      },
      {
        path: '/add',
        component: () => import('@/views/fruit/add/AddFruit'),
        name: 'add',
        meta: {
          title: '新增水果',
          roles: ['ADMIN', 'EDTOR', 'SUPER_ADMIN'] // you can set roles in root nav
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    alwaysShow: false, // will always show the root menu
    meta: {
      title: '用户管理',
      roles: ['SUPER_ADMIN'] // you can set roles in root nav
    },
    children: [
      {
        path: '/add',
        component: User,
        name: 'user',
        meta: {
          title: '添加管理员',
          roles: ['SUPER_ADMIN'] // you can set roles in root nav
        }
      }
    ]
  }
]
