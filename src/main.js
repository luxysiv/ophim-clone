import 'core-js/stable'
import 'regenerator-runtime/runtime'
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
app.config.errorHandler = (err, vm, info) => {
  console.error("Lỗi Vue:", err, info)
  // phát sự kiện để App.vue bắt và show snackbar
  app.config.globalProperties.$emit?.("show-error", err.message || "Có lỗi xảy ra")
}

window.addEventListener('error', function (e) {
  if (
    e.message === 'ResizeObserver loop completed with undelivered notifications.' ||
    e.message.includes('ResizeObserver loop limit exceeded')
  ) {
    e.stopImmediatePropagation();
    console.warn('⚠️ Cảnh báo ResizeObserver loop, đã được bỏ qua để tránh crash UI.');
  }
});

app.use(router)
app.use(store);
app.use(BootstrapVue3)
app.use(ElementPlus)
app.use(i18n)
app.use(vuetify)


app.mount('#app')

