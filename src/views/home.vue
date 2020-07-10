<template>
  <!--首页-->
  <div id="home">
    <div class="homeBox">
      <div class="search" @click="goSearchPage">
        <input type="text" placeholder="搜索文章、美食、饮食文化">
      </div>

      <div class="swiperCon"
          v-if="getCarouselData&&getCarouselData.length>0">
        <van-swipe :autoplay="3000"
                  indicator-color="white">
          <van-swipe-item v-for="( item, key ) in getCarouselData"
                          :key="key"
                          @click="goUrl( item )">
            <!-- :style="{backgroundImage: 'url('+`${domain}${requestPath.file}?fileName=${item.picture}&isOnLine=true`+')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}" -->
            <!-- <img :src="`${domain}${requestPath.file}?fileName=${item.picture}&isOnLine=true`"
                v-lazy="`${domain}${requestPath.file}?fileName=${item.picture}&isOnLine=true`"
                alt=""> -->
            <van-image width="100%"
                      height="100%"
                      :src="`${domain}${requestPath.file}?fileName=${item.picture}&isOnLine=true`" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="todayRecommend">
        <div class="todayRecommendTop">
          <h2>今日推荐</h2>
          <span @click="goCaseList">更多</span>
        </div>
        <div class="listBox">
          <todayRecommend @clickThisItem="clickThisItem( item )" v-for="( item, key ) in getTodayRecommendData" :key="key" :item="item" />
        </div>
      </div>

      <div class="cultureView">
        <div class="todayRecommendTop">
          <h2>文化大观</h2>
          <span>更多</span>
        </div>
        <div class="listBox">
          <cultureView v-for="( item, key ) in getCultureData" :key="key" :item="item" />
        </div>
      </div>

      <div class="cookMaster">
        <div class="todayRecommendTop">
          <h2>烹饪大师名人堂</h2>
          <span @click="goCookMasterList">更多</span>
        </div>
        <div class="masterList">
          <div class="masterListScroll">
            <dl v-for="( item, key) in syMasterList" :key="key" @click="clickMasteItem( item )">
              <dt>
                <img v-if="item.img" :src="`${domain}${requestPath.file}?fileName=${item.img}&isOnLine=true`" alt="">
                <img v-else src="../../static/img/morenHeader.png" alt="">
              </dt>
              <dd>
                <h2>{{ showvalue( item.realName, 6 ) }}</h2>
                <span>{{ item.title.split(',')[0] }}</span>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="toBook">
        <div class="todayRecommendTop">
          <h2>直通书城</h2>
          <span @click="goBookList">更多</span>
        </div>
        <div class="bookList">
          <bookCom @clickBookItem="clickBookItem ( item )" v-for="( item, key ) in getToBookStoreData" :key="key" :item="item" /> 
        </div>
      </div>
    </div>
    
    <Foot></Foot>
  </div>
</template>

<script>
import { 
  getSyMasterAPI,
  getToBookStoreAPI,
  getCarouselAPI,
  getTodayRecommendAPI,
  getCultureAPI
} from '@/api/sy.js';
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";

import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem)

import Cookies from 'js-cookie';
import todayRecommend from '../components/sy/todayRecommend'
import cultureView from '../components/sy/cultureView'
import bookCom from '../components/sy/bookCom'
import Foot from '../components/Foot.vue';
import classic from '../../static/img/classic.png'
import studio from '../../static/img/studio.png'

