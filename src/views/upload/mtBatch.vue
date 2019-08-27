<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="operate">
      <el-button type="primary" plain @click="batchUpload">上传所有未上传病案首页文件</el-button>
    </div>
    <table class="table">
      <tr>
        <th>序号</th>
        <th>年度</th>
        <th>季度</th>
        <th>文件</th>
        <th>状态</th>
        <th>返回信息</th>
        <th colspan="2">操作</th>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.year}}</td>
        <td>{{quarterSchema[item.quarter - 1]}}</td>
        <td>{{item.filename}}</td>
        <td>{{stateSchema[item.status]}}</td>
        <td style="max-width: 400px">{{item.returninfo}}</td>
        <td><span @click="upload(item.hqmsuploadid)">{{item.status === 0? '上传':'重新上传'}}</span></td>
        <td><span @click="quarterUpload(item.year,item.quarter)">季度上传</span></td>
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
    <loading v-if="loading" :text="tip"></loading>
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
        tip: '正在加载...',

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
        this.loading = true
        this.tip = '正在上传...'
        let url = `${api.baseUrl}${api.mtUpload}`
        $.post(url, {
          mtuploadid: id
        }).then((res) => {
          this.loading = false
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
          this.loading = false
          this.$message({
            message: err,
            center: true,
            type: 'error'
          })
        })
      },
      quarterUpload(year, quarter) {
        this.loading = true
        this.tip = '正在上传...'
        let url = `${api.baseUrl}${api.mtQuarterUpload}`
        $.post(url, {
          year, quarter
        }).then((res) => {
          this.loading = false
          console.log(res)
          this.$message({
            message: res.message,
            type: 'success',
            center: true
          })
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }).catch((err) => {
          this.loading = false
          this.$message({
            message: err,
            type: 'error',
            center: true
          })
        })
      },
      batchUpload() {
        this.loading = true
        this.tip = '正在上传...'
        let url = `${api.baseUrl}${api.mtBatchUpload}`
        $.post(url).then((res) => {
          this.loading = false
          console.log(res)
          this.$message({
            message: res.message,
            type: 'success',
            center: true
          })
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }).catch((err) => {
          this.loading = false
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
