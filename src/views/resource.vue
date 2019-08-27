<template>
  <div>
    <table class="table">
      <tr>
        <td colspan="3">资源</td>
        <td colspan="2">
          <el-button plain type="primary" @click="handleAddButtonClick">添加资源</el-button>
        </td>
      </tr>
      <tr>
        <td>资源名称</td>
        <td>URL地址</td>
        <td>说明</td>
        <td colspan="2">操作</td>
      </tr>
      <tr v-if="resource.length" v-for="(item,index) in resource" :key="index">
        <td>{{item.resourcname}}</td>
        <td>{{item.resourcurl}}</td>
        <td>{{item.resourcdesc}}</td>
        <td>
          <el-button plain size="mini" type="danger" @click="deleteResource(item)">删除</el-button>
        </td>
        <td>
          <el-button plain size="mini" type="warning" @click="handleModifyButtonClick(item)">修改</el-button>
        </td>
      </tr>
    </table>
    <div class="operating" v-if="showForm">
      <div class="form">
        <div class="form-item">
          <span>资源名称：</span>
          <el-input v-model="resourceName" placeholder="必填" type="text"></el-input>
        </div>
        <div class="form-item">
          <span>URL地址：</span>
          <el-input v-model="url" placeholder="必填" type="text"></el-input>
        </div>
        <div class="form-item">
          <span>说明：</span>
          <el-input v-model="desc" placeholder="必填" type="text"></el-input>
        </div>
        <div class="form-item">
          <el-button type="primary" plain @click="confirm">确定</el-button>
          <el-button type="warning" plain @click="showForm=false">取消</el-button>
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
    name: "resource",
    components: {
      loading
    },
    data() {
      return {
        resource: [],
        showForm: false,
        resourceName: '',
        url: '',
        desc: '',
        isModify: false,
        currentItem: {},
        loading: false
      }
    },
    created() {
      this.getResourceData()
    },
    methods: {
      getResourceData() {
        this.loading = true
        $.get(api.baseUrl + api.getResources).then((res) => {
          console.log(res)
          this.resource = res
          this.loading = false
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
        this.resourceName = item.resourcname
        this.url = item.resourcurl
        this.desc = item.resourcdesc
        this.currentItem = item
      },
      confirm() {
        if (!this.resourceName.trim() || !this.url.trim() || !this.desc.trim()) {
          this.$message({
            message: '请填入完整信息',
            type: 'warning',
            center: true
          })
        } else {
          this.isModify ? this.modifyResource() : this.addResource()
        }
      },
      addResource() {
        $.post(api.baseUrl + api.addResource, {
          resourcName: this.resourceName,
          resourcUrl: this.url,
          resourcDesc: this.desc
        }).then((res) => {
          console.log(res)
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success',
              center: true
            })
            // this.showForm = false
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
      modifyResource() {
        $.post(api.baseUrl + api.resourceChanger, {
          resourcId: this.currentItem.resourceid,
          resourcUrl: this.url,
          resourcDesc: this.desc
        }).then((res) => {
          console.log(res)
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success',
              center: true
            })
            this.showForm = false
            // 更新视图
            this.resource = this.resource.map((item) => {
              if (item.resourceid === this.currentItem.resourceid) {
                item.resourcname = this.resourceName
                item.resourcurl = this.url
                item.resourcdesc = this.desc
              }
              return item
            })
          } else {
            this.$message({
              message: '资源修改失败，请重试',
              type: 'error',
              center: true
            })
          }
        }).catch((err) => {
          console.error(err)
        })
      },
      deleteResource(item) {
        $.post(api.baseUrl + api.deleteResource, {
          resourcId: item.resourceid
        }).then((res) => {
          console.log(res)
          if (res.num === 1) {
            this.$message({
              message: '资源删除成功',
              type: 'success',
              center: true
            })
            // 更新视图
            this.resource = this.resource.filter((el) => el.resourceid !== item.resourceid)
          } else {
            this.$message({
              message: '资源删除失败，请重试',
              type: 'error',
              center: true
            })
          }
        }).catch((err) => {
          console.error(err)
        })
      },
      reset() {
        this.resourceName = ''
        this.url = ''
        this.desc = ''
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

        .el-input {
          flex: 1;
        }

        .el-button {
          margin: 0 60px;
        }
      }
    }
  }
</style>
