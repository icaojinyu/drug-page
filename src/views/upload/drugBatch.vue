<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="search">
      <div>
        <span>批次:</span>
        <el-input v-model="batch" size="mini"></el-input>
      </div>
      <el-button type="success" plain size="mini" @click="search">搜索</el-button>
      <el-button type="primary" plain size="mini" @click="reset">重置</el-button>
      <el-button :disabled="!searched" type="warning" plain size="mini" @click="back">返回</el-button>
      <el-input class="input-l" placeholder="请输入初始时间,如:2018-01-01" v-model.trim="beginTime" size="mini"></el-input>
      <el-input class="input-l" placeholder="请输入截止时间,如:2018-02-01" v-model.trim="endTime" size="mini"></el-input>
      <el-button @click="batchUpload" type="danger" size="mini" plain>批量上传</el-button>
    </div>
    <table class="table">
      <tr>
        <td>序号</td>
        <td>批次</td>
        <td>状态</td>
        <td>上传结果</td>
        <td>操作</td>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{getTime(item.datadate)}}</td>
        <td>{{getStatus(item.status)}}</td>
        <td>{{item.returninfo}}</td>
        <td>
          <el-button type="text" @click="reUpload(item)">{{item.status>0?'重新上传':'上传'}}</el-button>
        </td>
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
      :total="total">
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
    components: {
      breadcrumb, loading
    },
    data() {
      return {
        breadcrumbData: ['上传数据', '药品监测表', '批次表'],
        currentPage: 1,
        pageSize: 40,
        tableData: [],
        total: 0,
        loading: false,
        searched: false,
        batch: '',
        beginTime: '',
        endTime: '',

        tip: '正在加载...'
      }
    },
    created() {
      this.getTableData(this.currentPage)
    },
    methods: {
      getTableData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getUploadDataDatch + `${page}/${this.pageSize}`).then((res) => {
          console.log(res)
          this.loading = false
          this.tableData = res.data
          this.total = res.totalNum
        })
      },
      handleCurrentChange(page) {
        this.currentPage = page
        this.searched ? this.getSearchData(page) : this.getTableData(page)
        window.scrollTo(0, 0)
      },
      reset() {
        this.batch = ''
      },
      search() {
        if (!this.batch.trim()) {
          this.$message({
            message: '请输入搜索内容',
            type: 'warning',
            center: true
          })
          return
        }
        this.loading = true
        this.searched = true
        this.currentPage = 1
        this.getSearchData(1)
      },
      getSearchData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getUploadDataDatch + `${page}/${this.pageSize}?batch=${this.batch}`).then((res) => {
          console.log(res)
          this.loading = false
          this.tableData = res.data
          this.total = res.totalNum
        })
      },
      back() {
        window.location.reload()
      },

      // 重新上传
      reUpload(item) {
        this.loading = true
        this.tip = '正在上传...'
        $.post(api.baseUrl + api.uploadDrugPrice + `?no=one&beginTime=${this.getTime(item.datadate)}`).then((res) => {
          console.log(res)
          this.loading = false
          this.$message({
            message: '上传成功',
            type: 'success',
            center: true
          })
          item.status = 1
        }).catch((err) => {
          this.loading = false
          this.$message({
            message: '服务器繁忙，请稍后再试',
            type: 'error',
            center: true
          })
        })
      },
      // 批量上传
      batchUpload() {
        if (!this.beginTime || !this.endTime) {
          this.$message({
            message: '请填入完整信息',
            type: 'warning',
            center: true
          })
          return
        }

        this.loading = true
        this.tip = '正在上传...'
        $.post(api.baseUrl + api.uploadDrugPriceBetween, {
          beginTime: this.beginTime,
          endTime: this.endTime
        }).then((res) => {
          console.log(res)
          this.loading = false
          this.$message({
            message: res.message,
            type: 'success',
            center: true
          })
          setTimeout(() => {
            window.location.reload(true)
          }, 2000)
        }).catch((err) => {
          this.loading = false
          this.$message({
            message: '服务器繁忙，请稍后再试',
            type: 'error',
            center: true
          })
        })
      },
      getTime(timeStamp) {
        const d = new Date(timeStamp)
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      },
      getStatus(status) {
        switch (status) {
          case 0:
            return '未上传'
          case 1:
            return '上传成功'
          case 2:
            return '上传失败'
          case 3:
            return '数据待更新'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .batch {
    margin-top: 10px;
  }

  .input-l {
    width: 200px;
    margin-left: 20px;
  }

  .table {
    td {
      width: 20%;
    }
  }
</style>
