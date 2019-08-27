<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="search">
      <div>
        <span>基础编码:</span>
        <el-input v-model="baseCode" size="mini"></el-input>
      </div>
      <div>
        <span>基础项目名称:</span>
        <el-input v-model="baseName" size="mini"></el-input>
      </div>
      <div>
        <span>院内编码:</span>
        <el-input v-model="serviceCode" size="mini"></el-input>
      </div>
      <el-button type="success" plain size="mini" @click="search">搜索</el-button>
      <el-button type="primary" plain size="mini" @click="reset">重置</el-button>
      <el-button :disabled="!searched" type="warning" plain size="mini" @click="back">返回</el-button>
    </div>
    <table class="table">
      <tr>
        <td>序号</td>
        <td>日期</td>
        <td>医院医疗服务价格项目制定依据</td>
        <td>医院医疗服务价格项目制定依据名称</td>
        <td>依据中的项目编码</td>
        <td>依据中的项目名称</td>
        <td>院内医疗服务价格项目编码</td>
        <td>院内医疗服务价格项目名称</td>
        <td>是否院内或地方新增项目</td>
        <td>计价单位</td>
        <td>服务价格</td>
        <td>服务数量</td>
        <td>计价说明</td>
        <td>顺序号</td>
      </tr>
      <tr v-for="(item,index) in tableData" :key="index">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.datadate}}</td>
        <td>{{item.serviceInfo.baver}}</td>
        <td>{{item.serviceInfo.bavername}}</td>
        <td>{{item.serviceInfo.basecode}}</td>
        <td>{{item.serviceInfo.basename}}</td>
        <td>{{item.serviceInfo.servicecode}}</td>
        <td>{{item.serviceInfo.servicename}}</td>
        <td>{{item.serviceInfo.isbase === '1' ?'是':'否'}}</td>
        <td>{{item.serviceInfo.unit}}</td>
        <td>{{item.sellprice}}</td>
        <td>{{item.sellnum}}</td>
        <td></td>
        <td>{{item.seqnumber}}</td>
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
  import breadcrumb from '../../components/breadcrumb'
  import loading from '../../components/loading'
  import api from '../../api'

  export default {
    components: {
      breadcrumb,
      loading
    },
    data() {
      return {
        breadcrumbData: ['上传数据', '医疗服务监测表', '医疗服务流水监测表'],
        tableData: [],
        currentPage: 1,
        pageSize: 40,
        total: 0,
        loading: false,
        searched: false,
        baseCode: '',
        baseName: '',
        serviceCode: ''
      }
    },
    created() {
      this.getTableData(this.currentPage)
    },
    methods: {
      getTableData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getServiceinfoUpload + `${page}/${this.pageSize}`).then((res) => {
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
        this.baseCode = ''
        this.baseName = ''
        this.serviceCode = ''
      },
      search() {
        if (!this.baseCode.trim() && !this.baseName.trim() && !this.serviceCode.trim()) {
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
        $.get(api.baseUrl + api.getServiceinfoUpload + `${page}/${this.pageSize}?baseCode=${this.baseCode}&baseName=${this.baseName}&serviceCode=${this.serviceCode}`).then((res) => {
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
