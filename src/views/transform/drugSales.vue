<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="search">
      <div>
        <span>YPID:</span>
        <el-input v-model="ypid" size="mini"></el-input>
      </div>
      <div>
        <span>生产企业:</span>
        <el-input v-model="factoryName" size="mini"></el-input>
      </div>
      <div>
        <span>品种名:</span>
        <el-input v-model="cadnType" size="mini"></el-input>
      </div>
      <div>
        <span>院内编码:</span>
        <el-input v-model="drugCode" size="mini"></el-input>
      </div>
      <div>
        <span>通用名:</span>
        <el-input v-model="drugName" size="mini"></el-input>
      </div>
      <el-button type="success" plain size="mini" @click="search">搜索</el-button>
      <el-button type="primary" plain size="mini" @click="reset">重置</el-button>
      <el-button :disabled="!searched" type="warning" plain size="mini" @click="back">返回</el-button>
    </div>
    <table class="table">
      <tr>
        <td>序号</td>
        <td>YPID</td>
        <td>省级药品集中采购平台药品编码</td>
        <td>院内药品编码</td>
        <td>批准文号</td>
        <td>品种通用名称（中文）</td>
        <td>药品生产企业名称</td>
        <td>品种通用名称（英文）</td>
        <td>产品通用名称</td>
        <td>商品名</td>
        <td>规格</td>
        <td>剂型</td>
        <td>最小制剂单位</td>
        <td>制剂规格</td>
        <td>转换系数</td>
        <td>最小包装单位</td>
        <td>最小包装销售价格</td>
        <td>制剂单位销售价格</td>
        <td>最小销售包装销售数量</td>
        <td>制剂单位销售数量</td>
        <td>数据日期</td>
        <td>转换状态</td>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.ypid}}</td>
        <td>{{item.speccode}}</td>
        <td>{{item.drugcode}}</td>
        <td>{{item.approvalnum}}</td>
        <td>{{item.cadntype}}</td>
        <td>{{item.factoryname}}</td>
        <td></td>
        <td>{{item.drugname}}</td>
        <td></td>
        <td>{{item.drugspec}}</td>
        <td>{{item.drugform}}</td>
        <td>{{item.doseunits}}</td>
        <td>{{item.drugspec}}</td>
        <td>{{item.drugfacotr}}</td>
        <td>{{item.drugunit}}</td>
        <td>{{item.drugSell.sellprice}}</td>
        <td>{{item.drugSell.onesellprice}}</td>
        <td>{{item.drugSell.sellnum}}</td>
        <td>{{item.drugSell.onesellnum}}</td>
        <td>{{item.drugSell.writedate}}</td>
        <td></td>
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
    name: "transformDrugSales",
    components: {
      breadcrumb, loading
    },
    data() {
      return {
        breadcrumbData: ['转换数据', '药品监测表', '药品销售监测表'],
        currentPage: 1,
        pageSize: 40,
        tableData: [],
        total: 0,
        loading: false,
        searched: false,
        ypid: '',
        factoryName: '',
        cadnType: '',
        drugCode: '',
        drugName: ''
      }
    },
    created() {
      this.getTableData(this.currentPage)
    },
    methods: {
      getTableData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getConversionOfDataDrugSales + `${page}/${this.pageSize}`).then((res) => {
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
        this.factoryName = ''
        this.cadnType = ''
        this.drugCode = ''
        this.drugName = ''
      },
      search() {
        if (!this.ypid.trim() && !this.factoryName.trim() && !this.cadnType.trim() && !this.drugCode.trim() && !this.cadnType.trim()) {
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
        $.get(api.baseUrl + api.getConversionOfDataDrugSales + `${page}/${this.pageSize}?ypid=${this.ypid}&factoryName=${this.factoryName}&cadnType=${this.cadnType}&drugCode=${this.drugCode}&drugName=${this.drugName}`).then((res) => {
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

<style lang="scss" scoped>
  .el-input {
    width: 150px;
  }
</style>
