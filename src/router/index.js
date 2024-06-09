import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/new-post',
    name: 'NewPost',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../views/BlogsView.vue'),
    meta: {
      title: 'Blogs'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/AboutView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  console.log({ to, from });
  document.title = `${to.meta.title} | FireBlogs`;
  next();
});

export default router;
