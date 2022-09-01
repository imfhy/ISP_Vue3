<template>
    <el-card class="box-card" shadow="never">
        <template #header>
        <div class="card-header">
            <span>排程调整</span>
        </div>
        </template>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            
        <el-form :model="form" label-width="auto" label-position="right" :rules="rules">
            <el-alert title="权重调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-row>
                <el-col :span="8">
                    <el-form-item label="overdue权重:">
                        <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="form.overdue" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="idle权重:">
                        <el-input v-model="form.idle" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Line balance权重:">
                        <el-input v-model="form.Line_balance" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="大工单线权重:">
                        <el-input v-model="form.big_line" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="锁定时间节点内的idle权重:">
                        <el-input v-model="form.lock_idle" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-alert title="参数调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-row>
                <el-col :span="8">
                    <el-form-item label="默认无法识别需求日期::">
                        <el-input v-model="form.default_require_date" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="N天需求日期参数:">
                        <el-input v-model="form.ndays_require" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="N天物料到达时间参数:">
                        <el-input v-model="form.ndays_due" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="大小穿插时间:">
                        <el-input v-model="form.big_small" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Repair_mode:">
                        <el-input v-model="form.repair_mode" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-alert title="放假调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-row>
                <el-col :span="4">
                    <el-form-item label="是否开启包装放假:">
                        <el-switch v-model="form.is_pack_holiday" />
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="包装放假日期:">
                        <div class="block">
                            <el-date-picker
                            v-model="value4"
                            type="dates"
                            style="width:300%"
                            placeholder="请选择放假时间"
                            />
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-alert title="并行设置" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-row>
                <el-col :span="4">
                    <el-form-item label="是否开启并行:">
                        <el-switch v-model="form.is_parallel" />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="是否开放搜索解:">
                        <el-switch v-model="form.is_open_solution" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-alert title="产能调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-row>
                <el-col :span="8">
                    <el-form-item label="SM13下板新机种每班产能点数:">
                        <el-input v-model="form.sm13_down" placeholder="单位为万" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="SM21上板产能点数预测界限:">
                        <el-input v-model="form.sm21_up_predict" placeholder="单位为万" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="SM21上板小于界限产能点数:">
                        <el-input v-model="form.sm21_up_less_apacity" placeholder="单位为万" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="SM21上板大于界限产能点数:">
                        <el-input v-model="form.sm21_up_more_apacity" placeholder="单位为万" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="LED额外切换时间:">
                        <el-input v-model="form.led_additional" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-alert title="程序模块配置" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-row>
                <el-col :span="4">
                    <el-form-item label="是否执行预处理:">
                        <el-switch v-model="form.is_preprocess" />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="是否执行分组:">
                        <el-switch v-model="form.is_group" />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="是否执行repair:">
                        <el-switch v-model="form.is_repair" />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="是否执行tabu:">
                        <el-switch v-model="form.is_tabu" />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="是否执行插入锁定:">
                        <el-switch v-model="form.is_insert_lock" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-alert title="约束调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-row>
                <el-col :span="4">
                    <el-form-item label="维护时间约束:">
                        <el-switch v-model="form.is_blocktime_constraints" />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="上下板间隔约束:">
                        <el-switch v-model="form.is_updown_constraints" />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="排白班约束:">
                        <el-switch v-model="form.is_daytime_constraints" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="程序约束:">
                        <el-switch v-model="form.is_program_constraints" />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="第一单不约束:">
                        <el-switch v-model="form.is_first_constraints" />
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="排xx白班约束:">
                        <el-switch v-model="form.is_xxdaytime_constraints" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</template>

<script>
import { GetConfigData } from '@/utils/api.js'
import { ElNotification, ElMessage, ElLoading } from 'element-plus'
export default {
    data () {
        return {
            form: {
                overdue: '',
                idle: '',
                Line_balance: '',
                big_line: '',
                lock_idle: '',

                default_require_date: '',
                ndays_require: '',
                ndays_due: '',
                big_small: '',
                repair_mode: '',

                is_pack_holiday: true,
                pack_holiday_str: '',

                is_parallel: '',
                is_open_solution: '',

                sm13_down: '',
                sm21_up_predict: '',
                sm21_up_less_apacity: '',
                sm21_up_more_apacity: '',
                led_additional: '',
                
                is_preprocess: true,
                is_group: true,
                is_repair: true,
                is_tabu: true,
                is_insert_lock: true,

                is_blocktime_constraints: true,
                is_updown_constraints: true,
                is_daytime_constraints: true,
                is_program_constraints: true,
                is_first_constraints: true,
                is_xxdaytime_constraints: true,
            },
            value4: "",
            rules: {
                overdue: [
                    { required: true, message: "该字段不允许为空", trigger: "blur" }
                ],
                idle: [
                    { required: true, message: "该字段不允许为空", trigger: "blur" }
                ],
            },
        }
    },
    mounted(){
        this.getConfigData()
    },
    methods:{
        getConfigData(){
            GetConfigData().then(res=>{
                let form_data = res.data.config_data[0]
                this.form.overdue = form_data.overdue_weight;
                this.form.idle = form_data.idle_weight;
                this.form.Line_balance = form_data.line_balance_weight;
                this.form.big_line = form_data.big_line_weight;
                this.form.lock_idle = form_data.lock_time_idle_weight;

                this.form.default_require_date = form_data.default_unknown_require_day;
                this.form.ndays_require = form_data.threshold_duedate;
                this.form.ndays_due = form_data.threshold_release;
                this.form.big_small = form_data.large_small_punctuated;
                this.form.repair_mode = form_data.repair_mode;

                this.form.is_pack_holiday = form_data.pack_holiday_flag;
                this.form.pack_holiday_str = form_data.pack_holiday_interval_str;

                this.form.is_parallel = form_data.use_parallel;
                this.form.is_open_solution = form_data.deep_search;

                this.form.sm13_down = form_data.sm13_buttom_new_machine_predict;
                this.form.sm21_up_predict = form_data.sm21_top_led_threshold;
                this.form.sm21_up_less_apacity = form_data.sm21_top_le_predict;
                this.form.sm21_up_more_apacity = form_data.sm21_top_gt_predict;
                this.form.led_additional = form_data.led_extra_setup_time;
                
                this.form.is_preprocess = form_data.need_preprocess;
                this.form.is_group = form_data.need_dispatch;
                this.form.is_repair = form_data.need_repair;
                this.form.is_tabu = form_data.use_tabu;
                this.form.is_insert_lock = form_data.use_insert_lock;

                this.form.is_blocktime_constraints = form_data.block_time_rule;
                this.form.is_updown_constraints = form_data.buffer_time_rule;
                this.form.is_daytime_constraints = form_data.day_shift_time_rule;
                this.form.is_program_constraints = form_data.skip_first_group_rule;
                this.form.is_first_constraints = form_data.skip_first_group_rule;
                this.form.is_xxdaytime_constraints = form_data.force_day_shift_time_rule;
            }).catch(err=>{
                ElNotification.error({
                    title: '提示',
                    message: "获取表格数据失败",
                    showClose: true,
                    offset: 60
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/config.scss';
</style>
