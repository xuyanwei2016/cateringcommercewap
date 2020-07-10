import request from '@/utils/request';
import { requestPath ,uploadUrl} from '@/utils/global.js';
// 保存
export function saveInfoAPI(data) { 
    return request({
        url: `${requestPath.memberydcc}/member/personal-center/update`,
        method: 'post',
        data
    })
}
// /* 修改 */
// export function updateAPI(data) { 
//     return request({
//         url: `${requestPath.memberydcc}/member/update`,
//         method: 'post',
//         data
//     })
// }

export function uploadSchoolAPI(data) { /* 上传图片 */
    return request({
        url: `${requestPath.file}upload/avatar`,
        method: 'post',
        data
    })
}


// export function getMemberStudio() { /* 认证状态 */
//     return request({
//         url: `${requestPath.memberydcc}/member/authenticate/status`,
//         method: 'get',
//     })
// }
// export function getMemberInfo() { /* 工作室用户信息 */
//     return request({
//         url: `${requestPath.memberydcc}/member/get/{oid}`,
//         method: 'get',
//     })
// }

export function getStudioInfoAPI(data) { /* 详情接口 */
    return request({
        url: `${requestPath.memberydcc}/member/get/{oid}`,
        method: 'get',
        params:data
    })
  }