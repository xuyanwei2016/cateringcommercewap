<template>
  <div class="cultureBox">
    <div class="search">
      <input type="text" placeholder="搜索文章">
    </div>

    <div class="tabCon">
      <ul class="bookListNav">
        <li @click="clickListNav( item, key )" :class="{'clickStyle': key === current}" v-for="( item, key ) in cultureTabD" :key="key" title="全部">{{ item.typeName }}</li>
      </ul>
      <div class="listCon">
        <van-pull-refresh v-model="isLoading"
              success-text="刷新成功"
              @refresh="onRefresh">
          <van-list v-model="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad">
            <div class="swiperCon" v-if="getCarouselData && getCarouselData.length>0">
              <van-swipe :autoplay="3000"
                        indicator-color="white">
                <van-swipe-item v-for="( item, key ) in getCarouselData"
                                :key="key"
                                @click="goUrl( item )">
                  <van-image width="100%"
                            height="100%"
                            :src="`${domain}${requestPath.file}?fileName=${item.picture}&isOnLine=true`" />
                </van-swipe-item>
              </van-swipe>
            </div>
            <div class="commonCulture">
              <cultureView @clickThisItem="clickThisItem( item )" v-for="( item, key ) in getCultureListD" :key="key" :item="item" />
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>

import Vue from 'vue';
import { Tab, Tabs, Swipe, SwipeItem, List, Toast, PullRefresh } from 'vant';
import { 
  cultureTabAPI,
  getCarouselAPI,
  getCultureListAPI
} from '@/api/sy'

import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import cultureView from '@/components/sy/cultureView.vue'
import Foot from '../../components/Foot.vue';

Vue.use(Tab);
Vue.use(Tabs).use(Swipe).use(SwipeItem).use(List).use(Toast).use(PullRefresh);
export default {
  name: 'culture',
  components: {
    cultureView,
    Foot,
    [List.name]: List,
  },
  data () {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      totalPage: 0,
      totalNum: 0,
      domain: process.env.BASE_API,
      requestPath: requestPath,
      activeColor: '#000000',
      inactiveColor: '#333333',
      cultureTabP: {
        type: 'culture'
      },
      cultureTabD: [],
      getCarouselData: [],
      getCarouselParams: {
        signValue: 'culture_pictur',
        num: 8
      },
      getCultureListP: {
        pageNum: 1,
        pageSize: 10,
        recommendStatus: 1,
        hotStatus: 1,
        keywords: null,
        diyTypeCode: null
      },
      getCultureListD: [],
      current: 0
    }
  },

  mounted () {
    this.cultureTab();
    this.getCarousel();
    this.getCultureList();
  },

  methods: {
    clickListNav ( item, key ) {
      this.loading = false;
      this.finished = false;
      this.isLoading = false;
      this.totalPage = 0;
      this.totalNum = 0;
      this.getCultureListD = [];
      this.getCultureListP.pageNum = 1;
      this.getCultureListP.pageSize = 10;
      this.current = key
      if ( item.typeName !== '推荐' ) {
        this.getCultureListP.diyTypeCode = item.code;
        this.getCultureList();
      } else {
        this.getCultureListP.diyTypeCode = null;
        this.getCultureList();
      }
    },

    cultureTab () {
      cultureTabAPI ( this.cultureTabP )
      .then ( res => {
        console.log( res, 'tab数据' )
        if ( res.data.code === 0 ) {
          this.cultureTabD = res.data.data || []
          let allD = {
            typeName: '推荐'
          }
          this.cultureTabD.unshift(allD)
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

    getCultureList () {
      getCultureListAPI ( this.getCultureListP ) 
      .then ( res => {
        console.log(res, '文化列表')
        this.loading = false;
        if ( res.data.code === 0 ) {
          //this.getCultureListD = res.data.data.list
          this.totalPage = res.data.data.pages;
          this.totalNum = res.data.data.total;
          console.log(this.totalPage, '45555')
          if ( this.totalPage != 1 && this.totalPage != 0 ) {
            this.getCultureListD = this.getCultureListD.concat(res.data.data.list) || [];
            this.getCultureListP.pageNum++;
          } else {
            this.getCultureListD = res.data.data.list || [];
            this.finished = true;
          }
          if ( this.getCultureListD.length === this.totalNum ) {
            this.finished = true;
          }
        }else {
          Toast.fail('获取文化列表数据失败');
        }
      })
    },

    onRefresh () {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
        this.getCultureListD = [];
        this.getCultureListP.pageNum = 1;
        this.loading = false;
        this.finished = false;
        this.getCultureList();
      }, 500);
    },

    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.getCultureList()
        this.loading = true;
      }, 500);
    },

    clickThisItem ( item ) {
      console.log( item, '666' )
      this.$router.push({
        path: 'cultureDetail',
        query: {
          oid: item.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cultureBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .search {
    width: 100%;
    padding: .1rem .125rem 0;
    background: #fff;
    input {
      height: .37rem;
      width: 100%;
      background: #F2F2F2;
      border: none;
      outline: none;
      border-radius: 37px;
      background-image: url(../../../static/img/nav_search.png);
      background-repeat: no-repeat;
      background-size: .13rem .13rem;
      background-position: .215rem .12rem;
      text-indent: 3.5em;
      font-size: .14rem;
      color: #888888;
      font-weight: 500;
    }
  } 

  .listCon {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: .49rem;
  }

  .tabCon {
    width: 100%;
    flex: 1;
    margin-top: .18rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .bookListNav {
      width: 100%;
      height: .525rem;
      padding: 0 .125rem;
      white-space: nowrap;
      overflow: hidden;
      overflow-x: auto;
      li {
        height: 100%;
        line-height: .525rem;
        margin-right: .35rem;
        color: #333333;
        font-size: .15rem;
        display: inline-block;
        &:last-child {
          margin-right: 0;
        }
      }
      .clickStyle {
        color: #000000;
        font-size: .17rem;
        font-weight: bold;
      }
    }
    .bookListNav::-webkit-scrollbar {display:none}
  }

  .swiperCon {
    height: 1.4rem;
    width: 100%;
    padding: 0 .14rem;
    margin-top: .1rem;
    .van-swipe {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  .commonCulture {
    width: 100%;
    padding: 0 .14rem;
  }

  .videoCulture {
    width: 100%;
    padding: 0 .14rem;
    dl {
      width: 100%;
      dt {
        width: 100%;
        height: 1.45rem;
        position: relative;
        img:nth-of-type(1) {
          width: 100%;
          height: 100%;
        }
        img:nth-of-type(2) {
          width: .5rem;
          height: .5rem;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
        ul {
          width: 100%;
          height: .3rem;
          background: url(../../../static/img/caiBg.png) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          color: #FFFFFF;
          font-size: .13rem;
          line-height: .3rem;
          padding: 0 .15rem;
          justify-content: space-between;
        }
      }
      dd {
        width: 100%;
        height: .75rem;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow:0px 1px 10px rgba(204,204,204,0.7);
        color: #333333;
        font-size: .18rem;
        font-weight: bold;
        line-height: .27rem;
        padding: .1rem .15rem 0;
      }
    }
  }
}
</style>


