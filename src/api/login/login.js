import request from '@/utils/request.js';
import { requestPath } from '@/utils/global.js';

// 注册，用户名验重
export function getUserRepeatAPI(params) {
    return request({
        url: `${requestPath.member}/login/isExsitAccount?account=${params}`,
        method:'get',
    })
}
// 注册，手机号码验重
export function getPhoneRepeatAPI(params) {
    return request({
        url: `${requestPath.member}/login/isCheckPhone?phone=${params}`,
        method:'get',
    })
}
// 忘记密码，手机号验重   
export function getSetRepeatAPI(params) {
    return request({
        url: `${requestPath.member}/login/isExistencePhone?phone=${params}`,
        method:'get',
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
// 退出登录接口
export function loginOutAPI(data){
    return request({
        url:`${requestPath.member}/login/login-out`,
        method:'post',
        data:data
    })
}
// 获取注册验证码
export function getCodeAPI(params) {
    return request({
        url: `${requestPath.member}/login/code-phone?phone=${params.phone}&type=${params.type}`,
        method:'get',
    })
}
// 立即注册
export function RegisterAPI(data){
    return request({
        url:`${requestPath.member}/login/register`,
        method:'post',
        data:data
    })
}
// 密码登录
export function passwordLoginAPI(data){
    return request({
        url:`${requestPath.member}/login/login`,
        method:'post',
        data:data
    })
}
// 密码登录,验证手机号是否存在
export function passwordLoginCheckPhoneAPI(params){
    return request({
        url:`${requestPath.member}/login/isCheckPhone?phone=${params}`,
        method:'get',
    })
}
//获取图形验证码
export function getImgCodeAPI(params){
    return request({
        url:`${requestPath.member}/permissions/code`,
        method:'get'
    })
}
// 获取手机号登录验证码 
export function getLoginCodeAPI(params) {
    return request({
        url: `${requestPath.member}/permissions/login/code?phone=${params}`,
        method:'get',
    })
}
// 验证码快速登录
export function getSignInAPI(params) {
    return request({
        url: `${requestPath.member}/permissions/login/phone?account=${params.account}&code=${params.code}&channel=1`,
        method:'get',
    })
}
// 用户注册协议
export function getAgreementAPI(params){
    return request({
        url:`${requestPath.commonfg}/dictionary/register`,
        methods:'get',
    })
}
//重置密码获取验证码
export function getResetPasswordAPI(params) {
    return request({
        url: `${requestPath.member}/permissions/reset/password?phone=${params}`,
        method:'get',
    })
}
// 重置密码完成
export function completeAPI(data){
    return request({
        url:`${requestPath.member}/permissions/reset/password/verifymessage`,
        method:'post',
        data:data
    })
}

// 获取我的关注列表
export function getCollectAPI(params) {
    return request({
        url: `${requestPath.resourceydcc}/member-collection/page-my-collect?pageNum=${params.pageNum}&pageSize=${params.pageSize}&type=${params.type}`,
        method:'get',
    })
}
// 取消关注
export function getDeleteAPI(data){
    return request({
        url:`${requestPath.resourceydcc}/member-collection/delete`,
        method:'post',
        data:data
    })
}
// 在线出版列表
export function getOnlinePublishAPI(params) {
    return request({
        url: `${requestPath.memberydcc}/online-publisher/list`,
        method:'get',
    })
}
// 添加在线出版
export function savePublishAPI(data){
    return request({
        url:`${requestPath.memberydcc}/online-publisher/save`,
        method:'post',
        data:data
    })
}
// 获取民族列表
export function getNationTypeListAPI(params) {
    return request({
        url: `${requestPath.sysuserBg}/national-home-page/Type/list`,
        method:'get',
    })
}
// 验证手机验证码是否正确
export function getLoginValidatePhoneCodeAPI(params) {
    return request({
        url: `${requestPath.member}/login/validate-phone-code?phone=${params.phone}&code=${params.code}&type=0`,
        method:'get',
    })
}
// 验证手机验证码是否正确(找回密码)
export function getLoginValidatePhoneCodeTwoAPI(params) {
    return request({
        url: `${requestPath.member}/login/validate-phone-code?phone=${params.phone}&code=${params.code}&type=1`,
        method:'get',
    })
}