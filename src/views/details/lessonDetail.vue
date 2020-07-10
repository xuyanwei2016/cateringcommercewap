<template>
  <div class="lessonDetail">
    <div class="DetailTit">
      <div class="back" @click="$router.go(-1)">
        <img src="../../assets/img/list/back.png" alt="">
      </div>
      <div class="lesson">
        课程详情页面
      </div>
      <div class="set">
        <img src="../../assets/img/detail/share.png" alt="" @click="isShow=!isShow,isType=2">
      </div>
    </div>

    <div class="lessonInfo">
      <img class="info-img" :src="imgLink(detail.img)" alt="" v-if="detail.img">
      <img class="info-img" src="../../assets/img/cover.png" alt="" v-else>
      <div class="info-con">
        <div class="title">{{detail.name}}</div>
        <div class="text">
          <div class="text-left">
            <img src="@/assets/img/detail/list-detail.png" alt="">
            <span class="num">已更新{{detail.consumeHour?detail.consumeHour:0}}节</span>
            </div>
          <div class="text-right"><img src="@/assets/img/detail/video-detail.png" alt="">
            <span class="num">{{detail.learnTimes}}次学习</span>
            </div>
        </div>
        <div class="good">
          <div class="good-price">
            <span v-if="detail.priceOption== 0">免费</span>
            <span class="now-price" v-if="detail.priceOption== 1">￥
              <span>{{detail.realPrice}}</span>
            </span> 
            <span class="old-price" v-if="detail.priceOption== 1">￥{{detail.price}}</span>
          </div>
          <div class="good-collection">
            <img src="@/assets/img/detail/start.png" alt="" v-if="collectionStatus == 0" @click="changeAdd">
            <img src="@/assets/img/detail/start1.png" alt="" v-if="collectionStatus == 1" @click="changeDel">
          </div>
        </div>
      </div>
    </div>
    <div class="swiper">
      <div class="swiper-con">
        <span class="swiper-text" :class="activeIndex == 0?'active':''" @click="changeIndex(0)">详情</span>
      </div>
      <div class="swiper-con">
        <span class="swiper-text"  :class="activeIndex == 1?'active':''" @click="changeIndex(1)">目录</span>
      </div>
    </div>

    <!-- 详情 -->
      <div class="detail-text" v-if="activeIndex ===0">
        <span v-html="detail.details"></span>
      </div>
      <comments :resource="commentList"  v-if="activeIndex ===0"></comments>

      <!-- 目录 -->
      <div v-if="activeIndex ===1">
        <ul class="onlineList">
          <li v-for="(item,index) in onlineList" :key="index">
            <div class="video-img"  @click="linkDetail(item)">
              <!-- <img :src="imgLink(item.img)" alt=""> -->
              <img class="bottom-img" src="../../assets/img/list/share.png" alt="">
              <img class="top-img" :src="imgLink(item.cover)" alt="">
            </div>
            <div class="info">
                <h1 @click="linkDetail(item)" v-html="item.name"></h1>
                <div class="other">
                  <div  class="info-num">
                    <img src="@/assets/img/detail/video-detail.png" alt="">
                    <span>{{item.timeLength}}分钟</span>
                  </div>
                  <!-- <span v-if="item.price==0">免费</span> -->
                  <span class="info-price">￥{{item.realPrice ?item.realPrice :'0.00'}}</span>
                </div>
            </div>
          </li>
        </ul>
      </div>
  
    <!--精彩评价-->
    <div class="foot"  v-if="detail.priceOption !='0'&&detail.realPrice != 0">
      <ul>
        <li @click="onRead"><img src="../../assets/img/detail/read.png" alt="">试读</li>
        <li class="bg" @click="isShow=!isShow,isType=1"><img src="../../assets/img/detail/buy.png" alt="">购买</li>
      </ul>
    </div>
    <div class="Popup setFont" v-if="isShow" @click="isShow=false">
      <div class="buy" @click.stop="" v-if="isType==1">
        <div class="money">
          <h1>支付金额：</h1>
          <h2>￥180.00</h2>
        </div>
        <ul>
          <li><h1><img src="../../assets/img/detail/zfb.png" alt="">支付宝</h1> <span><img
            src="../../assets/img/detail/change1.png" alt=""></span></li>
          <li><h1><img src="../../assets/img/detail/wx.png" alt="">微信</h1> <span><img
            src="../../assets/img/detail/change2.png" alt=""></span></li>
        </ul>
        <div class="botton" @click="$valert.show('暂时未开发')">
          立即支付
        </div>
      </div>
      <div class="share" @click.stop="" v-if="isType==2">
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
  import comments from '../../components/comment/list.vue';
  import {addCollectAPI, delCollectAPI} from '@/api/my.js';
  import {getlessonDetailAPI, getCountAPI,getlessonListAPI,getCommentAPI,getCollectionAPI,saveCollectionAPI,delCollectionAPI} from '@/api/detail.js';
  import star1 from '../../assets/img/detail/coll.png';
  import star2 from '../../assets/img/detail/start1.png';
  import { baseUrl } from '@/utils/global.js';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        isShow: false,
        id: this.$route.query.id,
        star1: star1,
        star2: star2,
        isCollection: false,
        baseUrl:baseUrl,
        detail: {
          price: 0,
          lessonCover: null,
          name: null,
        },
        count: 0,
        isShowMore: true,
        isMore: false,
        isType: 0,
        activeIndex:0,
        onlineList:[],
        commentList:[],
        commentQuery:{
          pageNum:1,
          pageSize:5,
          resourceId:'',
          resourceClass:8
        },
        collectionStatus:''
      }
    },
    components: {comments},
    created() {
      this.id = this.$route.query.id
      this.getDetail();
    },
    watch: {},
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    methods: {
      getCount() {
        getCountAPI({
          resourceClass: 1,
          resourceId: this.id,
        }).then(res => {
          if (res.data.status) {
            this.count = res.data.data.resourceScore ? res.data.data.resourceScore : 0;
          }
        })
      },
      getDetail() {
        getlessonDetailAPI(this.id).then(res => {
          if (res.data.status) {
            let data = res.data.data
            this.detail = data;
            console.log(data)
            this.commentQuery.resourceId = data.id
            this.getCollection(data.id)
            this.getComment()
          }
        })
      },
    /* 是否被收藏 */
    getCollection(id){
      let data ={
        followId:id,
        followType:2-3
      }
      getCollectionAPI(data).then(res =>{
        if(res.data.code == 0){
          this.collectionStatus = res.data.data
          console.log(res.data.data)
        }
      })
    },

    /* 更改收藏状态 */
    changeAdd(){
      let data = {
        followId:this.detail.id,
        followType:2-3,
        memberType:3
      }
      saveCollectionAPI(data).then(res =>{
        if(res.data.code == 0){
          this.$toast('收藏成功');
          this.getCollection(this.detail.id)
        }
      })
    },
    changeDel(){
      let data = {
        followId:this.detail.id,
        followType:2-3,
        memberType:3
      }
      delCollectionAPI(data).then(res =>{
        if(res.data.code == 0){
          this.$toast('已取收藏');
          this.getCollection(this.detail.id)
        }
      })
    },

      /* 切换 */
      changeIndex(index){
        this.activeIndex = index
        if(index == 0){
          this.getComment()
        }else if(index =='1'){
          this.getlessonList(this.detail.id)
        }
      },

      
       /* 目录 */
      getlessonList(id){
        getlessonListAPI(id).then(res =>{
          if(res.data.code == 0){
            this.onlineList = res.data.data
            console.log(res.data.data)
          }
        })
      },
      linkDetail(item){
        console.log(item)
        this.$router.push({
          path:'videoDetail',
          query:{id:item.id}
        })
      },

      /* 评论列表 */
      getComment(){
        console.log(111,this.commentQuery)
        getCommentAPI(this.commentQuery).then(res =>{
          if(res.data.code == 0){
            this.commentList = res.data.data
            console.log(res.data.data)
          }
        })
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

      /*fatFn(){
        this.getCommentList();
      },*/
      collection() {
        if (!this.token) {
          this.$router.push('/loginPassword');
          return
        }
        let API = this.isCollection ? delCollectAPI : addCollectAPI;
        API({
            "goodsList": [
              {
                "id": this.id,
                "type": "2-1"
              }
            ]
          }
        ).then(res => {
          if (res.data.status) {
            this.isCollection = !this.isCollection;
            this.$valert.show(`${this.isCollection ? '收藏成功' : '已取消收藏'}`);
          }
        })
      },
      /*在线试读*/
      onRead() {
        if (this.detail.videos.length > 0) {
          this.$router.push({path: '/lessonRead', query: {id: this.$route.query.id}});
        } else if (this.detail.pdfFile) {
          this.$router.push({path: '/pdf', query: {id: this.$route.query.id,pdfId:this.detail.pdfFile,isCollection:this.isCollection}});
        } else {
          this.$valert.show('资源更新中，敬请期待');
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .lessonDetail {
    .DetailTit {
      width: 100%;
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
      background:#BA9F74;
      background-size: cover;
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
      .lesson{
        font-size: .18rem;
        line-height: .2rem;
        font-weight: bold;
        color: #fff;
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

    .lessonInfo{
      width: 100%;
      padding-top: 0.64rem;
      .info-img{
          height: 2rem;
          width: 100%;
      }
      .info-con{
        padding: 0 .15rem;
        .title{
          color: #121212;
          font-weight: bold;
          font-size: .18rem;
          line-height: .28rem;
        }
        .text{
          padding-top: .18rem;
          padding-bottom: .3rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          color: #9C9D9C;
          font-size: .13rem;
          line-height: .2rem;
          .text-left{
            display: flex;
            align-items: center;
            img{
              margin-right: .04rem;
              width:.1rem;
              height: .12rem;
            }
          }
          .text-right{
            display: flex;
            align-items: center;
            img{
              margin-right: .04rem;
              width:.12rem;
              height: .11rem;
            }
          }
          .num{
              display: inline-block;
            }
        }
        .good{
          padding-bottom: .2rem;
          border-bottom: .07rem solid #F5F5F5;
          display: flex;
          justify-content: space-between;
          .good-price{
            line-height: .26rem;
            font-size: .14rem;
            .now-price{
              color: #E40000;
              span{
                font-size: .18rem;
              }
            }
            .old-price{
              color: #999;
              text-decoration: line-through;
            }
          }
          .good-collection{
            display: flex;
            align-items: center;
            img{
              width: .2rem;
              height: .19rem;
            }
          }
        }
      }
    }
    .swiper{
      border-bottom: .01rem solid #E6EAF2;
      display: flex;
      justify-content: center;
      .swiper-con{
        .swiper-text{
          margin:0 0.3rem;
          display: inline-block;
          padding: .15rem 0.3rem 0.1rem 0.3rem;
          font-size: .16rem;
          line-height: .24rem;
          font-weight: bold;
          color: #232323;
        }
        .active{
          border-bottom: .02rem solid #BA9F74;
          color: #BA9F74;
        }
      }
      
    }

    .detail-text{
      padding: 0 .15rem;
      margin-bottom: .2rem;
      span{
        color: #565656;
        font-size: .15rem;
        line-height: .26rem;
      }
    }


    .onlineList {
      margin-bottom: .5rem;
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
              display: flex;
              font-size: .12rem;
              color: #9C9D9C;
              align-items: center;
              img{
                height: .115rem;
                width: .115rem;
                margin-right: .05rem;
              }
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


    .foot {
      width: 100%;
      height: .505rem;
      background: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      box-shadow: .04rem .02rem .08rem .05rem rgba(0, 0, 0, 0.05);
      ul {
        display: flex;
        justify-content: space-between;

        li {
          width: 50%;
          height: .505rem;
          font-size: .14rem;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: .21rem;
            /*height: .19rem;*/
            margin-right: .05rem;
          }
        }
        .bg {
          background: #BA9F74;
          color: #fff;
        }
      }
    }

    /*弹出框*/
    .Popup {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 12;
      background: rgba(0, 0, 0, 0.3);
    }
    .buy {
      width: 100%;
      height: 2.3rem;
      background: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: .1rem .1rem 0 0;
      .money {
        height: .46rem;
        padding: .2rem .25rem 0 .25rem;
        display: flex;
        justify-content: space-between;
        h1 {
          font-size: .14rem;
          color: #333333;
          font-weight: normal
        }
        h2 {
          font-size: .15rem;
          color: #E01F36;
          font-weight: normal
        }
      }
      ul {
        padding: 0 .255rem .04rem .255rem;
        li {
          display: flex;
          justify-content: space-between;
          height: .36rem;
          border-bottom: 1px solid #EBEBEB;
          margin-bottom: .14rem;
          h1 {
            height: .21rem;
            line-height: .21rem;
            font-size: .14rem;
            color: #333;
            font-weight: normal;
            img {
              width: .21rem;
              height: .21rem;
              margin-right: .09rem;
              display: inline-block;
            }
          }
          span {
            img {
              width: .2rem;
              height: .2rem;
            }
          }

        }
      }
      .botton {
        width: 3.3rem;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        color: #fff;
        font-size: .16rem;
        background: url("../../assets/img/detail/buyBG.png") no-repeat;
        background-size: contain;
        margin: 0 auto;
      }
    }

  }
</style>
