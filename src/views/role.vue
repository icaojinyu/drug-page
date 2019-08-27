<template>
  <div>
    <table class="table">
      <tr>
        <td colspan="4">角色</td>
        <td>
          <el-button plain type="primary" @click="handleAddButtonClick">创建角色</el-button>
        </td>
      </tr>
      <tr>
        <td>角色名称</td>
        <td>角色ID</td>
        <td>角色说明</td>
        <td>状态</td>
        <td>操作</td>
      </tr>
      <tr v-if="role.length" v-for="(item,index) in role" :key="index">
        <td>{{item.rolename}}</td>
        <td>{{item.roleid}}</td>
        <td>{{item.roledesc}}</td>
        <td>{{item.rolestatus}}</td>
        <td>
          <el-button plain size="mini" type="primary" @click="handleModifyButtonClick(item)">修改</el-button>
        </td>
      </tr>
    </table>
    <div class="operating" v-if="showCreateForm">
      <div class="form">
        <div class="form-item">
          <span>角色名称：</span>
          <el-select v-model="roleName" placeholder="请选择角色名称">
            <el-option
              v-for="(item,index) in RoleNameOptions"
              :key="index"
              :label="item.label"
              :value="item.roleName">
            </el-option>
          </el-select>
        </div>
        <div class="form-item">
          <span>角色描述：</span>
          <el-input v-model="roleDesc" placeholder="必填" type="text"></el-input>
        </div>
        <div class="form-item">
          <span>分配资源：</span>
          <el-input v-model="resourcesIds" placeholder="必填" type="text"></el-input>
        </div>
        <div class="form-item">
          <el-button type="primary" plain @click="confirmCreate">确定</el-button>
          <el-button type="warning" plain @click="showCreateForm=false">取消</el-button>
        </div>
      </div>
    </div>
    <div class="operating" v-if="showModifyForm">
      <div class="form">
        <div class="form-item">
          <span>角色名称：</span>
          <el-select v-model="currentItem.rolename" placeholder="请选择角色名称">
            <el-option
              v-for="(item,index) in RoleNameOptions"
              :key="index"
              :label="item.label"
              :value="item.roleName">
            </el-option>
          </el-select>
        </div>
        <div class="form-item">
          <span>角色描述：</span>
          <el-input v-model="currentItem.roledesc" placeholder="必填" type="text"></el-input>
        </div>
        <div class="form-item">
          <span>角色状态：</span>
          <el-input v-model="currentItem.rolestatus" placeholder="必填" type="text"></el-input>
        </div>
        <div class="form-item">
          <el-button type="primary" plain @click="confirmModify">确定</el-button>
          <el-button type="warning" plain @click="showModifyForm=false">取消</el-button>
        </div>
      </div>
    </div>
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from '../api'
  import loading from '../components/loading'

  export default {
    name: "role",
    components: {
      loading
    },
    data() {
      return {
        role: [],

        roleName: '',
        roleDesc: '',
        resourcesIds: '',
        showCreateForm: false,
        loading: false,

        roleStatus: '',
        showModifyForm: false,
        currentItem: {},
      }
    },
    created() {
      this.RoleNameOptions = [
        {
          roleName: '系统管理员',
          label: '系统管理员'
        },
        {
          roleName: '设备科管理员',
          label: '设备科管理员'
        },
        {
          roleName: '药品（药方）管理员',
          label: '药品（药方）管理员'
        },
        {
          roleName: '医疗服务科管理员',
          label: '医疗服务科管理员'
        }
      ]
      this.getRoles()
    },
    methods: {
      handleAddButtonClick() {
        this.showCreateForm = true
        this.reset()
      },
      handleModifyButtonClick(item) {
        this.showModifyForm = true
        this.currentItem = item
      },
      confirmCreate() {
        if (!this.roleName.trim() || !this.roleDesc.trim() || !this.resourcesIds.trim()) {
          this.$message({
            message: '请填入必填项',
            type: 'warning',
            center: true
          })
        } else {
          this.addRole()
        }
      },
      confirmModify() {
        if (!this.currentItem.rolename.trim() || !this.currentItem.roledesc.trim() || !this.currentItem.rolestatus.trim()) {
          this.$message({
            message: '请填入必填项',
            type: 'warning',
            center: true
          })
        } else {
          this.modifyRole()
        }
      },
      getRoles() {
        this.loading = true
        $.get(api.baseUrl + api.getRoles).then((res) => {
          console.log(res)
          this.role = res
          this.loading = false
        })
      },
      addRole() {
        $.post(api.baseUrl + api.addRole, {
          roleName: this.roleName,
          roleDesc: this.roleDesc,
          resourcesIds: this.resourcesIds
        }).then((res) => {
          console.log(res)
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success',
              center: true
            })
            this.showCreateForm = false
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
      reset() {
        this.roleName = ''
        this.roleDesc = ''
        this.resourcesIds = ''
      },
      modifyRole() {
        $.post(api.baseUrl + api.roleChanger, {
          roleId: this.currentItem.roleid,
          roleName: this.currentItem.rolename,
          roleStatus: this.currentItem.rolestatus,
          roleDesc: this.currentItem.roledesc
        }).then((res) => {
          console.log(res)
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success',
              center: true
            })
            this.showCreateForm = false
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
      height: 230px;
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
