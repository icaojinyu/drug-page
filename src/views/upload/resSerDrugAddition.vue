<template>
  <div>
    <breadcrumb :list="breadcrumbData"></breadcrumb>
    <div class="operate">
      <!--<label class="year">年份
        <select v-model="year">
          <option disabled value="">请选择</option>
          <option v-for="item in yearList">{{item}}</option>
        </select>
      </label>
      <label class="quarter">季度
        <select v-model="quarter">
          <option disabled value="">请选择</option>
          <option>第一季度</option>
          <option>第二季度</option>
          <option>第三季度</option>
          <option>第四季度</option>
        </select>
      </label>
      <el-button type="success" plain size="mini" @click="search">搜索</el-button>
      <el-button type="primary" plain size="mini" @click="reset">重置</el-button>
      <el-button :disabled="true" type="warning" plain size="mini" @click="back">返回</el-button>-->
      <div class="add" @click="showAdd = true">
        <div><i class="iconfont icon-add"></i></div>
        <span>新增</span>
      </div>
    </div>
    <table class="table">
      <tr>
        <th>序号</th>
        <th>开始年度</th>
        <th>开始季度</th>
        <th>实有床位数</th>
        <th>执业(助理)医师数</th>
        <th>总诊疗人次数</th>
        <th>出院人数</th>
        <th>是否取消药品加成</th>
        <th>取消药品加成日期</th>
        <th>中药饮品总支出额</th>
        <th>中药饮品总销售额</th>
        <th>中药颗粒剂总支出额</th>
        <th>中药颗粒剂总销售额</th>
        <th>医用耗材总支出额</th>
        <th>医用耗材总销售额</th>
        <th>状态</th>
        <th colspan="3">操作</th>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{(index+1)+(currentPage - 1)*pageSize}}</td>
        <td>{{item.year}}</td>
        <td>{{item.quarter}}</td>
        <td>{{item.bedsnum}}</td>
        <td>{{item.doctorsnum}}</td>
        <td>{{item.diagnosesnum}}</td>
        <td>{{item.leavenum}}</td>
        <td>{{getIsCancelDrugAddition(item.drugplus)}}</td>
        <td>{{getDateFromTimeStamp(item.drugplusdate)}}</td>
        <td>{{item.drinkbuymoney}}</td>
        <td>{{item.drinksellmoney}}</td>
        <td>{{item.grainbuymoney}}</td>
        <td>{{item.grainsellmoney}}</td>
        <td>{{item.supplibuymoney}}</td>
        <td>{{item.supplisellmoney}}</td>
        <td>{{getState(item.status)}}</td>
        <td><span @click="upload(item.resuploadid)">{{item.status === 0? '上传':'重新上传'}}</span></td>
        <td><span @click="getCurrentEditItem(item.resuploadid)">修改</span></td>
        <td><span @click="deleteData(item.resuploadid)">删除</span></td>
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
      :total="total"
      v-if="total>pageSize"
    >
    </el-pagination>
    <loading v-if="loading"></loading>

    <div v-if="showAdd" class="add-addition-data">
      <div class="inner">
        <table class="table">
          <tr>
            <th>开始年度</th>
            <th>开始季度</th>
            <th>实有床位数</th>
            <th>执业(助理)医师数</th>
            <th>总诊疗人次数</th>
            <th>出院人数</th>
            <th>是否取消药品加成</th>
            <th>取消药品加成日期</th>
            <th>中药饮品总支出额</th>
            <th>中药饮品总销售额</th>
            <th>中药颗粒剂总支出额</th>
            <th>中药颗粒剂总销售额</th>
          </tr>
          <tr>
            <td>
              <select v-model="add.year">
                <option disabled value="">请选择</option>
                <option v-for="item in yearList">{{item}}</option>
              </select>
            </td>
            <td>
              <select v-model="add.quarter">
                <option disabled value="">请选择</option>
                <option v-for="item in quarterList">{{item}}</option>
              </select>
            </td>
            <td><input type="text" v-model="add.bedsnum"></td>
            <td><input type="text" v-model="add.doctorsnum"></td>
            <td><input type="text" v-model="add.diagnosesnum"></td>
            <td><input type="text" v-model="add.leavenum"></td>
            <td>
              <select v-model="add.drugplus">
                <option disabled value="">请选择</option>
                <option value="1">是</option>
                <option value="2">否</option>
              </select>
            </td>
            <td style="padding: 0;"><input type="text" :disabled="add.drugplus == 2" v-model="add.drugplusdate"
                                           placeholder="如:2018-01-01">
            </td>
            <td><input type="text" v-model="add.drinkbuymoney"></td>
            <td><input type="text" v-model="add.drinksellmoney"></td>
            <td><input type="text" v-model="add.grainbuymoney"></td>
            <td><input type="text" v-model="add.grainsellmoney"></td>
          </tr>
        </table>
        <div class="ctrl">
          <el-button type="success" @click="saveAdd">保存</el-button>
          <el-button type="warning" @click="cancelAdd">取消</el-button>
        </div>
      </div>
    </div>
    <div v-if="showEdit" class="edit-addition-data">
      <div class="inner">
        <table class="table">
          <tr>
            <th>开始年度</th>
            <th>开始季度</th>
            <th>实有床位数</th>
            <th>执业(助理)医师数</th>
            <th>总诊疗人次数</th>
            <th>出院人数</th>
            <th>是否取消药品加成</th>
            <th>取消药品加成日期</th>
            <th>中药饮品总支出额</th>
            <th>中药饮品总销售额</th>
            <th>中药颗粒剂总支出额</th>
            <th>中药颗粒剂总销售额</th>
            <th>医用耗材总支出额</th>
            <th>医用耗材总支出额</th>
          </tr>
          <tr>
            <td>
              <select v-model="edit.year">
                <option disabled value="">请选择</option>
                <option v-for="item in yearList">{{item}}</option>
              </select>
            </td>
            <td>
              <select v-model="edit.quarter">
                <option disabled value="">请选择</option>
                <option v-for="item in quarterList">{{item}}</option>
              </select>
            </td>
            <td><input type="text" v-model="edit.bedsnum"></td>
            <td><input type="text" v-model="edit.doctorsnum"></td>
            <td><input type="text" v-model="edit.diagnosesnum"></td>
            <td><input type="text" v-model="edit.leavenum"></td>
            <td>
              <select v-model="edit.drugplus">
                <option disabled value="">请选择</option>
                <option value="1">是</option>
                <option value="2">否</option>
              </select>
            </td>
            <td style="padding: 0;">
              <input type="text" :disabled="edit.drugplus == 2" v-model="edit.drugplusdate" placeholder="如:2018-01-01">
            </td>
            <td><input type="text" v-model="edit.drinkbuymoney"></td>
            <td><input type="text" v-model="edit.drinksellmoney"></td>
            <td><input type="text" v-model="edit.grainbuymoney"></td>
            <td><input type="text" v-model="edit.grainsellmoney"></td>
            <td><input type="text" v-model="edit.supplibuymoney"></td>
            <td><input type="text" v-model="edit.supplisellmoney"></td>
          </tr>
        </table>
        <div class="ctrl">
          <el-button type="success" @click="saveEdit">保存</el-button>
          <el-button type="warning" @click="cancelEdit">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from '../../api/index'
  import breadcrumb from '../../components/breadcrumb'
  import loading from '../../components/loading'

  export default {
    name: "resSerDrugAddition",
    components: {
      breadcrumb, loading
    },
    data() {
      let yearList = []
      for (let i = 2017; i <= new Date().getFullYear(); i++) {
        yearList.push(i)
      }
      return {
        breadcrumbData: ['上传数据', '资源服务药品加成'],
        yearList,

        currentPage: 1,
        pageSize: 1000, // 1000/4 = 250年,那时医院已经倒闭了😂
        tableData: [],
        total: 0,

        loading: false,
        showAdd: false,
        showEdit: false,
        add: {
          year: '',
          quarter: '',
          bedsnum: '',
          doctorsnum: '',
          diagnosesnum: '',
          leavenum: '',
          drugplus: '',
          drugplusdate: '',
          drinkbuymoney: '',
          drinksellmoney: '',
          grainbuymoney: '',
          grainsellmoney: ''
        },
        edit: {
          year: '',
          quarter: '',
          bedsnum: '',
          doctorsnum: '',
          diagnosesnum: '',
          leavenum: '',
          drugplus: '',
          drugplusdate: '',
          drinkbuymoney: '',
          drinksellmoney: '',
          grainbuymoney: '',
          grainsellmoney: '',
          supplibuymoney: '',
          supplisellmoney: ''
        },
      }
    },
    created() {
      this.quarterList = ['1', '2', '3', '4']
      this.getTableData()
    },
    methods: {
      getTableData() {
        let url = `${api.baseUrl}${api.resSerDrugList}${this.currentPage}/${this.pageSize}`
        this.loading = true
        $.get(url).then((res) => {
          console.log(res)
          this.tableData = res.data
          this.total = res.totalNum
          this.loading = false
        }).catch((err) => {
          console.log(err)
        })
      },
      getState(n) {
        switch (n) {
          case 0:
            return '未上传'
          case 1:
            return '已上传'
          case 2:
            return '上传失败'
          case 3:
            return '数据更新'
        }
      },
      getIsCancelDrugAddition(n) {
        return n == 1 ? '是' : '否'
      },
      handleCurrentChange() {
        this.getTableData()
      },
      getDateFromTimeStamp(s) {
        if (s === null) {
          return ''
        }
        let d = new Date(s)
        return `${d.getFullYear()}-${this.to2(d.getMonth() + 1)}-${this.to2(d.getDate())}`
      },
      to2(n) {
        return n < 10 ? '0' + n : '' + n
      },

      initTrData(obj) {
        obj = {
          year: '',
          quarter: '',
          bedsnum: '',
          doctorsnum: '',
          diagnosesnum: '',
          leavenum: '',
          drugplus: '',
          drugplusdate: '',
          drinkbuymoney: '',
          drinksellmoney: '',
          grainbuymoney: '',
          grainsellmoney: '',
          supplibuymoney: '',
          supplisellmoney: ''
        }
      },
      // 取消添加
      cancelAdd() {
        this.showAdd = false
        this.initTrData(this.add)
      },
      // 保存添加的内容
      saveAdd() {
        let {year, quarter, bedsnum, doctorsnum, diagnosesnum, leavenum, drugplus, drugplusdate, drinkbuymoney, drinksellmoney, grainbuymoney, grainsellmoney} = this.add
        let url = `${api.baseUrl}${api.addAdditionData}`
        if (this.isExisted(this.add)) {
          this.$message({
            message: '年度季度已存在,请修改后重新保存',
            type: 'warning',
            center: true
          })
          return
        }
        $.post(url, {
          year,
          quarter,
          bedsnum,
          doctorsnum,
          diagnosesnum,
          leavenum,
          drugplus,
          drugplusdate,
          drinkbuymoney,
          drinksellmoney,
          grainbuymoney,
          grainsellmoney
        }).then((res) => {
          console.log(res)
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success',
              center: true
            })
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          } else {
            this.$message({
              message: res.message,
              type: 'error',
              center: true
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: '服务端错误,请重试',
            type: 'error',
            center: true
          })
        })
      },
      // 判断年度和季度是否已经存在
      isExisted(obj) {
        return this.tableData.some((item) => {
          return item.year === obj.year && item.quarter === obj.quarter
        })
      },
      // 删除数据
      deleteData(id) {
        let url = `${api.baseUrl}${api.deleteAdditionData}`
        $.post(url, {
          resuploadid: id
        }).then((res) => {
          console.log(res)
          if (res.num === 1) {
            this.$message({
              message: '删除成功',
              type: 'success',
              center: true
            })
            this.tableData = this.tableData.filter((item) => {
              return item.resuploadid !== id
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'error',
              center: true
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: '服务端错误,请重试',
            type: 'error',
            center: true
          })
        })
      },
      // 获取当前要修改(编辑)的项
      getCurrentEditItem(id) {
        this.showEdit = true

        this.edit = this.tableData.find((item) => {
          return item.resuploadid === id
        })
        this.edit.drugplusdate && (this.edit.drugplusdate = this.getDateFromTimeStamp(this.edit.drugplusdate))
      },
      // 取消编辑
      cancelEdit() {
        this.showEdit = false
        this.initTrData(this.edit)
      },
      // 保存编辑
      saveEdit() {
        let {
          resuploadid,
          year,
          quarter,
          bedsnum,
          doctorsnum,
          diagnosesnum,
          leavenum,
          drugplus,
          drugplusdate,
          drinkbuymoney,
          drinksellmoney,
          grainbuymoney,
          grainsellmoney,
          supplibuymoney,
          supplisellmoney
        } = this.edit
        let url = `${api.baseUrl}${api.editAdditionData}`
        $.post(url, {
          resuploadid,
          year,
          quarter,
          bedsnum,
          doctorsnum,
          diagnosesnum,
          leavenum,
          drugplus,
          drugplusdate,
          drinkbuymoney,
          drinksellmoney,
          grainbuymoney,
          grainsellmoney,
          supplibuymoney,
          supplisellmoney
        }).then((res) => {
          console.log(res)
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success',
              center: true
            })
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          } else {
            this.$message({
              message: res.message,
              type: 'error',
              center: true
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: '服务端错误,请重试',
            type: 'error',
            center: true
          })
        })
      },
      // 上传or重新上传
      upload(id) {
        // let url = `${api.baseUrl}${api.uploadAdditionData}`
        $.get(`${api.baseUrl}${api.uploadAdditionData}?resuploadid=${id}`).then((res) => {
          console.log(res)
          this.$message({
            message: res.message,
            type: 'success',
            center: true
          })
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: '服务端错误，请重试！',
            type: 'error',
            center: true
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/var";



  .operate {
    display: flex;
    width: 96%;
    margin: 0 auto;

    /* label {
       display: flex;
       justify-content: center;
       align-items: center;
       margin-right: 30px;
       font-size: 14px;

       select {
         margin-left: 5px;
         width: 200px;
         height: 30px;
         border: 1px solid $color-theme;
         box-sizing: border-box;
         padding-left: 15px;
         background: #fff;
         color: #555;
       }
     }*/

    .add {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      /*margin-left: 30px;*/


      > div {
        width: 50px;
        height: 50px;
        background: $color-theme;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        color: #fff;
        box-shadow: 4px 4px 4px #666;
        cursor: pointer;

        i {
          font-size: 20px;
        }
      }

      > span {
        font-size: 18px;
        margin-left: 15px;
        color: $color-theme;
      }
    }
  }

  .add-addition-data, .edit-addition-data {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);

    .inner {
      width: 96%;
      height: 240px;
      overflow-x: auto;
      background: #fff;
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;

      .ctrl {
        display: flex;
        justify-content: center;
        align-items: center;

        .el-button:first-child {
          margin-right: 30px;
        }
      }

      .table {
        width: 99%;

        td {
          input[type=text] {
            max-width: 80px;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
