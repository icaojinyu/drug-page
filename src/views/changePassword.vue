<template>
  <div class="change-password">
    <el-form :model="ruleForm" :rules="rules" class="form">
      <h1 class="title">密码修改</h1>
      <el-form-item prop="oldPassword">
        <el-input type="password" v-model="ruleForm.oldPassword" size="medium" clearable placeholder="原密码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" size="medium" clearable placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item prop="password1">
        <el-input type="password" v-model="ruleForm.password1" size="medium" clearable placeholder="确认密码"></el-input>
      </el-form-item>
      <div class="ctrl">
        <el-button :loading="loading" plain type="primary" @click="confirmModify">确认修改</el-button>
        <el-button plain @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import $ from 'jquery'
  import api from '../api'

  export default {
    name: "changePassword",
    data() {
      return {
        ruleForm: {
          oldPassword: '',
          password: '',
          password1: ''
        },
        rules: {
          oldPassword: {
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
          },
          password: {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          password1: {
            required: true,
            message: '请确认密码',
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
      if (!this.user.userid) {
        this.$router.push('/login')
      }
    },
    methods: {
      confirmModify() {
        if (!this.ruleForm.oldPassword.trim()) {
          this.$message({
            message: '请输入原密码',
            type: 'warning',
            center: true
          })
        } else if (!this.ruleForm.password.trim()) {
          this.$message({
            message: '请输入新密码',
            type: 'warning',
            center: true
          })
        } else if (!this.ruleForm.password1.trim()) {
          this.$message({
            message: '请确认密码',
            type: 'warning',
            center: true
          })
        } else if (this.ruleForm.password.trim() !== this.ruleForm.password1.trim()) {
          this.$message({
            message: '密码密码不一致,请重新输入',
            type: 'warning',
            center: true
          })
        } else {
          this.loading = true
          $.post(api.baseUrl + api.userchangerPassword, {
            oldPassword: this.oldPassword,
            password: this.password,
            password1: this.password1
          }).then((res) => {
            console.log(res)
            this.$message({
              message: '密码修改成功',
              type: 'warning',
              center: true
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 1500)
          }).catch((e) => {
            this.loading = false
            this.message({
              message: '服务端错误,请稍后再试',
              type: 'error',
              center: true
            })
          })
        }
      },
      cancel() {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss">
  .change-password {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    .form {
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
    .ctrl {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
</style>
