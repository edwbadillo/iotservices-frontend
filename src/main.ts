import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import router from './router'

import './plugins/yup'
import 'bootstrap/dist/js/bootstrap.bundle'

createApp(App).use(store).use(router).mount('#app')
