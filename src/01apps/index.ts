import App from 'apps/App.vue'
import router from 'apps/router'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import 'element-plus/dist/index.css'

import 'virtual:svg-icons-register'

import 'apps/styles/index.scss'

const app = createApp(App)

app.use(router)

app.use(ElementPlus)

export { app }
