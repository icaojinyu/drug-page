<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="search">
      <div>
        <span>院内耗材编码:</span>
        <el-input v-model="YNHCBS" size="mini"></el-input>
      </div>
      <div>
        <span>院内耗材名称:</span>
        <el-input v-model="MATERIALNAME" size="mini"></el-input>
      </div>
      <el-button type="success" plain size="mini" @click="search">搜索</el-button>
      <el-button type="primary" plain size="mini" @click="reset">重置</el-button>
      <el-button :disabled="!searched" type="warning" plain size="mini" @click="back">返回</el-button>
    </div>
    <table class="table">
      <tr>
        <td>序号</td>
        <td>耗材字典ID</td>
        <td>院内耗材编码</td>
        <td>商品名</td>
        <td>企业名称</td>
        <td>注册证号/备案号/生产许可证号</td>
        <td>型号</td>
        <td>规格</td>
        <td>最小计量单位</td>
        <td>最小销售单位</td>
        <td>最小销售包装价格</td>
        <td>最小计量单位销售价格</td>
        <td>最小销售包装销售数量</td>
        <td>转换系数</td>
        <td>转换状态</td>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.hcDict.hcdictid}}</td>
        <td>{{item.hcDict.ynhcbs}}</td>
        <td>{{item.hcDict.materialname}}</td>
        <td>{{item.hcDict.factoryname}}</td>
        <td>{{item.exportid}}</td>
        <td>{{item.producttype}}</td>
        <td></td>
        <td>{{item.hcDict.productunit}}</td>
        <td>{{item.hcDict.productunit}}</td>
        <td>{{item.hcDict.productunit}}</td>
        <td>{{item.sellprice}}</td>
        <td>{{item.sellnum}}</td>
        <td>1</td>
        <td>{{item.transformstatus === 1 ? '转换成功':'未转换'}}</td>
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
    name: "hcSales",
    components: {
      breadcrumb, loading
    },
    data() {
      return {
        breadcrumbData: ['采集数据', '耗材监测表', '高值医用耗材销售监测表'],
        currentPage: 1,
        pageSize: 40,
        tableData: [],
        total: 0,
        loading: false,

        searched: false,
        YNHCBS: '',
        MATERIALNAME: ''
      }
    },
    created() {
      this.getTableData(this.currentPage)
    },
    methods: {
      getTableData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getvwhcexport + `${page}/${this.pageSize}`).then((res) => {
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
        this.YNHCBS = ''
        this.MATERIALNAME = ''
      },
      search() {
        if (!this.YNHCBS.trim() && !this.MATERIALNAME.trim()) {
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
        $.get(api.baseUrl + api.getvwhcexport + `${page}/${this.pageSize}?YNHCBS=${this.YNHCBS}&MATERIALNAME=${this.MATERIALNAME}`).then((res) => {
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
