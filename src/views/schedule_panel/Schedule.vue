<template>
  <div class="schedule">
    <el-card shadow="hover">
      <div class="search">
        <el-input class="myinput" v-model="search_input" placeholder="请输入搜索内容" prefix-icon="el-icon-search"></el-input>
        <el-select class="myselect" v-model="value_lock_state" placeholder="锁定状态">
          <el-option
            v-for="item in options_lock_state"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="myselect" v-model="pre_schedule_line_value" slot="prepend" placeholder="原线体">
          <el-option
            v-for="item in options_schedule_line"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="myselect" v-model="schedule_line_value" slot="prepend" placeholder="排线线体">
          <el-option
            v-for="item in options_schedule_line"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="myselect" v-model="process" slot="prepend" placeholder="工序">
          <el-option
            v-for="item in options_process"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="myselect" v-model="require_str" slot="prepend" placeholder="需求日">
          <el-option
            v-for="item in options_require_str"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary"><el-icon><search /></el-icon><span>搜索</span></el-button>
      </div>
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
      <div class="mytable">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="600"
          border
        >
          <el-table-column fixed type="selection" width="40" />
          <el-table-column fixed prop="lock_state" label="锁定状态" width="90" />
          <el-table-column prop="schedule_line" label="排线" sortable />
          <el-table-column prop="schedule_pos" label="顺序" />
          <el-table-column fixed prop="package_line" label="包装线" />
          <el-table-column fixed prop="require_str" label="需求日" width="110" />
          <el-table-column fixed prop="type_of_machine" label="机种名" width="180" />
          <el-table-column fixed prop="AISMT_component" label="AISMT组件" width="160" />
          <el-table-column fixed prop="raw_order_id" label="订单号" width="110" />
          <el-table-column fixed prop="order_num" label="工单量" width="120" />
          <el-table-column prop="customer" label="客户" width="120" />
          <el-table-column prop="post_process" label="后工序" width="120" />
          <el-table-column prop="process" label="工序" width="120" />
          <el-table-column prop="remark" label="备注" width="120" />
          <el-table-column prop="material_case" label="物料情况" width="120" />
          <el-table-column prop="release_time" label="到料时间" width="120" />
          <el-table-column prop="due_time" label="后续需求时间" width="120" />
          <el-table-column prop="remain_num" label="剩余数量" width="120" />
          <el-table-column prop="board" label="板号" width="200" />
          <el-table-column prop="single_points" label="单面点数" width="120" />
          <el-table-column prop="total_points" label="总点数" width="100" />
          <el-table-column prop="process_time" label="加工时长" width="120" />
          <el-table-column prop="process_end" label="加工结束时间" width="200" />
          <el-table-column prop="forced_line" label="强制线别" show-overflow-tooltip width="120" />
          <el-table-column prop="program_line" label="程序线别" show-overflow-tooltip width="120" />
          <el-table-column prop="mesh_status" label="网板状态" width="120" />
          <el-table-column prop="serial" label="序列号" width="160" />
          <el-table-column prop="burning_status" label="烧录状态" width="120" />
          <el-table-column prop="line" label="排线线别" width="120" />
          <el-table-column prop="schedule_group_ID" label="分组" />
        </el-table>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      search_input: "", // 搜索输入内容
      tableData:[
        {
          lock_state: "锁定",
          schedule_line: "SM01",
          schedule_pos: "1",
          package_line: "CL02",
          require_str: "2022-5-18",
          type_of_machine: "HKNGDQ6KEKN3DC",
          AISMT_component: "SMTCIDQN1A2",
          raw_order_id: "5875405",
          order_num: "19",
          customer: "SNDS",
          post_process: "AI",
          process: "T",
          remark: "-",
          material_case: "-",
          release_time: "-",
          due_time: "-",
          remain_num: "1000",
          board: "715G8082M01000005Y",
          single_points: "753.0",
          total_points: "753000.0",
          process_time: "9.15",
          process_end: "2022年5月13日 17:09",
          forced_line: "SM06、SM07、SM01、SM02",
          program_line: "SM21、SM05、SM03、SM07、SM06、SM02、SM01",
          mesh_status: "在库",
          serial: "CL02x221501",
          burning_status: "其他",
          line: "SM01,1",
          schedule_group_ID: "-1",
        },
      ],
      options_lock_state:[
        {
          value: '选项1',
          label: '锁定'
        },{
          value: '选项2',
          label: '未上排程'
        },{
          value: '选项3',
          label: '未锁定'
        },
      ],
      options_schedule_line:[
        {
          value: '选项1',
          label: 'SM01'
        },{
          value: '选项2',
          label: 'SM02'
        },{
          value: '选项3',
          label: 'SM03'
        },{
          value: '选项4',
          label: 'SM05'
        },{
          value: '选项5',
          label: 'SM06'
        },{
          value: '选项6',
          label: 'SM07'
        },{
          value: '选项7',
          label: 'SM08'
        },{
          value: '选项8',
          label: 'SM09'
        },{
          value: '选项9',
          label: 'SM11'
        },{
          value: '选项10',
          label: 'SM13'
        },{
          value: '选项11',
          label: 'SM15'
        },{
          value: '选项12',
          label: 'SM19'
        },{
          value: '选项13',
          label: 'SM21'
        },{
          value: '选项14',
          label: 'SM22'
        },{
          value: '选项15',
          label: 'SM23'
        },{
          value: '选项16',
          label: 'SR01'
        },{
          value: '选项17',
          label: 'SR02'
        },{
          value: '选项18',
          label: 'SR03'
        },{
          value: '选项19',
          label: 'SR06'
        },{
          value: '选项20',
          label: 'SR09'
        },{
          value: '选项21',
          label: '未排'
        }
      ],
      options_process:[
        {
          value: '选项1',
          label: 'B'
        },{
          value: '选项2',
          label: 'B-BPR'
        },{
          value: '选项3',
          label: 'S'
        },{
          value: '选项4',
          label: 'S-BPR'
        },{
          value: '选项5',
          label: 'S-BPR-M'
        },{
          value: '选项6',
          label: 'T'
        },{
          value: '选项7',
          label: 'T-BPR'
        },
      ],
      options_require_str:[
        {
          value: '选项1',
          label: '无需求日期'
        },{
          value: '选项2',
          label: '2022-5-11'
        },{
          value: '选项3',
          label: '2022-5-13'
        },
      ],
      value_lock_state:"", // 锁定状态
      pre_schedule_line_value:"", //原线体
      schedule_line_value:"", //排线线体
      process:"", //工序
      require_str:"", //需求日
      rowClass(){
        return "color:#33ba6d;background:#ffffff;"
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.schedule{
  margin: 10px;
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
</style>