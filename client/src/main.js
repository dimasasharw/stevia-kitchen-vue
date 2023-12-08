import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';   

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();

pinia.use(() => { return {$toast: useToast()} });
app.use(pinia);

app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '922001675888-gjmo3i47lg9m5bh0avgp7bin1aqie14t.apps.googleusercontent.com'
})

app.mount('#app')
