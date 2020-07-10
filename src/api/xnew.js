import request from '@/utils/request';
import { requestPath ,uploadUrl} from '@/utils/global.js';

/*视频详情*/
export function getVideoDetailAPI(data){
  return request({
    url: `${requestPath.resourcefg}/ydcc/video/get/${data}`,
    method: 'get',
  });
}
/*修改学习次数*/
export function changeCountAPI(data){
  return request({
    url: `${requestPath.resourcefg}/ydcc/video/update/count/${data}`,
    method: 'get',
  });
}
/*话题列表*/
export function getTopicListAPI(data){
  return request({
    url: `sysuser/ydcc/topic/page`,
    method: 'get',
    params:data,
  });
}
/*添加话题*/
export function addTopicAPI(data){
  return request({
    url: `sysuser/ydcc/topic/save`,
    method: 'post',
    data,
  });
}
/*上传图片*/
export function saveImgAPI(data){
  return request({
    url:`${requestPath.file}upload`,
    method:'post',
    data,
  })
}
/*查看话题详情*/
export function getTopicDetailAPI(data){
  return request({
    url: `sysuser/ydcc/topic/${data}`,
    method: 'post',
    data,
  });
}
/*查询话题的评论*/
export function getCommentsListAPI(data){
  return request({
    url: `sysuser/ydcc/topic/all?pageNum=${data.pageNum}&pageSize=${data.pageSize}&id=${data.id}`,
    method: 'post',
  });
}
/*保存评论*/
export function saveTopicCommentAPI(data){
  return request({
    url: `sysuser/ydcc/topic/add`,
    method: 'post',
    data
  });
}
/*话题点赞*/
export function givethumbsUpAPI(data){
  return request({
    url: `sysuser/ydcc/topic/thumbs-up?commentId=${data.commentId}&singin=${data.singin}&action=${data.action}&type=${data.type}`,
    method: 'post',
  });
}
/*病例库列表*/
export function getCaseListAPI(data){
  return request({
    url: `resource/ydcc/topic-library/page`,
    method: 'get',
    params:data
  });
}
/*病例详情*/
export function getCaseDetailAPI(data){
  return request({
    url: `resource/ydcc/topic-library/{oid}?id=${data}`,
    method: 'get',
  });
}
/*确认开方*/
export function confimAPI(data){
  return request({
    url: `resource/ydcc/topic-library/confim`,
    method: 'get',
    params:data
  });
}
/*在线课程列表*/
export function getLessonAPI(data){
  return request({
    url: `resource/ydcc/resource/list/{name}`,
    method: 'get',
  });
}
/*当前登录用户的认证信息*/
export function getUserMessAPI(data){
  return request({
    url: `member/ydcc/member/get/{oid}`,
    method: 'get',
  });
}
/*获取关注数量*/
export function getCollectionNumAPI(data){
  return request({
    url: `resource/ydcc/member-collection/follow-count`,
    method: 'get',
  });
}
/*用户上传资源数量*/
export function getResourceNumAPI(data){
  return request({
    url: `resource/ydcc/resource/list`,
    method: 'get',
  });
}
/*用户上传资源列表*/
export function getResourceListAPI(data){
  return request({
    url: `resource/ydcc/resource/page`,
    method: 'get',
  });
}
/*病例详情中的收藏*/
export function saveCollectionAPI(data){
  return request({
    url: `resource/ydcc/member-collection/save`,
    method: 'post',
    data
  });
}
/*病例详情中的取消收藏*/
export function deleteCollectionAPI(data){
  return request({
    url: `resource/ydcc/member-collection/delete`,
    method: 'post',
    data
  });
}
/*查看评论详情*/
export function getTopicCommentDetailAPI(data){
  return request({
    url: `sysuser/ydcc/topic/list?id=${data}`,
    method: 'post',
  });
}
/*查看上传的资源数量*/
export function getResourceCountAPI(data){
  return request({
    url: `resource/ydcc/resource/count`,
    method: 'get',
  });
}
/*增加学习次数*/
export function increaseLearningNumAPI(data){
  return request({
    url: `resource/ydcc/resource/update/${data}`,
    method: 'get',
  });
}



