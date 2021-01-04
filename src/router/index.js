import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    component: () => import('../views/landing.vue'),
    meta: { needData: false },
  },
  {
    path: '/dashboard',
    component: () => import('../views/dashboard.vue'),
    meta: { needData: true },
  },
  {
    path: '/articles',
    component: () => import('../views/articles.vue'),
    meta: { needData: true },
  },
  {
    path: '/playground',
    component: () => import('../views/playground.vue'),
    meta: { needData: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

export default router;
