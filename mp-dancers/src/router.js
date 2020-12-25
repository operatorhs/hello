import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/goods'
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'cart',
    component: () => import('./view/cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'certificate-login',
    component: () => import('./view/certificate-login'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'certificate-down',
    component: () => import('./view/certificate-down'),
    meta: {
      title: '下载证书'
    }
  },
  {
    name: 'certificate-archives',
    component: () => import('./view/certificate-archives'),
    meta: {
      title: '档案信息'
    }
  },
  {
    name: 'certificate-exhibition',
    component: () => import('./view/certificate-exhibition'),
    meta: {
      title: '查看信息'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title
  }
  next()
})

export {
  router
};
