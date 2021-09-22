import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import LinkTree from './components/LinkTree.vue';
import NotFound from './components/NotFound.vue';
import Redirect from './components/Redirect.vue';
import './index.css';

const routes = [
  { path: '/', component: LinkTree },
  { path: '/:slug', component: Redirect },
  { path: '/404', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


createApp(App).use(router).mount('#app')
