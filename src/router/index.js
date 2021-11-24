import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () =>
      import(/* webpackChunkName: "friends" */ '../views/Friends.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (routes.some((route) => route.path === to.path)) {
    next();
  } else {
    next('/');
  }
});

export default router;
