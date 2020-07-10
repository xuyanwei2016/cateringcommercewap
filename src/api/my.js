/*个人中心*/
import request from '@/utils/request';
import { requestPath ,uploadUrl} from '@/utils/global.js';

/*获取会员信息*/
export function getMemberAPI(data){
  return request({
    url:`${requestPath.member}/member/get/memberInfo`,
    method:'get',
  })
}
/*我的收藏列表*/
export function getCollectAPI(data){
  return request({
    url:`${requestPath.resourceydcc}/member-collection/get/list`,
    method:'get',
    params:data,
  })
}
/*添加收藏*/
export function addCollectAPI(data){
  return request({
    url:`${requestPath.resourcefg}/member-collection/batch/save`,
    method:'post',
    data:data,
  })
}
/*删除收藏*/
export function delCollectAPI(data){
  return request({
    url:`${requestPath.resourcefg}/member-collection/batch/delete`,
    method:'post',
    data:data,
  })
}
/*是否收藏*/
export function isCollectAPI(data){
  return request({
    url:`${requestPath.resourcefg}/member-collection/check-is-collect`,
    method:'get',
  })
}
/*我的评论列表*/
export function getCommentListAPI(data){
  return request({
    url:`${requestPath.commonfg}/comment/personal?goodsType=2-1&pageNum=1&pageSize=15`,
    method:'get',
  })
}
/*保存评论*/
export function addCommentAPI(data){
  return request({
    url:`${requestPath.commonfg}/comment/save`,
    method:'post',
    data
  })
}
/*我的书架列表*/
export function getShelfListAPI(data){
  return request({
    url:`${requestPath.orderfg}/order/page/buy?pageNum=1&pageSize=15&goodsType=2-1`,
    method:'get',
    params:data,
  })
}
/*我的订单列表*/
export function getOrderListAPI(data){
  return request({
    url:`${requestPath.orderfg}/order/page`,
    method:'get',
    params:data,
  })
}
/*我的订单列表详情*/
export function getOrderDetailAPI(data){
  return request({
    url:`${requestPath.orderfg}/order/${data}`,
    method:'get',
  })
}
// 取消订单
export function deleteOrderAPI(data){
  return request({
    url:`${requestPath.orderfg}/order/update/${data}/cancel`,
    method:'post',
    data,
  })
}
/*修改密码*/
export function modifyPasswordAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/reset/old/password`,
    method:'post',
    data,
  })
}

/*验证手机发送验证码*/
export function getCodeAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/verify/code?phone=${data.phone}&action=${data.action}`,
    method:'get',
  })
}

/*验证手机-第二步*/
export function verifyPhoneAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/verify/phone?`+(data.oldPhone?   `oldPhone=${data.oldPhone}&`:'')+`phone=${data.phone}&code=${data.code}`,
    method:'post',
  })
}
/*验证手机 第三 POST /wap/permissions/verify/save*/
export function verifySaveAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/verify/save?`+(data.oldPhone?   `oldPhone=${data.oldPhone}&`:'')+`phone=${data.phone}&code=${data.code}`,
    method:'post',
  })
}
/*验证手机号 GET /wap/permissions/isExist/phone*/
export function verifyPhoneNumAPI(data){
  return request({
    url:`${requestPath.memberWap}/permissions/isExist/phone?phone=${data.phone}&action=${data.action}`,
    method:'get',
  })
}

/*上传图片*/
export function saveImgAPI(data){
  return request({
    url:`${requestPath.file}upload`,
    method:'post',
    data,
  })
}
/*上传视频*/
export function saveVideoAPI(data){
  return request({
    url:`${requestPath.file}upload`,
    method:'post',
    data,
  })
}
/*保存信息*/
export function saveInfoAPI(data){
  return request({
    url:`${requestPath.member}/member/update`,
    method:'post',
    data,
  })
}
/*删除评论*/
export function deleteCommentAPI(data){
  return request({
    url:`${requestPath.commonfg}/comment/delete/${data}`,
    method:'post',
  })
}
/*删除个人信息*/
export function deletePMAPI(data){
  return request({
    url:`${requestPath.member}/pm/delete/${data}`,
    method:'post',
  })
}

