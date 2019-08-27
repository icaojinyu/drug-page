<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="operate">
      <el-button type="primary" plain @click="exportAllFlow">抽取所有病案流水</el-button>
      <el-button type="primary" plain @click="exportLastMonthHomepage">抽取上一季度病案流水</el-button>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from '../../api'
  import breadcrumb from '../../components/breadcrumb'
  import loading from '../../components/loading'

  export default {
    name: "mtFlow",
    components: {
      breadcrumb,
      loading
    },
    data() {
      return {
        breadcrumbData: ['上传数据', '病案首页', '流水表'],
        tableData: [],
        loading: false,

        currentPage: 1,
        pageSize: 20,
        total: 0,
      }
    },
    methods: {
      // 导出全部
      exportAllFlow(){
        let url = `${api.baseUrl}${api.mtExportAllFlow}`
        $.get(url).then((res)=>{
          // console.log(res);
          if (res.status === 'SECCESS') {
            this.$message({
              message: `成功抽取所有病案流水,共${res.count}条数据`,
              type: 'success',
              center: true
            })
          }
        })
      },
      // 导出上个月
      exportLastMonthHomepage(){
        let url = `${api.baseUrl}${api.mtExportLastMonthHomepage}`
        $.get(url).then((res)=>{
          if (res.status === 'SECCESS') {
            this.$message({
              message: `成功抽取上一季度病案流水,共${res.count}条数据`,
              type: 'success',
              center: true
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .operate {
    width: 96%;
    margin: 0 auto;
  }
</style>
