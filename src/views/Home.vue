<template>
  <div>
   <el-row :gutter="10">
    <el-col :span="8">
      <el-card shadow="never">
          <template #header>
            <div class="card-header" style="text-align:left">
              <span>任务进度</span>
            </div>
          </template>
        <el-row>
          <el-col :span="6">
            <span style="font-size: 28px;padding: 0%;margin: 6%; color:#67C23A;">65%</span>
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="6">
          </el-col>
        </el-row>
        <el-progress :stroke-width="12" :percentage="50" :show-text="false" status="success">
        </el-progress>
        <el-row>
          <el-col :span="6">
            <span style="font-size: 28px;padding: 0%;margin: 6%; color:#67C23A;">65%</span>
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="6">
          </el-col>
        </el-row>
        <el-progress :stroke-width="12" :percentage="50" :show-text="false" status="success">
        </el-progress>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="never">
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="never">
        <!-- <el-progress :text-inside="true" :stroke-width="16" :percentage="70" /> -->
      </el-card>
    </el-col>
   </el-row>
  </div>
</template>

<script>
import {GetHome} from '@/utils/api.js'
export default {
  data () {
    return {
      data:"test",
    }
  },
  mounted() {
      // this.getCompany();
  },
  methods: {
    getCompany(){
      GetHome()
      .then(res=>{
        console.log("success", res)
      })
      .catch(err=>{
        console.log("error", err)
      })
    },
  },
}
</script>

<style>

</style>
