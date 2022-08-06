<template>
    <el-card class="box-card" shadow="never">
        <template #header>
        <div class="card-header">
            <span>排程调整</span>
        </div>
        </template>
        <el-form :model="form" label-width="220px" label-position="left">
            <el-alert title="权重调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-form-item label="overdue权重:">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="idle权重:">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Line balance权重:">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="大工单线权重:">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="锁定时间节点内的idle权重:">
                <el-input v-model="form.name" />
            </el-form-item>

            <el-alert title="参数调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-form-item label="默认无法识别需求日期::">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="N天需求日期参数:">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="N天物料到达时间参数:">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="大小穿插时间:">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Repair_mode:">
                <el-input v-model="form.name" />
            </el-form-item>

            <el-alert title="放假调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-form-item label="是否开启包装放假:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
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

            <el-alert title="并行设置" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-form-item label="是否开启并行:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="是否开放搜索解:">
                <el-switch v-model="form.delivery" />
            </el-form-item>

            <el-alert title="产能调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-form-item label="SM13下板新机种每班产能点数:">
                <el-input v-model="form.name" placeholder="单位为万" />
            </el-form-item>
            <el-form-item label="SM21上板产能点数预测界限:">
                <el-input v-model="form.name" placeholder="单位为万" />
            </el-form-item>
            <el-form-item label="SM21上板小于界限产能点数:">
                <el-input v-model="form.name" placeholder="单位为万" />
            </el-form-item>
            <el-form-item label="SM21上板大于界限产能点数:">
                <el-input v-model="form.name" placeholder="单位为万" />
            </el-form-item>
            <el-form-item label="LED额外切换时间:">
                <el-input v-model="form.name" />
            </el-form-item>

            <el-alert title="程序模块配置" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-form-item label="是否执行预处理:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="是否执行分组:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="是否执行repair:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="是否执行tabu:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="是否执行插入锁定:">
                <el-switch v-model="form.delivery" />
            </el-form-item>

            <el-alert title="约束调整" type="info" style="margin-bottom: 12px;" :closable="false" />
            <el-form-item label="维护时间约束:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="上下板间隔约束:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="排白班约束:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="程序约束:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="第一单不约束:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="排xx白班约束:">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="排xx白班约束:">
                <el-switch v-model="form.delivery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data () {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
            value4: ""
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/config.scss';
</style>