// 个人中心提交意见反馈
export function feedbackSaveMAPI(data){
  return request({
    url:`${requestPath.commonfg}/feedback/save`,
    method:'post',
    data
  })
}
// 新增地址
export function shoppingSaveAPI(data){
  return request({
    url:`${requestPath.resourcefg}/shopping-address/save`,
    method:'post',
    data
  })
}
// 新增地址,地区列表
export function getAreaTreeAPI(data){
  return request({
    url:`${requestPath.commonfg}/area/list`,
    method:'get',
  })
}
// 收货地址列表
export function getShoppingPageAPI(data){
  return request({
    url:`${requestPath.resourcefg}/shopping-address/page?pageNum=1&pageSize=50&orderBy=createTime desc`,
    method:'get',
  })
}
// 修改收货地址详情
export function getShoppingDetailAPI(data){
  return request({
    url:`${requestPath.resourcefg}/shopping-address/get/${data}`,
    method:'get',
  })
}
// 删除地址
export function deleteCityAPI(data){
  return request({
    url:`${requestPath.resourcefg}/shopping-address/batch/delete`,
    method:'post',
    data
  })
}
// 设为默认地址
export function updateDefualtAPI(data){
  return request({
    url:`${requestPath.resourcefg}/shopping-address/update/defualt`,
    method:'post',
    data
  })
}
// 联系我们
export function getContacuUsAPI(params){
  return request({
    url:`${requestPath.commonfg}/dictionary/dictionary?code=${params}`,
    method:'get',
  })
}
// 发布作品，获取技法
export function getCookingListAPI(params){
  return request({
    url:`${requestPath.resourcefg}/menu/get/cooking`,
    method:'get',
  })
}
// 发布作品，获取地域
export function getSipleListAPI(params){
  return request({
    url:`${requestPath.resourcefg}/diytype/list`,
    method:'get',
  })
}
// 发布作品
export function mymenuSaveAPI(data){
  return request({
    url:`${requestPath.resourcefg}/mymenu/save`,
    method:'post',
    data
  })
}
// 个人和机构认证
export function approveSaveAPI(data){
  return request({
    url:`${requestPath.member}/member/approve/save/approve`,
    method:'post',
    data
  })
}
// 获取发布的作品列表
export function getMymenuPageListAPI(params){
  return request({
    url:`${requestPath.resourcefg}/mymenu/page?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method:'get',
  })
}

// 我的喜欢
export function getMemberPageListAPI(params){
  return request({
    url:`${requestPath.resourcefg}/member-collection/page?pageNum=${params.pageNum}&pageSize=${params.pageSize}&goodsType=${params.goodsType}`,
    method:'get',
  })
}
// 我的喜欢 直通书城
export function getMemberWapPageListAPI(params){
  return request({
    url:`${requestPath.resourcefg}/member-collection/wap/page?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method:'get',
  })
}
// 我的书架
export function getMyCoursePageListAPI(params){
  return request({
    url:`${requestPath.resourcefg}/my/course/page?pageNum=${params.pageNum}&pageSize=${params.pageSize}&resourceType=${params.resourceType}`,
    method:'get',
  })
}
// 我的  我的评论
export function getPersonalPageListAPI(params){
  return request({
    url:`${requestPath.commonfg}/comment/personal?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method:'get',
  })
}
// 根据memberId查询厨师认证信息
export function getmemberIdAPI(params){
  return request({
    url:`${requestPath.memberbg}/member/get/member/approve?memberId=${params}`,
    method:'get',
  })
}
// 根据基础信息id查询认证状态
export function getApproveAPI(params){
  return request({
    url:`${requestPath.member}/member/approve/${params}`,
    method:'get',
  })
}