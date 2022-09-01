  <!-- <div class="st-table">
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column fixed type="selection" width="40" />
      <el-table-column prop="time" label="制作时间">
        <template v-slot="scope">
          <input type="text" v-model="scope.row.time" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="line" label="线体">
        <template v-slot="scope">
          <input type="text" v-model="scope.row.line" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.line}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="process" label="制程">
        <template v-slot="scope">
          <input type="text" v-model="scope.row.process" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.process}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="board" label="板号">
        <template v-slot="scope">
          <input type="text" v-model="scope.row.board" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.board}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="SMT_machine_name" label="SMT机种名">
        <template v-slot="scope">
          <input type="text" v-model="scope.row.SMT_machine_name" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.SMT_machine_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template v-slot="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row, scope)">编辑</el-button>
          <el-button link type="primary" size="small" @click="save(scope.row, scope)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div> -->