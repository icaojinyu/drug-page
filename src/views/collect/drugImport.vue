<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="search">
      <div class="code">
        <span>院内编码:</span>
        <el-input v-model="drugCode" size="mini"></el-input>
      </div>
      <div class="company">
        <span>生产企业:</span>
        <el-input v-model="factoryName" size="mini"></el-input>
      </div>
      <div class="universal-name">
        <span>通用名:</span>
        <el-input v-model="drugName" size="mini"></el-input>
      </div>
      <el-button type="success" plain size="mini" @click="search">搜索</el-button>
      <el-button type="primary" plain size="mini" @click="reset">重置</el-button>
      <el-button :disabled="!searched" type="warning" plain size="mini" @click="back">返回</el-button>
    </div>
    <table class="table" v-if="tableData.length">
      <tr>
        <td>序号</td>
        <td>院内药品编码</td>
        <td>产品通用名称</td>
        <td>生产企业名称</td>
        <td>制剂规格</td>
        <td>最小制剂单位</td>
        <td>最小销售包装</td>
        <td>最小销售包装进货价格</td>
        <td>最小单位剂量</td>
        <td>项目序号</td>
        <td>入库单号</td>
        <td>入库日期</td>
        <td>转换状态</td>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.drugcode}}</td>
        <td>{{item.tempDrugDict.drugname}}</td>
        <td>{{item.factoryname}}</td>
        <td>{{item.drugspec}}</td>
        <td>{{item.smakeunit}}</td>
        <td>{{item.drugunit}}</td>
        <td>{{item.buyprice}}</td>
        <td>{{item.tempDrugDict.doseperunit}}</td>
        <td>{{item.itemno}}</td>
        <td>{{item.documentno}}</td>
        <td>{{item.buydate}}</td>
        <td>{{item.transformstatus === 0? '未转换':'转换成功'}}</td>
      </tr>
    </table>
    <el-pagination
      class="pagination"
      background
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :current-page="currentPage"
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
    name: "drugImport",
    components: {
      breadcrumb, loading
    }, data() {
      return {
        breadcrumbData: ['采集数据', '药品监测表', '药品进货监测表'],
        pageSize: 40,
        currentPage: 1,
        tableData: [],
        total: 0,
        loading: false,
        searched: false,
        drugCode: '',
        factoryName: '',
        drugName: ''
      }
    },
    created() {
      this.getTableData(1)
    },
    methods: {
      getTableData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getDrugDeliveryInfo + `${page}/${this.pageSize}`).then((res) => {
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
        this.drugCode = ''
        this.factoryName = ''
        this.drugName = ''
      },
      search() {
        if (!this.drugCode.trim() && !this.drugName.trim() && !this.factoryName.trim()) {
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
        $.get(api.baseUrl + api.getDrugDeliveryInfo + `${page}/${this.pageSize}?drugCode=${this.drugCode}&factoryName=${this.factoryName}&drugName=${this.drugName}`).then((res) => {
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

<style lang="scss">

</style>
