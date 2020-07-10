<template>
  <div class="bookDetailNewBox">
    <div class="gwcBox">
      <div>
        <img src="../../../static/img/gwc.png" alt="">
        <span>{{ goodsNum }}</span>
      </div>
    </div>

    <div class="bookDetailNewCon" ref="bookDetailNewCon">
      <div class="detailTop">
        <dl>
          <dt>
            <img v-if="getEbookDetailByData.bookCover" :src="`${domain}${requestPath.file}?fileName=${getEbookDetailByData.bookCover}&isOnLine=true`" alt="">
            <img v-else src="../../../static/img/bookpic.png" alt="">
          </dt>
          <dd>
            <h2>{{ showvalue(getEbookDetailByData.name, 9 ) }}</h2>
            <h3>{{ getEbookDetailByData.publisher }}</h3>
            <ul>
              <li>出版时间：{{ getEbookDetailByData.publishTime }}</li>
              <li>作者：{{ getEbookDetailByData.author }}</li>
              <li>ISBN：{{ getEbookDetailByData.isbn}}</li>
              <li>
                <span>￥{{ getEbookDetailByData.realPrice }}</span>
                <span>￥{{ getEbookDetailByData.price }}</span>
                <span v-if="getEbookDetailByData.realPrice !== getEbookDetailByData.price">{{ getEbookDetailByData.disCount }}折</span>
              </li>
            </ul>
          </dd>
        </dl>
        <em class="likeIconBox" @click="collectItem">
          <img v-if="isCollectedFlag === 1" src="../../../static/img/likeIcon.png" alt="">
          <img v-else src="../../../static/img/doNotLikeIcon.png" alt="">
        </em>
      </div>

      <div class="detailBot">
        <van-tabs scrollspy sticky>
          <van-tab title="作者简介">
            <div class="partOne">
              <h2 class="partTitle">作者简介</h2>
              <p class="partCon" v-html="getEbookDetailByData.authorDetail"></p>
            </div>
          </van-tab>
          <van-tab title="内容简介">
            <div class="partOne partTwo">
              <h2 class="partTitle">内容简介</h2>
              <p class="partCon" :class="{ 'showMoreDetail': isShowMore}" >
                {{ showvalue (getEbookDetailByData.summary ) }}
              </p>
              <em @click="isShowMoreDetail" v-if="isShowBriefMore">
                <img v-if="isShowMore" src="../../../static/img/up.png" alt="">
                <img v-else src="../../../static/img/down.png" alt="">
              </em>   
            </div>
          </van-tab>
          <van-tab title="目录">
            <div class="partThr">
              <h2 class="partTitle">目录</h2>
              <ul :class="{ 'ulStyle': isShowMoreCatalogue}">
                <li v-html="getEbookDetailByData.bookCatalog"></li>
              </ul>
              <em @click="isShowMoreCatalogueItem" v-if="isShowCatalogueMore">
                <img v-if="isShowMoreCatalogue" src="../../../static/img/up.png" alt="">
                <img v-else src="../../../static/img/down.png" alt="">
              </em>
            </div>
          </van-tab>
          <van-tab :title="`评论（${getEbookDetailByData.commentNum}）`">
            <div class="partFour">
              <h2 class="partTitle">评论</h2>
              <div class="commentInputBox" @click="goAddComment">
                <input type="text" placeholder="内容这么赞，快来评论吧">
              </div>
              <div class="noData" v-if="getCommentListData.length === 0">
                <dl>
                  <dt>
                    <img src="../../../static/img/nocomment.png" alt="">
                  </dt>
                  <dd>你将成为第一个发言人~</dd>
                </dl>
              </div>
              <div class="commentList" v-else>
                <commentCom v-for="( item, key ) in getCommentListData" :key="key" :item="item" />
              </div>
              <button v-if="getCommentListData.length !== 0" class="moreComments" @click="goAllComments">更多精彩评论</button>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <div class="moreRecommend">
        <h2>更多推荐</h2>
        <ul>
          <li @click="goEbookDetail( item )" v-for="( item, key ) in getAllBookListData" :key="key">{{ item.name }}</li>
        </ul>
      </div>
    </div>
    <div class="twoBtn">
      <button @click="goTryReadBook">试读</button>
      <button @click="saveshopCar">加入购物车</button>
      <button>立即购买</button>
    </div>
  </div>
</template>

<script>
import commentCom from '../../components/sy/commentCom'
import Vue from 'vue';
import { Tab, Tabs, Toast } from 'vant';

