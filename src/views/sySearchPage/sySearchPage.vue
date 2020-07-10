<template>
  <div class="bookListBox">
    <div class="bookListCon">
      <van-pull-refresh v-model="isLoading"
                      success-text="刷新成功"
                      @refresh="onRefresh">
        <div class="search">
          <input type="text" placeholder="搜索图书/电子书">
        </div>
        <ul class="syFlistNav">
          <li>文化大观</li>
          <li>中国菜</li>
          <li>直通书城</li>
          <li>烹饪大师</li>
        </ul>
        <ul class="bookListNav" @click="clickListNav">
          <li title="全部" :class="{ 'clickStyle': isAllBook === true }">默认</li>
          <li>|</li>
          <li title="图书" :class="{ 'clickStyle': isBook === true }">最热</li>
          <li>|</li>
          <li title="电子书" :class="{ 'clickStyle': isEBook === true }">最新</li>
        </ul>
        <div class="searchNum">为您找到<span>320</span>条资源</div>
        <div class="scrollBox">
          <div class="allBook" v-show="isAllBook">
            <van-list v-model="loading"
                      :finished="finished"
                      :immediate-check="false"
                      finished-text="没有更多了"
                      @load="onLoad">
              <div class="itemCon">
                <bookCom @clickBookItem="clickBookItem (1)" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" /> 
              </div>
            </van-list>
          </div>

          <div class="allBook" v-show="isBook">
            <van-list v-model="loading"
                      :finished="finished"
                      :immediate-check="false"
                      finished-text="没有更多了"
                      @load="onLoad">
              <div class="itemCon">
                <bookCom @clickBookItem="clickBookItem (2)" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" /> 
              </div>
            </van-list>
          </div>

          <div class="allBook" v-show="isEBook">
            <van-list v-model="loading"
                      :finished="finished"
                      :immediate-check="false"
                      finished-text="没有更多了"
                      @load="onLoad">
              <div class="itemCon">
                <bookCom @clickBookItem="clickBookItem (3)" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" />
              </div>
            </van-list>
          </div>
        </div>
        
      </van-pull-refresh>
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
  name: 'sySearchPage',
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

    clickBookItem ( index ) {
      if ( index === 1 ) {
        this.$router.push({
          path: 'bookDetailNew'
        })
      } else if ( index ===3 ) {
        this.$router.push({
          path: 'eBookDetail'
        })
      }
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
      flex: 1;
      overflow: hidden;
    }

    .syFlistNav {
      width: 100%;
      height: .46rem;
      display: flex;
      justify-content: space-around;
      line-height: .46rem;
      font-size: .15rem;
      color: #333333;
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
      height: .4rem;
      display: flex;
      padding: 0 .125rem 0 .355rem;
      li {
        height: 100%;
        line-height: .4rem;
        margin-right: .32rem;
        color: #777777;
        font-size: .14rem;
        &:last-child {
          margin-right: 0;
        }
        &:nth-of-type(2),&:nth-of-type(4) {
          color: #EEEEEE;
          width: 2px;
          height: .15rem;
        }
      }
      .clickStyle {
        color: #BB0606;
      }
    }

    .searchNum {
      width: 100%;
      height: .24rem;
      text-align: center;
      line-height: .24rem;
      background: #F5F5F5;
      font-size: .12rem;
      span {
        color: #DD3549;
      }
    }

    .allBook {
      width: 100%;
      padding: 0 .125rem;
    }
  }
</style>

<style lang="less">
.bookListCon {
  .van-pull-refresh {
    height: 100%;
    .van-pull-refresh__track {
      display: flex;
      flex-direction: column;
      .scrollBox {
        padding-top: .155rem;
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        width: 100%;
      }
    }
  }
}
</style>