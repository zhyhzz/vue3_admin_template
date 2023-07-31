import { createApp } from 'vue'
import App from './App.vue'
//引入element-plus插件与样式
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

//配置element-plus国际化
import zhCn from "element-plus/dist/locale/zh-cn.mjs"


import 'virtual:svg-icons-register'

import globalComponent from "@/components"
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'

import router from './router'

import pinia from './store'


const app = createApp(App)
app.use(globalComponent)
//注册模板路由
app.use(router)
app.use(pinia)
app.mount('#app')