<template>
  <el-card shadow="never">
    <div class="operate">
      <el-button type="primary"><el-icon><plus /></el-icon><span>增加</span></el-button>
      <el-button type="danger"><el-icon><delete /></el-icon><span>删除</span></el-button>
      <el-button type="primary"><el-icon><CopyDocument /></el-icon><span>备份</span></el-button>
      <el-button type="primary"><el-icon><refresh-left /></el-icon><span>还原</span></el-button>
      <el-button type="primary"><el-icon><UploadFilled /></el-icon><span>导入排程表</span></el-button>
      <el-button type="primary"><el-icon><Timer /></el-icon><span>放假调整</span></el-button>
      <el-button type="primary"><el-icon><Bottom /></el-icon><span>强制插入</span></el-button>
      <el-button type="primary"><el-icon><circle-check /></el-icon><span>保存</span></el-button>
      <el-button><el-icon><download /></el-icon><span>导出</span></el-button>
    </div>
  </el-card>
  <div class="st-table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期">
        <template v-slot="scope">
          <input type="text" v-model="scope.row.date" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
        <template v-slot="scope">
          <input type="text" v-model="scope.row.name" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址">
        <template v-slot="scope">
          <input type="text" v-model="scope.row.address" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <!-- <template v-slot="scope>
          <el-button type="warning" @click="edit(scope.row, scope)">编辑</el-button>
          <el-button type="danger" @click="save(scope.row)">保存</el-button>
        </template> -->
      <template v-slot="scope">
        <el-button link type="primary" size="small" @click="edit(scope.row, scope)">编辑</el-button>
        <el-button link type="primary" size="small" @click="save(scope.row, scope)">保存</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetProgramData } from '@/utils/api.js'
export default {
  data(){
    return{

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          iseditor: false
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          iseditor: false
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          iseditor: false
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          iseditor: false
        }
      ]
    }
  },
  mounted() {
    // this.getProgramData();
  },
  methods: {
    getProgramData(){
      GetProgramData().then(res=>{
        print(res)
      }).catch(err=>{
        console.log("出现错误")
      })
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
.schedule{
  // margin: 10px;
}
.search{
  display: flex;
  .myinput{
    width: 200px;
  }
  .myselect{
    margin-left: 10px;
  }
  button{
    margin-left: 10px;
  }
}
.operate{
  display: flex;
  margin-top: 10px;
}
.mytable{
  margin-top: 10px;
}

  .item{
    width: 100px;
    /* 调整elementUI中样式 如果不需要调整请忽略 */
    .el-input__inner{
      height: 24px!important;
    }
  }
  .txt{
    line-height: 24px;
    padding: 0 9px;
    box-sizing: border-box;
  }
</style>