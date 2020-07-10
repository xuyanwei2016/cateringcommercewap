import request from '@/utils/request';
import { requestPath } from '@/utils/global.js';

export function getSyMasterAPI () { //首页烹饪大师
  return request({
    url:`${requestPath.resourcefg}/menu/CulinaryMaster/get/list`,
    method:'get',
  })
}

export function getMasterListAPI ( params ) { //烹饪大师分页
  return request({
    url:`${requestPath.resourcefg}/menu/CulinaryMaster/page`,
    method:'get',
    params
  })
}

export function getMasterDetailByIdAPI ( params ) { //烹饪大师根据id查询详情
  return request({
    url:`${requestPath.resourcefg}/menu/CulinaryMaster/` + params,
    method:'get',
  })
}

export function getToBookStoreAPI ( params ) { //首页直通书城展示
  return request({
    url:`${requestPath.resourcefg}/book-library/get/num`,
    method:'get',
    params
  })
}

export function getAllBookListAPI ( params ) { //图书列表全部书
  return request({
    url:`${requestPath.resourcefg}/book-library/query/page`,
    method:'get',
    params
  })
}

export function getBookListAPI ( params ) { //图书列表点击图书获取的数据
  return request({
    url:`${requestPath.resourcefg}/book-library/page`,
    method:'get',
    params
  })
}

export function getEbookListAPI ( params ) { //图书列表点击电子书获取的数据
  return request({
    url:`${requestPath.resourcefg}/e-book-library/page`,
    method:'get',
    params
  })
}

export function getCarouselAPI ( params ) { //首页轮播图
  return request({
    url:`${requestPath.commonfg}/adspace/signvalue`,
    method:'get',
    params
  })
}

export function getTodayRecommendAPI ( params ) { //首页轮播图
  return request({
    url:`${requestPath.resourcefg}/menu/list`,
    method:'get',
    params
  })
}

export function getCultureAPI ( params ) { //首页文化大观推荐
  return request({
    url:`${requestPath.commonfg}/article/list`,
    method:'get',
    params
  })
}

export function getApprenticeAPI ( params ) { //大师徒弟分页以及详情页关联徒弟资源
  return request({
    url:`${requestPath.resourcefg}/menu/CulinaryMaster/get/page`,
    method:'get',
    params
  })
}

export function getBookDetialAPI ( params ) { //根据id查找图书详情
  return request({
    url:`${requestPath.resourcefg}/book-library/get/` + params,
    method:'get',
  })
}

export function getBookRelationListAPI ( params ) { //根据图书id查询图书关联资源
  return request({
    url:`${requestPath.resourcefg}/book-library/get/list`,
    method:'get',
    params
  })
}

export function getCommentListAPI ( params ) { //分页查询资源评论
  return request({
    url:`${requestPath.commonfg}/comment/page`,
    method:'get',
    params
  })
}

export function saveCommentAPI ( data ) { //添加评论
  return request({
    url:`${requestPath.commonfg}/comment/save`,
    method:'post',
    data
  })
}

export function getGoodsCountAPI () { //详情页购物车里商品数量
  return request({
    url:`${requestPath.resourcefg}/shopcart/count`,
    method:'get',
  })
}

export function saveshopCarAPI ( data ) { //加入购物车
  return request({
    url:`${requestPath.resourcefg}/shopcart/save`,
    method:'post',
    data
  })
}

export function isCollectedAPI ( params ) { //是否收藏
  return request({
    url:`${requestPath.resourcefg}/member-collection/check-is-collect`,
    method:'get',
    params
  })
}

export function addCollectionAPI ( data ) { //收藏
  return request({
    url:`${requestPath.resourcefg}/member-collection/batch/save`,
    method:'post',
    data
  })
}

export function deleteCollectionAPI ( data ) { //取消收藏
  return request({
    url:`${requestPath.resourcefg}/member-collection/batch/delete`,
    method:'post',
    data
  })
}

export function getEbookDetailByIdAPI ( params ) { //根据id查找电子书详情
  return request({
    url:`${requestPath.resourcefg}/e-book-library/get/` + params,
    method:'get',
  })
}

export function getShopCarListAPI () { //购物车列表
  return request({
    url:`${requestPath.resourcefg}/shopcart/page`,
    method:'get',
  })
}

export function upDataItemNumAPI ( data ) { //修改购物车每条数据的数量
  return request({
    url:`${requestPath.resourcefg}/shopcart/update/num`,
    method:'post',
    data
  })
}

export function deleteShopCarItemAPI ( data ) { //单条删除购物车每条数据
  return request({
    url:`${requestPath.resourcefg}/shopcart/batch/delete`,
    method:'post',
    data
  })
}

export function updataCheckedStatusAPI ( data ) { //批量修改购物车商品选中状态
  return request({
    url:`${requestPath.resourcefg}/shopcart/batch/update`,
    method:'post',
    data
  })
}

export function getAddressListAPI ( params ) { //地址分页列表
  return request({
    url:`${requestPath.resourcefg}/shopping-address/page`,
    method:'get',
    params
  })
}


export function getOrderListAPI ( data ) { //确认订单页获取订单列表
  return request({
    url:`${requestPath.orderfg}/order/wap/pay/order`,
    method:'post',
    data
  })
}

export function getExpresstAPI ( params ) { //数据字典获取邮费
  return request({
    url:`${requestPath.commonfg}/dictionary/dictionary`,
    method:'get',
    params
  })
}

export function isSelectAllAPI () { //购物车是否全选
  return request({
    url:`${requestPath.resourcefg}/shopcart/get/selected`,
    method:'get',
  })
}

export function createOrderAPI ( data ) { //生成订单
  return request({
    url:`${requestPath.orderfg}/order/create-order`,
    method:'post',
    data
  })
}

export function getOrderDetailAPI ( params ) { //根据上面一个接口返回的数据获取订单详情
  return request({
    url:`${requestPath.orderfg}/order/` + params,
    method:'get',
  })
}

export function payAPI ( data ) { //支付跳转
  return request({
    url:`${requestPath.orderfg}/order/wap/pay/order`,
    method:'post',
    data
  })
}

export function cultureTabAPI ( params ) { //文化tab
  return request({
    url:`${requestPath.resourcefg}/diytype/get/tree`,
    method:'get',
    params
  })
}

export function getCultureListAPI ( params ) { //文化列表
  return request({
    url:`${requestPath.commonfg}/article/page`,
    method:'get',
    params
  })
}

export function getCultureDetailAPI ( params ) { //根据文化id获取详情
  return request({
    url:`${requestPath.commonfg}/article/` + params,
    method:'get',
  })
}

export function getFilePathAPI ( params ) { //获取文件地址
  return request({
    url:`${requestPath.file}/getFilePath`,
    method:'get',
    params
  })
}

export function getVideoFirstImgAPI ( params ) { //获取视频第一帧
  return request({
    url:`${requestPath.file}getVideoImg`,
    method:'get',
    params
  })
}

