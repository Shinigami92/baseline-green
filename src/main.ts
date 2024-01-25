import { createApp } from 'vue';

import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

import AppVue from '@/App.vue';

const app = createApp(AppVue);

app.mount('#app');
