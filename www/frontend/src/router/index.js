// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import BlogList from '../pages/BlogList.vue';
import BlogPost from '../pages/BlogPost.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: BlogList },
  { path: '/blog/:id', component: BlogPost, props: true }, // 通过props接收id
  { path: '/:pathMatch(.*)*', redirect: '/' } // 404处理（或指向自定义404页）
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;