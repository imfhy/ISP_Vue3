<template>
    <div>
        <div class="header">
            <span class="sysname">SMT排程系统</span>
            <el-icon v-if="!isCollapse" @click="changeMenu"><Fold /></el-icon>
            <el-icon v-else @click="changeMenu"><Expand /></el-icon>
        </div>
    </div>
</template>

<script>
export default {
    props:["isCollapse"],
    methods:{
        changeMenu(){
            this.$emit('changeCollapse')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/header.scss';
</style>