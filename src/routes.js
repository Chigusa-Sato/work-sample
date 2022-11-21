import { createRouter } from 'vue-router';
import Images from './pages/Images.vue';

const routes = [
  {
    path: '/',
    component: Images,
  },
];

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
