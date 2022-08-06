<template>
  <div>
    <div class="header"><div class="sysname">SMT排程系统</div></div>
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      background-color="white"
      text-color="black"
      style="min-height: 1000px"
      active-text-color="#409EFF"
      router>
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/control-panel">
        <el-icon><Operation /></el-icon>
        <span>控制面板</span>
      </el-menu-item>
      <el-menu-item index="/config">
        <el-icon><Tools /></el-icon>
        <span>排程配置</span>
      </el-menu-item>
      <el-menu-item index="/online-table">
        <el-icon><Histogram /></el-icon>
        <span>在线表格</span>
      </el-menu-item>
      <el-sub-menu index="/schedule-panel">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>排程面板</span>
        </template>
        <el-menu-item index="/schedule-panel/schedule"><el-icon><Histogram /></el-icon>排程表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/daily-configuration">
        <template #title>
          <el-icon><Tools /></el-icon>
          <span>每日配置</span>
        </template>
        <el-menu-item index="/daily-configuration/production"><el-icon><Histogram /></el-icon>生产报表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../assets/theme/menu.scss';
</style>