import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import {BootstrapVue3 } from 'bootstrap-vue-3'
import ElementPlus from 'element-plus'
import i18n from '@/lang'
import 'element-plus/dist/index.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App);

app.use(router)
app.use(store);
app.use(BootstrapVue3)
app.use(ElementPlus)
app.use(i18n)
app.use(vuetify)


app.mount('#app')

