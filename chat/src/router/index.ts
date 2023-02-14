// Composables
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      /**       {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      }, 
      */
      {
        path: '',
        name: 'User',
        component: () => import('@/views/UserList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/chat',
        name: 'ChatBoard',
        component: () => import('@/views/ChatBoard.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/default/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/signup',
    component: () => import('@/layouts/default/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'SignUp',
        component: () => import('@/views/SignUp.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const requiresAuth = to.meta.requiresAuth;
  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });
  }
});

export default router;
