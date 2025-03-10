import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapVue3 from 'bootstrap-vue-3'

const app = createApp(App);

app.use(router)
app.use(store);
app.use(BootstrapVue3)


app.mount('#app')

