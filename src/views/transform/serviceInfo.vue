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
      <!--<el-button type="danger" plain size="mini" @click="download">下载</el-button>-->
    </div>
    <table class="table">
      <tr>
        <td>序号</td>
        <td>医院医疗服务价格项目制定依据</td>
        <td>医院医疗服务价格项目制定依据名称</td>
        <td>依据中的项目编码</td>
        <td>依据中的项目名称</td>
        <td>院内医疗服务价格项目编码</td>
        <td>院内医疗服务价格项目名称</td>
        <td>是否院内或地方新增项目</td>
        <td>计价单位</td>
      </tr>
      <tr v-for="(item,index) in tableData" :key="index">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.baver}}</td>
        <td>{{item.bavername}}</td>
        <td>{{item.basecode}}</td>
        <td>{{item.basename}}</td>
        <td>{{item.servicecode}}</td>
        <td>{{item.servicename}}</td>
        <td>{{item.isbase === '1'? '是':'否'}}</td>
        <td>{{item.unit}}</td>
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
    name: "serviceInfo",
    components: {
      breadcrumb,
      loading
    },
    data() {
      return {
        breadcrumbData: ['转换数据', '医疗服务监测表', '完整信息表'],
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
        $.get(api.baseUrl + api.getServiceinfoList + `${page}/${this.pageSize}`).then((res) => {
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
      download() {
        $.get(api.baseUrl + api.exportExcelServiceInfos).then((res) => {
          console.log(res)
        })
      },
      getSearchData(page) {
        $.get(api.baseUrl + api.getServiceinfoList + `${page}/${this.pageSize}?baseCode=${this.baseCode}&baseName=${this.baseName}&serviceCode=${this.serviceCode}`).then((res) => {
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
