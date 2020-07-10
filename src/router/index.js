import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
// const router = new Router({
//     scrollBehavior: () => ({ y: 0 }),
//     routes: [ ]
// })
export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            meta: '首页',
            component: () =>
                import ('@/views/home.vue'),
        }, {
            path: '/sySearchPage',
            name: 'sySearchPage',
            meta: '名人堂',
            component: () =>
                import ('@/views/sySearchPage/sySearchPage.vue'),
        },{
            path: '/cookMaster',
            name: 'cookMasterList',
            meta: '名人堂',
            component: () =>
                import ('@/views/cookMaster/cookMasterList.vue'),
        }, {
            path: '/cookMasterDetail',
            name: 'cookMasterDetail',
            meta: '详情',
            component: () =>
                import ('@/views/cookMasterDetail/cookMasterDetail.vue'),
        }, {
            path: '/masterAndApprentice',
            name: 'masterAndApprentice',
            meta: '师徒关系',
            component: () =>
                import ('@/views/masterAndApprentice/masterAndApprentice.vue'),
        }, {
            path: '/bookListNew',
            name: 'bookList',
            meta: '图书列表',
            component: () =>
                import ('@/views/bookListNew/booklist.vue'),
        }, {
            path: '/searchBookResults',
            name: 'searchBookResults',
            meta: '图书列表',
            component: () =>
                import ('@/views/searchBookResults/searchBookResults.vue'),
        }, {
            path: '/bookDetailNew',
            name: 'bookDetailNew',
            meta: '详情',
            component: () =>
                import ('@/views/bookDetailNew/bookDetailNew.vue'),
        }, {
            path: '/eBookDetail',
            name: 'eBookDetail',
            meta: '详情',
            component: () =>
                import ('@/views/eBookDetail/eBookDetail.vue'),
        }, {
            path: '/tryReadBook',
            name: 'tryReadBook',
            meta: '试读',
            component: () =>
                import ('@/views/tryReadBook/tryReadBook.vue'),
        }, {
            path: '/searchPage',
            name: 'searchPage',
            meta: '搜索',
            component: () =>
                import ('@/views/searchPage/searchPage.vue'),
        }, {
            path: '/addComment',
            name: 'addComment',
            meta: '添加评论',
            component: () =>
                import ('@/views/addComment/addComment.vue'),
        }, {
            path: '/allComments',
            name: 'allComments',
            meta: '全部评论',
            component: () =>
                import ('@/views/allComments/allComments.vue'),
        }, {
            path: '/shopCar',
            name: 'shopCar',
            meta: '购物车',
            component: () =>
                import ('@/views/shopCar/shopCar.vue'),
        }, {
            path: '/confirmOrder',
            name: 'confirmOrder',
            meta: '购物车',
            component: () =>
                import ('@/views/confirmOrder/index.vue'),
        }, {
            path: '/addressList',
            name: 'addressList',
            meta: '选择地址',
            component: () =>
                import ('@/views/addressList/index.vue'),
        }, {
            path: '/chosePayType',
            name: 'chosePayType',
            meta: '选择支付',
            component: () =>
                import ('@/views/chosePayType/index.vue'),
        }, {
            path: '/cultureDetail',
            name: 'cultureDetail',
            meta: '文化大观',
            component: () =>
                import ('@/views/cultureDetail/index.vue'),
        }, {
            path: '/culture',
            name: 'culture',
            meta: '文化大观详情',
            component: () =>
                import ('@/views/culture/index.vue'),
        }, {
            path: '/tetx',
            name: 'tetx',
            meta: '测试',
            component: () =>
                import ('@/views/tetx.vue'),
        }, {
            path: '/share',
            name: 'share',
            meta: '测试',
            component: () =>
                import ('@/components/share.vue'),
        }, {
            path: '/hello',
            name: 'hello',
            meta: '测试',
            component: () =>
                import ('@/components/HelloWorld.vue'),
        },
        {
            path: '/search',
            name: 'search',
            meta: '搜索',
            component: () =>
                import ('@/views/search/index.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('@/views/login/register/register')
        },
        {
            path: '/registerAgr',
            name: 'registerAgr',
            component: () =>
                import ('@/views/login/registerAgr/registerAgr')
        },
        {
            path: '/loginNumber',
            name: 'loginNumber',
            component: () =>
                import ('@/views/login/loginNumber/loginNumber')
        },
        {
            path: '/loginPassword',
            name: 'loginPassword',
            component: () =>
                import ('@/views/login/loginPassword/loginPassword')
        },
        {
            path: '/resetOne',
            name: 'resetOne',
            component: () =>
                import ('@/views/login/resetOne/resetOne')
        },
        {
            path: '/setPassword',
            name: 'setPassword',
            component: () =>
                import ('@/views/login/setPassword/setPassword')
        },
        {
            path: '/systemMessage',
            name: 'systemMessage',
            component: () =>
                import ('@/views/systemMessage/systemMessage')
        },
        {
            path: '/systemMessageDet',
            name: 'systemMessageDet',
            component: () =>
                import ('@/views/systemMessageDet/systemMessageDet')
        },
        {
            path: '/setting',
            name: 'setting',
            component: () =>
                import ('@/views/changePassword/setting/setting')
        },
        {
            path: '/settingPassword',
            name: 'settingPassword',
            component: () =>
                import ('@/views/changePassword/settingPassword/settingPassword')
        },
        {
            path: '/settingCode',
            name: 'settingCode',
            component: () =>
                import ('@/views/changePassword/settingCode/settingCode')
        },
        {
            path: '/settingCodeNew',
            name: 'settingCodeNew',
            component: () =>
                import ('@/views/changePassword/settingCodeNew/settingCodeNew')
        },
        {
            path: '/broken',
            name: 'broken',
            meta: '无网络',
            component: () =>
                import ('@/views/broken/index.vue'),
        },
        {
            path: '/read',
            name: 'read',
            meta: '文章阅读页',
            component: () =>
                import ('@/views/read/index.vue'),
        },
        {
            path: '/bookDetail',
            name: 'bookDetail',
            meta: '图书详情',
            component: () =>
                import ('@/views/bookDetail/index.vue'),
        },
        {
            path: '/bookRead',
            name: 'bookRead',
            meta: '图书阅读页',
            component: () =>
                import ('@/views/bookRead/index.vue'),
        },
        {
            path: '/pdf',
            name: 'pdf',
            meta: 'PDF阅读页',
            component: () =>
                import ('@/views/pdf/index.vue'),
        },
        {
            path: '/comment',
            name: 'comment',
            meta: '全部评论',
            component: () =>
                import ('@/views/comment/index.vue'),
        },
        {
            path: '/commentDetail',
            name: 'commentDetail',
            meta: '评论详情',
            component: () =>
                import ('@/views/commentDetail/index.vue'),
        },
        {
            path: '/toEvaluate',
            name: 'toEvaluate',
            meta: '我要评价',
            component: () =>
                import ('@/views/toEvaluate/index.vue'),
        },

        /* 大师列表 详情 */
        {
            path: '/master',
            name: 'master',
            meta: '大师',
            component: () =>
                import ('@/views/master/index.vue'),
        },
        {
            path: '/masterDetail',
            name: 'masterDetail',
            meta: '大师详情',
            component: () =>
                import ('@/views/master/masterDetail.vue'),
        },

        /* 课程详情 */
        {
            path: '/lessonDetail',
            name: 'lessonDetail',
            meta: '课程详情',
            component: () =>
                import ('@/views/details/lessonDetail.vue'),
        },
        /* 课程全部评论 */
        {
            path: '/lenssonComment',
            name: 'lenssonComment',
            meta: '全部评论',
            component: () =>
                import ('@/views/details/lesson/lenComment.vue'),
        },
        {
            path: '/lenCommentDetail',
            name: 'lenCommentDetail',
            meta: '评论详情',
            component: () =>
                import ('@/views/details/lesson/lenDetail.vue'),
        },
        {
            path: '/toLenEva',
            name: 'toLenEva',
            meta: '我要评价',
            component: () =>
                import ('@/views/details/lesson/evaluate.vue'),
        },



    // {
    //   path: '/therapy',
    //   name: 'therapy',
    //   meta:'特色疗法',
    //   component: () => import('@/views/therapy/index.vue'),
    // },
    {
      path: '/materials',
      name: 'materials',
      meta:'药材',
      component: () => import('@/views/therapy/index.vue'),
    },
    {
      path: '/bookList',
      name: 'bookList',
      meta:'图书',
      component: () => import('@/views/bookList/index.vue'),
    },
    /* 搜索资源列表 */
    {
      path: '/list',
      name: 'list',
      meta:'资源列表',
      component: () => import('@/views/list/index.vue'),
    },
    /* 我的 */
    {
      path: '/my',
      name: 'my',
      meta:'我的',
      component: () => import('@/views/my/index.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      meta:'个人信息',
      component: () => import('@/views/my/edit.vue'),
    },
    {
      path: '/order',
      name: 'order',
      meta:'我的订单',
      component: () => import('@/views/order/index.vue'),
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      meta:'订单详情',
      component: () => import('@/views/orderDetail/index.vue'),
    },
    {
      path: '/discuss',
      name: 'discuss',
      meta:'全部评论',
      component: () => import('@/views/discuss/discuss.vue'),
    },
    {
      path: '/opinion',
      name: 'opinion',
      meta:'意见反馈',
      component: () => import('@/views/opinion/opinion.vue'),
    },
    {
        path: '/myLike',
        name: 'myLike',
        meta:'我的喜欢',
        component: () => import('@/views/myLike/myLike.vue'),
    },
    {
        path: '/myBook',
        name: 'myBook',
        meta:'我的书架',
        component: () => import('@/views/myBook/myBook.vue'),
    },
    {
      path: '/siteList',
      name: 'siteList',
      meta:'地址管理',
      component: () => import('@/views/siteManagement/siteList.vue'),
    },
    {
      path: '/addSite',
      name: 'addSite',
      meta:'新增地址',
      component: () => import('@/views/siteManagement/addSite.vue'),
    },
    {
      path: '/editeSite',
      name: 'editeSite',
      meta:'修改地址',
      component: () => import('@/views/siteManagement/editeSite.vue'),
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      meta:'联系我们',
      component: () => import('@/views/contactUs/index.vue'),
    },
    {
      path: '/attestation',
      name: 'attestation',
      meta:'选择认证',
      component: () => import('@/views/works/attestation/attestation.vue'),
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      meta:'个人认证',
      component: () => import('@/views/works/attestationDetails/userDetail.vue'),
    },
    {
      path: '/firmDetail',
      name: 'firmDetail',
      meta:'企业认证',
      component: () => import('@/views/works/attestationDetails/firmDetail.vue'),
    },
    {
      path: '/protocol',
      name: 'protocol',
      meta:'协议',
      component: () => import('@/views/works/protocol/protocol.vue'),
    },
    {
      path: '/worksList',
      name: 'worksList',
      meta:'我的作品',
      component: () => import('@/views/works/worksList/worksList.vue'),
    },
    {
      path: '/worksOne',
      name: 'worksOne',
      component: () => import('@/views/works/worksOne/worksOne.vue'),
      meta:{
        title:'发布（1/3）',
        keepAlive:true
      },
    },
    {
      path: '/cuisineList',
      name: 'cuisineList',
      meta:'选择菜系',
      component: () => import('@/views/works/worksOne/cuisineList.vue'),
    },
    {
      path: '/worksTwo',
      name: 'worksTwo',
      meta:'发布（2/3）',
      component: () => import('@/views/works/worksTwo/worksTwo.vue'),
    },
    {
      path: '/worksThree',
      name: 'worksThree',
      meta:'发布（3/3）',
      component: () => import('@/views/works/worksThree/worksThree.vue'),
    },
    /* 我的收藏 */
    {
      path: '/collection',
      name: 'collection',
      meta:' 我的收藏',
      component: () => import('@/views/collection/index.vue'),
    },
    {
      path: '/shelf',
      name: 'shelf',
      meta:' 我的书架',
      component: () => import('@/views/collection/index.vue'),
    },
    {
      path: '/myComment',
      name: 'myComment',
      meta:' 我的评论',
      component: () => import('@/views/myComment/index.vue'),
    },
    {
      path: '/setPassword1',
      name: 'setPassword1',
      meta:'设置',
      component: () => import('@/views/setPassword/index.vue'),
    },
    {
      path: '/modifyPass',
      name: 'modifyPass',
      meta:'修改密码',
      component: () => import('@/views/modifyPass/index.vue'),
    },
    {
      path: '/phoneVerification',
      name: 'phoneVerification',
      meta:'手机验证',
      component: () => import('@/views/phoneVerification/index.vue'),
    },
    {
      path: '/phoneVerification2',
      name: 'phoneVerification2',
      meta:'手机验证',
      component: () => import('@/views/phoneVerification/index.vue'),
    },
    {
      path: '/messages',
      name: 'messages',
      meta:'系统消息',
      component: () => import('@/views/messages/index.vue'),
    },
    {
      path: '/messageDetail',
      name: 'messageDetail',
      meta:'系统消息',
      component: () => import('@/views/messageDetail/index.vue'),
    },
    {
      path: '/setPassword2',
      name: 'setPassword2',
      meta:'设置密码',
      component: () => import('@/views/setPassword/two.vue'),
    },

        /* 工作室 */
        {
            path: '/createStudio',
            name: 'createStudio',
            meta: '创建工作室',
            component: () =>
                import ('@/views/studio/createStudio.vue'),
        },
        {
            path: '/viewStudio',
            name: 'viewStudio',
            meta: '认证',
            component: () =>
                import ('@/views/studio/viewStudio.vue'),
        },
        {
            path: '/studioType',
            name: 'studioType',
            meta: '认证类型',
            component: () =>
                import ('@/views/studio/studioType.vue'),
        },
        {
            path: '/typeDoctor',
            name: 'typeDoctor',
            meta: '医师资格认证',
            component: () =>
                import ('@/views/studio/type/typeDoctor.vue'),
        }, {
            path: '/typeStudent',
            name: 'typeStudent',
            meta: '医学院师生认证',
            component: () =>
                import ('@/views/studio/type/typeStudent.vue'),
        }, {
            path: '/typeReal',
            name: 'typeReal',
            meta: '实名认证',
            component: () =>
                import ('@/views/studio/type/typeReal.vue'),
        },
        /* 工作室个人中心 */
        {
            path: '/myStudio',
            name: 'myStudio',
            meta: '我的主页',
            component: () =>
                import ('@/views/studio/my/index.vue'),
        },
        {
            path: '/editStudio',
            name: 'editStudio',
            meta: '修改',
            component: () =>
                import ('@/views/studio/my/edit.vue'),
        },

        /* 首页 */
        // {
        //   path: '/index',
        //   name: 'index',
        //   meta:'首页',
        //   component: () => import('@/views/index.vue'),
        // },



        /*视频详情 X*/
        {
            path: '/videoDetail',
            name: 'videoDetail',
            meta: '视频详情',
            component: () =>
                import ('@/views/videoDetail/index.vue'),
        },
        /*互动详情 X*/
        {
            path: '/interactionDetail',
            name: 'interactionDetail',
            meta: '话题正文',
            component: () =>
                import ('@/views/interactionDetail/index.vue'),
        },
        /*个人工作室 X*/
        {
            path: '/personalStudio',
            name: 'personalStudio',
            meta: '工作室',
            component: () =>
                import ('@/views/personalStudio/index.vue'),
        },
        /*资源分享 X*/
        {
            path: '/personalStudio',
            name: 'personalStudio',
            meta: '工作室',
            component: () =>
                import ('@/views/personalStudio/index.vue'),
        },
        /*发布的资源 X*/
        {
            path: '/releaseRes',
            name: 'releaseRes',
            meta: '发布的资源',
            component: () =>
                import ('@/views/releaseRes/index.vue'),
        },
        /*在线课程 X*/
        {
            path: '/lineLesson',
            name: 'lineLesson',
            meta: '在线课程',
            component: () =>
                import ('@/views/lineLesson/index.vue'),
        },
        /*话题列表 X*/
        {
            path: '/topicList',
            name: 'topicList',
            meta: '发布的话题',
            component: () =>
                import ('@/views/topicList/index.vue'),
        },
        /*添加话题 X*/
        {
            path: '/addTopic',
            name: 'addTopic',
            meta: '添加话题',
            component: () =>
                import ('@/views/topicList/add.vue'),
        },
        /*病例库 X*/
        {
            path: '/caseList',
            name: 'caseList',
            meta: '中国菜',
            component: () =>
                import ('@/views/case/index.vue'),
        },
        /*病例详情 X*/
        {
            path: '/detail',
            name: 'detail',
            meta: '中国菜详情',
            component: () =>
                import ('@/views/case/detail.vue'),
        },
        {
            path: '/classify',
            name: 'classify',
            meta: '中国菜分类',
            component: () =>
                import ('@/views/case/classify.vue'),
        },
        {
            path: '/cityCase',
            name: 'cityCase',
            meta: '中国菜选择城市',
            component: () =>
                import ('@/views/case/cityCase.vue'),
        },
        {
            path: '/searchCase',
            name: 'searchCase',
            meta: '检索结果',
            component: () =>
                import ('@/views/case/searchCase.vue'),
        },
        {
            path: '/caseComment',
            name: 'caseComment',
            meta: '提交留言',
            component: () =>
                import ('@/views/case/caseComment.vue'),
        },
        // 经典
        {
            path: '/sutra',
            name: 'sutra',
            meta: '经典',
            component: () =>
                import ('@/views/classics/sutra/sutra.vue'),
        },
        {
            path: '/yian',
            name: 'yian',
            meta: '医案',
            component: () =>
                import ('@/views/classics/yian/yian.vue')
        },
        {
            path: '/yaowu',
            name: 'yaowu',
            meta: '药物',
            component: () =>
                import ('@/views/classics/yaowu/yaowu.vue')
        },
        {
            path: '/fangji',
            name: 'fangji',
            meta: '方剂',
            component: () =>
                import ('@/views/classics/fangji/fangji.vue')
        },
        {
            path: '/yizhu',
            name: 'yizhu',
            meta: '医著',
            component: () =>
                import ('@/views/classics/yizhu/yizhu.vue')
        },
        {
            path: '/yangsheng',
            name: 'yangsheng',
            meta: '养生保健',
            component: () =>
                import ('@/views/classics/yangsheng/yangsheng.vue')
        },
        {
            path: '/screen',
            name: 'screen',
            meta: '筛选',
            component: () =>
                import ('@/views/classics/screen.vue')
        },
        // 我的关注
        {
            path: '/attention',
            name: 'attention',
            meta: '我的关注',
            component: () =>
                import ('@/views/attention/attention.vue'),
        },
        // 在线出版
        {
            path: '/publishOnline',
            name: 'publishOnline',
            meta: '在线出版',
            component: () =>
                import ('@/views/publishOnline/publishOnline.vue'),
        },
        {
            path: '/publishOnlineAdd',
            name: 'publishOnlineAdd',
            meta: '在线出版',
            component: () =>
                import ('@/views/publishOnlineAdd/publishOnlineAdd.vue'),
        },
    ],
    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //       return savedPosition
    //     } else {
    //       return { x: 0, y: 0 }
    //     }
    //   },
})
