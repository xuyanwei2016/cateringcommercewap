<template>
  <!--医家详情-->
  <div class="masterDetail">
      <!-- 头部详情 -->
      <div class="top">
        <div class="DetailTit">
            <div class="back" @click="$router.go(-1)">
                <img src="../../assets/img/list/back.png" alt="">
            </div>
            <div class="set">
                <img src="../../assets/img/list/share.png" alt="" @click="isShowSize=!isShowSize,isShow=2">
            </div>
        </div>
        <div class="detail">
            <div class="detail-ava">
                <img  class="ava-img" :src="imgLink(detail.cover)" alt="" v-if="detail.cover">
                <img class="ava-img" src="@/assets/img/personal/port.png" alt="" v-else>
                <span class="ava-name">{{aType[detail.authenticationType]}}</span>
            </div>
            <div class="detail-name">{{detail.name}}</div>
            <div class="detail-con">
                <div class="d-master">师承
                    <span>{{detail.master?detail.master:"无"}}</span>
                </div>
                <span>|</span>
                <div class="d-follow">
                    <span>关注</span>2034次
                </div>
            </div>
            <div class="detail-follow">
                <span v-if="collectionStatus == '0'" @click="changeAdd('1')">关注</span>
                <span v-else-if="collectionStatus == '1'" @click="changeDel('0')">已关注</span>
            </div>
        </div>
      </div>
    
    <!-- 大师简介 -->
    <div class="synopsis">
      <div class="synopsis-bg">
        <div class="synopsis-con">
            <h2 class="con-title">
                <span>大师简介</span>
            </h2>
            <p ref="cont" :id="`synopsis`" v-if="isShowMore">{{Ellipsis(`synopsis`, 4, detail.synopsis, '.25')}}</p>
            <p v-if="!isShowMore">{{detail.synopsis}}</p>
            <div class="look-more" v-if="isShowMore&&isMore" @click="isShowMore=!isShowMore">
              查看更多
            </div>
            <div class="more" v-if="!isShowMore" @click="isShowMore=!isShowMore">
              收起查看
            </div>
        </div>
      </div>
    </div>

    <!-- 大师贡献 -->
    <div class="same-title">
        <span>大师贡献</span>
    </div>
    <div class="screen">
        <div class="sort">
          <span v-for="(item,index) in screenList" :key="index" :class="active==index?'active':''" @click="changeType(index,item)">{{item.name}}</span>
        </div>
    </div>
    <ul class="onlineList">
      <li v-for="(item,index) in masterList" :key="index">
        <div class="video-img width110"  @click="linkHref(item)">
          <img  class="bottom-img" :src="imgLink(item.cover)" alt="" v-if="item.cover">
          <img class="bottom-img" src="../../assets/img/list/share.png" alt="" v-else>
        </div>
        <div class="info">
            <h1 @click="linkHref(item)" v-html="item.title"></h1>
            <div class="other">
                <span class="info-free" v-if="item.priceOption==0">免费</span>
                <span class="info-price" v-else>￥{{item.price?item.price:'0.00'}}</span>
                <!-- <span class="info-num">{{item.num}}人浏览过</span> -->
            </div>
        </div>
      </li>
    </ul>

    <!-- 在线课程 -->
    <div class="top-line"></div>
    <div class="same-title">
        <span>在线课程</span>
    </div>
    <ul class="onlineList">
      <li v-for="(item,index) in onlineList" :key="index">
        <div class="video-img"  @click="linkDetail('lessonDetail',item.id)">
          <!-- <img :src="imgLink(item.img)" alt=""> -->
          <img class="bottom-img" src="../../assets/img/list/share.png" alt="">
          <img class="top-img" src="" alt="">
        </div>
        <div class="info">
            <h1 @click="linkDetail('lessonDetail',item.id)" v-html="item.name"></h1>
            <div class="other">
                <span class="info-num">共{{item.classHour?item.classHour:0}}节</span>
                <span v-if="item.priceOption==0">免费</span>
                <span v-else class="info-price">￥{{item.realPrice?item.realPrice:'0.00'}}</span>
            </div>
        </div>
      </li>
    </ul>

    <!-- 互动专区 -->
    <div class="top-line"></div>
    <div class="same-title">
        <span>互动专区</span>
    </div>
    <ul class="interaction">
      <li v-for="(item,index) in interactionList" :key="index">
        <div class="i-info">
          <div class="info">
            <h1 v-html="item.name" @click="linkDetail('interactionDetail',item.id)"></h1>
            <p :id="`description${index}`">{{Ellipsis(`description${index}`,2,item.content,'.19')}}</p>
            <div class="other">
              <h3 v-if="item.createTime">{{item.createTime}}</h3>
            </div>
          </div>
        </div>
      </li>
    </ul>


    <div class="setFont" v-if="isShowSize" @click="isShowSize=false">
      <!--<div class="setFontSize" @click.stop="" v-if="isShow==1">
        <h1>字号大小</h1>
        <ul>
          <li :class="curSize==indexSize?'active':''" v-for="(itSize,indexSize) in fontSIZE" :key="indexSize">{{itSize}}</li>
        </ul>
      </div>-->
      <div class="share" @click.stop="">
        <ul>
          <!--<li>
            <img src="../../assets/img/list/wx.png" alt="">
            <span>微信好友</span>
          </li>
          <li>
            <img src="../../assets/img/list/pyq.png" alt="">
            <span>朋友圈</span>
          </li>-->
          <li @click="shareFn('QQ')">
            <img src="../../assets/img/list/qq.png" alt="">
            <span>QQ空间</span>
          </li>
          <li @click="shareFn('weibo')">
            <img src="../../assets/img/list/wb.png" alt="">
            <span>微博</span>
          </li>
        </ul>
        <h1>取消</h1>
      </div>

    </div>


  </div>
