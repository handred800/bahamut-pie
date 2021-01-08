import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    name: 'landing-page',
    path: '/',
    component: () => import('../views/landing.vue'),
    meta: {
      index: 0,
      needData: false,
    },
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('../views/dashboard.vue'),
    meta: {
      index: 1,
      needData: true,
    },
  },
  {
    name: 'articles',
    path: '/articles',
    component: () => import('../views/articles.vue'),
    meta: {
      index: 2,
      needData: true,
    },
  },
  {
    name: 'playground',
    path: '/playground',
    component: () => import('../views/playground.vue'),
    meta: {
      index: 3,
      needData: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

export default router;
