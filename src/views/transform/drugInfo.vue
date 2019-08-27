<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="search">
      <div>
        <span>YPID:</span>
        <el-input v-model="ypid" size="mini"></el-input>
      </div>
      <div>
        <span>院内编码:</span>
        <el-input v-model="drugCode" size="mini"></el-input>
      </div>
      <div>
        <span>生产企业:</span>
        <el-input v-model="factoryName" size="mini"></el-input>
      </div>
      <div>
        <span>品种名:</span>
        <el-input v-model="cadnType" size="mini"></el-input>
      </div>
      <el-button type="success" plain size="mini" @click="search">搜索</el-button>
      <el-button type="primary" plain size="mini" @click="reset">重置</el-button>
      <el-button :disabled="!searched" type="warning" plain size="mini" @click="back">返回</el-button>
      <!--<el-button type="danger" plain size="mini" @click="download">下载</el-button>-->
    </div>
    <table class="table">
      <tr>
        <td>序号</td>
        <td>YPID</td>
        <td>院内药品编码</td>
        <td>省级药品集中采购平台药品编码</td>
        <td>品种通用名称</td>
        <td>产品通用名称</td>
        <td>商品名</td>
        <td>药品大类</td>
        <td>药理功效/分类</td>
        <td>批准文号</td>
        <td>剂型</td>
        <td>制剂规格</td>
        <td>最小制剂单位</td>
        <td>生产企业名称</td>
        <td>转换系数</td>
        <td>最小单位规格</td>
        <td>最小销售包装单位</td>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.ypid}}</td>
        <td>{{item.drugcode}}</td>
        <td></td>
        <td>{{item.cadntype}}</td>
        <td>{{item.drugname}}</td>
        <td>{{item.drugname}}</td>
        <td>{{item.type}}</td>
        <td>{{item.effecttype}}</td>
        <td>{{item.approvalnum}}</td>
        <td>{{item.drugform}}</td>
        <td>{{item.drugspec}}</td>
        <td>{{item.smakeunit}}</td>
        <td>{{item.factoryname}}</td>
        <td>{{item.drugfacotr}}</td>
        <td>{{item.drugunit}}</td>
        <!--<td>{{item.factoryname}}</td>-->
        <td>{{item.doseunits}}</td>
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
    name: "transformDrugInfo",
    components: {
      breadcrumb, loading
    },
    data() {
      return {
        breadcrumbData: ['转换数据', '药品监测表', '完整信息表'],
        currentPage: 1,
        pageSize: 40,
        tableData: [],
        total: 0,
        loading: false,
        searched: false,
        ypid: '',
        drugCode: '',
        factoryName: '',
        cadnType: ''
      }
    },
    created() {
      this.getTableData(this.currentPage)
    },
    methods: {
      getTableData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getConversionOfData + `${page}/${this.pageSize}`).then((res) => {
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
        this.ypid = ''
        this.drugCode = ''
        this.factoryName = ''
        this.cadnType = ''
      },
      search() {
        if (!this.ypid.trim() && !this.drugCode.trim() && !this.factoryName.trim() && !this.cadnType.trim()) {
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
        $.get(api.baseUrl + api.getConversionOfData + `${page}/${this.pageSize}?ypid=${this.ypid}&drugCode=${this.drugCode}&factoryName=${this.factoryName}&cadnType=${this.cadnType}`).then((res) => {
          console.log(res)
          this.loading = false
          this.tableData = res.data
          this.total = res.totalNum
        })
      },
      back() {
        window.location.reload()
      },
      download() {
        $.get(api.baseUrl + api.exportExcel).then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>
