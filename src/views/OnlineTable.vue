<template>
  <div id="onlinetable">
    <el-card shadow="never" class="box-card">
      <el-alert :title="alert_title" :type="alert_type" :closable="false" style="margin-bottom: 10px"/>
      <el-row>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="alert"
          accept=".xlsx"
          :show-file-list="false"
          :auto-upload="false"
          :file-list="uploadFiles"
          :on-change="loadExcelFile"
          >
          <el-button slot="trigger" type="primary" style="margin-right: 12px">
            <el-icon><UploadFilled /></el-icon>上传排程表格</el-button>
        </el-upload>
        <el-button type="primary" @click="checkExcel()">
          <el-icon><SuccessFilled /></el-icon>检查排程
        </el-button>
        <el-button type="primary" @click="analysis">
          <el-icon><HelpFilled /></el-icon>分析排程
        </el-button>
        <el-button type="primary" @click="checkExcel()" class="api-button" disabled>
          <el-icon><Promotion /></el-icon>接口更新
        </el-button>
        <el-button type="primary" @click="downloadExcel" class="api-button" disabled>
          <el-icon><Promotion /></el-icon>推送排程
        </el-button>
        <el-button type="primary" @click="downloadExcel">
          <el-icon><download /></el-icon>下载在线表格
        </el-button>
        <el-button type="success" @click="quantifyExcel" style="margin-right:10px;">获取量化结果
        </el-button>
        <el-select v-model="value_lock_state" placeholder="选择历史排程">
          <el-option
            v-for="item in options_analysis_data"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="downloadExcel()" style="margin-left: 12px;float: right;" disabled>
          获取
        </el-button>
      </el-row>
    </el-card>
      <el-dialog
        v-model="dialogVisible"
        title="分析排程"
        width="50%"
        :before-close="handleClose"
        >
        <el-row>
          <el-col :span="12">
            <el-card shadow="never" style="height: 330px;margin: 5px;">
              <template #header>
                <div class="card-header" style="text-align:left">
                  <span>任务进度</span>
                </div>
              </template>
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="percentage_1"
                :indeterminate="indeterminate_1"
                status="success"
              />
              <el-alert :title="progress_text_1" type="success" :closable="false" />
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="percentage_2"
                :indeterminate="indeterminate_2"
                status="success"
              />
              <el-alert :title="progress_text_2" type="success" :closable="false" />
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="percentage_3"
                :indeterminate="indeterminate_3"
                status="success"
              />
              <el-alert :title="progress_text_3" type="success" :closable="false" />
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="never" style="height: 330px;margin: 5px;">
              <template #header>
                <div class="card-header" style="text-align:left">
                  <span>分析结果</span>
                </div>
              </template>
              <!-- <p style="font-weight:bold;">{{schedule_time}}-{{schedule_mode}}</p>
              <p>是否可行解：{{enable}}</p>
              <p>目标值：{{obj_value}}</p>
              <p>逾期：{{overdue}}</p>
              <p>停顿：{{idle}}</p>
              <p>线平衡：{{line_balance}}</p>
              <p>三天总点数：{{points}}</p> -->
              <p style="font-weight:bold;line-height: 90%;">{{schedule_time}}-{{schedule_mode}} 
                <span style="font-weight:normal;">{{ana_time}}</span>
              </p>
              <p style="line-height:160%">
                是否可行解：{{enable}}<br>
                目标值：{{obj_value}}<br>
                逾期：{{overdue}}<br>
                停顿：{{idle}}<br>
                线平衡：{{line_balance}}<br>
                三天总点数：{{points}}<br>
              </p>
              <el-select v-model="value_ana_time" placeholder="查看历史分析结果" style="width: 180px;">
                <el-option
                  v-for="item in options_analysis_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button style="margin-left: 5px;" type="info" @click="getAnaSelectData">获取</el-button>
              <el-button style="margin-left: 5px;" @click="getAnaSelectItem">刷新列表</el-button>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card shadow="never" style="height: 180px;margin: 5px;">
              <template #header>
                <div class="card-header" style="text-align:left">
                  <span>提示</span>
                </div>
              </template>
            </el-card>
          </el-col>
        </el-row>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="closeAnalysis">关闭</el-button>
            <el-button :type="begin_analysis_btn" :disabled="begin_analysis_disable" @click="beginAnalysis">开始分析</el-button>
            <el-button :type="generate_excel_btn" :disabled="generate_excel_disable" @click="generateAnaExcel">生成表格</el-button>
            <el-button :type="download_excel_btn" :disabled="download_excel_disable" @click="downloadAnaExcel">下载表格</el-button>
            <!-- <el-button type="primary" @click="compareExcel">对比结果</el-button> -->
          </span>
        </template>
      </el-dialog>
      <el-dialog
        v-model="dialogVisible_quantify"
        width="70%"
        title="量化结果"
        :before-close="handleClose_2" 
      >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-card shadow="never">
          <el-table :data="tableData" @selection-change="tableSelectionHandle" style="width: 100%;height:600px;" 
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
            <el-table-column label="线体">
              <template v-slot="scope">
                <span style="user-select:none;font-weight: bold;">{{scope.row.line}}</span>
              </template>
            </el-table-column>
            <el-table-column label="点数类别">
              <template v-slot="scope">
                <span style="user-select:none;">{{scope.row.points_type}}</span>
              </template>
            </el-table-column>
            <el-table-column label="点数">
              <template v-slot="scope">
                <span v-show="!scope.row.iseditor">{{scope.row.points}}</span>
              </template>
            </el-table-column>
          </el-table>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="never">
            <el-table :data="tableData2" @selection-change="tableSelectionHandle" style="width: 100%;height:285px;" 
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            >
              <el-table-column label="量化类型" width="160">
                <template v-slot="scope">
                  <span style="user-select:none;font-weight: bold;">{{scope.row.type}}</span>
                </template>
              </el-table-column>
              <el-table-column label="量化结果(小时)">
                <template v-slot="scope">
                  <span v-show="!scope.row.iseditor">{{scope.row.hours}}</span>
                </template>
              </el-table-column>
              <el-table-column label="量化结果(天)">
                <template v-slot="scope">
                  <span v-show="!scope.row.iseditor">{{scope.row.days}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        
          <el-card shadow="never" style="margin-top:10px">
            <el-table :data="tableData3" @selection-change="tableSelectionHandle" style="width: 100%;height:285px;" 
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            >
              <el-table-column label="量化类型">
                <template v-slot="scope">
                  <span style="user-select:none;font-weight: bold;">{{scope.row.type}}</span>
                </template>
              </el-table-column>
              <el-table-column label="值">
                <template v-slot="scope">
                  <span v-show="!scope.row.iseditor">{{scope.row.points}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="never">
            <el-table :data="tableData4" @selection-change="tableSelectionHandle" style="width: 100%;height:600px;" 
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            >
              <el-table-column label="线体" width="160">
                <template v-slot="scope">
                  <span style="user-select:none;font-weight: bold;">{{scope.row.line}}</span>
                </template>
              </el-table-column>
              <el-table-column label="线体完工时间">
                <template v-slot="scope">
                  <span >{{scope.row.time}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      </el-dialog>
    <div id="luckysheet" class="box-luckysheet"></div>
  </div>
</template>

<script>
import LuckySheet from '../components/LuckySheet.vue'
import LuckyExcel from 'luckyexcel'
import XLSX from 'xlsx'
import { CheckData, AnalysisExcel, GenerateAnaExcel, DownloadAnaExcel, QuantifyData, GetAnaProgress, ClearAnaProgress, GetAnaSelectItem, GetAnaSelectData } from '@/utils/api.js'
import { ElLoading,ElMessage } from 'element-plus'
export default {
  name: "luckysheet",
  components: {
    LuckySheet
  },
  props: {
      msg: String
  },
  data(){
    return {
      uploadFiles: [],   // excel文件列表
      file_name: "",   // excel文件列表
      options_lock_state: [],
      value_ana_time: "",
      alert_title: "消息提示",
      alert_type: "info",  // success error warning info

      locked_list:[ "锁定", "新增锁定", "新上锁定", "插入锁定" ],
      unlocked_list:[ "未锁定", "新上排程", "未上排程" ],
      all_line_list: [ "SM01", "SM02", "SM09", "SM19", "SM22", "SM23", "SR01", "SR02", "SR03", "SM11", "SM08", 
        "SR09", "SM06", "SM07", "SM15", "SM13", "SM05", "SM21", "SR06", "SM03", "ST01", ],

      loadingInstance: null,
      dialogVisible: false,
      dialogVisible_quantify: false,
      progress_text_1: "预处理|未开始",
      progress_text_2: "分析|未开始",
      progress_text_3: "输出表格|未开始",
      percentage_1: 0,
      percentage_2: 0,
      percentage_3: 0,

      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      
      options_analysis_data:[],

      ana_time: "",
      schedule_mode: "",  // 正排/预排
      schedule_time: "",  // 排程时间
      enable: "",  // 是否可行解
      obj_value: "",  // 目标值
      overdue: "",  // 逾期
      idle: "",  // 停顿
      line_balance: "",  // 线平衡
      points: "",  // 总点数

      begin_analysis_btn: "primary",  // 开始分析按钮样式
      begin_analysis_disable: false,
      generate_excel_btn: "info",  // 生成表格按钮样式
      generate_excel_disable: true,
      download_excel_btn: "info",  // 下载表格按钮样式
      download_excel_disable: true,
      check_success: false,

      progress_count: 0,
      ana_refresh: null,

      indeterminate_1: true,
      indeterminate_2: true,
      indeterminate_3: true,
    }
  },
  mounted() {
    this.init_luckysheet();
  },
  methods: {
    closeAnalysis(){
      clearInterval(this.ana_refresh)
      this.ana_refresh = null
      this.dialogVisible = false
    },
    analysis(){
      this.dialogVisible = true
      this.clearAnaProgress()
      this.begin_analysis_btn = "primary"
      this.begin_analysis_disable = false
      this.getAnaSelectItem()
    },
    getAnaSelectData(){
      GetAnaSelectData({"time": this.value_ana_time}).then(res=>{
        this.showAnaData(res, 1)
        ElMessage({
          message: "获取成功",
          type: "success",
          offset: 70
        })
      }).catch(err=>{
        ElMessage({
          message: "获取失败",
          type: "error",
          offset: 70
        })
      })
    },
    // 清空分析排程进度条
    clearAnaProgress(){
      ClearAnaProgress().then(res=>{
        console.log(res.data.msg)
      }).catch(err=>{
        ElMessage({
          message: "清空进度条出现错误",
          type: "error",
          offset: 70
        })
      })
    },
    // 分析排程进度条
    getAnaProgress(){
      GetAnaProgress().then(res=>{
        this.percentage_1 = res.data.p0
        this.percentage_2 = res.data.p1
        this.percentage_3 = res.data.p2
        this.progress_text_1 = res.data.p0text
        this.progress_text_2 = res.data.p1text
        this.progress_text_3 = res.data.p2text
        let run_flag = res.data.run_flag
        if (this.percentage_1 == 100){
          this.indeterminate_1 = false
        } else {
          this.indeterminate_1 = true
        }
        if (this.percentage_2 == 100){
          this.indeterminate_2 = false
        } else {
          this.indeterminate_2 = true
        }
        if (this.percentage_3 == 100){
          this.indeterminate_3 = false
        } else {
          this.indeterminate_3 = true
        }
        if(run_flag == 1 && res.data.p2 > 0 &&this.progress_count == 0){
          ElMessage({
            message: "分析完毕，可以生成表格",
            type: "success",
            offset: 70
          })
          // 分析完成后修改按钮状态
          this.generate_excel_btn = "primary"
          this.generate_excel_disable = false
          this.progress_count = 1
          // 显示分析排程的结果
          this.showAnaData(res, 0)
        } else if(run_flag == 2){
          clearInterval(this.ana_refresh)
          this.ana_refresh = null
          ElMessage({
            message: "生成表格完毕，可以下载表格",
            type: "success",
            offset: 70
          })
          // 修改按钮状态
          this.download_excel_btn = "primary"
          this.download_excel_disable = false
        }
      }).catch(err=>{
        ElMessage({
          message: "进度条获取失败",
          type: "error",
          offset: 70
        })
      })
    },
    // 显示分析排程的结果
    showAnaData(res, flag){
      if(flag == 0){
        this.ana_time = "(最新分析结果)"
      } else {
        let time = this.value_ana_time
        let time_date = time.substring(0, 10)
        let time_time = time.substring(11).replaceAll("-", ":")
        time = time_date + " " + time_time
        // time[13] = ":"
        this.ana_time = "(分析时间：" + time + ")"
      }

      this.schedule_mode = res.data.new_mode  // 正排/预排
      this.schedule_time = res.data.new_time  // 排程时间
      this.enable = res.data.new_feasible_str  // 是否可行解
      this.obj_value = res.data.new_obj_value  // 目标值
      this.overdue = res.data.new_overdue_value  // 逾期
      this.idle = res.data.new_real_idle_value  // 停顿
      this.line_balance = res.data.new_line_balance_value  // 线平衡
      this.points = res.data.new_three_days_points  // 总点数
    },
    // 获取分析排程历史选择项
    getAnaSelectItem(){
      this.options_analysis_data = []
      GetAnaSelectItem().then(res=>{
        for(let key in res.data){
          let temp = {}
          let first_name = res.data[key]["first"]
          let second_name = res.data[key]["second"]
          temp["value"] = second_name
          temp["label"] = first_name + "-" + second_name
          this.options_analysis_data.push(temp)
        }
      }).catch(err=>{
        console.log("获取分析排程历史选项失败")
      })
    },
    // 开始分析
    beginAnalysis(){
      if(this.check_success == false){
        this.$confirm('数据未检查，请确认是否要开始分析排程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          this.analysisExcel()
        }).catch(()=>{
          ElMessage({
            message: "取消分析",
            type: "info",
            offset: 70
          })
        })
      } else {
        this.analysisExcel()
      }
    },
    // 分析排程
    analysisExcel(){
      ElMessage({
        message: "开始分析",
        type: "success",
        offset: 70
      })
      // 开始分析后禁用按钮
      this.begin_analysis_btn = "info"
      this.begin_analysis_disable = true
      this.generate_excel_btn = "info"
      this.generate_excel_disable = true
      this.download_excel_btn = "info"
      this.download_excel_disable = true
      this.ana_time = ""
      this.schedule_mode = ""
      this.schedule_time = ""
      this.enable = ""
      this.obj_value = ""
      this.overdue = ""
      this.idle = ""
      this.line_balance = ""
      this.points = ""
      let wb = this.get_sheet_js(false); // luckysheet获取sheet，并且转化为SheetJS的格式
      let blob = this.workbook2blob(wb);  // SheetJS转化为文件流
      let form_data = new FormData(); // 新建表单
      form_data.append('files', blob);  // 在线表格文件流e
      form_data.append('file_name', this.file_name);  // 在线表格文件流
      this.ana_refresh = setInterval(() => {
        setTimeout(this.getAnaProgress(), 0);
      }, 2000);
      AnalysisExcel(form_data).then(res=>{
        console.log("analysis end")
      }).catch(err=>{
        ElMessage({
          message: "开始分析出现错误",
          type: "error",
          offset: 70
        })
      })
    },
    // 生成表格
    generateAnaExcel(){
      ElMessage({
        message: "开始生成表格,预计需要1~2分钟",
        type: "success",
        offset: 70
      })
      this.generate_excel_btn = "info"
      this.generate_excel_disable = true
      GenerateAnaExcel().then(res=>{
        console.log("generate done")
      }).catch(err=>{
        ElMessage({
          message: "生成表格出现错误",
          type: "error",
          offset: 70
        })
      })
    },
    // 下载表格
    downloadAnaExcel(){
      DownloadAnaExcel().then(res=>{
        ElMessage({
          message: "开始下载",
          type: "success",
          offset: 70
        })
        this.downloadFile(res)
      }).catch(err=>{
        ElMessage({
          message: "下载请求出错",
          type: "error",
          offset: 70
        })
      })
    },
    downloadFile(res){
      const link = document.createElement('a')
      let blob = new Blob([res.data])
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      let temp = res.headers["content-disposition"].split("attachment;filename=")[1]
      let file_name = decodeURIComponent(temp)
      link.download = file_name
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href) // 释放URL对象
      document.body.removeChild(link)
    },
    handleClose(done) {
      this.$confirm('请确认是否要关闭分析排程？', '提示', {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
      .then(_ => {
        done();
      })
      .catch(_ => {});
    },
    handleClose_2(done) {
      this.$confirm('请确认是否要关闭量化窗口？', '提示', {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
      .then(_ => {
        done();
      })
      .catch(_ => {});
    },
    init_luckysheet() {
      var options = {
          container: "luckysheet",
          lang: "zh",
          showinfobar: false, // 不显示luckysheet图标
      };
      luckysheet.create(options);
    },
    handleProgress(){
      this.loadingInstance = ElLoading.service({
          text:'上传中,请稍等...',
          background: 'rgba(0, 0, 0, 0.5)'
      });
    },
    handleSuccess(){
      this.loadingInstance.close();
    },
    quantifyExcel(){
      // 表格为空
      if (!window.luckysheet.getCellValue(0, 0)) {
        this.checkAlert("警告", "未检测到数据!", "warning")
        return
      }
      this.dialogVisible_quantify = true
      let wb = this.get_sheet_js(false); // luckysheet获取sheet，并且转化为SheetJS的格式
      let blob = this.workbook2blob(wb);  // SheetJS转化为文件流
      let form_data = new FormData(); // 新建表单
      form_data.append('files', blob);  // 在线表格文件流
      form_data.append('filename', this.file_name)
      QuantifyData(form_data).then(res=>{
        ElMessage({
          message: "量化成功",
          type: "success",
          offset: 70
        })
        this.tableData = res.data.table_data
        this.tableData2 = res.data.table_data2
        this.tableData3 = res.data.table_data3
        this.tableData4 = res.data.table_data4
      }).catch(err=>{
        ElMessage({
          message: "量化失败",
          type: "error",
          offset: 70
        })
      })
    },
    loadExcelFile(file, fileList) {
      if (fileList.length > 0) {
        this.uploadFiles = fileList = [fileList[fileList.length - 1]] // 选择最后一次选择文件
        this.file_name = this.uploadFiles[0].name  // 更新文件名
      }
      // this.uploadFiles = fileList
      var excel_file = fileList[0].raw  // 获取文件流
      LuckyExcel.transformExcelToLucky(excel_file, function (exportJson, luckysheetfile) {
        luckysheet.create({
          container: 'luckysheet',
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
          lang: 'zh',
          hook: { // 冻结首行，添加钩子，初始化后冻结首行
            workbookCreateAfter: function () {
              luckysheet.setHorizontalFrozen(false)
            }
          }
        });
      });
    },
    // 将字符串转ArrayBuffer
    s2ab(str) {
        const buf = new ArrayBuffer(str.length)
        const view = new Uint8Array(buf)
        for (let i = 0; i !== str.length; ++i) view[i] = str.charCodeAt(i) & 0xff
        return buf
    },
    // 将workbook转换成bolb
    workbook2blob(workbook) {
      const wbOpts = {
        bookType: 'xlsx',
        // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        bookSST: false,
        type: 'binary',
      }
      const wbOut = XLSX.write(workbook, wbOpts)
      return new Blob([this.s2ab(wbOut)], { type: 'application/octer-stream' })
    },

    checkData () {
      // 3. 生成动画
      this.loadingInstance = ElLoading.service({
          // 动画中的文字
          text:'检查中',
          // 要加载动画的容器
          target:'#onlinetable'
      });
      let wb = this.get_sheet_js(false); // luckysheet获取sheet，并且转化为SheetJS的格式
      let blob = this.workbook2blob(wb);  // SheetJS转化为文件流
      let form_data = new FormData(); // 新建表单
      form_data.append('files', blob);  // 在线表格文件流
      CheckData(form_data).then(res=>{
        this.checkAlert("提示", "检查测试！", "success")
      }).catch(err=>{
        this.checkAlert("警告","检查测试！", "warning")
      })
      this.loadingInstance.close();
    },

    downloadExcel() {
      this.get_sheet_js(true);
    },

    // lucky sheet 的 data 转化为 SheetJS的数据
    sheet_data_to_js(downOriginData) {
      let arr = [];  // 所有的单元格数据组成的二维数组
      let cellValue = null;
      let max_row = downOriginData.length; // 默认行长度
      let max_col = downOriginData[0].length; // 默认列长度
      // 根据锁定状态列来判断数据有多少条
      for (let col = downOriginData[0].length; col > 0; col--) {
          if (downOriginData[0][col] != null) {
              max_col = col + 1;
              break;
          }
      }
      // 根据表头来判断数据有多少条
      for (let row = downOriginData.length; row > 0; row--) {
          if (downOriginData[row] != null) {
              max_row = row + 1;
              break;
          }
      }
      // 获取二维数组
      for (let row = 0; row < max_row; row++) {
          let arrRow = [];  // 一行数据
          for (let col = 0; col < max_col; col++) {
            // 等号赋值并且判断是否存在值
            if (downOriginData[row][col]) {
              cellValue = downOriginData[row][col]
            } else {
              cellValue = { m: '', v: '' };
            }
            let is_exist = true;
            let text_val;
            // 获取带有换行的文本
            try {
              text_val = cellValue.ct.s[0].v
            } catch (err) {
              is_exist = false
            }
            if (is_exist) {
              arrRow.push(text_val)
            }
            else if (cellValue.ct != null && cellValue.ct.t === 'd') {
              // m 是展示值
              arrRow.push(cellValue.m)
            } else {
              // v是实际值
              arrRow.push(cellValue.v);
            }
          }
          arr.push(arrRow)
        }

        // 通过SheetJs将数据转化为excel格式数据
        let opts = {
            cellDates: false,
            cellStyles: true
        };
        return XLSX.utils.aoa_to_sheet(arr, opts);
    },
    // 返回当前sheet的数据，并转化为SheetJS格式
    get_sheet_js(download_flag) {
      let today_schedule_name = '今日排程';
      let unschedule_name = '未上排程';
      let today_schedule_sheet = null;
      let unschedule_sheet = null;
      let allSheetData = window.luckysheet.getAllSheets();
      for (let i = 0; i < allSheetData.length; i++) {
        if (allSheetData[i].name === today_schedule_name) {
          today_schedule_sheet = allSheetData[i];
        } else if (allSheetData[i].name === unschedule_name) {
          unschedule_sheet = allSheetData[i];
        }
      }
      let sheets = {};
      if (today_schedule_sheet) {
        sheets[[today_schedule_name]] = Object.assign({}, this.sheet_data_to_js(today_schedule_sheet.data));
      }
      if (unschedule_sheet) {
        sheets[[unschedule_name]] = Object.assign({}, this.sheet_data_to_js(unschedule_sheet.data))
      }

      let workbook = {
        //保存的表标题
        SheetNames: [today_schedule_name, unschedule_name],
        //内容
        Sheets: sheets,
      }
      if (download_flag === false) {
        return workbook
      } else {
        // 直接下载当前sheet的数据
        let fileName = '在线表格';
        XLSX.writeFile(workbook, fileName + ".xlsx");
      }
    },

    // 自定义提示，弹框提示并同步修改el-alert组件的内容
    checkAlert(title, info, type){
      this.$alert(info, title, {
        confirmButtonText: '确定',
        type: type,
        callback: action => {
          if(title == "今日排程" || title=="未上排程"){
            this.alert_title = title + "：" + info
          } else {
            this.alert_title = info
          }
          this.alert_type = type
        }
      })
    },

    checkExcel() {
      window.luckysheet.exitEditMode() // 退出编辑模式
      // 表格为空
      if (!window.luckysheet.getCellValue(0, 0)) {
        this.checkAlert("警告", "未检测到数据!", "warning")
        return
      }
      // 上传格式错误
      if (window.luckysheet.getAllSheets()[0].name != "今日排程" && window.luckysheet.getAllSheets()[1].name != "未上排程") {
        this.checkAlert("错误", "请检查上传的数据的是否正确！", "error")
        return
      }
      // 今日排程Sheet：第2行一定要为空行，且第3行一定有数据（为了方便后续的检查）
      if (window.luckysheet.getCellValue(1, 0, { order: 0 }) || !window.luckysheet.getCellValue(2, 0, { order: 0 })) {
        this.checkAlert("错误", "空行错误，要求第2行有且仅有一个空行!", "error")
        return
      }
      for (let idx = 0; idx < 2; idx++) {
        let sheet_name = window.luckysheet.getAllSheets()[idx].name;
        const acu_max_row = this.get_acu_max_row(idx); // 有数据的最后行数
        const max_row = this.get_max_row(idx) // Sheet最大行数
        // 获取需求日列表
        const requiredate_dic = {}
        for (let i = 2; i < acu_max_row; i++) {
            let tmp_val = window.luckysheet.getCellValue(i, 3, { type: "v", order: idx })
            if (tmp_val) {
                requiredate_dic[i + 1] = tmp_val
            } else {
                requiredate_dic[i + 1] = ""
            }
        }
        // 开始检查
        this.clear_color(max_row, idx) // 检查之前清理掉错误的背景色
        if (sheet_name === "今日排程") {
            // 获取锁定状态列
            const lock_state_list = []; // 存放锁定状态
            let tmp_lock_dic = {}
            for (let i = 2; i < acu_max_row; i++) {
                let tmp_val = window.luckysheet.getCellValue(i, 0, { order: idx })
                if (tmp_val) {
                    tmp_lock_dic[i + 1] = tmp_val // 字典 key：所在行号 value：锁定状态
                } else {
                    lock_state_list.push(tmp_lock_dic)
                    tmp_lock_dic = {}
                }
            }
            lock_state_list.push(tmp_lock_dic) // push最后一个字典
            // 获取排线线别、排线顺序、存放线别分隔行
            const line_list = []; // 存放排线线别
            const line_order_list = [] // 存放排线顺序
            let line_dic = {} // 所有线别字典，用于检查空行
            let line_count = [] // 排线类别数目
            let tmp_line = "" // 排线线别
            let tmp_line_order = 0 // 排线线别顺序
            let tmp_line_dic = {} // 排线线别 key:行数 value：排线线别
            let tmp_line_order_dic = {} // 排线线别顺序
            let ahead_line = window.luckysheet.getCellValue(2, 1, { order: idx }).substring(0, 4) // 前一种排线线别
            line_count.push(ahead_line)
            for (let i = 2; i < acu_max_row; i++) {
              let tmp_val = window.luckysheet.getCellValue(i, 1, { order: idx })
              if (tmp_val) {
                if (tmp_val.length > 4) {
                  let tmp_list = [];
                  tmp_val = tmp_val.replace("，", ",") // 防止输入中文的逗号
                  tmp_list = tmp_val.split(",")
                  tmp_line = tmp_list[0];
                  tmp_line_order = Number(tmp_list[1]);
                } else {
                  tmp_line = tmp_val;
                  tmp_line_order = -1;
                }
                tmp_line_dic[i + 1] = tmp_line
                tmp_line_order_dic[i + 1] = tmp_line_order
                line_dic[i + 1] = tmp_line
                if (tmp_line !== ahead_line) { // 线别种类数目
                  line_count.push(tmp_line)
                  ahead_line = tmp_line
                }
              } else {
                line_list.push(tmp_line_dic)
                line_order_list.push(tmp_line_order_dic)
                tmp_line_dic = {} // 清空字典
                tmp_line_order_dic = {}
              }
            }
            let line_count_set = new Set(line_count) // 用Set去重，得到排线类别
            let line_array = Array.from(line_count_set) // 转为数组，用于判断长度
            line_list.push(tmp_line_dic) // push最后一个字典
            line_order_list.push(tmp_line_order_dic)
            const error_0000 = this.check_todaysheet_blank_line(line_dic, line_array.length, acu_max_row)
            if (error_0000.length > 0) {
              if (error_0000[0]["row"] === -1) {
                this.check_data_alert("提示", "请检查不同线别之间是否有空行隔开！", "error");
              } else {
                this.check_error_print("今日排程", "行为多余空行[Error 0-000]", "error", error_0000, idx)              
              }
              return
            }
            const error_1000 = this.check_todaysheet_lock_state_format(lock_state_list);
            if (error_1000.length > 0) {
              this.check_error_print("今日排程", "行锁定状态命名错误[Error 1-000]", "error", error_1000, idx)
              return
            }
            const error_2000 = this.check_todaysheet_line_format(line_list);
            if (error_2000.length > 0) {
              this.check_error_print("今日排程", "行排线线别命名错误[Error 2-000]", "error", error_2000, idx)
              return
            }
            const error_2001 = this.check_todaysheet_same_line(line_list);
            if (error_2001.length > 0) {
              this.check_error_print("今日排程", "行排线线别错误[Error 2-001]", "error", error_2001, idx)
              return
            }
            const error_1001 = this.check_todaysheet_exist_notschedule(lock_state_list);
            if (error_1001.length > 0) {
              this.check_error_print("今日排程", "行锁定状态错误,出现未上排程,已自动修正为未锁定[Error 1-001]", "error", error_1001, idx)
              return
            }
            const error_1002 = this.check_todaysheet_lock_state_order(lock_state_list);
            if (error_1002.length > 0) {
              this.check_error_print("今日排程", "行锁定状态错误，未锁定后存在已锁定[Error 1-002]", "error", error_1002, idx)
              return
            }
            const error_2002 = this.check_todaysheet_line_order(line_order_list);
            if (error_2002.length > 0) {
              this.check_error_print("今日排程", "行排线线别顺序错误[Error 2-002]", "error", error_2002, idx)
              return
            }
        } else if (sheet_name === "未上排程") {
          // 获取锁定状态
          const lock_state_dic = {}
          for (let i = 1; i < acu_max_row; i++) {
            let tmp_val = window.luckysheet.getCellValue(i, 0, { order: idx })
            if (tmp_val) {
              lock_state_dic[i + 1] = tmp_val
            } else {
              lock_state_dic[i + 1] = "" // 表示空行
            }
          }
          // 获取排线线别
          const line_dic = {}
          for (let i = 1; i < acu_max_row; i++) {
            let tmp_val = window.luckysheet.getCellValue(i, 1, { order: idx })
            if (tmp_val) {
                line_dic[i + 1] = tmp_val
            } else {
                line_dic[i + 1] = "" // 表示空行
            }
          }
          const error_1000_ = this.check_notschedule_lock_state_format(lock_state_dic)
          if (error_1000_.length > 0) {
            this.check_error_print("未上排程", "行锁定状态命名错误,已自动修正为“未上排程”[Error 1-000]", "error", error_1000_, idx)
            return
          }
          const error_2000_ = this.check_notschedule_line_format(line_dic)
          if (error_2000_.length > 0) {
            this.check_error_print("未上排程", "行排线线别命名错误,已自动修正为“未排”[Error 2-000]", "error", error_2000_, idx)
            return
          }
          const error_0000_ = this.check_notschedule_blank_line(lock_state_dic)
          if (error_0000_.length > 0) {
            this.check_error_print("未上排程", "行为多余空行[Error 0-000]", "error", error_0000_, idx)
            return
          }
        }
        const error_4000 = this.checck_require_date_format(requiredate_dic, idx) // 格式化日期
        if (error_4000.length > 0) {
          this.check_error_print(sheet_name, "行日期格式错误，已自动修正为YYYY-MM-DD格式[Error 4-000]", "error", error_4000, idx)
          return
        }
      }
      this.checkAlert("提示", "检查无误", "success")
      this.check_success = true
    },

    // 获取最大表格最大行数（包括首行），参数:0:"今日排程" or 1:"未上排程"
    get_max_row(idx) {
      let allSheetData = window.luckysheet.getAllSheets()[idx].data;
      return allSheetData.length
    },
    // 获取最大列数
    get_max_col(idx) {
      let allSheetData = window.luckysheet.getAllSheets()[idx].data;
      return allSheetData[0].length
    },
    // 获取Sheet中存在数据的最后一行
    get_acu_max_row(idx) {
      let max_row = this.get_max_row(idx)
      for (let i = max_row - 1; i > 0; i--) {
        let tmp_val = window.luckysheet.getCellValue(i, 0, { order: idx })
        if (tmp_val) {
          return i + 1
        }
      }
    },

    // 今日排程：检查锁定状态命名是否有误，返回错误行号[Error 1-000]
    check_todaysheet_lock_state_format(lock_state_list) {
      console.log(lock_state_list)
      const error_row_list = []; // 存放错误的行号
      for (let i = 0; i < lock_state_list.length; i++) {
        for (let key in lock_state_list[i]) {
          const tmp_dic = {};
          if (!this.locked_list.includes(lock_state_list[i][key]) && !this.unlocked_list.includes(lock_state_list[i][key])) {
            tmp_dic["row"] = key
            tmp_dic["col"] = 0
            error_row_list.push(tmp_dic)
          }
        }
      }
      return error_row_list
    },

    // 今日排程：检查排线线别命名是否有误[Error 2-000]
    check_todaysheet_line_format(line_list) {
      const error_row_list = [];
      for (let i = 0; i < line_list.length - 1; i++) {
        for (let key in line_list[i]) {
          const tmp_dic = {};
          if (!this.all_line_list.includes(line_list[i][key])) {
            tmp_dic["row"] = key
            tmp_dic["col"] = 1
            error_row_list.push(tmp_dic)
          }
        }
      }
      return error_row_list
    },

    // 今日排程：锁定状态中出现“未上排程”标签，将锁定状态自动修正为“未锁定”[Error 1-001]
    check_todaysheet_exist_notschedule(lock_state_list) {
      const error_row_list = [];
      for (let i = 0; i < lock_state_list.length; i++) {
        for (let key in lock_state_list[i]) {
          const tmp_dic = {};
          if (lock_state_list[i][key] === "未上排程") {
            tmp_dic["row"] = key
            tmp_dic["col"] = 0
            error_row_list.push(tmp_dic)
            window.luckysheet.setCellValue(Number(key) - 1, 0, "未锁定", { order: 0 })
          }
        }
      }
      return error_row_list
    },

    // 今日排程：检查每个线别的已锁定是否在未锁定状态之前[Error 1-002]
    check_todaysheet_lock_state_order(lock_state_list) {
      const error_row_list = [];
      for (let i = 0; i < lock_state_list.length; i++) {
        let lock_end_flag = 0; // lock_end_flag=1表示一种线别的锁定遍历结束
        for (let key in lock_state_list[i]) {
          const tmp_dic = {};
          if (lock_end_flag === 0 && this.unlocked_list.includes(lock_state_list[i][key])) { // 锁定状态结束
            lock_end_flag = 1
          } else if (lock_end_flag === 1 && this.locked_list.includes(lock_state_list[i][key])) { // 未锁定中存在锁定
            tmp_dic["row"] = key
            tmp_dic["col"] = 0
            error_row_list.push(tmp_dic)
          }
        }
      }
      return error_row_list
    },

    // 今日排程：未排序线别为已锁定[error:1003]
    heck_todaysheet_disorder_is_locked(lock_state_list, line_order_list) {
      const error_row_list = [];
      for (let i = 0; i < line_order_list.length; i++) {
        const tmp_dic = {};
        if (line_order_list[i] === " ") {
          continue
        }
        if (line_order_list[i] === -1 && this.locked_list.includes(lock_state_list[i])) {
          tmp_dic["row"] = i + 1
          tmp_dic["col"] = 1
          error_row_list.push(tmp_dic)
        }
      }
      return error_row_list
    },

    // 今日排程：检查分隔以内的线别是否均相同[Error 2-001]
    check_todaysheet_same_line(line_list) {
      const error_row_list = []; // 存放错误的行号
      for (let i = 0; i < line_list.length; i++) {
        let max_line;
        let max_count = 0;
        let tmp_dic = {};
        for (let key in line_list[i]) {
          let tmp_val = line_list[i][key]
          tmp_dic[tmp_val] === undefined ? tmp_dic[tmp_val] = 1 : tmp_dic[tmp_val]++;
          if (tmp_dic[tmp_val] > max_count) {
            max_count = tmp_dic[tmp_val]
            max_line = tmp_val
          }
        }
        if (Object.keys(tmp_dic).length > 1) { // 大于1说明有2种以上的线别
          for (var key in line_list[i]) {
            let error_dic = {};
            if (line_list[i][key] !== max_line) {
              error_dic["row"] = key
              error_dic["col"] = 1
              error_row_list.push(error_dic)
            }
          }
        }
      }
      return error_row_list
    },

    // 今日排程：检查排线线别的顺序[Error 2-002]
    check_todaysheet_line_order(line_order_list) {
      const error_row_list = [];
      for (let i = 0; i < line_order_list.length - 1; i++) {
        let first_flag = 0; // 第一个不为1直接错误
        let order_end_flag = 0; // 有序号的部分结束
        for (var key in line_order_list[i]) {
          let tmp_dic = {};
          // 是否按照1,2,3,...,n的顺序
          if (first_flag === 0 && line_order_list[i][key] !== 1) { // 保证线别第一个为1
            tmp_dic["row"] = key
            tmp_dic["col"] = 1
            error_row_list.push(tmp_dic)
            return error_row_list
          } else if (first_flag < 1) {
            first_flag = 1
            continue
          }
          if (line_order_list[i][key] !== -1) {
            if (line_order_list[i][Number(key) - 1] + 1 !== line_order_list[i][key]) {
              tmp_dic["row"] = key
              tmp_dic["col"] = 1
              error_row_list.push(tmp_dic)
            }
          } else if (line_order_list[i][key] === -1) {
            order_end_flag = 1
          }
          // 没有序号的线别后面又出现有序号的线别
          if (order_end_flag === 1 && line_order_list[i][key] > -1) {
            tmp_dic["row"] = key
            tmp_dic["col"] = 1
            error_row_list.push(tmp_dic)
          }
        }
      }
      return error_row_list
    },

    // 今日排程：检查空行，线别之间有两行以上的空行为错误，并且同一线别之间不能有空行[Error 0-000]
    check_todaysheet_blank_line(line_dic, line_count, acu_max_row) {
      let blank_row_count = 0
      let blank_idx = 0
      let tmp_dic = {}
      const error_row_list = [];
      for (let i = 2; i < acu_max_row; i++) {
        let tmp_val = window.luckysheet.getCellValue(i, 0, { order: 0 })
        if (tmp_val) {
          blank_idx = 0
          tmp_dic[i + 1] = 1
        } else {
          blank_idx -= 1
          blank_row_count += 1
          tmp_dic[i + 1] = blank_idx
        }
      }
      // 检查分隔空行是否大于1行、以及检查一种线别内是否存在空行
      if (blank_row_count + 1 > line_count) {
        for (let key in tmp_dic) {
          let error_dic = {};
          if (tmp_dic[key] < -1) {
            error_dic["row"] = key
            error_dic["col"] = 0
            error_row_list.push(error_dic)
          } else if (tmp_dic[key] === -1 && line_dic[Number(key) - 1] === line_dic[Number(key) + 1]) {
            error_dic["row"] = key
            error_dic["col"] = 0
            error_row_list.push(error_dic)
          }
        }
        // 线别之间没有空行隔开则错误
      } else if (blank_row_count + 1 < line_count) {
        let error_dic = {};
        error_dic["row"] = -1
        error_dic["col"] = -1
        error_row_list.push(error_dic)
      }
      return error_row_list
    },

    // 未上排程：锁定状态不是“未上排程”时，将锁定状态自动修正为“未上排程”，排线线别修正为“未排”[Error 1-000]
    check_notschedule_lock_state_format(lock_state_list) {
      const error_row_list = [];
      for (let key in lock_state_list) {
        let tmp_dic = {};
        if (lock_state_list[key] === "") {
          continue
        } else if (lock_state_list[key] !== "未上排程") {
          tmp_dic["row"] = key
          tmp_dic["col"] = 0
          error_row_list.push(tmp_dic)
          window.luckysheet.setCellValue(Number(key) - 1, 0, "未上排程", { order: 1 })
          window.luckysheet.setCellValue(Number(key) - 1, 1, "未排", { order: 1 })
        }
      }
      return error_row_list
    },

    // 未上排程：排线线别不是“未排”时，将排线线别自动修正为“未排”[Error 2-000]
    check_notschedule_line_format(line_dic) {
      const error_row_list = [];
      for (let key in line_dic) {
        let tmp_dic = {};
        if (line_dic[key] === "") {
          continue
        } else if (line_dic[key] !== "未排") {
          tmp_dic["row"] = key
          tmp_dic["col"] = 1
          error_row_list.push(tmp_dic)
          window.luckysheet.setCellValue(Number(key) - 1, 0, "未上排程", { order: 1 })
          window.luckysheet.setCellValue(Number(key) - 1, 1, "未排", { order: 1 })
        }
      }
      return error_row_list
    },

    // 未上排程：检查空行，数据之间不能有空行[Error 0-000]
    check_notschedule_blank_line(line_dic) {
      const error_row_list = [];
      let begin_flag = 0; // 开始有数据
      for (let key in line_dic) {
        let tmp_dic = {};
        if (begin_flag === 0 && line_dic[key]) {
          begin_flag = 1
        } else if (begin_flag === 1 && line_dic[key] === "") { // 空行
          tmp_dic["row"] = key
          tmp_dic["col"] = 0
          error_row_list.push(tmp_dic)
        }
      }
      return error_row_list
    },

    // 将日期格式yyyy-mm-dd hh:mm:ss改为yyyy-mm-dd[error:4000]
    checck_require_date_format(requiredate_dic, idx) {
      const error_row_list = [];
      for (let key in requiredate_dic) {
        let tmp_dic = {};
        if (requiredate_dic[key] === "") {
          continue
        } else {
          let tmp = Number(requiredate_dic[key])
          if ( !isNaN(tmp) ) { // 如果不能转为数字，则返回NaN
            right_date = require_date_days_to_format(requiredate_dic[key], "-")
            tmp_dic["row"] = key
            tmp_dic["col"] = 3
            error_row_list.push(tmp_dic)
            window.luckysheet.setCellValue(Number(key) - 1, 3, right_date, { order: idx }) // 自动修正
          }
        }
      }
      return error_row_list
    },

    // 将Excel中的天数转化为日期
    require_date_days_to_format ( number, format = "-" ) {
      // 如果numb为空则返回空字符串
      if (!number) {
        return "";
      }
      let time = new Date(new Date("1900-1-1").getTime() + (number - 1) * 3600*24*1000);
      const year = time.getFullYear() + '';
      const month = time.getMonth() + 1 + '';
      const date = time.getDate();
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },

    // 给所有错误的单元格染色sheet_idx：0为今日排程，1为未上排程
    set_error_color(error_list, sheet_idx) {
      for (let i = 0; i < error_list.length; i++) {
        let row = error_list[i].row
        let col = error_list[i].col
        window.luckysheet.setCellFormat(row - 1, col, "bg", "#feb847", { order: sheet_idx })
      }
    },

    // 检查无误后给已染色为"#feb847"的单元格染为白色
    clear_color(max_row, idx) {
      // 锁定状态
      for (let row = 1; row < max_row; row++) {
        if (window.luckysheet.getCellValue(row, 0, { type: "bg", order: idx }) === "#feb847") {
          window.luckysheet.setCellFormat(row, 0, "bg", "null", { order: idx })
        }
      }
      // 排线线别
      for (let row = 1; row < max_row; row++) {
        // 如果有必要写背景颜色的判断，应该统一为该文件的全局来控制静态
        // 或者简化为不管颜色什么，都清空
        if (window.luckysheet.getCellValue(row, 1, { type: "bg", order: idx }) === "#feb847") {
            window.luckysheet.setCellFormat(row, 1, "bg", "null", { order: idx })
        }
      }
    },
  
    // 将所有错误的行号转为一个字符串
    error_row_to_str(error_list) {
      let error_str = "";
      for (let i = 0; i < error_list.length; i++) {
        error_str = error_str + error_list[i].row + ","
      }
      return error_str.substring(0, error_str.length - 1)
    },

    // 检查的提示 sheet名、提示信息、错误的行和列、sheet索引
    check_error_print(title, info, type, error_list, idx) {
      let error_row = this.error_row_to_str(error_list)
      this.set_error_color(error_list, idx)
      this.checkAlert(title, error_row + info, type)
    },

  },
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/onlinetable.scss';
</style>