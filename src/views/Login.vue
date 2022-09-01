<template>
  <div>
      <div class="login-box">
        <el-card style="height: 300px;">
            <el-tabs v-model="activeName" class="demo-tabs" stretch>
              <el-tab-pane label="普通用户登录" name="common_user">
                  <el-form :model="loginForm"
                  status-icon :rules="rules" 
                  ref="loginForm" 
                  label-position="left" 
                  label-width="80px"
                  >
                    <el-form-item  prop="username" label="普通用户">
                      <el-input type="text" v-model="loginForm.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitLogin(loginForm)">登录</el-button>
                      <el-button @click="resetForm(formRef)">重置</el-button>
                    </el-form-item>
                  </el-form>
              </el-tab-pane>

              <el-tab-pane label="管理员登录" name="manage_user">
                  <el-form :model="loginForm"
                  status-icon :rules="rules" 
                  ref="loginForm" 
                  label-position="left" 
                  label-width="100px"
                  >
                    <el-form-item  prop="username" label="管理员用户">
                      <el-input type="text" v-model="loginForm.username" placeholder="请输入管理员账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitLogin(loginForm)">登录</el-button>
                      <el-button @click="resetForm(formRef)">重置</el-button>
                    </el-form-item>
                  </el-form>
              </el-tab-pane>

            </el-tabs>
        </el-card>
      </div>
  </div>
</template>

<script>
import {VerifyLogin} from '@/utils/api.js'
// import { token } from '@/utils/login.js'
import {useStore} from 'vuex'
import { ElNotification, ElMessage, ElLoading } from 'element-plus'
export default {
  data() {
    return {
      activeName: 'common_user',
      loginForm: {
        username: '',  //用户名
        password: '',  //密码
      },
      rules: {
        username: [
            { required: true, trigger: 'change',message: '请输入用户名' }
        ],
        password: [
            { required: true, trigger: 'change',message: '请输入密码' }
        ]
      }
    }    
  },
  methods: {
    submitLogin(loginForm){
      const $store = useStore()
      VerifyLogin(JSON.stringify(loginForm)).then(res=>{
        if(res.data.code == 200){
          var state = {
            username : loginForm.username,
            token: res.data.token
          }
          console.log("token", res.data.token)
          ElNotification.success({
              title: '提示',
              message: res.data.msg,
              showClose: true,
              offset: 70
          })
          this.$router.push({ path: '/home' })  // 登录跳转
          this.$store.commit('saveToken', res.data.token)  // 保存token
          localStorage.setItem("username", this.loginForm.username)  // 保存用户名
        } else {
          ElNotification.error({
              title: '提示',
              message: res.data.msg,
              showClose: true,
          })
          this.$store.commit('clearToken')
          localStorage.removeItem("username")
        }
      }).catch(err=>{
          ElNotification.error({
              title: '提示',
              message: "登录出错，请重试",
              showClose: true,
          })
      })
    },
    resetForm(loginForm){
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style>
.login-box{
  width: 500px;
  height: 300px;
  margin:160px auto;
  border-radius: 10px;
  border: 1px solid #eee;
  background: #Fff;
}
</style>
