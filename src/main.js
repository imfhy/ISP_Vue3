import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import * as ElIconModules from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App);

// app.config.globalProperties.$axios = axios
// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// app.config.productionTip = false
// app.use(VueAxios,axios);

// 统一注册Icon图标
for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      app.component(iconName, item)
    }
}
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
