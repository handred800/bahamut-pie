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
  },
  {
    path: '/dashboard',
    component: () => import('../views/dashboard.vue'),
  },
  {
    path: '/articles',
    component: () => import('../views/articles.vue'),
  },
  {
    path: '/playground',
    component: () => import('../views/playground.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

export default router;
