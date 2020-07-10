<template>
  <div class="allCommentsBox">
    <van-pull-refresh v-model="isLoading"
                      success-text="刷新成功"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="onLoad">
        <div class="itemCon">
          <commentCom v-for="( item, key ) in getCommentListData" :key="key" :item="item" />
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

import commentCom from '../../components/sy/commentCom'

import {
  getCommentListAPI
} from '@/api/sy'
export default {
  name: 'allComments',
  components: {
    commentCom,
    [List.name]: List,
  },
  data () {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      totalPage: 0,
      totalNum: 0,
      getCommentListParams: {
        resourceId: this.$route.query.oid,
        resourceType: this.$route.query.resourceType,
        pageNum: 1,
        pageSize: 10,
        orderBy: null
      },
      getCommentListData: [],
    }
  },
  mounted () {
    this.getCommentList();
    document.body.style.backgroundColor = '#fff'
  },

  methods: {
    onRefresh () {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
        this.getCommentListData = [];
        this.getCommentListParams.pageNum = 1;
        this.loading = false;
        this.finished = false;
        this.getCommentList();
      }, 500);
    },

    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.getCommentList()
        this.loading = true;
      }, 500);
    },

    getCommentList () {
      getCommentListAPI ( this.getCommentListParams ) 
      .then ( res => {
        this.loading = false;
        if ( res.data.code === 0 ) {
          console.log(this.getCommentListData,'评论')
          //this.getCommentListData = res.data.data.list
          this.totalPage = res.data.data.pages;
          this.totalNum = res.data.data.total;

          if (this.totalPage != 1) {
            this.getCommentListData = this.getCommentListData.concat(res.data.data.list) || [];
            this.getCommentListParams.pageNum++;
          } else {
            this.getCommentListData = res.data.data.list || [];
            this.finished = true;
          }
          if (this.getCommentListData.length === this.totalNum) {
            this.finished = true;
          }
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.allCommentsBox {
  width: 100%;
  height: 100%;
  padding: 0 .125rem;
}
</style>