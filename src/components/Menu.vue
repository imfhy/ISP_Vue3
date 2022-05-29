<template>
  <div>
    <div class="header"><div class="sysname">SMT排程系统</div></div>
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      background-color="white"
      text-color="black"
      style="min-height: 1000px"
      active-text-color="#27ad60"
      router>
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/control-panel">
        <el-icon><Operation /></el-icon>
        <span>控制面板</span>
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
.header{
    height: 60px;
    background: #27ad60;
    .sysname{
        line-height: 60px; // 字体上下居中
        color:aliceblue; // 字体颜色
        font-size: 16px; // 字体大小
        font-weight: bold; // 字体加粗
        margin-left: 10px;
    }
}
</style>