/*var vConsole = new VConsole();*/
export default {
  name: 'HelloWorld',
  data() {
    return {
      syMasterList: [],
      domain: process.env.BASE_API,
      requestPath: requestPath,
      getToBookStoreParams: {
        num: 6
      },
      getToBookStoreData: [],
      getCarouselParams: {
        signValue: 'sylbt',
        num: 8
      },
      getCarouselData: [],
      getTodayRecommendParams: {
        recommendStatus: 1,
        num: 2
      },
      getTodayRecommendData: [],
      getCultureParams: {
        articleType: null,
        topStatus: null,
        recommendStatus: 1,
        hotStatus: 1,
        num: 3
      },
      getCultureData: []
    }
  },
  components:{
    Foot,
    todayRecommend,
    cultureView,
    bookCom
  },

  mounted () {
    this.getCarousel();
    this.getSyMaster();
    this.getToBookStore();
    this.getTodayRecommend();
    this.getCulture();
  },

  computed: {
    token() {  //通过方法访问
      return this.$store.state.token;
    },
  },
  methods: {
    goSearchPage () {
      this.$router.push({
        path: 'searchPage'
      })
    },

    goCookMasterList () {
      this.$router.push({
        path: 'cookMaster',
      })
    },

    clickMasteItem ( item ) {
      this.$router.push({
        path: 'cookMasterDetail',
        query: {
          oid: item.id
        }
      })
    },

    goBookList () {
      this.$router.push({
        path: 'bookListNew'
      })
    },

    getSyMaster () {
      getSyMasterAPI ()
      .then ( res => {
        console.log(res, '大师')
        if ( res.data.code === 0 ) {
          this.syMasterList = res.data.data
        }
      })
    },

    getToBookStore () {
      getToBookStoreAPI ( this.getToBookStoreParams )
      .then ( res => {
        console.log(res, '123')
        if ( res.data.code === 0 ) {
          this.getToBookStoreData = res.data.data
          this.getToBookStoreData.map ( ( item, index ) => {
            if ( item.type === "0" ) {
              this.$set( item, 'typeName', '图书')
            } else if ( item.type === "1" ) {
              this.$set( item, 'typeName', '电子书')
            }
          })
        }
      })
    },

    getCarousel () {
      getCarouselAPI ( this.getCarouselParams )
      .then ( res => {
        if ( res.data.code === 0 ) {
          console.log(res)
          this.getCarouselData = res.data.data;
        }
      })
    },

    getTodayRecommend () {
      getTodayRecommendAPI ( this.getTodayRecommendParams )
      .then ( res => {
        if ( res.data.code === 0 ) {
          console.log(res, '今日推荐')
          this.getTodayRecommendData = res.data.data;
        }
      })
    },

    getCulture () {
      getCultureAPI ( this.getCultureParams )
      .then ( res => {
        console.log(res, '文化大观')
        if ( res.data.code === 0 ) {
          this.getCultureData = res.data.data;
        }
      })
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

    goUrl (item) {
      window.location.href = item.url
    },

    goCaseList () {
      this.$router.push ({
        path: 'caseList'
      })
    },

    clickThisItem ( item ) {
      this.$router.push ({
        path: 'detail',
        query: {
          id: item.id
        }
      })
    },

    clickBookItem ( item ) {
      this.$router.push ({
        path: 'bookDetailNew',
        query: {
          oid: item.id
        }
      })
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  #home {
    background: #F5F5F5;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    .homeBox {
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .search {
      width: 100%;
      padding: .05rem .125rem 0;
      background: #fff;
      input {
        height: .37rem;
        width: 100%;
        background: #F2F2F2;
        border: none;
        outline: none;
        border-radius: 37px;
        background-image: url(../../static/img/nav_search.png);
        background-repeat: no-repeat;
        background-size: .13rem .13rem;
        background-position: .215rem .12rem;
        text-indent: 3.5em;
        font-size: .14rem;
        color: #888888;
        font-weight: 500;
      }
    }

    .swiperCon{
      width: 100%;
      height: 2rem;
      padding: .13rem .125rem 0;
      background: #fff;
      .van-swipe {
        border-radius: 4px;
        height: 100%;
        overflow: hidden;
      }
      .van-swipe-item {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .head-bar{
        background: #F8F8F8;
        height: 0.1rem;
    }

    .todayRecommend {
      width: 100%;
      padding: 0 .125rem .25rem;
      background:#fff;
    }

    .cultureView,.cookMaster,.toBook {
      width: 100%;
      background: #fff;
      margin-top: .07rem;
      padding: 0 .125rem;
    }

    .cultureView,.cookMaster {
      padding-bottom: .105rem;
    }

    .toBook {
      padding-bottom: .5rem;
    }

    .cookMaster {
      .masterListScroll {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
      .masterList {
        white-space: nowrap;
        dl {
          display: inline-block;
          width: 1.255rem;
          height: 1.415rem;
          margin-right: .15rem;
          padding-top: .185rem;
          &:last-child {
            margin-right: 0;
          }
          dt {
            width: .6rem;
            height: .6rem;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          dd {
            width: 100%;
            text-align:center;
            h2 {
              color: #333333;
              font-size: .15rem;
              font-weight: 400;
              margin: .1rem auto .045rem;
            }
            span {
              height: .135rem;
              margin: 0 auto;
              background: url(../../static/img/titleBg.png) no-repeat;
              background-size: 100% 100%;
              line-height: .135rem;
              color: #FFFFFF;
              font-size: .1rem;
              text-align: center;
              padding: 0 0.09rem 0 0.07rem;
            }
          }
        }
      }
    }

    .masterListScroll::-webkit-scrollbar {
      display:none
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
          background: url(../../static/img/rightIcon.png) no-repeat;
          background-size: .06rem .105rem;
          background-position: .27rem .24rem;
          padding-right: .07rem;
        }
      }
  }

</style>

<style lang="less">
  .bookItemBox {
    dd {
      p {
        h1 {
          font-size: .13rem;
          color: #666666;
          font-weight: normal;
        }
      }
    }
  }
</style>
