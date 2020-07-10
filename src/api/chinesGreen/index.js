import request from '@/utils/request.js';
import { requestPath } from '@/utils/global.js';

// 中国菜列表  
export function getMenuListAPI(data) {
    return request({
        url: `${requestPath.resourcefg}/menu/page?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
        method:'post',
        data:data
    })
}
// 忘记密码，提交
export function RegisterPasswordAPI(data){
    return request({
        url:`${requestPath.member}/login/update-password`,
        method:'post',
        data:data
    })
}
// 中国菜详情页
export function getMenuDetailAPI(params) {
    return request({
        url: `${requestPath.resourcefg}/menu/${params}`,
        method:'get',
    })
}
// 分类
export function getMenuLableListAPI(params) {
    return request({
        url: `${requestPath.resourcefg}/menu/lable/list`,
        method:'get',
        params
    })
}
// 中国菜详情页收藏量
export function getCollectionCountAPI(params) {
    return request({
        url: `${requestPath.resourcefg}/member-collection/collection-count`,
        method:'get',
        params
    })
}
//中国菜城市选择
export function getDiytypeListAPI(params) {
    return request({
        url: `${requestPath.resourcefg}/diytype/list`,
        method:'get',
        params
    })
}
// 获取默认地域
export function getDiytypeRegionAPI(params) {
    return request({
        url: `${requestPath.resourcefg}/diytype/get`,
        method:'get',
        params
    })
}
// 获取收藏量
export function getCollectionAPI(params) {
    return request({
        url: `${requestPath.resourcefg}/member-collection/collection-count?id=${params}`,
        method:'get',
        params
    })
}
// 添加收藏
export function saveCollectionAPI(data){
    return request({
        url:`${requestPath.resourcefg}/member-collection/batch/save`,
        method:'post',
        data:data
    })
}
// 删除收藏
export function deleteCollectionAPI(data){
    return request({
        url:`${requestPath.resourcefg}/member-collection/batch/delete`,
        method:'post',
        data:data
    })
}