<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header" style="text-align:center">
              <span>任务进度</span>
            </div>
          </template>
          <div class="progress">
            <el-progress type="dashboard" :percentage="80" :color="colors">
              <template #default="{ percentage }">
                <span class="percentage-label">训练中</span>
                <span class="percentage-value">{{ percentage }}%</span>
              </template>
            </el-progress>
            <el-progress type="dashboard" :percentage="80" :color="colors">
              <template #default="{ percentage }">
                <span class="percentage-label">预处理中</span>
                <span class="percentage-value">{{ percentage }}%</span>
              </template>
            </el-progress>
            <el-progress type="dashboard" :percentage="80" :color="colors">
              <template #default="{ percentage }">
                <span class="percentage-label">初始解中</span>
                <span class="percentage-value">{{ percentage }}%</span>
              </template>
            </el-progress>
            <el-progress type="dashboard" :percentage="80" :color="colors">
              <template #default="{ percentage }">
                <span class="percentage-label">输出中</span>
                <span class="percentage-value">{{ percentage }}%</span>
              </template>
            </el-progress>
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
                    v-model="value1"
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
            <el-alert title="预排相关操作" type="info" :closable="false" />
            <div class="button-box">
              <el-button type="primary"><span>检查表格</span></el-button>
              <el-button type="primary"><span>计算排程</span></el-button>
              <el-button type="primary"><span>下载排程</span></el-button>
            </div>
          </div>
          <div class="schedule-box">
            <el-alert title="正排相关操作" type="info" :closable="false" />
            <div class="button-box">
              <el-button type="primary"><span>检查表格</span></el-button>
              <el-button type="primary"><span>计算排程</span></el-button>
              <el-button type="primary"><span>下载排程</span></el-button>
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

    <el-row :gutter="10" style="margin-top:10px;">
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
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../assets/theme/controlpanel.scss';
</style>
