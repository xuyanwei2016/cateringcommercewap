<template>
  <div class="freeClassPageBox">
    <van-pull-refresh v-model="isLoading"
                      success-text="刷新成功"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="onLoad">
        <div class="itemCon">
          <ul>
            <li v-for="( item, key ) in apprenticeData" :key="key">
              <dl>
                <dt>
                  <img v-if="item.img" :src="`${domain}${requestPath.file}?fileName=${item.img}&isOnLine=true`" alt="">
                  <img v-else src="../../../static/img/morenHeader.png" alt="">
                </dt>
                <dd>
                  <h2>{{ item.account }}</h2>
                  <p>{{ item.content }}</p>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue';
import { List } from 'vant';
import { Toast } from 'vant';
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(List);

import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";

import {
  getApprenticeAPI
} from '@/api/sy'
export default {
  name: 'masterAndApprentice',
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
      apprenticeData: [],
      getApprenticeParams: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        oid: this.$route.query.oid
      }
    }
  },

  mounted () {
    this.getApprentice();
  },

  methods: {
    onRefresh () {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
        this.apprenticeData = [];
        this.getApprenticeParams.pageNum = 1;
        this.loading = false;
        this.finished = false;
        this.getApprentice();
      }, 500);
    },

    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.getApprentice()
        this.loading = true;
      }, 500);
    },

    getApprentice () {
      getApprenticeAPI ( this.getApprenticeParams )
      .then ( res => {
        this.loading = false;
        console.log(res, '大师徒弟')
        if ( res.data.code === 0 ) {
          //this.apprenticeData = res.data.data.list || []
          this.totalPage = res.data.data.pages;
          this.totalNum = res.data.data.total;

          if (this.totalPage != 1) {
            this.apprenticeData = this.apprenticeData.concat(res.data.data.list) || [];
            this.getApprenticeParams.pageNum++;
          } else {
            this.apprenticeData = res.data.data.list || [];
            this.finished = true;
          }
          if (this.apprenticeData.length === this.totalNum) {
            this.finished = true;
          }
        }
      })
    },

    // getMoreClassList () {
    //   getLabelListPageAPI(this.listParams)
    //     .then(res => {
    //       this.loading = false;
    //       console.log(res, '123')
    //       if (res.data.code === 0) {
    //         this.totalPage = res.data.data.pages;
    //         this.totalNum = res.data.data.total;

    //         if (this.totalPage != 1) {
    //           this.oneBookOneClassItemData = this.oneBookOneClassItemData.concat(res.data.data.list) || [];
    //           this.listParams.pageNum++;
    //         } else {
    //           this.oneBookOneClassItemData = res.data.data.list || [];
    //           this.finished = true;
    //         }
    //         if (this.oneBookOneClassItemData.length === this.totalNum) {
    //           this.finished = true;
    //         }
    //       } else {
    //         Toast.fail('获取精选课程列表数据失败');
    //       }
    //     })
    // },
  }
}
</script>

<style lang="less" scoped>
.freeClassPageBox {
  width: 100%;
  height: 100%;
  padding: 0 0.125rem;
  padding-top: .18rem;
  background: #fff;
  .van-list {
    width: 100%;
    height: 100%;
    .itemCon {
      width: 100%;
      ul {
        width: 100%;
        li {
          width: 100%;
          border-bottom: 1px solid #EBEBEB;
          padding-bottom: .15rem;
          margin-bottom: .15rem;
          dl {
            width: 100%;
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
              margin-left: .1rem;
              line-height: 1;
              padding-top: .095rem;
              h2 {
                color: #333333;
                font-size: .15rem;
              }
              p {
                color: #666666;
                font-size: .15rem;
                line-height: .195rem;
                margin-top: .1rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>