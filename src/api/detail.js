import request from '@/utils/request';
import { requestPath ,uploadUrl} from '@/utils/global.js';

/*大师详情*/
export function getMasterDetailAPI(data){
  return request({
    url: `${requestPath.memberydcc}/member/${data}`,
    method: 'get',
  });
}


/* 大师详情在线课程 */
export function getOnlineListAPI(){
  return request({
    url: `${requestPath.resourcefgydcc}/course/get/list`,
    method: 'get',
  });
}
/* 大师贡献 */
export function getMasterConAPI(data){
  return request({
    url: `${requestPath.resourceydcc}/resource/get/resource?id=${data}`,
    method: 'get',
  });
}


/* 大师互动 */
export function getInteractionListAPI(data){
  return request({
    url: `${requestPath.sysydcc}/topic/get/list?id=${data}`,
    method: 'get',
  });
}

/* 是否关注 */
export function getCollectionAPI(data){
  return request({
    url: `${requestPath.resourceydcc}/member-collection/is-followed`,
    method: 'get',
    params:data
  });
}
/* 添加关注 */
export function saveCollectionAPI(data){
  return request({
    url: `${requestPath.resourceydcc}/member-collection/save`,
    method: 'post',
    data
  });
}
/* 取消关注 */
export function delCollectionAPI(data){
  return request({
    url: `${requestPath.resourceydcc}/member-collection/delete`,
    method: 'post',
    data
  });
}


/* 课程详情 */
export function getlessonDetailAPI(data){
  return request({
    url: `${requestPath.resourcefgydcc}/course/get/${data}`,
    method: 'get',
  });
}
/* 课程目录*/
export function getlessonListAPI(data){
  return request({
    url: `${requestPath.resourcefgydcc}/video/get/video/${data}`,
    method: 'get',
  });
}

/* 课程 */
// 评论列表
export function getCommentAPI(params){
  return request({
    url: `${requestPath.commonfg}/share/comment/page`,
    method: 'get',
    params
  });
}
// 课程保存评论
export function saveLenComAPI(data){
  return request({
    url: `${requestPath.commonfg}/share/comment/save`,
    method: 'post',
    data
  });
}
// 课程回复点赞
export function lenssonAgreeAPI(data){
  return request({
    url:`${requestPath.commonfg}/share/comment/thumbs-up?commentId=${data.commentId}&singin=${data.singin}&action=${data.action}`,
    method:'post',
  })
}
// 课程评论详情*/
export function lenCommentDetailAPI(data){
  return request({
    url: `${requestPath.commonfg}/share/comment/get/${data}`,
    method: 'get',
  });
}
// 课程保存评论
export function saveLenCommentAPI(data){
  return request({
    url: `${requestPath.commonfg}/share/comment/save`,
    method: 'post',
    data
  });
}


















/*特色疗法 药材详情*/
export function getArticleDetailAPI(data){
  return request({
    url: `${requestPath.resourcefg}/article-library/get/${data}`,
    method: 'get',
  });
}
/*图书详情*/
export function getBookDetailAPI(data){
  return request({
    url: `${requestPath.resourcefg}/ebook/get/${data}`,
    method: 'get',
  });
}

/*查询医家的推荐图书*/
export function getEbookListAPI(data){
  return request({
    url: `${requestPath.resourcefg}/ebook/page?pageNum=1&pageSize=2&authorId=${data}`,
    method: 'get',
  });
}
/*查询医家的推荐特色疗法*/
export function getArticleListAPI(data){
  return request({
    url: `${requestPath.resourcefg}/article-library/page?authorId=${data}&resourceType=39`,
    method: 'get',
  });
}
/*获取评分*/
export function getCountAPI(data){
  return request({
    url: `${requestPath.commonfg}/comment/count?resourceId=${data.resourceId}&resourceClass=${data.resourceClass}`,
    method: 'get',
  });
}
/*根据资源查评论*/
export function getCommentListAPI(data){
  return request({
    url: `${requestPath.commonfg}/comment/page?resourceId=${data.resourceId}&resourceClass=${data.resourceClass}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
  });
}
/*保存评论*/
export function saveCommentAPI(data){
  return request({
    url: `${requestPath.commonfg}/comment/save`,
    method: 'post',
    data
  });
}

/*评论详情*/
export function commentDetailAPI(data){
  return request({
    url: `${requestPath.commonfg}/comment/get/${data}`,
    method: 'get',
  });
}





