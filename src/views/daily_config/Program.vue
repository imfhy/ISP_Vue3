<template>
<div id="mybox">
  <el-card shadow="never" class="box-card">
    <div class="operate">
      <el-button type="primary" @click="add_dialogVisible = true"><el-icon><plus /></el-icon><span>增加</span></el-button>
      <el-button type="danger" @click="deleteData"><el-icon><delete /></el-icon><span>删除</span></el-button>
      <el-button @click="exportExcel()"><el-icon><download /></el-icon><span>导出程序表</span></el-button>
      <el-upload
        name="file"
        class="upload-file"
        ref="upload"
        action="http://localhost:8080/api/config/replace_program_data/"
        accept=".xlsx"
        :show-file-list="false"
        :auto-upload="false"
        :on-success="handleSuccess"
        :on-progress="handleProgress" 
        :on-error="handleError"
        :on-change="handleChange"
        >
        <el-button slot="trigger" type="primary"><el-icon><CopyDocument /></el-icon>替换程序表</el-button>
      </el-upload>
    </div>
  </el-card>

  <div class="box-table">
    <el-card shadow="never">
        <el-table :data="tableData" @selection-change="tableSelectionHandle" style="width: 100%" stripe>
        <el-table-column fixed type="selection" width="40" />
        <el-table-column prop="time" label="制作时间">
            <template v-slot="scope">
            <a @click="editDataDialog(scope.row)" style="color:#409EFF;cursor:pointer">{{scope.row.time}}</a>
            </template>
        </el-table-column>
        <el-table-column prop="line" label="线体">
            <template v-slot="scope">
            <span v-show="!scope.row.iseditor">{{scope.row.line}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="process" label="制程">
            <template v-slot="scope">
            <span v-show="!scope.row.iseditor">{{scope.row.process}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="board" label="板号">
            <template v-slot="scope">
            <span v-show="!scope.row.iseditor">{{scope.row.board}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="SMT_machine_name" label="SMT机种名">
            <template v-slot="scope">
            <span v-show="!scope.row.iseditor">{{scope.row.SMT_machine_name}}</span>
            </template>
        </el-table-column>
        </el-table>
        <el-pagination background layout="total, prev, pager, next, jumper" 
            :total="page_total_num" 
            :page-size="page_size"
            @current-change="handlePageChange" 
            @size-change="handleSizeChange" 
        />
     </el-card>
  </div>
</div>

  <el-dialog
    v-model="edit_dialogVisible"
    title="编辑数据"
    width="46%"
    :before-close="handleClose"
    >
    <el-form :model="edit_form" label-width="auto" label-position="right" :rules="rules">
      <el-row>
          <el-col :span="12">
              <el-form-item label="制作时间:" prop="time">
                <el-date-picker
                  value-format="YYYY-MM-DD"
                  type="date"
                  placeholder="请选择日期"
                  v-model="edit_form.time"
                >
                </el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="制程:" prop="process">
                  <!-- <el-input v-model="edit_form.process" /> -->
                <el-select v-model="edit_form.process" clearable placeholder="请选择制程">
                    <el-option
                    v-for="item in process_options"
                    :key="item.value"
                    :label="item.label"
                    :edit_form.process="item.value"
                    />
                </el-select>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="板号:" prop="board">
                  <el-input v-model="edit_form.board" />
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="SMT机种名:" prop="SMT_machine_name">
                  <el-input v-model="edit_form.SMT_machine_name" />
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="长宽厚:" prop="size">
                  <el-input v-model="edit_form.size"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="线体:" prop="line">
                    <el-input v-model="edit_form.line"/>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="单板点数:" prop="single_points">
                  <el-input type="number" v-model="edit_form.single_points"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="联片数:" prop="connecting_plates">
                  <el-input type="number" v-model="edit_form.connecting_plates " />
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="绑定明细:">
                  <el-input v-model="edit_form.bind_detail"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="合并绑定状态:">
                  <el-input v-model="edit_form.bind_state"/>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="程序CT:" prop="program_CT">
                  <el-input v-model="edit_form.program_CT " />
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="未知1:">
                  <el-input type="textarea" v-model="edit_form.unknown1"/>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="未知2:">
                  <el-input  type="textarea" v-model="edit_form.unknown2"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="未知3:">
                  <el-input type="textarea" v-model="edit_form.unknown3" />
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="未知4:">
                  <el-input  type="textarea" v-model="edit_form.unknown4"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="未知5:">
                  <el-input type="textarea" v-model="edit_form.unknown5" />
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="创建人:">
                  <el-input  disabled v-model="edit_form.CREATED_BY"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="创建时间:">
                  <el-input disabled v-model="edit_form.CREATED_TIME" />
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="修改人:">
                  <el-input disabled v-model="edit_form.UPDATED_BY"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="修改时间:">
                  <el-input disabled v-model="edit_form.UPDATED_TIME" />
              </el-form-item>
          </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="edit_dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editFormData()">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="add_dialogVisible"
    title="新增数据"
    width="46%"
    :before-close="handleClose"
    >
    <el-form :model="add_form" label-width="auto" label-position="right" :rules="rules">
      <el-row>
          <el-col :span="12">
              <el-form-item label="制作时间:" prop="time">
                <el-date-picker
                  value-format="YYYY-MM-DD"
                  type="date"
                  placeholder="请选择日期"
                  v-model="add_form.time"
                >
                </el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="制程:" prop="process">
                  <!-- <el-input v-model="add_form.process" /> -->
                <el-select v-model="add_form.process" clearable placeholder="请选择制程">
                    <el-option
                    v-for="item in process_options"
                    :key="item.value"
                    :label="item.label"
                    :add_form.process="item.value"
                    />
                </el-select>
              </el-form-item>
          </el-col> 
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="板号:" prop="board">
                  <el-input v-model="add_form.board" />
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="SMT机种名:" prop="SMT_machine_name">
                  <el-input v-model="add_form.SMT_machine_name" />
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="长宽厚:" prop="size">
                  <el-input v-model="add_form.size"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="线体:" prop="line">
                    <el-input v-model="add_form.line"/>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="单板点数:" prop="single_points">
                  <el-input type="number" v-model="add_form.single_points"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="联片数:" prop="connecting_plates">
                  <el-input type="number" v-model="add_form.connecting_plates " />
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="绑定明细:">
                  <el-input  v-model="add_form.bind_detail"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="合并绑定状态:">
                  <el-input v-model="add_form.bind_state"/>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="程序CT:" prop="program_CT">
                  <el-input v-model="add_form.program_CT " />
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="未知1:">
                  <el-input type="textarea" v-model="add_form.unknown1"/>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="未知2:">
                  <el-input  type="textarea" v-model="add_form.unknown2"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="未知3:">
                  <el-input type="textarea" v-model="add_form.unknown3" />
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <el-form-item label="未知4:">
                  <el-input  type="textarea" v-model="add_form.unknown4"/>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="未知5:">
                  <el-input type="textarea" v-model="add_form.unknown5" />
              </el-form-item>
          </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="add_dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addFormData()">添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElNotification, ElMessage, ElLoading } from 'element-plus'
import { GetProgramData, GetAllProgramData, EditProgramData, AddProgramData, DeleteProgramData } from '@/utils/api.js'
import { Process_Options } from '@/utils/global.js'
import XLSX from 'xlsx'
import { trigger } from '@vue/reactivity'

export default {
  data(){
    return {
        data_table_selections: [],  // 存放表格选中的数据
        edit_dialogVisible: false,  // 编辑数据的dialog
        add_dialogVisible: false,  // 添加数据的dialog
        tableData: [],  // 表格数据
        process_options: Process_Options,
        // 修改数据的表单
        edit_form: {
            id: '',
            bind_state: '',
            SMT_machine_name: '',
            line: '',
            board: '',
            size: '',
            process: '',
            connecting_plates: '',
            single_points: '',
            program_CT: '',
            unknown1: '',
            unknown2: '',
            unknown3: '',
            unknown4: '',
            unknown5: '',
            bind_detail: '',
            time: '',
            CREATED_BY: '',
            CREATED_TIME: '',
            UPDATED_BY: '',
            UPDATED_TIME: ''
        },
        // 新增数据的表单
        add_form: {
            id: '',
            bind_state: '',
            SMT_machine_name: '',
            line: '',
            board: '',
            size: '',
            process: '',
            connecting_plates: '',
            single_points: '',
            program_CT: '',
            unknown1: '',
            unknown2: '',
            unknown3: '',
            unknown4: '',
            unknown5: '',
            bind_detail: '',
            time: ''
        },

        uploadFiles: [],   // excel文件列表
        file_name: "",

        loadingInstance: null,  // 动画实例
        // 表单验证
        rules:{
            time: [
                {required: true, message: "该字段不允许为空", trigger: "blur"}
            ],
            line: [
                {required: true, message: "该字段不允许为空", trigger: "blur"}
            ],
            board: [
                {required: true, message: "该字段不允许为空", trigger: "blur"}
            ],
            size: [
                {required: true, message: "该字段不允许为空", trigger: "blur"}
            ],
            process: [
                {required: true, message: "该字段不允许为空", trigger: "blur"}
            ],
            SMT_machine_name: [
                {required: true, message: "该字段不允许为空", trigger: "blur"}
            ],
            connecting_plates: [
                {required: true, message: "该字段不允许为空", trigger: "blur"},
            ],
            single_points: [
                {required: true, message: "该字段不允许为空", trigger: "blur"}
            ],
            program_CT: [
                {required: true, message: "该字段不允许为空", trigger: "blur"}
            ],
        },

        page_total_num: 0,  // 总共有多少条数据
        current_page: 1,  // 当前在第几页
        page_size: 100,  // 每页多少条数据
    }
  },
  mounted() {
    this.getProgramData(this.current_page, this.page_size);
  },
  methods: {
    handlePageChange(val){
        this.current_page = val;
        this.getProgramData(val, this.page_size);  // 翻页
    },
    handleSizeChange(val){
        this.page_num = val
    },
    tableSelectionHandle(data){
        this.data_table_selections = data
    },
    deleteData(){
        if(this.data_table_selections.length == 0){
            ElMessage({
                message: "请至少选中一条数据",
                type: "warning",
                showClose: true,
                offset: 70
            })
            return
        }
        let id_list = []
        for(let i = 0; i< this.data_table_selections.length; i++){
            id_list.push(this.data_table_selections[i].id)
        }
        this.$confirm('请确认是否要删除选中的数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            DeleteProgramData({"id_list": id_list}).then(res=>{
            if(res.data.code == 200){
                ElNotification.success({
                    title: '提示',
                    message: res.data.msg,
                    showClose: true,
                    offset: 60
                })
            } else {
                ElNotification.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: true,
                    offset: 60
                })
            }
        }).catch(err=>{
            ElNotification.error({
                title: '提示',
                message: "删除出现错误",
                showClose: true,
                offset: 60
            })
        })
        }).catch(() => {
            ElMessage({
                message: "取消删除",
                type: "warning",
                offset: 70
            })
        });
    },
    handleChange(file){
        // 文件上传之前确认
        if(file.status=='ready') {
            this.$confirm('此操作将会清空原有内容, 替换前请做好备份，请确认是否继续替换?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$refs.upload.submit();
            }).catch(() => {
                this.$refs.upload.clearFiles();
                ElMessage({
                    message: "取消替换",
                    type: "warning",
                    offset: 70
                })
            });
        }
    },
    handleSuccess(res){
        if(res.code == 200){
            ElNotification.success({
                title: '提示',
                message: res.msg,
                showClose: true,
                offset: 60
            })
        } else {
            ElNotification.error({
                title: '提示',
                message: res.msg,
                showClose: true,
                offset: 60
            })
        }
        this.loadingInstance.close();  // 清除动画
    },
    handleProgress(){
        // 加载动画
        this.loadingInstance = ElLoading.service({
            text:'替换中，请稍等...',
            target:'#mybox',
            background: 'rgba(0, 0, 0, 0.5)'
        });
    },
    exportExcel(){
        this.loadingInstance = ElLoading.service({
            text:'导出中，请稍等...',
            target:'#mybox',
            background: 'rgba(0, 0, 0, 0.5)'
        });
        GetAllProgramData().then(res=>{
            let sheetData = res.data.table_data
            let fields = res.data.fields
            let fields_display = res.data.fields_display
            let newData = [fields_display, ...sheetData]
            let sheet = XLSX.utils.json_to_sheet(newData, {header:fields, skipHeader:true})
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, sheet, '程序表');
            XLSX.writeFile(wb, "程序表.xlsx");
            ElNotification.success({
                title: '提示',
                message: "导出成功",
                showClose: true,
                offset: 60
            })
        }).catch(err=>{
            ElNotification.error({
                title: '提示',
                message: "导出出现错误",
                showClose: true,
                offset: 60
            })
        })
        this.loadingInstance.close();
    },
    handleError(){
        ElNotification.error({
            title: '提示',
            message: "程序表替换失败，请重试",
            showClose: true,
            offset: 60
        })
        this.loadingInstance.close();  // 清除动画
    },
    editDataDialog(data){
        this.edit_dialogVisible = true
        this.edit_form.id = data.id
        this.edit_form.bind_detail = data.bind_detail
        this.edit_form.SMT_machine_name = data.SMT_machine_name
        this.edit_form.line = data.line
        this.edit_form.board = data.board
        this.edit_form.size = data.size
        this.edit_form.process = data.process
        this.edit_form.connecting_plates = data.connecting_plates
        this.edit_form.single_points = data.single_points
        this.edit_form.program_CT = data.program_CT
        this.edit_form.unknown1 = data.unknown1
        this.edit_form.unknown2 = data.unknown2
        this.edit_form.unknown3 = data.unknown3
        this.edit_form.unknown4 = data.unknown4
        this.edit_form.unknown5 = data.unknown5
        this.edit_form.bind_detail = data.bind_detail
        this.edit_form.time = data.time
        this.edit_form.CREATED_BY = data.CREATED_BY,
        this.edit_form.CREATED_TIME = data.CREATED_TIME,
        this.edit_form.UPDATED_BY = data.UPDATED_BY,
        this.edit_form.UPDATED_TIME = data.UPDATED_TIME
    },
    editFormData(){
        EditProgramData(this.edit_form).then(res=>{
            console.log(res.data.code)
            if(res.data.code == 200){
                ElNotification.success({
                    title: '提示',
                    message: res.data.msg,
                    showClose: true,
                    offset: 60
                })
            } else {
                ElNotification.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: true,
                    offset: 60
                })
            }
        }).catch(err=>{
            ElNotification.error({
                title: '提示',
                message: "发生错误，请重试",
                showClose: true,
                offset: 60
            })
        })
    },
    addFormData(){
        this.$refs[this.add_form].validate(valid=>{
            if (valid) {
                ElNotification.success({
                    title: '提示',
                    message: "表单验证成功",
                    showClose: true,
                    offset: 60
                })
            } else {
                ElNotification.error({
                    title: '提示',
                    message: "表单验证失败",
                    showClose: true,
                    offset: 60
                })
            }
        })
        return
        AddProgramData(this.add_form).then(res=>{
            console.log(res.data.code)
            if(res.data.code == 200){
                ElNotification.success({
                    title: '提示',
                    message: res.data.msg,
                    showClose: true,
                    offset: 60
                })
            } else {
                ElNotification.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: true,
                    offset: 60
                })
            }
        }).catch(err=>{
            ElNotification.error({
                title: '提示',
                message: "发生错误，请重试",
                showClose: true,
                offset: 60
            })
        })
    },
    getProgramData(page, page_size){
      GetProgramData({"current_page": page, "page_size": page_size}).then(res=>{
        this.tableData = res.data.table_data
        this.page_total_num = res.data.page_total_num
      }).catch(err=>{
        ElNotification.error({
            title: '提示',
            message: "获取表格数据失败",
            showClose: true,
            offset: 60
        })
      })
      // this.loadingInstance.close();
    },
    editRowData(){

    },
    edit(row, index) {
      row.iseditor = true;
    },
    save(row, index) {
      row.iseditor = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/theme/program.scss';
</style>