<template>
  <div class="bookListBox">
    <div class="bookListCon">
        <div class="search" @click="goSearchBookResults">
          <input type="text" placeholder="搜索图书/电子书">
        </div>

        <ul class="bookListNav" @click="clickListNav">
          <li title="全部" :class="{ 'clickStyle': isAllBook === true }">全部</li>
          <li title="图书" :class="{ 'clickStyle': isBook === true }">图书</li>
          <li title="电子书" :class="{ 'clickStyle': isEBook === true }">电子书</li>
        </ul>
        <div class="scrollBox">
          <div class="allBook" v-show="isAllBook">
            <van-pull-refresh v-model="isLoading"
                      success-text="刷新成功"
                      @refresh="onRefresh">
              <van-list v-model="loading"
                        :finished="finished"
                        :immediate-check="false"
                        finished-text="没有更多了"
                        @load="onLoad">
                <div class="itemCon">
                  <bookCom @clickBookItem="clickBookItem ( 1, item )" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" /> 
                </div>
              </van-list>
            </van-pull-refresh>
          </div>

          <div class="allBook" v-show="isBook">
            <van-pull-refresh v-model="isLoading"
                      success-text="刷新成功"
                      @refresh="onRefresh">
              <van-list v-model="loading"
                        :finished="finished"
                        :immediate-check="false"
                        finished-text="没有更多了"
                        @load="onLoad">
                <div class="itemCon">
                  <bookCom @clickBookItem="clickBookItem ( 2, item )" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" /> 
                </div>
              </van-list>
            </van-pull-refresh>
          </div>

          <div class="allBook" v-show="isEBook">
            <van-pull-refresh v-model="isLoading"
                      success-text="刷新成功"
                      @refresh="onRefresh">
              <van-list v-model="loading"
                        :finished="finished"
                        :immediate-check="false"
                        finished-text="没有更多了"
                        @load="onLoad">
                <div class="itemCon">
                  <bookCom @clickBookItem="clickBookItem ( 3, item )" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" />
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
  getAllBookListAPI,
  getBookListAPI,
  getEbookListAPI
} from '@/api/sy'
import Vue from 'vue';
import { List } from 'vant';
import { Toast } from 'vant';
import { PullRefresh } from 'vant';
import bookCom from '../../components/sy/bookCom'

Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(List);
export default {
  name: 'bookList',
  components: {
    bookCom,
    [List.name]: List,
  },

  data () {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      totalPage: 0,
      totalNum: 0,
      isAllBook: true,
      isBook: false,
      isEBook: false,
      getAllBookListParams: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      getAllBookListData: [],
    }
  },

  mounted () {
    this.getAllBookList();
  },

  methods: {
    clickListNav ( e ) {
      let target = e.target.title;
      this.loading = false;
      this.finished = false;
      this.isLoading = false;
      this.totalPage = 0;
      this.totalNum = 0;
      this.getAllBookListData = [];
      this.getAllBookListParams.pageNum = 1;
      this.getAllBookListParams.pageSize = 10;
      switch ( target ) {
        case "全部":
          this.isAllBook = true;
          this.isBook = false;
          this.isEBook = false;
          this.getAllBookList();
        break;
        case "图书":
          this.isAllBook = false;
          this.isBook = true;
          this.isEBook = false;
          this.getBookList();
        break;
        case "电子书":
          this.isAllBook = false;
          this.isBook = false;
          this.isEBook = true;
          this.getEbookList()
        break;
      }
    },

    getAllBookList () {
      getAllBookListAPI ( this.getAllBookListParams ) 
      .then ( res => {
        this.loading = false;
        console.log(res, '123')
        if ( res.data.code === 0 ) {
          //this.getAllBookListData = res.data.data.list;
          this.totalPage = res.data.data.pages;
          this.totalNum = res.data.data.total;

          if ( this.totalPage != 1 ) {
            this.getAllBookListData = this.getAllBookListData.concat(res.data.data.list) || [];
            this.getAllBookListParams.pageNum++;
          } else {
            this.getAllBookListData = res.data.data.list || [];
            this.finished = true;
          }
          if ( this.getAllBookListData.length === this.totalNum ) {
            this.finished = true;
          }
          this.getAllBookListData.map ( ( item, index ) => {
            if ( item.type === "0" ) {
              this.$set( item, 'typeName', '图书')
            } else if ( item.type === "1" ) {
              this.$set( item, 'typeName', '电子书')
            }
          })
        } else {
          Toast.fail('获取列表数据失败');
        }
      }) 
    },

    getBookList () {
      getBookListAPI ( this.getAllBookListParams )
      .then ( res => {
        this.loading = false;
        console.log(res, '图书列表')
        if ( res.data.code === 0 ) {
          //this.getAllBookListData = res.data.data.list

          this.totalPage = res.data.data.pages;
          this.totalNum = res.data.data.total;

          if ( this.totalPage != 1 ) {
            this.getAllBookListData = this.getAllBookListData.concat(res.data.data.list) || [];
            this.getAllBookListParams.pageNum++;
          } else {
            this.getAllBookListData = res.data.data.list || [];
            this.finished = true;
          }
          if ( this.getAllBookListData.length === this.totalNum ) {
            this.finished = true;
          }
          this.getAllBookListData.map ( ( item, index ) => {
            this.$set( item, 'typeName', '图书')
          })
        } 
      })
    },

    getEbookList () {
      getEbookListAPI ( this.getAllBookListParams )
      .then ( res => {
        this.loading = false;
        console.log(res, '电子书列表')
        if ( res.data.code === 0 ) {
          //this.getAllBookListData = res.data.data.list

          this.totalPage = res.data.data.pages;
          this.totalNum = res.data.data.total;

          if ( this.totalPage != 1 ) {
            this.getAllBookListData = this.getAllBookListData.concat(res.data.data.list) || [];
            this.getAllBookListParams.pageNum++;
          } else {
            this.getAllBookListData = res.data.data.list || [];
            this.finished = true;
          }
          if ( this.getAllBookListData.length === this.totalNum ) {
            this.finished = true;
          }
          this.getAllBookListData.map ( ( item, index ) => {
            this.$set( item, 'typeName', '电子书')
          })
        } 
      })
    },

    onRefresh () {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
        this.getAllBookListData = [];
        this.getAllBookListParams.pageNum = 1;
        this.loading = false;
        this.finished = false;
        if ( this.isAllBook ) {
          this.getAllBookList();
          return false
        } else if ( this.isBook ) {
          this.getBookList();
          return false
        } else if ( this.isEBook ) {
          this.getEbookList();
          return false
        }
      }, 500);
    },

    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        if ( this.isAllBook ) {
          this.getAllBookList();
          return false
        } else if ( this.isBook ) {
          this.getBookList();
          return false
        } else if ( this.isEBook ){
          this.getEbookList();
          return false
        }
        this.loading = true;
      }, 500);
    },

    clickBookItem ( index, item ) {
      if ( index === 1 ) {
        if ( item.type === '0' ) {
          this.$router.push({
            path: 'bookDetailNew',
            query: {
              oid: item.id
            }
          })
        } else {
          this.$router.push({
            path: 'eBookDetail',
            query: {
              oid: item.id
            }
          })
        }
      } else if ( index === 2 ) {
        this.$router.push({
          path: 'bookDetailNew',
          query: {
            oid: item.id
          }
        })
      } else {
        this.$router.push({
          path: 'eBookDetail',
          query: {
            oid: item.id
          }
        })
      }
    },

    goSearchBookResults () {
      this.$router.push({
        path: 'searchBookResults'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .bookListBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #fff;
    .bookListCon {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
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
    
    .bookListNav {
      width: 100%;
      height: .525rem;
      display: flex;
      padding: 0 .125rem;
      margin-top: .145rem;
      li {
        height: 100%;
        line-height: .525rem;
        margin-right: .35rem;
        color: #333333;
        font-size: .15rem;
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

    .scrollBox {
      flex: 1;
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .allBook {
      width: 100%;
      padding: 0 .125rem;
    }
  }
</style>

<style lang="less">
// .bookListCon {
//   .van-pull-refresh {
//     height: 100%;
//     .van-pull-refresh__track {
//       display: flex;
//       flex-direction: column;
//       .scrollBox {
//         flex: 1;
//         overflow: auto;
//         -webkit-overflow-scrolling: touch;
//         width: 100%;
//       }
//     }
//   }
// }
</style>