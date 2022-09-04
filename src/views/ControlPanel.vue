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

          <div class="schedule-box">
            <el-alert title="训练预测模型" type="info" :closable="false" />
            <div class="button-box">
              <el-date-picker
                style="margin-top:8px;"
                v-model="train_date"
                type="date"
                placeholder="选择预测模型日期"
                :size="size"
              />
              <el-button type="primary" style="margin-top:2px;margin-left: 8px;"><span>训练预测模型</span></el-button>
            </div>
          </div>
          <div class="schedule-box">
            <el-alert title="排程相关操作" type="info" :closable="false" />
            <div class="button-box">
              <el-row>
                <el-col :span="8">
                  <el-button type="primary">检查排程表格</el-button>
                </el-col>
                <el-col :span="8">
                <el-button type="primary" @click="computeDialogVisible = true">
                  计算导入排程
                </el-button>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary">终止深度搜索</el-button>
                </el-col>
              </el-row>
              <el-row style="margin-top:-8px;">
                <el-col :span="8">
                  <el-button type="primary">下载最新排程</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary">下载无程序表</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary">下载最新日志</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="schedule-box">
            <el-alert title="下载历史数据" type="info" :closable="false" />
            <div class="button-box">
              <el-select v-model="value" class="m-2" placeholder="选择历史日志">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button type="primary" style="margin-left: 8px;">下载历史日志</el-button>
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
          <!-- <div class="schedule-box">
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
          </div> -->
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
  <el-dialog
      v-model="computeDialogVisible"
      title="计算导入排程"
      width="40%"
      :before-close="handleClose"
      >
      <el-steps :active="step_now" finish-status="success" simple>
        <el-step title="选择文件" />
        <el-step title="导入排程" />
        <el-step title="更新数据" />
        <el-step title="计算排程" />
      </el-steps>
      
      <!-- <el-alert title="1.导入排程数据" type="info" :closable="false" style="margin-top: 10px;" /> -->
        <!-- <el-upload
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
        <el-button slot="trigger" type="primary"><el-icon><UploadFilled /></el-icon>选择排程文件</el-button>
      </el-upload> -->
      <el-row style="margin-top:10px;">
        <el-col :span="8">
          <el-input placeholder="请选择排程文件" :value="upload_file_name"></el-input>
        </el-col>
        <el-col :span="16">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="http://localhost:8080/api/preprocess/schedule/check_input_excel/"
            :limit="1"
            :on-change="handleChange"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :auto-upload="false"
            :show-file-list="false"
          >
            <template #trigger>
              <el-button type="primary" style="margin-left:10px;">选择排程文件</el-button>
            </template>
            <el-button style="margin-left:10px;" type="success" @click="submitUpload">
              导入文件
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
    <el-alert title="更新排程信息" type="info" :closable="false" style="margin-top: 10px;" />
    <div class="schedule-box">
      <el-row>
        <el-col :span="24">
          <el-button type="primary">更新钢板信息</el-button>
          <el-button type="success">导出检查</el-button>
        </el-col>
      </el-row>
    </div>
    <el-alert title="计算排程表格" type="info" :closable="false" style="margin-top: 0px;" />
    <div class="schedule-box">
      <el-row>
        <el-col :span="8">
          <el-button type="primary">开始计算排程</el-button>
        </el-col>
        <el-col :span="8">
          
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="computeDialogVisible = false">关闭</el-button>
      </span>
    </template>
</el-dialog>
</template>

<script>
import { ElLoading, ElMessage } from 'element-plus'
import { GetProgress,importSchedule } from '@/utils/api.js'
export default {
  data(){
    return{
      // 进度条相关
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
      loadingInstance: null,  // 加载动画
      progress_interval: null,

      train_date: '',  // 预测模型日期

      computeDialogVisible: false,  // 计算排程弹窗

      step_now: 0,  // 计算导入排程当前步骤

      upload_file_name: "未选择排程文件",
      upload_file: null,
    }
  },
  methods:{
    computeSchedule(){
      
    },
    handleChange(file, fileList) {
      console.log(file)
      if(file.status == 'ready') {
        if (fileList.length > 0) {
          this.uploadFiles = fileList = [fileList[fileList.length - 1]] // 选择最后一次选择文件
          this.file_name = this.uploadFiles[0].name  // 更新文件名
        }
        this.upload_file_name = file.name
        this.upload_file = file
        this.$refs.upload.submit();
      }
    },
    handleProgress(){
        // 加载动画
        this.loadingInstance = ElLoading.service({
            text:'检查中，请稍等...',
            background: 'rgba(0, 0, 0, 0.5)'
        });
    },
    handleSuccess(res){
      this.loadingInstance.close();  // 清除动画
      if(res.type == "success"){
        this.$alert(res.msg, "提示", {
          confirmButtonText: '确定',
          type: "success",
        })
      } else {
        this.$alert(res.msg, "提示", {
          confirmButtonText: '确定',
          type: "warning",
        })
      }
      this.step_now = 1
      console.log(res)
    },
    submitUpload(){
      // 加载动画
      this.loadingInstance = ElLoading.service({
        text:'导入中，请稍等...',
        background: 'rgba(0, 0, 0, 0.5)'
      });
      const form = new FormData();
      form.append("file", this.upload_file.raw);
      console.log("表单测试", form.get("file"))
      importSchedule(form).then(res=>{
        console.log(res)
        if(res.data.code==400){
          ElMessage({
            message: res.data.msg,
            type: "success",
            offset: 70
          })
          this.step_now = 1
        } else {
          ElMessage({
            message: "导入失败",
            type: "error",
            offset: 70
          })
        }
      }).catch(err=>{
        console.log("发生错误，导入失败：", err)
        ElMessage({
          message: "发生错误，导入失败",
          type: "error",
          offset: 70
        })
      })
      this.loadingInstance.close();
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