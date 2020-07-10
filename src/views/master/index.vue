<template>
  <!--醫家列表-->
  <div class="doctor">
    <listHeader @sonFn="fatFn" placeholder="搜索医师"></listHeader>
    <div :style="{overflow:'auto',height:list.length>0?winH+'px':''}"  v-infinite-scroll="load" infinite-scroll-disabled="disabled">
    <masterList :list="list" @linkDetail="linkDetail"></masterList>
    <div class="more" v-if="loading==1&&list.length>0&&!noMore">加载中...</div>
    <div class="noHave" v-if="noMore&&list.length>0">
      这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
    </div>
  </div>

    <noHave v-if="(loading==2||loading==0)&&list.length==0" :mess="{top:winH,loading:loading}"></noHave>
  </div>
</template>

<script>
import listHeader from '../../components/listHeader.vue';
import masterList from '../../components/lists/masterList.vue';
import noHave from '../../components/noHave.vue';

export default {
  name: 'master',
  data() {
    return {
      pageNum:1,
      pageSize:10,
      winH:0,
      loading: 0,
      data:{},
    }
  },
  components: {listHeader,noHave,masterList},
  created() {
    let winW=document.documentElement.clientWidth;
    this.winH=document.documentElement.clientHeight-(winW*142/375);
    this.data = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      resourceType: 51,
      orderBy:'uploadTime desc',
    };
    this.$store.dispatch('getList',this.data);
  },
  watch: {
    curLoading(n,o){
      this.loading=n;
    },
  },
  computed:{
    list(){
      return this.$store.state.list;
    },
    total(){
      return this.$store.state.total;
    },
    noMore () {
      return this.$store.state.list.length == this.total;
    },
    disabled () {
      return this.$store.state.curLoading==1||this.noMore;
    },
    curLoading () {
      return this.$store.state.curLoading;
    }
  },
  methods: {
    linkDetail(item){
      this.$router.push({path:'/masterDetail',query:{id:item.id}})
    },
    fatFn(data){
      this.loading=0;
      this.data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        resourceType: 51,
        content:data.content,
        nationsType:data.nationsType,
      };
      this.$store.dispatch('getList',this.data);
    },
    load () {
      this.loading = 1;
      this.data.pageNum += 1;
      this.$store.dispatch('getList',this.data)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.doctor {
  height: 100%;
}
</style>
