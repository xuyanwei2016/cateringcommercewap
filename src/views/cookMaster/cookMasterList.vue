<template>
  <div class="cookMasterBox">
    <div class="cookMasterCon">
      <van-pull-refresh v-model="isLoading"
                      success-text="刷新成功"
                      @refresh="onRefresh">
          <div class="search">
            <form @submit.prevent="query" action="javascript:void 0">
              <input type="search" ref="searchKey" placeholder="搜索烹饪大师" v-model="getMasterListParams.content">
            </form>
          </div>
          <van-list v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    finished-text="没有更多了"
                    @load="onLoad">
             <ul>
              <li @click="goCookMasterDetail ( item )" v-for="( item, key ) in getMasterListData" :key="key">
                <dl>
                  <dt>
                    <img :src="`${domain}${requestPath.file}?fileName=${item.img}&isOnLine=true`" alt="">
                  </dt>
                  <dd>
                    <div>
                      <span>{{ item.realName }}</span>
                      <span>{{ item.title.split(',')[0]? item.title.split(',')[0].length > 7 ? item.title.split(',')[0].substring(0, 7) + '...' : item.title.split(',')[0]: ''}}</span>
                    </div>
                    <p>{{ item.brief ? item.brief.length > 38 ? item.brief.substring(0, 38) + '...' : item.brief : '' }}</p>
                  </dd>
                </dl>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>

     
    </div>
  </div>
</template>

<script>
import {
  getMasterListAPI
} from '@/api/sy.js'
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import Vue from 'vue';
import { List } from 'vant';
import { Toast } from 'vant';
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(List);

export default {
  name: 'cookMasterDetail',
  components: {
    [List.name]: List,
  },
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      loading: false,
      finished: false,
      isLoading: false,
      totalPage: 0,
      totalNum: 0,
      getMasterListParams: {
        pageNum: 1,
        pageSize: 20,
        orderBy: null,
        status: null,
        content: null
      },
      getMasterListData: []
    }
  },

  mounted () {
    this.getMasterList()
  },

  methods: {
    goCookMasterDetail ( item ) {
      this.$router.push({
        path: 'cookMasterDetail',
        query: {
          oid: item.id
        }
      })
    },

    query () {
      this.$refs.searchKey.blur()
      this.getMasterList();
    },

    getMasterList () {
      getMasterListAPI ( this.getMasterListParams ) 
      .then ( res => {
        console.log(res)
        this.loading = false;
        if ( res.data.code === 0 ) {
          this.totalPage = res.data.data.pages;
          this.totalNum = res.data.data.total;

          if ( this.totalPage != 1 ) {
            this.getMasterListData = this.getMasterListData.concat(res.data.data.list) || [];
            this.listParams.pageNum++;
          } else {
            this.getMasterListData = res.data.data.list || [];
            this.finished = true;
          }
          if ( this.getMasterListData.length === this.totalNum ) {
            this.finished = true;
          }
        }else {
          Toast.fail('获取精选课程列表数据失败');
        }
      }) 
    },

    onRefresh () {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
        this.getMasterListData = [];
        this.getMasterListParams.pageNum = 1;
        this.loading = false;
        this.finished = false;
        this.getMasterList();
      }, 500);
    },

    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.getMasterList()
        this.loading = true;
      }, 500);
    },
  }
}
</script>

<style lang="less">
  .cookMasterBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #fff;
  }

  .cookMasterCon {
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    ul {
      padding: 0 .125rem;
      li {
        border-bottom: 1px solid #EBEBEB;
        margin-top: .15rem;
        &:first-child {
          margin-top: .29rem;
        }
        &:last-child {
          border: none;
        }
      }
    }
    dl {
      width: 100%;
      height: .85rem;
      display: flex;
      dt {
        width: .7rem;
        height: .7rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      dd {
        flex: 1;
        margin-left: .085rem;
        padding-top: .095rem;
        div {
          width: 100%;
          line-height: 1;
          span:nth-of-type(1) {
            color: #FA6005;
            font-size: .15rem;
            vertical-align: top;
          }
          span:nth-of-type(2) {
            display: inline-block;
            height: .15rem;
            margin: 0 auto;
            background: url(../../../static/img/titleBg.png) no-repeat;
            background-size: 100% 100%;
            line-height: .17rem;
            color: #FFFFFF;
            font-size: .1rem;
            text-align: center;
            padding: 0 0.09rem 0 0.07rem;
            margin-left: .045rem;
          }
        }
        p {
          color: #666666;
          font-size: .13rem;
          line-height: .195rem;
          margin-top: .095rem;
        }
      }
    }
  }

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
</style>