import { getStore } from '@/store';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth/login',
    name: 'BaseAppUrl',
  },
  {
    name: 'Auth',
    path: '/auth',
    component: () => import('@/views/auth/Auth.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
        meta: {
          guest: true
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
        meta: {
          guest: true
        }
      },
    ],
  },
  {
    path: '/app/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const store = getStore();
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta?.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'Login' })
      return
    } 
  } else if (to.matched.some(record => record.meta?.guest)) {
    if (store.getters.isAuthenticated) {
      next({ name: 'Home' })
      return
    }
  } 
  next()
})

export default router;