Vue.use(Tab);
Vue.use(Tabs).use(Toast);

import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import Cookies from 'js-cookie';

import {
  getEbookDetailByIdAPI,
  getCommentListAPI,
  getGoodsCountAPI,
  saveshopCarAPI,
  isCollectedAPI,
  addCollectionAPI,
  deleteCollectionAPI,
  getEbookListAPI
} from '@/api/sy'
export default {
  name: 'eBookDetail',
  components: {
    commentCom
  },

  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      isShowMore: false,
      isShowMoreCatalogue: false,
      isShowBriefMore: false,
      isShowCatalogueMore: false,
      goodsNum: 0,
      getEbookDetailByData: {},
      getCommentListParams: {
        resourceId: this.$route.query.oid,
        resourceType: 1,
        pageNum: 1,
        pageSize: 20,
        orderBy: null
      },
      getCommentListData: [],
      resourceName: null,
      resourceType: 1,
      saveshopCarParams: {
        goodsId: null,
        goodsType: 1,
        num: 1,
      },
      isCollectedParams: {
        id: this.$route.query.oid,
        type: 2
      },
      isCollectedFlag: null,
      addCollectionParams: {
        goodsList: [
          {
            id: this.$route.query.oid,
            type: 2
          }
        ],
        goodsType: 2,
        memberId: Cookies.get('userId')
      },
      getAllBookListData: [],
      getAllBookListParams: {
        pageNum: 1,
        pageSize: 6,
        orderBy: null,
        orderBy: 'salesNum desc'
      },
    }
  },

  mounted () {
    this.getEbookDetailById();
    this.getCommentList();
    this.getGoodsCount();
    this.isCollected();
    this.getEbookList();
  },

  methods: {
    isShowMoreDetail () {
      switch ( this.isShowMore ) {
        case false:
          this.isShowMore = true;
          break;
        case true:
          this.isShowMore = false;
          break;
      }
    },

    isShowMoreCatalogueItem () {
      switch ( this.isShowMoreCatalogue ) {
        case false:
          this.isShowMoreCatalogue = true;
          break;
        case true:
          this.isShowMoreCatalogue = false;
          break;
      }
    },

    getEbookDetailById () {
      getEbookDetailByIdAPI ( this.$route.query.oid )
      .then ( res => {
        console.log(res, '电子书详情')
        if ( res.data.code === 0 ) {
          this.getEbookDetailByData = res.data.data;
          this.resourceName = res.data.data.name;
          this.saveshopCarParams.goodsId = res.data.data.id

          if ( this.getEbookDetailByData.summary ) {
            if ( this.getEbookDetailByData.summary.length > 125 ) {
              this.isShowBriefMore = true
            } else {
              this.isShowBriefMore = false
            }
          }
          
          if ( this.getEbookDetailByData.bookCatalog ) {
            if ( this.getEbookDetailByData.bookCatalog.length > 50 ) {
              this.isShowCatalogueMore = true
            } else {
              this.isShowCatalogueMore = false
            }
          }
        }
      })
    },

    getCommentList () {
      getCommentListAPI ( this.getCommentListParams ) 
      .then ( res => {
        if ( res.data.code === 0 ) {
          this.getCommentListData = res.data.data.list
          console.log(this.getCommentListData,'评论e')
        }
      })
    },

    goAddComment () {
      if ( Cookies.get('userId') !== 'null' ) {
        this.$router.push ({
          path: 'addComment',
          query: {
            resourceId: this.$route.query.oid,
            resourceName: this.resourceName,
            resourceType: 1
          }
        }) 
      } else {
        this.$router.push({
          path: 'loginPassword'
        })
      }
    },

    goAllComments () {
      this.$router.push({
        path: 'allComments',
        query: {
          oid: this.$route.query.oid,
          resourceType: 1,
        }
      })
    },

    getGoodsCount () {
      getGoodsCountAPI ()
      .then ( res => {
        console.log(res)
        if ( res.data.code === 0 ) {
          this.goodsNum = res.data.data
        }
      })
    },

    saveshopCar () {
      if ( Cookies.get('userId') !== 'null' ) {
        saveshopCarAPI ( this.saveshopCarParams )
        .then ( res => {
          console.log(res, '加入购物车')
          if ( res.data.code === 0 ) {
            Toast('加入购物车成功')
            this.getGoodsCount();
          }        
        })
      } else {
        this.$router.push({
          path: 'loginPassword'
        })
      }
    },

    isCollected () {
      isCollectedAPI ( this.isCollectedParams ) 
      .then ( res => {
        console.log(res,'有没有收藏')
        if ( res.data.code === 0 ) {
          this.isCollectedFlag = res.data.data
        }
      })
    },

    collectItem () {
      console.log(this.addCollectionParams.memberId)
      if ( this.addCollectionParams.memberId !== 'null' )  {
        if ( this.isCollectedFlag === 0 ) {
          this.isCollectedFlag = 1;
          addCollectionAPI ( this.addCollectionParams )
          .then ( res => {
            Toast('收藏成功')
            this.isCollected()
            //this.getBookDetial()
          })
        } else {
          this.isCollectedFlag = 0;
          deleteCollectionAPI ( this.addCollectionParams )
          .then ( res => {
            Toast('取消收藏成功')
            this.isCollected()
            //this.getBookDetial()
          })
        }
      } else {
        this.$router.push({
          path: 'loginPassword'
        })
      }
    },

    getEbookList () {
      getEbookListAPI ( this.getAllBookListParams )
      .then ( res => {
        this.loading = false;
        console.log(res, '电子书列表')
        if ( res.data.code === 0 ) {
          this.getAllBookListData = res.data.data.list
        } 
      })
    },

    goEbookDetail ( item ) {
      console.log( item, '123123123123' )
      this.$refs.bookDetailNewCon.scrollTop = 0
      this.$router.push({
        path: 'eBookDetail',
        query: {
          oid: item.id
        }
      });
      this.getEbookDetailById();
      this.getCommentList();
      this.getGoodsCount();
      this.isCollected();
    },

    showvalue(value, _length){
      if ( value ) {
        var str=value.replace(/<[^>]+>/g, ""); 
        var neirong=str.replace("&nbsp;","");
        var wenben=neirong.replace( /^\s*/, '');
        if(wenben.length > _length){
            return wenben.substr(0, _length) + "...";
        }else{
            return wenben;
        }
      }
    },

    goTryReadBook () {
      this.$router.push ( {
        path: 'tryReadBook'
      } ) 
    }
  }
}
</script>

