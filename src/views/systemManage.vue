<template>
  <div>
    <div>
      <table class="table">
        <tr>
          <td colspan="5">系统用户管理</td>
          <td>
            <el-button plain type="primary" @click="handleAddButtonClick">创建用户</el-button>
          </td>
        </tr>
        <tr>
          <td>用户名</td>
          <td>密码</td>
          <td>真实姓名</td>
          <td>所在部门</td>
          <td>角色ID</td>
          <td>操作</td>
        </tr>
        <tr v-if="user.length" v-for="(item,index) in user" :key="index">
          <td>{{item.username}}</td>
          <td>{{item.password}}</td>
          <td>{{item.realname}}</td>
          <td>{{item.department}}</td>
          <td>{{item.roleid}}</td>
          <td>
            <el-button plain size="mini" type="warning" @click="handleModifyButtonClick(item)">修改</el-button>
          </td>
        </tr>
      </table>
      <div class="operating" v-if="showForm">
        <div class="form">
          <div class="form-item">
            <span>用户名：</span>
            <el-input v-model="userName" placeholder="必填" type="text"></el-input>
          </div>
          <div class="form-item">
            <span>密码：</span>
            <el-input v-model="password" placeholder="必填" type="password"></el-input>
          </div>
          <div class="form-item">
            <span>所在部门：</span>
            <el-input v-model="department" placeholder="必填" type="text"></el-input>
          </div>
          <div class="form-item">
            <span>真实姓名：</span>
            <el-input v-model="realName" placeholder="必填" type="text"></el-input>
          </div>
          <div class="form-item">
            <span>角色：</span>
            <el-select v-model="roleId" placeholder="请选择角色名称">
              <el-option
                v-for="(item,index) in RoleNameOptions"
                :key="index"
                :label="item.label"
                :value="item.roleId">
              </el-option>
            </el-select>
          </div>
          <div class="form-item">
            <el-button type="primary" plain @click="confirm">确定</el-button>
            <el-button type="warning" plain @click="showForm=false">取消</el-button>
          </div>
        </div>
      </div>
      <loading v-if="loading"></loading>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from '../api'
  import loading from '../components/loading'

  export default {
    name: "systemManage",
    components: {
      loading
    },
    data() {
      return {
        user: [],
        loading: false,
        showForm: false,

        userName: '',
        password: '',
        department: '',
        realName: '',
        roleId: '',

        isModify: false
      }
    },
    created() {
      this.RoleNameOptions = [
        {
          roleId: 1,
          label: '系统管理员'
        },
        {
          roleId: 2,
          label: '设备科管理员'
        },
        {
          roleId: 3,
          label: '药品（药方）管理员'
        },
        {
          roleId: 4,
          label: '医疗服务科管理员'
        }
      ]
      this.getUsers()
    },
    methods: {
      getUsers() {
        $.get(api.baseUrl + api.getUsers).then((res) => {
          console.log(res)
          if (res.status === '1') {
            this.user = res.users
          }
        })
      },
      addUser() {
        $.post(api.baseUrl + api.addSysUser, {
          userId: this.user.length + 1,
          userName: this.userName,
          password: this.password,
          realName: this.realName,
          roleId: this.roleId,
          department: this.department
        }).then((res) => {
          console.log(res)
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success',
              center: true
            })
            this.showForm = false
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        }).catch((err) => {
          console.error(err)
          this.$message({
            message: '服务端错误，请重试',
            type: 'error',
            center: true
          })
        })
      },
      modifyUser() {
        $.post(api.baseUrl + api.userChanger, {
          userId: this.currentItem.userid,
          userName: this.userName,
          password: this.password,
          realName: this.realName,
          roleId: this.roleId,
          department: this.department
        }).then((res) => {
          console.log(res)
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success',
              center: true
            })
            this.showForm = false
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        }).catch((err) => {
          console.error(err)
          this.$message({
            message: '服务端错误，请重试',
            type: 'error',
            center: true
          })
        })
      },
      handleAddButtonClick() {
        this.showForm = true
        this.isModify = false
        this.reset()
      },
      handleModifyButtonClick(item) {
        this.showForm = true
        this.isModify = true
        this.userName = item.username
        this.password = item.password
        this.department = item.department
        this.realName = item.realname
        this.roleId = item.roleid
        this.currentItem = item
      },
      confirm() {
        if (!this.userName.trim() || !this.password.trim() || !this.department.trim() || !this.realName.trim() || !this.roleId) {
          this.$message({
            message: '请填入完整信息',
            type: 'warning',
            center: true
          })
        } else {
          this.isModify ? this.modifyUser() : this.addUser()
        }
      },
      reset() {
        this.userName = ''
        this.password = ''
        this.department = ''
        this.realName = ''
        this.roleId = ''
      }
    }
  }
</script>


<style lang="scss" scoped>
  .table tr:nth-child(2) {
    font-weight: bold;
  }

  .add {
    margin: 10px auto;
    width: 96%;

    .el-button {
      margin-left: 150px;
    }
  }

  .operating {
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
      bottom: 0;
      right: 0;
      margin: auto;
      width: 500px;
      height: 330px;
      padding: 10px 20px;
      background: #fff;
      border-radius: 5px;

      .form-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 15px 0;

        span {
          width: 100px;
          text-align: right;
        }

        .el-input, .el-select {
          flex: 1;
        }

        .el-button {
          margin: 0 60px;
        }
      }
    }
  }
</style>
