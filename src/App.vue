<template>
  <div id="app" v-cloak>
    <div class="header">
      <h1>
        <router-link to="/">天津市武清区中医院国家药品与医疗服务价格监测信息系统</router-link>
      </h1>
      <div class="admin" v-if="user.userid">
        <div class="base">
          <i class="iconfont icon-avatar"></i>
          <span>你好管理员!</span>
          <div class="down">
            <i class="iconfont icon-down"></i>
          </div>
        </div>
        <div class="drop-down">
          <ul>
            <router-link tag="li" to="/changePassword"><h4>密码修改</h4></router-link>
            <li @click="logout"><h4>安全退出</h4></li>
            <!--<li class="role">-->
              <!--<h4>角色权限</h4>-->
              <!--<ul class="role-list">-->
                <!--<router-link tag="li" to="/resource">资源</router-link>-->
                <!--<router-link tag="li" to="/role">角色</router-link>-->
                <!--<router-link tag="li" to="/systemManage">系统用户管理</router-link>-->
              <!--</ul>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </div>
    <div class="nav">
      <ul class="nav-list">
        <li>
          <h2>采集数据</h2>
          <ul class="sub-nav">
            <li>
              <h3>药品监测表</h3>
              <ul>
                <router-link tag="li" to="/">字典信息表</router-link>
                <router-link tag="li" to="/collect/drugImport">药品进货监测表</router-link>
                <router-link tag="li" to="/collect/drugSales">药品销售监测表</router-link>
              </ul>
            </li>
            <li>
              <h3>耗材监测表</h3>
              <ul>
                <router-link tag="li" to="/collect/hcDirectory">字典信息表</router-link>
                <router-link tag="li" to="/collect/hcImport">高值医用耗材进货监测表</router-link>
                <router-link tag="li" to="/collect/hcSales">高值医用耗材销售监测表</router-link>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <h2>标准数据</h2>
          <ul class="sub-nav">
            <li>
              <router-link tag="h3" to="/standard/drugStandard">药品监测表</router-link>
            </li>
            <li>
              <h3>服务监测表</h3>
              <ul>
                <router-link tag="li" to="/standard/service2001">2001版</router-link>
                <router-link tag="li" to="/standard/service2012">2012版</router-link>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <h2>转换数据</h2>
          <ul class="sub-nav">
            <li>
              <h3>药品监测表</h3>
              <ul>
                <router-link tag="li" to="/transform/drugInfo">完整信息表</router-link>
                <router-link tag="li" to="/transform/drugImport">药品进货监测表</router-link>
                <router-link tag="li" to="/transform/drugSales">药品销售监测表</router-link>
              </ul>
            </li>
            <li>
              <h3>医疗服务监测表</h3>
              <ul>
                <router-link tag="li" to="/transform/serviceInfo">完整信息表</router-link>
                <router-link tag="li" to="/transform/serviceRecord">医疗服务记录表</router-link>
              </ul>
            </li>
            <li>
              <h3>高值医用耗材监测表</h3>
              <ul>
                <router-link tag="li" to="/transform/hcInfo">完整信息表</router-link>
                <router-link tag="li" to="/transform/hcImport">耗材进货监测表</router-link>
                <router-link tag="li" to="/transform/hcSales">耗材销售监测表</router-link>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <h2>上传数据</h2>
          <ul class="sub-nav">
            <li>
              <h3>药品监测表</h3>
              <ul>
                <router-link tag="li" to="/upload/drugFlow">流水表</router-link>
                <router-link tag="li" to="/upload/drugBatch">批次表</router-link>
              </ul>
            </li>
            <li>
              <h3>医疗服务监测表</h3>
              <ul>
                <router-link tag="li" to="/upload/serviceFlow">医疗服务流水监测表</router-link>
                <router-link tag="li" to="/upload/serviceBatch">医疗服务批次监测表</router-link>
              </ul>
            </li>
            <li>
              <h3>高值医用耗材监测表</h3>
              <ul>
                <router-link tag="li" to="/upload/hcFlow">流水监测表</router-link>
                <router-link tag="li" to="/upload/hcBatch">批次监测表</router-link>
              </ul>
            </li>
            <li>
              <router-link tag="h3" to="/upload/resSerDrugAddition">资源、服务、药品加成</router-link>
            </li>
            <li>
              <router-link tag="h3" to="/upload/mtIndex">病案首页</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {mapGetters} from 'vuex'
  import api from './api'

  export default {
    name: 'App',
    computed: {
      ...mapGetters(['user'])
    },
    mounted() {
      this.showSubMenu()
    },
    updated() {
      // 在这个钩子里调用showDropDown方法,能够解决登录后dropdown无法显示的问题
      this.showDropDown()
    },
    methods: {
      showDropDown() {
        $('.admin').hover(function () {
          $('.drop-down').stop().slideDown('fast')
        }, function () {
          $('.drop-down').stop().slideUp('fast')
        })

        $('.role').hover(function () {
          $('.role-list').stop().fadeIn('fast')
        }, function () {
          $('.role-list').stop().fadeOut('fast')
        })
      },
      showSubMenu() {
        $('.nav-list>li').hover(function () {
          $('.sub-nav', this).stop().slideDown('fast')
        }, function () {
          $('.sub-nav', this).stop().slideUp('fast')
        })

        $('.sub-nav>li').hover(function () {
          $('>ul', this).stop().fadeIn('fast')
        }, function () {
          $('>ul', this).stop().fadeOut('fast')
        })
      },
      logout() { // 退出登录
        $.get(api.baseUrl + api.userLogOut).then((res) => {
          // console.log(res)
          let {message, status} = res
          if (status === '1') {
            this.$message({
              message,
              type: 'success',
              center: true
            })
            this.$store.dispatch('setUser', {})
            window.sessionStorage.removeItem('user')
            this.$router.push('/login')
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./common/scss/var";

  #app {
    .header {
      display: flex;
      justify-content: space-between;
      height: 60px;
      background: #fff;
      padding: 0 30px;
      > h1 {
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        font-weight: bold;
        a {
          color: $color-theme;
        }
      }
      .admin {
        height: 100%;
        position: relative;
        .base {
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          .icon-avatar {
            font-size: 24px;
          }
          span {
            margin: 0 10px;
          }
          .down {
            width: 30px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            background: $color-theme;
            .icon-down {
              color: #fff;
            }
          }
        }
        .drop-down {
          position: absolute;
          z-index: 100;
          top: 60px;
          left: 0;
          width: 120px;
          background: #fff;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          text-align: center;
          display: none;
          li {
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid #e8e8e8;
            cursor: pointer;
            &:last-child {
              border-bottom: none;
            }
            h4:hover, ul > li:hover {
              color: $color-theme;
            }
          }
          .role {
            position: relative;
            .role-list {
              position: absolute;
              top: 0;
              left: -120px;
              width: 120px;
              background: #fff;
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
              display: none;
            }
          }
        }
      }
    }
    .nav {
      height: 50px;
      background: $color-theme;
      .nav-list {
        height: 100%;
        display: flex;
        > li {
          height: 100%;
          width: 200px;
          position: relative;
          border-right: 1px solid #ddd;
          h2 {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            cursor: pointer;
            color: #fff;
            transition: all 0.2s ease;
          }
          &:hover h2 {
            color: $color-text;
          }
        }
        .sub-nav {
          position: absolute;
          z-index: 100;
          top: 50px;
          left: 0;
          width: 100%;
          background: #fff;
          line-height: 50px;
          text-align: center;
          display: none;
          > li:hover {
            h3 {
              color: $color-theme;
            }
          }
          li {
            position: relative;
            cursor: pointer;
            border: 1px solid #e8e8e8;
            border-top: none;
            > h3 {
              height: 50px;
              background: #f5f5f5;
              transition: all 0.2s ease;
            }
            > ul {
              position: absolute;
              top: 0;
              left: 100%;
              width: 100%;
              background: #fff;
              box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
              display: none;
              li {
                transition: all 0.2s ease;
                background: #f5f5f5;
                &:hover {
                  color: $color-theme;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