</template>

<script>
import {getMasterDetailAPI, getOnlineListAPI, getCollectionAPI,saveCollectionAPI,delCollectionAPI,getMasterConAPI,getInteractionListAPI} from '@/api/detail.js';
import { baseUrl } from '@/utils/global.js';

export default {
name: 'HelloWorld',
data() {
    return {
        id: this.$route.query.id,
        detail: {faceImg: null},
        articleLsit: [],
        ebookList: [],
        isShowSize: false,
        isShowMore: true,
        isMore: true,
        baseUrl:baseUrl,
        aType:{
          '0':'医师认证',
          '1':'医学院师生认证',
          '2':'实名认证'
        },
        active:0,
        screenList:[],
        active:'0',
        masterList:[],
        onlineList:[],
        interactionList:[],
        collectionStatus:"0",
        typeObj:{
          'ydcc_bl':'病例',
          'ydcc_ysbj':'养生保健',
          'ydcc_thesis':'论文',
          'ydcc_tslf':'特色疗法', 
          'ydcc_zyhy':'中医会议', 
          'ydcc_pf':'偏方', 
          'ydcc_story':'故事', 
          'ydcc_other':'其他'
        },
        hrefType:{
          'ydcc_bl':'caseDetail',
          'ydcc_ysbj':'read',
          'ydcc_thesis':'read',
          'ydcc_tslf':'read', 
          'ydcc_zyhy':'read', 
          'ydcc_pf':'read', 
          'ydcc_story':'read', 
          'ydcc_other':'read'
        }
    }
},
created() {
    this.getDetail();
    
    this.getOnlineList()
},
watch: {},
computed: {
    token() {  //通过方法访问
    return this.$store.state.token;
    },
},
methods: {
    /*跳转到详情*/
    linkDetail(link, id) {
      this.$router.push({
          path: link, query: {
          id: id ? id : 0
          }
      })
    },
    linkHref(item){
      this.$router.push({
          path: this.hrefType[item.type], query: {
          id: item.id
          }
      })
      console.log(item)
    },

    /*获取详情*/
    getDetail() {
      getMasterDetailAPI(this.id).then(res => {
        if (res.data.status) {
        this.detail = res.data.data;
        let id = this.detail.memberId
        console.log(this.detail)
        this.getCollection(this.detail.id)
        this.getMasterList(id)
        this.getInteractionList(id)
        // this.detail.description = this.detail.description.replace(/<[^>]+>/g, "");
        // this.$nextTick(() => {
        //     this.$nextTick(() => {
        //     if (this.$refs.cont.textContent.endsWith('...') && !this.detail.description.endsWith('...')) {
        //         this.isShowMore = true;
        //         this.isMore = true;
        //         /*this.isMore=true;*/
        //     } else {
        //         this.isMore = false;
        //     }
        //     })
        // })
        // this.getArticleList();
        // this.getEbookList();
        }
      })
    },

    /* 是否被关注 */
    getCollection(id){
      let data ={
        followId:id,
        followType:2-6
      }
      getCollectionAPI(data).then(res =>{
        if(res.data.code == 0){
          this.collectionStatus = res.data.data
          console.log(res.data.data)
        }
      })
    },

    /* 更改关注状态 */
    changeAdd(){
      let data = {
        followId:this.detail.id,
        followType:2-6,
        memberType:3
      }
      saveCollectionAPI(data).then(res =>{
        if(res.data.code == 0){
          this.$toast('关注成功');
          this.getCollection(this.detail.id)
        }
      })
    },
    changeDel(){
      let data = {
        followId:this.detail.id,
        // followId:this.detail.memberId,
        followType:2-6,
        memberType:3
      }
      delCollectionAPI(data).then(res =>{
        if(res.data.code == 0){
          this.$toast('已取关注');
          this.getCollection(this.detail.id)
        }
      })
    },
    
    /* 大师贡献 */
    getMasterList(id){
      getMasterConAPI(id).then(res =>{
        if(res.data.code == 0){
          // this.masterList = res.data.data
          let data = res.data.data
          // let screenList
          for(let key in data){
            let obj = {
              name:this.typeObj[key],
              value:data[key],
              type:key
            }
            this.screenList.push(obj)
          }
          this.changeType(0,this.screenList[0])
        }
      })
    },
    /* 在线课程 */
    getOnlineList(id){
      getOnlineListAPI(id).then(res =>{
        if(res.data.code == 0){
          this.onlineList = res.data.data
          console.log(res.data.data)
        }
      })
    },
    /* 互动课程 */
    getInteractionList(id){
      getInteractionListAPI(id).then(res =>{
        if(res.data.code == 0){
          this.interactionList = res.data.data
          console.log(res.data.data)
        }
      })
    },
    

    /* 大师贡献类型 */
    changeType(index,item){
      console.log(item)
      this.active = index
      this.masterList = item.value
    },



    shareFn(val){
      let link=this.baseUrl+this.$route.fullPath;
      var share = new SimpleShare({
          url: link,
          title:this.detail.name,
      });

      if(val=='QQ'){
          share.qzone();
      }else{
          share.weibo();
      }
    },

    // /*获取特疗法列表*/
    // getArticleList() {
    // getArticleListAPI(this.id).then(res => {
    //     if (res.data.status) {
    //     this.articleLsit = res.data.data.list;
    //     }
    // })
    // },
    // /*获取相关推荐图书*/
    // getEbookList() {
    // getEbookListAPI(this.id).then(res => {
    //     if (res.data.status) {
    //     this.ebookList = res.data.data.list;
    //     }
    // })
    // },

},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.masterDetail {
  .top{
    height: 2.77rem;
    background: url("../../assets/img/master/master-top-bg.png") no-repeat;
    background-size: cover;
    .DetailTit {
        width: 100%;
        // position: fixed;
        // z-index: 11;
        // top: 0;
        // left: 0;
        padding-top: .33rem;
        height: .31rem;
        display: flex;
        justify-content: space-between;
        .back {
            width: .1rem;
            height: .18rem;
            padding-left: .12rem;
            img {
            width: .1rem;
            height: .18rem;
            }
        }
        .set {
            padding-right: .02rem;
            display: flex;
            img {
            margin-right: .18rem;
            display: block;
            }
            img {
            width: .19rem;
            height: .19rem;
            }
        }
    }
    .detail{
        display: flex;
        flex-direction: column;
        text-align: center;
        .detail-ava{
            display: flex;
            position: relative;
            .ava-img{
                height: 0.72rem;
                width: 0.72rem;
                margin: 0 auto;
                background: #222222;
                border-radius: 50%;
            }
            .ava-name{
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                padding: 0.03rem 0.13rem;
                border-radius: 0.11rem;
                font-size: 0.11rem;
                color: #fff;
                background:#FF8706;
            }
        }
        .detail-name{
            font-weight: Bold;
            font-family: PingFang-SC-Bold;
            font-size: 0.2rem;
            color: #fff;
            line-height: 0.38rem;
        }
        .detail-con{
            height: 0.5rem;
            line-height: 0.4rem;
            display: flex;
            justify-content: center;
            font-size: 0.12rem;
            color: #fff;
            .d-master{
                span{
                    margin: 0 0.1rem;
                }
            }
            .d-follow{
                span{
                    margin: 0 0.1rem;
                }
            }
        }
        .detail-follow{
            span{
                padding: 0.06rem 0.18rem;
                border-radius: 0.25rem;
                background: #fff;
                font-size: 0.12rem;
                font-weight: bold;
                color: #BA9F74;
            }
        }
    }
  }
  .synopsis{
      // height:2.12rem;
      margin-top: -0.15rem;
      padding: 0 0.15rem;
      .synopsis-bg{
        border-radius: 0.14rem;
        background: url("../../assets/img/detail/detail-bg-right.png") no-repeat top right;
        background: cover;
        .synopsis-con{
            border-radius: 0.14rem;
            background: url("../../assets/img/detail/detail-bg-left.png") no-repeat bottom left ;
            .con-title{
                padding: 0.24rem 0;
                text-align: center;
            }
            p {
              line-height: .25rem;
              font-size: .14rem;
              color: #666;
              text-indent: 2em;
              margin-bottom: .25rem;
          }
            .look-more{
                margin: 0.2rem 0;
                text-align: center;
                color: #BA9F74;
                span{
                    padding: 0.06rem 0.08rem;
                    font-size: 0.11rem;
                    line-height: 0.25rem;
                    
                }

            }
            .more{
                text-align: center;
                color: #BA9F74;
                span{
                    padding: 0.06rem 0.08rem;
                    font-size: 0.11rem;
                    line-height: 0.25rem;
                    
                }
            }
        }
      }
  }
}

/* 大师贡献 */
.screen{
  padding: 0 .15rem;
  .sort{
    display: flex;
    span{
      padding: .07rem .12rem;
      margin-right: .1rem;
      font-size: .13rem;
      border-radius: .28rem;
      border: .01rem solid #F1EFF0;
      color: #777777;
    }
    .active{
      font-size: .13rem;
      background: #BA9F74;
      color: #fff;
    }
  }
}
/* 大师贡献  在线课程 */
.onlineList {
    padding: 0 .14rem;
    li {
        padding-top: .17rem;
        height: .88rem;
        border-bottom: 1px solid #EEEEEE;
        display: flex;
        justify-content: space-between;
        .video-img {
            flex: 0 0 1.15rem;
            position: relative;
            width: 1rem;
            height: .72rem;    
            .bottom-img{
                background: #222222;
                width: 1rem;
                height: .72rem;
            }
            .top-img{
                position: absolute;
                top: .29rem;
                left: .37rem;;
                width: .26rem;
                height: .26rem;
            }
        }
        .width110{
            flex: 0 0 1.25rem;
            width: 1.1rem;
            .bottom-img{
              width: 1.1rem;
            }
        }
        .info {
            flex: 1;
            padding-bottom: .2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h1 {
            color: #222222;
            font-size: .15rem;
            line-height: .20rem;
            }
            .other{
              display: flex;
              justify-content: space-between;
              .info-num{
                font-size: .12rem;
                color: #9C9D9C;
              }
              .info-price{
                font-size: .13rem;
                color: #FC2845;
              }
              .info-free{
                font-size: .12rem;
                color: #219319;
              }
            }
        }
    }
}

/* 互动专区 */
.interaction{
  padding-bottom: .1rem;;
    li{
        margin: 0 .15rem;
        padding: .12rem 0;
        border-bottom: 1px solid #EEEEEE;
        .i-info{
            display: flex;
            justify-content: space-between;
            .info {
                width: 100%;
                h1 {
                    color: #222222;
                    font-size: .15rem;
                    line-height: .21rem;
                    padding-bottom: .13rem;
                    .lineOne
                }
                p {
                    color: #666;
                    font-size: .13rem;
                    line-height: .19rem;
                    margin-bottom: .1rem;
                }
            }
            .other {
                display: flex;
                padding-top: .05rem;
                width: 100%;
                flex-direction: row-reverse;
                h3 {
                    font-size: .12rem;
                    line-height: .18rem;
                    color: #888;
                    font-weight: normal;
                }
            }
        }
    }
}

.lineOne {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.same-title{
    padding-left: .14rem;
    line-height: .36rem;
    text-align: left;
    span{
        font-size: .17rem;
        font-weight: Bold;
        font-family: PingFang-SC-Bold;
    }
}
.top-line{
    height: .1rem;
    background: #F3F3F3;
}

</style>
