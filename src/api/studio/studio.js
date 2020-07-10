import request from '@/utils/request';
import { requestPath ,uploadUrl} from '@/utils/global.js';

// /*医家详情*/
// export function getMasterDetailAPI(data){
//   return request({
//     url: `${requestPath.memberydcc}/member/${data}`,
//     method: 'get',
//   });
// }


// 保存
export function saveAPI(data) { 
    return request({
        url: `${requestPath.memberydcc}/member/add`,
        method: 'post',
        data
    })
}
/* 修改 */
export function updateAPI(data) { 
    return request({
        url: `${requestPath.memberydcc}/member/update`,
        method: 'post',
        data
    })
}

export function uploadSchoolAPI(data) { /* 上传图片 */
    return request({
        url: `${requestPath.file}upload`,
        method: 'post',
        data
    })
}


export function getMemberStudio() { /* 认证状态 */
    return request({
        url: `${requestPath.memberydcc}/member/authenticate/status`,
        method: 'get',
    })
}
export function getMemberInfo() { /* 工作室用户信息 */
    return request({
        url: `${requestPath.memberydcc}/member/get/{oid}`,
        method: 'get',
    })
}
// 数据字典
export function getDataAPI(data) { /* 详情接口 */
    return request({
        url: `${requestPath.commonbg}/dictionary/page`,
        method: 'get',
        params:data
    })
  }