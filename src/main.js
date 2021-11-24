import Vue from 'vue';
import App from './App.vue';
import Chakra from '@chakra-ui/vue';
import router from './router';
import './styles/index.css';
import feather from 'vue-icon';

Vue.use(Chakra).use(feather, 'v-icon');

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
