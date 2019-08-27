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
    <div class="compare" :class="{fixed:tableFix}" v-if="showCompare">
      <div class="ctrl">
        <el-button type="danger" plain size="mini" @click="back">关闭比对页面</el-button>
      </div>
      <table class="table compare-table">
        <tr>
          <td>字典ID</td>
          <td>院内耗材编码</td>
          <td>院内耗材名称</td>
          <td>商品名</td>
          <td>注册证号/备案号/生产许可证号</td>
          <td>型号</td>
          <td>规格</td>
          <td>最小剂量单位</td>
          <td>最小销售包装单位</td>
          <td>转换系数</td>
          <td>生产企业</td>
        </tr>
        <tr>
          <td>{{compareItem.hcdictid}}</td>
          <td>{{compareItem.ynhcbs}}</td>
          <td>{{compareItem.materialname}}</td>
          <td>{{compareItem.regcardname}}</td>
          <td>{{compareItem.materialid}}</td>
          <td></td>
          <td></td>
          <td>{{compareItem.productminpunit}}</td>
          <td>{{compareItem.productunit}}</td>
          <td>1</td>
          <td>{{compareItem.factoryname}}</td>
        </tr>
      </table>
    </div>
    <table class="table" v-if="showMainTable">
      <tr>
        <td>序号</td>
        <td>字典ID</td>
        <td>院内耗材编码</td>
        <td>院内耗材名称</td>
        <td>商品名</td>
        <td>注册证号/备案号/生产许可证号</td>
        <td>型号</td>
        <td>规格</td>
        <td>最小计量单位</td>
        <td>最小销售包装单位</td>
        <td>转换系数</td>
        <td>生产企业</td>
        <td>比对状态</td>
        <td colspan="2" width="140">操作</td>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.hcdictid}}</td>
        <td>{{item.ynhcbs}}</td>
        <td>{{item.materialname}}</td>
        <td>{{item.regcardname}}</td>
        <td>{{item.materialid}}</td>
        <td></td>
        <td></td>
        <td>{{item.productminpunit}}</td>
        <td>{{item.productunit}}</td>
        <td>1</td>
        <td>{{item.factoryname}}</td>
        <td>{{item.comparestatus === 1 ? '比对成功':'未比对'}}</td>
        <td width="70">
          <span @click="manualCompare(item)">{{item.comparestatus === 1 ? '重新比对':'手工比对'}}</span>
        </td>
      </tr>
    </table>
    <template>
      <table class="table" v-if="showCompareTable&&compareTableData.length">
        <tr>
          <td>序号</td>
          <td>详细规格</td>
          <td>生产企业名称</td>
          <td>最小包装单位</td>
          <td>转换系数</td>
          <td>规格</td>
          <td>型号</td>
          <td>批准文号</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item,index) in compareTableData">
          <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
          <td>{{item.detspec}}</td>
          <td>{{item.entname}}</td>
          <td>{{item.prominunit}}</td>
          <td>{{item.proconra}}</td>
          <td>{{item.detspec}}</td>
          <td>{{item.proname}}</td>
          <td>{{item.regcerno}}</td>
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
    name: "hcDirectory",
    components: {
      breadcrumb, loading
    },
    data() {
      return {
        breadcrumbData: ['采集数据', '耗材监测表', '字典信息表'],
        currentPage: 1,
        pageSize: 40,
        tableData: [],
        total: 0,
        loading: false,

        searched: false,
        YNHCBS: '',
        MATERIALNAME: '',

        compared: false,
        compareItem: {},
        showCompare: false,
        showMainTable: true,
        showCompareTable: false,
        compareTableData: [],

        tableFix: false
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
        $.get(api.baseUrl + api.gethcdict + `${page}/${this.pageSize}`).then((res) => {
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
        $.get(api.baseUrl + api.gethcdict + `${page}/${this.pageSize}?YNHCBS=${this.YNHCBS}&MATERIALNAME=${this.MATERIALNAME}`).then((res) => {
          console.log(res)
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
      // 获取比对数据
      getCompareData(page) {
        this.loading = true
        $.get(api.baseUrl + api.getHcHandContrastDatas + `${this.compareItem.hcdictid}`).then((res) => {
          console.log(res)
          this.loading = false
          this.compared = true
          this.compareTableData = res.data.slice((page - 1) * this.pageSize, page * this.pageSize - 1)
          this.total = res.data.length
        })
      },
      // 关联
      associate(item) {
        $.post(api.baseUrl + api.reassociate + `?hcdictid=${this.compareItem.hcdictid}&conidcode=${item.conidcode}`).then((res) => {
          console.log(res)
          if (res.status === '1') {
            this.$message({
              message: res.message,
              type: 'success',
              center: true
            })
            setTimeout(this.back, 2000)
          } else if (res.status === '0') {
            this.$message({
              message: res.message,
              type: 'error',
              center: true
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .compare {
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100%;

      .ctrl {
        margin-top: 0;
      }
    }
  }
</style>
