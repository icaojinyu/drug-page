<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="search">
      <div>
        <span>标准项目编码:</span>
        <el-input v-model="serviceCode" size="mini"></el-input>
      </div>
      <div>
        <span>标准项目名称:</span>
        <el-input v-model="projectName" size="mini"></el-input>
      </div>
      <div>
        <span>项目内涵:</span>
        <el-input v-model="projectContent" size="mini"></el-input>
      </div>
      <el-button type="success" plain size="mini" @click="search">搜索</el-button>
      <el-button type="primary" plain size="mini" @click="reset">重置</el-button>
      <el-button :disabled="!searched" type="warning" plain size="mini" @click="back">返回</el-button>
    </div>
    <table class="table">
      <tr>
        <td>序号</td>
        <td>项目编码</td>
        <td>项目名称</td>
        <td>项目内涵</td>
        <td>其他内容</td>
        <td>计价单位</td>
        <td>描述</td>
        <td>专业</td>
        <td>统计</td>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.servicecode}}</td>
        <td>{{item.projectname}}</td>
        <td>{{item.projectcontent}}</td>
        <td>{{item.othercontent}}</td>
        <td>{{item.priceunit}}</td>
        <td>{{item.servicedesc}}</td>
        <td>{{item.major}}</td>
        <td>{{item.statistics}}</td>
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
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from '../../api/index'
  import breadcrumb from '../../components/breadcrumb'
  import loading from '../../components/loading'

  export default {
    name: "service2012",
    components: {
      breadcrumb, loading
    },
    data() {
      return {
        breadcrumbData: ['标准数据', '服务监测表', '2012版'],
        currentPage: 1,
        pageSize: 40,
        tableData: [],
        total: 0,
        loading: false,
        searched: false,
        serviceCode: '',
        projectName: '',
        projectContent: ''
      }
    },
    created() {
      this.getTableData(this.currentPage)
    },
    methods: {
      getTableData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getStandradServices + `/2012/${page}/${this.pageSize}`).then((res) => {
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
        this.serviceCode = ''
        this.projectName = ''
        this.projectContent = ''
      },
      search() {
        if (!this.serviceCode.trim() && !this.projectName.trim() && !this.projectContent) {
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
        $.get(api.baseUrl + api.getStandradServices + `/2012/${page}/${this.pageSize}?servicecode=${this.serviceCode}&projectname=${this.projectName}&projectcontent=${this.projectContent}`).then((res) => {
          console.log(res)
          this.loading = false
          this.tableData = res.data
          this.total = res.totalNum
        })
      },
      back() {
        window.location.reload()
      }
    }
  }
</script>
