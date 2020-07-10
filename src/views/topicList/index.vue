<template>
  <div class="topicList" :style="{'marginTop':list.length==0?'0':'0.44rem'}">
    <myHeader></myHeader>
    <div :style="{overflow:'auto',height:list.length>0?winH+'px':''}"  v-infinite-scroll="load" infinite-scroll-disabled="disabled" v-if="list.length>0">
      <ul class="cont">
        <li v-for="(item,index) in list" :key="index">
          <p @click="$router.push({path:'/interactionDetail',query:{id:item.id}})">
            {{item.name}}</p>
          <h2>{{item.createTime}}</h2>
        </li>
        <li class="moreOnly" v-if="!noMore">
          <div v-if="loading==1&&list.length>0">加载中...</div>
        </li>
        <li v-if="noMore&&list.length>10"><div class="noHave" >
          这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
        </div></li>
      </ul>
    </div>
    <noHave :mess="{top:winH,loading:loading}" v-if="list.length==0"></noHave>
  </div>
</template>

<script>
  import noHave from '../../components/noHave.vue';
  import myHeader from '../../components/myHeader.vue';
  import {getTopicListAPI} from '../../api/xnew';

  export default {
    data() {
      return {
        list: [],
        total:0,
        loading: 0,
        pageNum:1,
        pageSize:10,
        winH:0,

      }
    },
    components: {myHeader,noHave},
    computed:{
      noMore () {
        return this.list.length == this.total;
      },
      disabled () {
        return this.loading==1||this.noMore||this.total<=10;
      },
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    created() {
      let winW=document.documentElement.clientWidth;
      this.winH=document.documentElement.clientHeight-(winW*44/375);
      this.getList();
    },
    methods: {
      load(){
        this.loading=1;
        this.pageNum+=1;
        this.getList();
      },
      getList() {
        getTopicListAPI({pageNum:this.pageNum,pageSize:this.pageSize}).then(res => {
          if(res.data.status){
            this.list=[...this.list,...res.data.data.list];
            this.total=res.data.data.total;
            this.loading=2;
          }
        })
      },

    }
  }
</script>

<style scoped lang="less">
  .topicList {
    border-top: .1rem solid #faf7fa;
    .cont {

      width: 3.5rem;
      margin: 0 auto;
      li {
        border-bottom: .01rem solid #EEEEEE;
        padding: .2rem 0 .15rem 0;
        p {
          line-height: .19rem;
          color: #333333;
          font-size: .13rem;
          padding-bottom: .08rem;
        }
        h2 {
          color: #D8D7D7;
          font-size: .12rem;
          font-weight: normal;
          text-align: right;
        }

      }
    }

  }
</style>
