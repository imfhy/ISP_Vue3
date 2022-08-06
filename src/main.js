import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import * as ElIconModules from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'
// import '../src/assets/theme/index.scss'
// import './assets/css/element-variables.scss'
const app = createApp(App);
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
