export default {
  baseUrl: 'http://192.168.50.126:8085',
  // baseUrl: 'http://124.205.99.98:8095',
  // baseUrl: 'http://192.168.0.245:8081',
  userLogin: '/drug/UI/userLogin',                              //d 登录
  userLogOut: '/drug/UI/userLogOut/',                           //d 登出
  userchangerPassword: '/drug/UI/userChangerPassword/',         //d 修改密码

  getResources: '/drug/UI/getResources/',                       //d 资源 获取
  addResource: '/drug/UI/addResource/',                         //d 资源 添加
  resourceChanger: '/drug/UI/resourceChanger/',                 //d 资源 修改
  deleteResource: '/drug/UI/deleteResource/',                   //d 资源 删除

  getRoles: '/drug/UI/getRoles/',                               //d 角色 获取
  addRole: '/drug/UI/addRole/',                                 //d 角色 添加
  roleChanger: '/drug/UI/roleChanger/',                         //d 角色 修改
  changeRoleStatus: '/drug/UI/changeRoleStatus/',               //d 角色 修改状态

  getUsers: '/drug/UI/getUsers/',                               //d 系统用户 获取
  addSysUser: '/drug/UI/addSysUser/',                           //d 系统用户 添加
  userChanger: '/drug/UI/userChanger/',                         //d 系统用户 修改

  getHomePageInfo: '/drug/UI/getHomePageInfo/',                 //d 采集数据-字典信息表  获取基本数据
  manualCompareDrug: '/drug/UI/manualCompareDrug/',             //d 采集数据-字典信息表  关联数据
  manualDelCompareDrug: '/drug/UI/manualDelCompareDrug/',       //d 采集数据-字典信息表  取消比对
  getDrugDeliveryInfo: '/drug/UI/getDrugDeliveryInfo/',         //d 采集数据-药品进货监测表  获取数据
  getDrugSalesInfo: '/drug/UI/getDrugSalesInfo/',               //d 采集数据-药品销售监测表  获取数据

  gethcdict: '/drug/HC/gethcdict/',                             //d 采集数据-耗材监测表-字典      获取数据
  getvwhcimport: '/drug/HC/getvwhcimport/',                     //d 采集数据-耗材监测表-进货      获取数据
  getvwhcexport: '/drug/HC/getvwhcexport/',                     //d 采集数据-耗材监测表-销售      获取数据
  getHcHandContrastDatas: '/drug/HC/getHcHandContrastDatas/',   //d 采集数据-耗材字典获取手工比对列表数据
  reassociate: '/drug/HC/submit/reassociate/',                  //采集数据-耗材监测表  关联数据

  getNationalBasicData: '/drug/UI/getNationalBasicData/',       //d 标准数据-药品监测表  获取数据
  getStandradServices: '/drug/UI/getStandradServices/',         //d 采集数据-服务监测表  获取数据

  getConversionOfData: '/drug/UI/getConversionOfData/',         //d 转换数据-完整信息表  获取数据
  exportExcel: '/drug/user/exportExcel.do/',                    //d 转换数据-完整信息表  下载
  getConversionOfDataDrugDelivery: '/drug/UI/getConversionOfDataDrugDelivery/',//d 转换数据-药品进货监测表  获取数据
  getConversionOfDataDrugSales: '/drug/UI/getConversionOfDataDrugSales/',//d 转换数据-药品销售监测表 获取数据

  getServiceinfoList: '/drug/service/serviceinfo/list/',//d 转换数据-医疗服务信息-完整表  获取数据
  exportExcelServiceInfos: '/drug/service/exportExcelServiceInfos.do/',//d 转换数据-医疗服务信息-完整表  下载
  getServiceinfoSell: '/drug/service/serviceinfoSell/list/',//d 转换数据-医疗服务信息-医疗服务记录表  获取数据

  getstandhcdict: '/drug/HC/getstandhcdict/',//d 转换数据-耗材监测表-完整信息表  获取数据
  exportExcelHC: '/drug/HC/exportExcel.do/',//d q 转换数据-耗材监测表-完整信息表  下载
  gethcbuy: '/drug/HC/gethcbuy/',//d 转换数据-监控数据-耗材入库  获取数据
  gethcsell: '/drug/HC/gethcsell/',//d 转换数据-监控数据-耗材出库  获取数据


  getUploadDataFlow: '/drug/UI/getUploadDataFlow/',//d 上传数据-药品检测-流水表  获取数据
  getUploadDataDatch: '/drug/UI/getUploadDataDatchNo/',//d 上传数据-药品检测-批次表  获取数据
  getServiceinfoUpload: '/drug/service/serviceinfoUpload/list/',//d 上传数据-医疗服务-流水表  获取数据
  getServiceinfoUploadNo: '/drug/service/serviceinfoUploadNo/list/',// d 上传数据-医疗服务-批次表  获取数据
  gethcupload: '/drug/HC/gethcupload/',//d 上传数据-耗材-流水表      获取数据
  gethcuploadno: '/drug/HC/gethcuploadno/',//d 上传数据-耗材-批次表      获取数据

  uploadDrugPrice: '/drug/UI/uploadDrugPrice/',                      //d q 上传数据-批次表  重新上传
  uploadDrugPriceBetween:'/drug/UI/uploadDrugPriceBetween',          // 上传数据-批次表  批量上传
  uploadServicePrice: '/drug/UI/uploadServicePrice',                //d q 上传数据-医疗服务-批次监测表  重新上传
  uploadServicePriceBetween: '/drug/UI/uploadServicePriceBetween/',  //d q 上传数据-医疗服务-批次监测表  批量上传
  uploadHcPrice: '/drug/HC/uploadHcPrice/',                          //d q 上传数据-耗材-批次监测表      重新上传
  uploadHcPriceBetween: '/drug/HC/uploadHcPriceBetween/',             //d q 上传数据-耗材-批次监测表      批量上传
  resSerDrugList: '/drug/ResSerDrug/list/',// 获取加成数据列表
  deleteAdditionData: '/drug/ResSerDrug/delete/',// 删除加成数据
  addAdditionData: '/drug/ResSerDrug/add/',// 添加加成数据
  editAdditionData: '/drug/ResSerDrug/edit/',// 修改加成数据
  uploadAdditionData: '/drug/ResSerDrug/uploadRes',// 上传加成数据


  mtDataList: '/drug/mt/list',// 获取病案首页上传列表
  mtUpload: '/drug/mt/upload',//单条病案首页上传
  mtQuarterUpload: '/drug/mt/upload/quarter',// 季度上传
  mtBatchUpload: '/drug/mt/batchupload', // 多条病案首页上传
  mtExportAllFlow: '/drug/mt/optHomePageByBetween',// 根据时间段导出病案首页，生成上传批次
  mtExportLastMonthHomepage: '/drug/mt/optPreMonthHomepage' // 导出上一个月病案首页，生成上传批次
}

