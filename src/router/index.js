import { createRouter, createWebHistory } from 'vue-router';
import SharePage from '@/components/SharePage.vue'; // 确保路径正确，通常需要 .vue 后缀
import HomePage from '@/components/HomePage.vue';

// 定义路由
const routes = [
  {
    path: '/share/:id', // 动态路由的参数使用冒号命名
    name: 'share',
    props: true, // 这允许从路由参数中传递 props
    component: SharePage
  },
  {
    path: '/', // 动态路由的参数使用冒号命名
    component: HomePage
  },
  // ... 可以添加更多的路由
];

// 创建路由器实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes: routes // 确保传递 routes 数组
});

export default router;