<style lang="less" scoped>
  .bookDetailNewBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    background: #f5f5f5;
  } 

  .gwcBox {
    width: .585rem;
    height: .585rem;
    background: url(../../../static/img/gwcwy.png) no-repeat;
    background-size: 100% 100%;
    position: fixed;
    right: 0;
    bottom: 2rem;
    text-align: center;
    line-height: .585rem;
    z-index: 1;
    div {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        display: inline-block;
        width: .23rem;
        height: .21rem;
      }
      span {
        position: absolute;
        width: .135rem;
        height: .135rem;
        background: #BB0606;
        text-align: center;
        line-height: .135rem;
        border-radius: 50%;
        color: #fff;
        font-size: .09rem;
        left: .37rem;
        top: .06rem;
      }
    }
  }

  .bookDetailNewCon {
    width: 100%;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .detailTop {
    width: 100%;
    background: #fff;
    position: relative;
    padding: .31rem .125rem .3rem;
    dl {
      width: 100%;
      display: flex;
      dt {
        width: 1.135rem;
        height: 1.61rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        flex: 1;
        line-height: 1;
        padding-top: .1rem;
        margin-left: .165rem;
        h2 {
          color: #333333;
          font-size: .18rem;
          font-weight: bold;
          width: calc(100% - .3rem);
        }
        h3 {
          display: inline-block;
          color: #BB0606;
          font-size: .12rem;
          height: .15rem;
          padding: 0 .075rem;
          line-height: .15rem;
          background: url(../../../static/img/h3Bg.png) no-repeat;
          background-size: auto 100%;
          margin: .1rem auto .155rem;
        }
        ul {
          width: 100%;
          color: #666666;
          font-size: .13rem;
          li {
            line-height: .2rem;
            &:last-child {
              margin-top: .1rem;
              span:nth-of-type(1) {
                color: #FC2845;
                font-size: .16rem;
              }
              span:nth-of-type(2) {
                color: #D4D2D2;
                font-size: .13rem;
                text-decoration: line-through;
                margin:0 .35rem 0 .05rem;
              }
              span:nth-of-type(3) {
                display: inline-block;
                color: #BB0606;
                font-size: .1rem;
                padding: 0 0.08rem;
                height: .15rem;
                text-align: center;
                line-height: .15rem;
                background: rgba(187,6,6,.06);
                border-radius: 10px;
              }
            }
          }
        }
      }
    }
    .likeIconBox {
      position: absolute;
      top: .31rem;
      right: .125rem;
      width: .315rem;
      height: .315rem;
      background: url(../../../static/img/wy.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: .315rem;
      img {
        display: inline-block;
        width: .155rem;
        height: .14rem;
      }
    }
  }
  
  .detailBot {
    margin-top: .05rem;
    width: 100%;
    line-height: 1;
    .partOne {
      width: 100%;
      padding: .2rem .125rem;
      .partTitle {
        color: #222222;
        font-size: .17rem;
        // margin-bottom: .2rem;
      }
      .partCon {
        color: #333333;
        font-size: .14rem;
        line-height: .25rem;
        text-indent: 2em;
      }
    }
    .partTwo {
      padding-top: .39rem;
      position: relative;
      .partTitle {
        color: #222222;
        font-size: .17rem;
        margin-bottom: .2rem;
      }
      .partCon {
        max-height: 1.7rem;
        overflow: hidden;
      }
      em {
        position: absolute;
        width: 100%;
        height: 1.165rem;
        left: 0;
        bottom: -.6rem;
        background: url(../../../static/img/upDownBg.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
        padding-top: .84rem;
        text-indent: initial;
        img {
          display: inline-block;
          width: .125rem;
          height: .13rem;
        }
      }
      .showMoreDetail {
        overflow: initial;
        height: initial;
        max-height: initial;
      }
    }
    .partThr,.partFour {
      margin-top: .05rem;
      padding: .21rem .125rem 0;
      h2 {
        color: #222222;
        font-size: .17rem;
        margin-bottom: .275rem;
      }
      ul {
        width: 100%;
        max-height: 1.25rem;
        overflow: hidden;
        li {
          width: 100%;
          line-height: .25rem;
          span {
            font-size: .14rem;
            &:nth-of-type(1) {
              color: #333333;
            }
            &:nth-of-type(2) {
              color: #666666;
              margin-left: .1rem;
            }
          }
        }
      }
      .ulStyle {
        overflow: initial;
        height: initial;
        max-height: initial;
      }
      em {
        display: block;
        width: 100%;
        height: .49rem;
        text-align: center;
        line-height: .49rem;
        img {
          display: inline-block;
          width: .125rem;
          height: .13rem;
        }
      }
    }

    .partFour {
      .commentInputBox {
        width: 100%;
        height: .37rem;
        input {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          border:none;
          outline: none;
          border: 1px solid #e8e8e8;
          text-indent: 2em;
        }
      }
      .moreComments {
        width: 100%;
        height: .59rem;
        text-align: center;
        line-height: .59rem;
        color: #C8CAD2;
        font-size: .13rem;
        border: none;
        outline: none;
        background: #fff;
      }
      .noData {
        width:100%;
        padding-top:.45rem;
        float:left;
        padding-bottom:.65rem;
        background:#fff;
        dl {
          width:1.45rem;
          margin:0 auto;
          dt {
            width:1.41rem;
            height:1.25rem;
            img {
              width:100%;
              height:100%;
            }
          }
          dd {
            text-align:center;
            margin-top:.2rem;
            color:#BDC2CB;
            font-size:.14rem;
          }
        }
      }
    }
  }
  
  .moreRecommend {
    width: 100%;
    background: #fff;
    margin-top: .1rem;
    padding: 0 .125rem;
    overflow: hidden;
    h2 {
      color: #222222;
      font-size: .17rem;
      font-weight: bold;
      padding-top: .205rem;
      margin-bottom: .21rem;
    }
    ul {
      width: 100%;
      li {
        float: left;
        color: #BB0606;
        font-size: .13rem;
        margin: 0 .2rem .15rem 0;
      }
    }
  }

  .twoBtn {
    width: 100%;
    height: .52rem;
    display: flex;
    button {
      flex: 1;
      text-align: center;
      line-height: .52rem;
      font-size: .15rem;
      border: none;
      outline: none;
      &:nth-of-type(1) {
        border-top: 1px solid #E1E1E1;
        background: #fff;
        color: #333333;
      }
      &:nth-of-type(2) {
        border-top: 1px solid #E1E1E1;
        background: #ccc;
        color: #fff;
      }
      &:nth-of-type(3) {
        background: #BB0606;
        color: #FFFFFF;
      }
    }
  }
</style>

<style lang="less">
  .bookDetailNewCon {
    .van-tabs__content {
      margin-top: .05rem;
      width: 100%;
      .van-tab__pane {
        width: 100%;
        background: #fff;
      }
    }
  }
</style>