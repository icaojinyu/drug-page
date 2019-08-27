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
    <div class="compare" :class="{fixed:tableFix}" v-if="showCompare">
      <div class="ctrl">
        <el-button type="danger" plain size="mini" @click="back">关闭比对页面</el-button>
      </div>
      <table class="table compare-table">
        <tr>
          <td>院内药品编码</td>
          <td>产品名</td>
          <td>生产企业名称</td>
          <td>批准文号</td>
          <td>剂型</td>
          <td>转换系数</td>
          <td>制剂规格</td>
          <td>剂量单位</td>
        </tr>
        <tr>
          <td>{{compareItem.drugcode}}</td>
          <td>{{compareItem.drugname}}</td>
          <td>{{compareItem.factoryname}}</td>
          <td>{{compareItem.approvalnum}}</td>
          <td>{{compareItem.drugform}}</td>
          <td>{{compareItem.drugfacotr}}</td>
          <td>{{compareItem.drugspec}}</td>
          <td>{{compareItem.drugunit}}</td>
        </tr>
      </table>
    </div>
    <table class="table" v-if="showMainTable">
      <tr>
        <td>序号</td>
        <td>字典ID</td>
        <td>院内药品编码</td>
        <td>产品通用名称</td>
        <td>生产企业名称</td>
        <td>批准文号</td>
        <td>剂型</td>
        <td>转换系数</td>
        <td>制剂规格</td>
        <td>剂量单位</td>
        <td>比对方式</td>
        <td>比对状态</td>
        <td colspan="2" width="140">操作</td>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.tempid}}</td>
        <td>{{item.drugcode}}</td>
        <td>{{item.drugname}}</td>
        <td>{{item.factoryname}}</td>
        <td>{{item.approvalnum}}</td>
        <td>{{item.drugform}}</td>
        <td>{{item.drugfacotr}}</td>
        <td>{{item.drugspec}}</td>
        <td>{{item.drugunit}}</td>
        <td>{{item.compareway === 2? '手工比对':item.compareway === '3'? '临时编码':''}}</td>
        <td>{{item.comparestatus === 1 ? '比对成功':'未比对'}}</td>
        <td width="70">
          <span @click="manualCompare(item)">{{item.comparestatus === 1 ? '重新比对':'手工比对'}}</span>
        </td>
        <td width="70">
          <span @click="cancelCompare(item)">{{item.comparestatus === 1 ? '取消比对':''}}</span>
        </td>
      </tr>
    </table>
    <template>
      <table class="table compare-table-content" v-if="showCompareTable&&compareTableData.length">
        <tr>
          <td>序号</td>
          <td>YPID</td>
          <td>产品名（中文）</td>
          <td>产品名（英文）</td>
          <td>生产企业名称</td>
          <td>大类</td>
          <td>药理/功效</td>
          <td>产品名称</td>
          <td>规格</td>
          <td>剂型</td>
          <td>转换系数</td>
          <td>最小包装单位</td>
          <td>最小制剂单位</td>
          <td>批准文号</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item,index) in compareTableData">
          <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
          <td>{{item.ypid}}</td>
          <td>{{item.cadntype}}</td>
          <td>{{item.cadntypeen}}</td>
          <td>{{item.factoryname}}</td>
          <td>{{item.type}}</td>
          <td>{{item.effecttype}}</td>
          <td>{{item.drugname}}</td>
          <td>{{item.drugspec}}</td>
          <td>{{item.drugform}}</td>
          <td>{{item.drugfacotr}}</td>
          <td>{{item.drugunit}}</td>
          <td>{{item.smakeunit}}</td>
          <td>{{item.approvalnum}}</td>
          <td>
            <span @click="associate(item)">关联</span>
          </td>
        </tr>
      </table>
      <p class="no-data-tip" v-if="showCompareTable&&!compareTableData.length">暂无数据</p>
    </template>
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
    name: "index",
    components: {
      breadcrumb, loading
    },
    data() {
      return {
        breadcrumbData: ['采集数据', '药品监测表', '字典信息表'],
        currentPage: 1,
        pageSize: 40,
        tableData: [],
        total: 0,
        loading: false,
        searched: false,
        drugCode: '',
        factoryName: '',
        drugName: '',

        compared: false,
        compareItem: {},
        showCompare: false,
        showMainTable: true,
        showCompareTable: false,
        compareTableData: [],

        tableFix:false
      }
    },
    created() {
      this.getTableData(this.currentPage)
    },
    updated(){
      if(this.showCompareTable && $('.compare')){
        let t = $('.compare').offset().top
        $(window).scroll(()=>{
          // console.log(1)
          if ($(window).scrollTop() >= t) {
            // console.log(2)
            this.tableFix = true
          } else {
            this.tableFix = false
          }
        })
      }
    },
    methods: {
      getTableData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getHomePageInfo + `${page}/${this.pageSize}`).then((res) => {
          console.log(res)
          this.loading = false
          this.tableData = res.data
          this.total = res.totalNum
        })
      },
      handleCurrentChange(page) {
        this.currentPage = page
        this.searched ? this.getSearchData(page) : this.compared ? this.getCompareData(page) : this.getTableData(page)
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
        $.get(api.baseUrl + api.getHomePageInfo + `${page}/${this.pageSize}?drugCode=${this.drugCode}&factoryName=${this.factoryName}&drugName=${this.drugName}`).then((res) => {
          // console.log(res)
          this.loading = false
          this.tableData = res.data
          this.total = res.totalNum
        })
      },
      back() {
        window.location.reload()
      },

      manualCompare(item) {
        this.showCompare = true
        this.showMainTable = false
        this.showCompareTable = true
        this.compareItem = item
        this.loading = true
        this.currentPage = 1
        this.getCompareData(1)
      },
      // 根据生产厂家名称获取比对数据
      getCompareData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getNationalBasicData + `${page}/${this.pageSize}?factoryName=${this.compareItem.factoryname}`).then((res) => {
          console.log(res)
          this.loading = false
          this.compared = true
          this.compareTableData = res.data
          this.total = res.totalNum
        })
      },
      // 关联
      associate(item) {
        $.post(api.baseUrl + api.manualCompareDrug + `?tempid=${this.compareItem.tempid}&ypid=${item.ypid}`).then((res) => {
          console.log(res)
          if (res.comstatus === '1') {
            this.$message({
              message: res.info,
              type: 'success',
              center: true
            })
            setTimeout(this.back, 2000)
          } else if (res.comstatus === '0') {
            this.$message({
              message: res.info,
              type: 'error',
              center: true
            })
          }
        })
      },
      // 取消比对
      cancelCompare(item) {
        $.post(api.baseUrl + api.manualDelCompareDrug + `?tempid=${item.tempid}&druginfoid=${item.druginfoid}`).then((res) => {
          console.log(res)
          this.$message({
            message: res.info,
            type: 'success',
            center: true
          })
          setTimeout(this.back, 2000)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .compare{
    &.fixed{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100%;
      .ctrl{
        margin-top: 0;
      }
    }
  }
</style>
