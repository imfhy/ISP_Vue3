<template>
  <div id="onlinetable">
    <el-card shadow="never" style="margin-bottom:8px;">
      <div><el-alert title="提示内容" type="success" /></div>
      <div>
        <el-button type="primary"><el-icon><Pointer /></el-icon>获取</el-button>
        <el-button type="primary"><el-icon><Select /></el-icon>检查</el-button>
        <el-button type="primary"><el-icon><MagicStick /></el-icon>分析</el-button>
        <el-button type="primary"><el-icon><download /></el-icon>下载表格</el-button>
        <el-button type="primary"><el-icon><UploadFilled /></el-icon>上传表格</el-button>
        <el-select class="myselect" v-model="value_lock_state" placeholder="选择排程表格">
          <el-option
            v-for="item in options_lock_state"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </el-card>
    <LuckySheet />
  </div>
</template>

<script>
import LuckySheet from '../components/LuckySheet.vue'
export default {
  components: {
    LuckySheet
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/onlinetable.scss'
</style>