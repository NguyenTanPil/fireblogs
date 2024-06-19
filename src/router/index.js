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
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPasswordView.vue'),
    meta: {
      title: 'Forgot Password'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminView.vue'),
    meta: {
      title: 'Admin'
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: () => import('../views/CreatePostView.vue'),
    meta: {
      title: 'Create Post'
    }
  },
  {
    path: '/blog-preview',
    name: 'BlogPreview',
    component: () => import('../views/BlogPreviewView.vue'),
    meta: {
      title: 'Blog Preview'
    }
  },
  {
    path: '/view-blog/:blogId',
    name: 'ViewBlog',
    component: () => import('../views/BlogDetailView.vue'),
    meta: {
      title: 'View Blog'
    }
  },
  {
    path: '/edit-blog/:blogId',
    name: 'EditBlog',
    component: () => import('../views/EditBlogView.vue'),
    meta: {
      title: 'View Blog'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlogs`;
  next();
});

export default router;
