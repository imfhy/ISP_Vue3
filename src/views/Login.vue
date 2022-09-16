<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">
        <h2>SMT排程系统</h2>
      </div>
      <div class="formdata">
        <el-form ref="loginForm" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              clearable
              placeholder="请输入账号"
              size="large"
              prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              clearable
              placeholder="请输入密码"
              show-password
              size="large"
              prefix-icon="Lock"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="butt">
        <el-button type="primary" @click.native.prevent="submitLogin(loginForm)" style="width:100%" size="large"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
  import {VerifyLogin} from '@/utils/api.js'
  import {useStore} from 'vuex'
  import { ElNotification, ElMessage, ElLoading } from 'element-plus'
  export default {
    data() {
      return {
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
    }
  }
</script>

<style scoped>
.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url("../assets/image/login-background.png");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 26px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.logindata {
  width: 360px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}

.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
}

.butt {
  margin-top: 10px;
  text-align: center;
}

.shou {
  cursor: pointer;
  color: #606266;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
</style>

