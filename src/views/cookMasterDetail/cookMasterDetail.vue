<template>
  <div class="masterDetailBox">
    <div class="masterDetailCon">
      <div class="top">
        <dl>
          <dt>
            <img :src="`${domain}${requestPath.file}?fileName=${masterDetailData.img}&isOnLine=true`" alt="">
          </dt>
          <dd>{{ masterDetailData.realName }}</dd>
        </dl>
      </div>
  
      <div class="bot">
        <ul>
          <li @click="clickNavItem( 1 )">资料</li>
          <li>
            <img src="../../../static/img/sx.png" alt="">
          </li>
          <li @click="clickNavItem( 2 )">作品</li>
          <li class="hx" :class="{ 'liNewStyle': isMasterWork === true}"></li>
        </ul>
        <div v-show="isDetail">
          <div class="masterTitle">
            <span v-for="( item, key ) in masterTitle" :key="key">{{ item }}</span>
          </div>
          <h2>基本信息</h2>
          <p>{{ masterDetailData.brief }}</p>
          <h2>职业履历</h2>
          <p v-html="masterDetailData.workExperience"></p>
        </div>
      </div>

      <div v-show="isDetail" class="apprentice">
        <div class="todayRecommendTop">
          <h2>徒弟</h2>
          <span @click="goApprenticeList">更多</span>
        </div>
        <div class="apprenticeList">
          <dl v-for="( item, key ) in apprenticeData" :key="key">
            <dt>
              <img :src="`${domain}${requestPath.file}?fileName=${item.img}&isOnLine=true`" alt="">
            </dt>
            <dd>{{ item.account }}</dd>
          </dl>
        </div>
      </div>

      <div v-show="isMasterWork" class="masterWork">
        <todayRecommend @clickThisItem="clickThisItem( item )" v-for="( item, key ) in masterWork" :key="key" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import todayRecommend from '../../components/sy/todayRecommend' 
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import {
  getMasterDetailByIdAPI,
  getApprenticeAPI
} from '@/api/sy'
export default {
  name: 'cookMasterDetail',
  components: {
    todayRecommend,
  },
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      isDetail: true,
      isMasterWork: false,
      masterDetailData: {},
      masterTitle: [],
      apprenticeData: [],
      masterWork: [],
      getApprenticeParams: {
        pageNum: 1,
        pageSize: 4,
        orderBy: null,
        oid: this.$route.query.oid
      }
    }
  },

  mounted () {
    this.getMasterDetailById();
    this.getApprentice();
  },

  methods: {
    clickNavItem ( index ) {
      if ( index === 1 ) {
        this.isDetail = true;
        this.isMasterWork = false;
      } else {
        this.isDetail = false;
        this.isMasterWork = true;
      }
    },

    goApprenticeList () {
      this.$router.push({
        path: 'masterAndApprentice',
        query: {
          oid: this.$route.query.oid
        }
      })
    },

    getMasterDetailById () {
      getMasterDetailByIdAPI( this.$route.query.oid )
      .then ( res => {
        console.log(res, '大师详情')
        if ( res.data.code === 0 ) {
          this.masterDetailData = res.data.data
          this.masterTitle = res.data.data.title.split(',') || []
          this.masterWork = res.data.data.menu || []
        }
      })
    },

    getApprentice () {
      getApprenticeAPI ( this.getApprenticeParams )
      .then ( res => {
        console.log(res, '大师徒弟')
        if ( res.data.code === 0 ) {
          this.apprenticeData = res.data.data.list || []
        }
      })
    },

    clickThisItem ( item ) {
      this.$router.push ({
        path: 'detail',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .masterDetailBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #F5F5F5;
    display: flex;
    .masterDetailCon {
      flex: 1;
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .top {
        width: 100%;
        height: 2.275rem;
        background: url(../../../static/img/masterDetailBg.png) no-repeat;
        background-size: 100% 100%;
        padding-top: .475rem;
        dl {
          width: 100%;
          dt {
            width: 0.785rem;
            height: .785rem;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          dd {
            width: 100%;
            text-align: center;
            color: #FFFFFF;
            font-size: .16rem;
            font-weight: bold;
            margin-top: .125rem;
          }
        }
      }
      .bot {
        width: 100%;
        background: #fff;
        border-radius: 15px 15px 0 0;
        margin-top: -.475rem;
        padding-bottom: .21rem;
        ul {
          width: 100%;
          height: .535rem;
          display: flex;
          position: relative;
          border-bottom: 1px solid #eee;
          li {
            width: 50%;
            height: 100%;
            line-height: .535rem;
            text-align: center;
            font-size: .15rem;
            color: #000000;
            &:nth-of-type(2) {
              position: absolute;
              left: 50%;
              top: .17rem;  
              width: 1px;
              height: .18rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .hx {
            position: absolute;
            width: .325rem;
            height: 3px;
            background: #BB0606;
            bottom: -3px;
            left: .77rem;
          }
          .liNewStyle {
            left: initial;
            right: .77rem;
          }
        }
        .masterTitle {
          width: 100%;
          padding: 0 .15rem;
          margin: .26rem auto .255rem;
          span {
            display: inline-block;
            height: .15rem;
            margin: 0 auto;
            background: url(../../../static/img/titleBg.png) no-repeat;
            background-size: 100% 100%;
            line-height: .17rem;
            color: #FFFFFF;
            font-size: .1rem;
            text-align: center;
            padding: 0 .09rem 0 .07rem;
            margin: 0 .155rem .14rem 0;
          }
        }
        h2 {
          color: #222222;
          font-size: .17rem;
          font-weight: bold;
          padding-left: .15rem;
          margin-bottom: .225rem;
          &:nth-of-type(2) {
            margin-top: .355rem;
          }
        }
        p {
          color: #333333;
          font-size: .14rem;
          padding: 0 .15rem;
          line-height: .25rem;
          text-indent: 2em;
        }
      }
      .apprentice {
        width: 100%;
        background: #fff;
        margin-top: .055rem;
        padding: 0 .15rem;
        padding-bottom: .3rem;
        .apprenticeList {
          display: flex;
          dl {
            width: 25%;
            dt {
              width: .615rem;
              height: .625rem;
              margin: 0 auto;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            dd {
              width: 100%;
              text-align: center;
              margin-top: .095rem;
              color: #333333;
              font-size: .12rem;
            }
          }
        }
      }
      .todayRecommendTop {
        width: 100%;
        display: flex;
        line-height: .615rem;
        justify-content: space-between;
        h2 {
          font-size: .2rem;
          color: #333333;
          font-weight: bold;
        }
        span {
          font-size: .13rem;
          color: #999999;
          background: url(../../../static/img/rightIcon.png) no-repeat;
          background-size: .06rem .105rem;
          background-position: .27rem .255rem;
          padding-right: .07rem;
        }
      }
      .masterWork {
        width: 100%;
        padding: 0 .125rem .35rem;
        background: #fff;
      }
    }
  }
</style>