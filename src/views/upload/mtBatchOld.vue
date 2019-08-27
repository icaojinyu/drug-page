<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="operate">
      <el-button type="primary" plain @click="batchUpload">上传所有未上传病案首页文件</el-button>
    </div>
    <table class="table">
      <tr>
        <th>ID</th>
        <th>接口类型</th>
        <th>文件名称</th>
        <th>年度</th>
        <th>季度</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tr v-for="item in tableData">
        <td>{{item.hqmsuploadid}}</td>
        <td>{{item.apitype}}</td>
        <td>{{item.filename}}</td>
        <td>{{item.year}}</td>
        <td>{{quarterSchema[item.quarter - 1]}}</td>
        <td>{{stateSchema[item.status]}}</td>
        <td><span @click="upload(item.hqmsuploadid)">{{item.status === 0? '上传':'重新上传'}}</span></td>
      </tr>
    </table>
    <el-pagination
      class="pagination"
      background
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :current-page.sync="currentPage"
      :pager-count="7"
      :total="total"
      v-if="total>pageSize"
    >
    </el-pagination>
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from '../../api'
  import breadcrumb from '../../components/breadcrumb'
  import loading from '../../components/loading'

  export default {
    name: "mtBatch",
    components: {
      breadcrumb,
      loading
    },
    data() {
      return {
        breadcrumbData: ['上传数据', '病案首页', '批次表'],
        tableData: [],
        loading: false,

        currentPage: 1,
        pageSize: 20,
        total: 0,

      }
    },
    created() {
      this.quarterSchema = ['第一季度', '第二季度', '第三季度', '第四季度']
      this.stateSchema = ['未上传', '已上传', '上传失败', '数据更新']
      this.getTableData()
    },
    methods: {
      getTableData() {
        this.loading = true
        let url = `${api.baseUrl}${api.mtDataList}/${this.currentPage}/${this.pageSize}`
        $.get(url).then((res) => {
          console.log(res)
          this.loading = false
          this.tableData = res.data
          this.total = res.totalPageNum
        })
      },
      // 上传
      upload(id) {
        let url = `${api.baseUrl}${api.mtUpload}`
        $.post(url, {
          mtuploadid: id
        }).then((res) => {
          console.log(res)
          this.$message({
            message: res.message,
            center: true,
            type: 'success'
          })
          setTimeout(() => {
            window.location.reload(true)
          }, 2000)
        }).catch((err) => {
          this.$message({
            message: err,
            center: true,
            type: 'error'
          })
        })
      },
      batchUpload() {
        let url = `${api.baseUrl}${api.mtBatchUpload}`
        $.post(url).then((res) => {
          console.log(res)
          this.$message({
            message: res.message,
            type: 'success',
            center: true
          })
        }).catch((err) => {
          this.$message({
            message: err,
            type: 'error',
            center: true
          })
        })
      },
      handleCurrentChange() {
        this.getTableData()
      }
    }
  }
</script>

<style lang="scss">
  .operate {
    width: 96%;
    margin: 0 auto;
  }
</style>

