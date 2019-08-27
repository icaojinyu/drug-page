import Vue from 'vue'
import Router from 'vue-router'

// 采集数据
const index = () => import('../views/collect/index')
const drugImport = () => import('../views/collect/drugImport')
const drugSales = () => import('../views/collect/drugSales')

const hcDirectory = () => import('../views/collect/hcDirectory')
const hcImport = () => import('../views/collect/hcImport')
const hcSales = () => import('../views/collect/hcSales')


// 标准数据
const drugStardard = () => import('../views/standard/drugStandard')
const service2001 = () => import('../views/standard/service2001')
const service2012 = () => import('../views/standard/service2012')


// 转换数据
const transformDrugInfo = () => import('../views/transform/drugInfo')
const transformDrugImport = () => import('../views/transform/drugImport')
const transformDrugSales = () => import('../views/transform/drugSales')

const transformServiceInfo = () => import('../views/transform/serviceInfo')
const transformServiceRecord = () => import('../views/transform/serviceRecord')

const transformHcInfo = () => import('../views/transform/hcInfo')
const transformHcImport = () => import('../views/transform/hcImport')
const transformHcSales = () => import('../views/transform/hcSales')


// 上传数据
const drugFlow = () => import('../views/upload/drugFlow')
const drugBatch = () => import('../views/upload/drugBatch')
const serviceFlow = () => import('../views/upload/serviceFlow')
const serviceBatch = () => import('../views/upload/serviceBatch')
const hcFlow = () => import('../views/upload/hcFlow')
const hcBatch = () => import('../views/upload/hcBatch')
const uploadDrugAddition = () => import('../views/upload/resSerDrugAddition')
// const mtBatch = () => import('../views/upload/mtBatch')
// const mtFlow = () => import('../views/upload/mtFlow')
const mtIndex = () => import('../views/upload/mtIndex')

// 登录
const login = () => import('../views/login')
// 修改密码
const changePassword = () => import('../views/changePassword')
// 资源
const resource = () => import('../views/resource')
// 角色
const role = () => import('../views/role')
// 系统用户管理
const systemManage = () => import('../views/systemManage')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/collect/drugImport',
      name: 'collectDrugImport',
      component: drugImport
    },
    {
      path: '/collect/drugSales',
      name: 'collectDrugSales',
      component: drugSales
    },
    {
      path: '/collect/hcDirectory',
      name: 'collectHcDirectory',
      component: hcDirectory
    },
    {
      path: '/collect/hcImport',
      name: 'collectHcImport',
      component: hcImport
    },
    {
      path: '/collect/hcSales',
      name: 'collectHcSales',
      component: hcSales
    },
    {
      path: '/standard/drugStandard',
      name: 'drugStandard',
      component: drugStardard
    },
    {
      path: '/standard/service2001',
      name: 'service2001',
      component: service2001
    },
    {
      path: '/standard/service2012',
      name: 'service2012',
      component: service2012
    },
    {
      path: '/transform/drugInfo',
      name: 'transformDrugInfo',
      component: transformDrugInfo
    },
    {
      path: '/transform/drugImport',
      name: 'transformDrugImport',
      component: transformDrugImport
    },
    {
      path: '/transform/drugSales',
      name: 'transformDrugSales',
      component: transformDrugSales
    },
    {
      path: '/transform/serviceInfo',
      name: 'transformServiceInfo',
      component: transformServiceInfo
    },
    {
      path: '/transform/serviceRecord',
      name: 'transformServiceRecord',
      component: transformServiceRecord
    },
    {
      path: '/transform/hcInfo',
      name: 'transformHcInfo',
      component: transformHcInfo
    },
    {
      path: '/transform/hcImport',
      name: 'transformHcImport',
      component: transformHcImport
    },
    {
      path: '/transform/hcSales',
      name: 'transformHcSales',
      component: transformHcSales
    },
    {
      path: '/upload/drugFlow',
      name: 'drugFlow',
      component: drugFlow
    },
    {
      path: '/upload/drugBatch',
      name: 'drugBatch',
      component: drugBatch
    },
    {
      path: '/upload/serviceFlow',
      name: 'serviceFlow',
      component: serviceFlow
    },
    {
      path: '/upload/serviceBatch',
      name: 'serviceBatch',
      component: serviceBatch
    },
    {
      path: '/upload/hcFlow',
      name: 'hcFlow',
      component: hcFlow
    },
    {
      path: '/upload/hcBatch',
      name: 'hcBatch',
      component: hcBatch
    },
    {
      path: '/upload/resSerDrugAddition',
      name: 'uploadResSerDrugAddition',
      component: uploadDrugAddition
    },
    // {
    //   path: '/upload/mtBatch',
    //   name: 'uploadMtBatch',
    //   component: mtBatch
    // },
    // {
    //   path: '/upload/mtFlow',
    //   name: 'uploadMtFlow',
    //   component: mtFlow
    // },
    {
      path: '/upload/mtIndex',
      name: 'uploadMtIndex',
      component: mtIndex
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword
    },
    {
      path: '/resource',
      name: 'resource',
      component: resource
    },
    {
      path: '/role',
      name: 'role',
      component: role
    },
    {
      path: '/systemManage',
      name: 'systemManage',
      component: systemManage
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'hash',
  linkActiveClass: 'active'
})
