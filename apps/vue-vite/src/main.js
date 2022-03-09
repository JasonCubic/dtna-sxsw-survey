import { createApp } from 'vue';
import vSelect from 'vue-select';
import App from './App.vue';

import './assets/scss/bootstrap.scss';
import './assets/css/vue-select.css';

const app = createApp(App);
app.component('VSelect', vSelect);
app.mount('#app');
