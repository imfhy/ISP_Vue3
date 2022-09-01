<template>
    <div>
        <div class="header">
            <span class="sysname">SMT排程系统</span>
            <el-icon class="fold-icon" v-if="!isCollapse" @click="changeMenu"><Fold /></el-icon>
            <el-icon class="fold-icon" v-else @click="changeMenu"><Expand /></el-icon>
        <el-dropdown trigger="click" class="user-show">
            <!-- <span><el-icon class="user-icon"><UserFilled /></el-icon></span> -->
            <span class="el-dropdown-link">{{username}}
                <el-icon class="el-icon--right"><caret-bottom /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item class="clearfix"><el-icon><EditPen /></el-icon>修改密码<el-badge class="mark" /></el-dropdown-item>
                    <el-dropdown-item class="clearfix" @click="quitLogin()"><el-icon><CloseBold /></el-icon>退出<el-badge class="mark" /></el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
    props:["isCollapse"],
    data(){
        return {
            username: ""
        }
    },
    methods:{
        changeMenu(){
            this.$emit('changeCollapse')
        },
        quitLogin(){
            const $store = useStore()
            this.$store.commit('clearToken')
            localStorage.removeItem("username")
            this.$router.push({ path: '/login' })  // 登录跳转
        }
    },
    mounted() {
        this.username = localStorage.getItem("username")
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/header.scss';
</style>