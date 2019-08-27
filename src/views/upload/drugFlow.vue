<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="search">
      <!--<div class="code">-->
        <!--<span>YPID:</span>-->
        <!--<el-input v-model="ypid" size="mini"></el-input>-->
      <!--</div>-->
      <div class="company">
        <span>批次:</span>
        <el-input v-model="batch" size="mini"></el-input>
      </div>
      <el-button type="success" plain size="mini" @click="search">搜索</el-button>
      <el-button type="primary" plain size="mini" @click="reset">重置</el-button>
      <el-button :disabled="!searched" type="warning" plain size="mini" @click="back">返回</el-button>
    </div>
    <table class="table">
      <tr>
        <td>序号</td>
        <td>批次</td>
        <td>YPID</td>
        <td>省级药品集中采购平台药品编码</td>
        <td>药品生产企业名称</td>
        <td>院内药品编码</td>
        <td>批准文号</td>
        <td>品种通用名称（中文）</td>
        <td>产品通用名称</td>
        <td>商品名</td>
        <td>是否医院制剂</td>
        <td>剂型</td>
        <td>剂型代码</td>
        <td>制剂规格</td>
        <td>制剂规格代码</td>
        <td>转换系数</td>
        <td>制剂单位</td>
        <td>最小销售包装单位</td>
        <td>最小销售包装进货价格</td>
        <td>制剂单位进货价格</td>
        <td>最小销售包装进货数量</td>
        <td>制剂单位进货数量</td>
        <td>最小销售包装销售价格</td>
        <td>制剂单位销售价格</td>
        <td>最小销售包装销售数量</td>
        <td>制剂单位销售数量</td>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.batch}}</td>
        <td>{{item.ypid}}</td>
        <td></td>
        <td>{{item.factoryname}}</td>
        <td>{{item.drugcode}}</td>
        <td>{{item.approvalnum}}</td>
        <td>{{item.cadntype}}</td>
        <td>{{item.drugname}}</td>
        <td>{{item.drugname}}</td>
        <td>{{item.ishosmake}}</td>
        <td>{{item.drugform}}</td>
        <td></td>
        <td>{{item.drugspec}}</td>
        <td>{{item.speccode}}</td>
        <td>{{item.drugfacotr}}</td>
        <td>{{item.doseunits}}</td>
        <td>{{item.smakeunit}}</td>
        <td>{{item.buyprice}}</td>
        <td>{{item.onebuyprice}}</td>
        <td>{{item.buynum}}</td>
        <td>{{item.onebuynum}}</td>
        <td>{{item.sellprice}}</td>
        <td>{{item.onesellprice}}</td>
        <td>{{item.sellnum}}</td>
        <td>{{item.onesellnum}}</td>
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
    components: {
      breadcrumb, loading
    },
    data() {
      return {
        breadcrumbData: ['上传数据', '药品监测表', '流水表'],
        currentPage: 1,
        pageSize: 40,
        tableData: [],
        total: 0,
        loading: false,
        searched: false,
        // ypid: '',
        batch: ''
      }
    },
    created() {
      this.getTableData(this.currentPage)
    },
    methods: {
      getTableData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getUploadDataFlow + `${page}/${this.pageSize}`).then((res) => {
          console.log(res)
          this.loading = false

          let arr = []
          for (let key in res.data) {
            res.data[key][0].batch = key
            arr.push(res.data[key][0])
          }
          console.log(arr)
          this.tableData = arr
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
        $.get(api.baseUrl + api.getUploadDataFlow + `${page}/${this.pageSize}?batch=${this.batch}`).then((res) => {
          console.log(res)
          this.loading = false

          let arr = []
          for (let key in res.data) {
            res.data[key][0].batch = key
            arr.push(res.data[key][0])
          }
          console.log(arr)
          this.tableData = arr
          this.total = res.totalNum
        })
      },
      back() {
        window.location.reload()
      }
    }
  }
</script>
