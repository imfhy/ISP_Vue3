<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>
<script>
  import { ElConfigProvider } from 'element-plus'
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  export default {
    components: {
      [ElConfigProvider.name]: ElConfigProvider
    },
    setup() {
      // 切换为中文
      let locale = zhCn
      return {
        locale
      }
    }
  }
</script>
<script setup>
import { onMounted } from 'vue'
 
onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#15ae6d');
  document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0');
  document.body.style.setProperty('--el-color-primary-light-3', '#2acb88');
})
</script>
