<template>
  <div class="box-control">
    <el-row :gutter="6">
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header" style="text-align:center">
              <span>任务进度</span>
            </div>
          </template>
          <div class="progress">
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="percentage_1"
                status="success"
              />
              <el-alert :title="progress_text_1" type="success" :closable="false" />
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="percentage_2"
                status="success"
              />
              <el-alert :title="progress_text_2" type="success" :closable="false" />
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="percentage_3"
                status="success"
              />
              <el-alert :title="progress_text_3" type="success" :closable="false" />
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="percentage_4"
                status="success"
              />
              <el-alert :title="progress_text_4" type="success" :closable="false" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" />
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header" style="text-align:center">
              <span>排程操作</span>
            </div>
          </template>
          <div>
            <el-alert title="训练预测模型" type="info" :closable="false" />
            <el-form class="train-box">
              <div>
                <div class="block">
                  <el-date-picker
                    v-model="train_date"
                    type="date"
                    placeholder="请选择训练日期"
                    :size="size"
                  />
                </div>
              </div>
              <el-button type="primary"><span>开始训练</span></el-button>
            </el-form>
          </div>
          <div class="schedule-box">
            <el-alert title="排程相关操作" type="info" :closable="false" />
            <div class="button-box">
              <el-row>
                <el-col :span="8">
                  <el-button type="primary"><span>检查表格</span></el-button>
                </el-col>
                <el-col :span="8">
                <el-upload
                  name="file"
                  class="upload-demo"
                  ref="upload"
                  action="http://localhost:8080/api/config/compute_schedule/"
                  accept=".xlsx"
                  :on-success="successRes"
                  :show-file-list="false"
                  :auto-upload="true"
                  :on-progress="progressUpload" 
                  >
                  <el-button slot="trigger" type="primary">计算排程</el-button>
                </el-upload>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary"><span>下载排程</span></el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2"></el-col>
                <el-col :span="10">
                  <el-button type="primary"><span>终止深度搜索</span></el-button>
                </el-col>
                <el-col :span="10">
                  <el-button type="primary"><span>下载无程序表</span></el-button>
                </el-col>
                <el-col :span="2"></el-col>
              </el-row>
            </div>
          </div>
          <div class="schedule-box">
            <el-alert title="下载日志操作" type="info" :closable="false" />
            <div class="button-box">
              <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header" style="text-align:center">
              <span>其它操作</span>
            </div>
          </template>
          <div class="schedule-box">
            <el-alert title="接口推送" type="info" :closable="false" />
            <div class="button-box">
              <el-button type="primary"><span>推送正排</span></el-button>
              <el-button type="primary"><span>推送预排</span></el-button>
              <el-button type="primary"><span>推送其它</span></el-button>
            </div>
          </div>
          <div class="schedule-box">
            <el-alert title="下载相关" type="info" :closable="false" />
            <div class="button-box">
              <el-button type="primary"><span>下载最新日志</span></el-button>
              <el-button type="primary"><span>下载新上排程</span></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header" style="text-align:center">
              <span>排程结果</span>
            </div>
          </template>
          <div style="text-align:center;">
            <p>2022年8月5日-正排</p>
            <p>是否可行解：</p>
            <p>目标值：</p>
            <p>逾期：(天)</p>
            <p>停顿：(天)</p>
            <p>线平衡：</p>
            <el-button type="primary"><span>获取排程结果</span></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="6" style="margin-top:6px;">
      <el-col :span="24">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>甘特图</span>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog></el-dialog>
</template>

<script>
import { ElLoading } from 'element-plus'
import { GetProgress } from '@/utils/api.js'
export default {
  data(){
    return{
      percentage_1: 0,
      percentage_2: 0,
      percentage_3: 0,
      percentage_4: 0,
      progress_text_1: "训练",
      progress_text_2: "预处理",
      progress_text_3: "初始解",
      progress_text_4: "深度搜索",
      run_flag: 0,

      uploadFiles: [],   // excel文件列表
      file_name: "",   // excel文件列表
      loadingInstance: null,
      progress_interval: null
    }
  },
  methods:{
    computeSchedule(){
      
    },
    successRes(response, file, fileList) { //文件上传成功之后
      // this.loadingInstance.close();
      this.$message({
        message: response,
        type: 'success'
      });
      this.clearInterval(this.progress_interval)
    },
    progressUpload(){ //文件上传时
      // 3. 生成动画
      // this.loadingInstance = ElLoading.service({
      //     // 动画中的文字
      //     text:'上传中...',
      //     // 要加载动画的容器
      //     target:'#onlinetable',
      //     background: 'rgba(0, 0, 0, 0.7)'
      // });
    },
    getProgress(){
      console.log("progress")
      GetProgress().then(res=>{
        this.percentage_1 = res.data.p0
        this.percentage_2 = res.data.p1
        this.percentage_3 = res.data.p2
        this.percentage_4 = res.data.p3
        this.progress_text_1 = res.data.p0text
        this.progress_text_2 = res.data.p1text
        this.progress_text_3 = res.data.p2text
        this.progress_text_4 = res.data.p3text
        this.run_flag = res.data.run_flag
      }).catch(err=>{
        this.checkAlert("错误", "进度条获取失败！", "error")
      })
    }
  },
  mounted(){
    this.getProgress()
    // setInterval(this.getProgress, 5000)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/controlpanel.scss';
</style>