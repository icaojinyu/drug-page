<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" class="login-form">
      <h1 class="title">系统登录</h1>
      <el-form-item prop="userName">
        <el-input type="text" v-model="ruleForm.userName" size="medium" clearable placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" size="medium" clearable placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" plain type="primary" @click="validate" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import $ from 'jquery'
  import api from '../api'

  export default {
    name: "login",
    data() {
      return {
        ruleForm: {
          userName: '',
          password: '',
          checked: false
        },
        rules: {
          userName: {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          password: {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        },
        loading: false
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    created() {
      if (this.user.userid) {
        this.$router.push('/')
      }
    },
    mounted() {
      if (window.localStorage.password) {
        this.ruleForm.checked = true
        this.ruleForm.userName = window.localStorage.userName
        this.ruleForm.password = window.localStorage.password
      }
    },
    methods: {
      validate() {
        if (!this.ruleForm.userName.trim()) {
          this.$message({
            message: '请输入用户名',
            type: 'warning',
            center: true
          })
        } else if (!this.ruleForm.password.trim()) {
          this.$message({
            message: '请输入密码',
            type: 'warning',
            center: true
          })
        } else {
          this.loading = true
          $.post(api.baseUrl + api.userLogin, {
            userName: this.ruleForm.userName,
            password: this.ruleForm.password
          }).then((res) => {
            console.log(res)
            let {message, status} = res
            this.loading = false
            if (status === 1) { // 登陆成功
              let {sysUser} = res
              // 存储到sessionStorage中
              window.sessionStorage.user = JSON.stringify(sysUser)
              // 存储到vuex中
              this.$store.dispatch('setUser', sysUser)
              this.$message({
                message,
                type: 'success',
                center: true,
                duration: 2000
              })
              setTimeout(() => {
                let origin = this.$route.query.redirect
                let path = origin ? decodeURIComponent(origin) : '/'
                this.$router.push(path)
              }, 2000)
              // 如果勾选了记住密码
              if (this.ruleForm.checked) {
                window.localStorage.userName = this.ruleForm.userName
                window.localStorage.password = this.ruleForm.password
              } else {
                window.localStorage.removeItem('userName')
                window.localStorage.removeItem('password')
              }
            } else if (status === 0) { // 登陆失败
              this.$message({
                message,
                type: 'error',
                center: true
              })
            }
          }).catch((e) => {
            console.log(e)
            this.$message({
              message: '服务端错误,请刷新后重试',
              type: 'error',
              center: true
            })
            this.loading = false
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);

    .login-form {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 400px;
      height: 320px;
      padding: 0 30px;
      background: #fff;
      border-radius: 5px;

      .title {
        font-size: 16px;
        text-align: center;
        margin: 24px 0;
      }
    }
  }
</style>
