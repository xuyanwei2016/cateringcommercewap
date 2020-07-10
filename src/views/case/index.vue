<template>
  <div class='chinesCase'>
    <div class='chinesTop'>
      <div class='titleBottom'>
        <div class='area' @click='$router.push({path:"/cityCase"})'>
          <span>{{region}}</span> 
          <img src="../../assets/img/list/areaBtm.png" alt="">
        </div>
        <div class='searchCn'>
          <input type="text" placeholder="搜索文章/美食/饮食文化" @click='$router.push({path:"/search"})'>
        </div>
        <div class='classify' @click='goClassfy'>
          <img src="../../assets/img/list/classify.png" alt="">
          <span>分类</span>
        </div>
      </div>
    </div>
    <div class='sitting'></div>
    <div class='center' v-if='this.list.length>=1'>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad">
          <chinesGreen :list='list'></chinesGreen>
        </van-list>
      </van-pull-refresh>
    </div>
    <div v-else class='noList'>
      <img src="@/assets/img/backgroundno.png" alt="">
      <p>暂无数据</p>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
import Foot from '../../components/Foot.vue';
import chinesGreen from '../../components/cateringList/chinesGreen'
import {getMenuListAPI,getDiytypeRegionAPI} from '@/api/chinesGreen/index'
export default {
    data(){
      return{
        list:[],
        total:0,
        listQuery:{
          pageSize:10,
          pageNum:1,
          diyTypeCode:null,
          ids:[]
        },
        loading: false,
        finished: false,
        isLoading: false,
        region:''
      }
    },
    components:{
      Foot,
      chinesGreen,
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    mounted(){
      document.body.style.backgroundColor = '#f3f3f3'
    },
    computed:{
        
    },
    created(){
      this.value=this.$route.query.val?this.$route.query.val:'';
      this.curModular=this.$route.query.resType?this.$route.query.resType:0;
      if(this.$route.query.resType==undefined){
          this.getMenuList()
      }

      let regionData = this.$route.query.typeName
      if( regionData ){
        this.region = regionData
      }else{
        this.getDiytypeRegion()
      }
    },
    methods:{
      goClassfy(){
        let idData = this.$route.query.ids
        this.$router.push({path:"/classify",query:{ids:idData}})
      },
      getDiytypeRegion(){
        getDiytypeRegionAPI().then(res=>{
          if( res.data.code == 0 ){
            this.region = res.data.data
          }
        })
      },
      getMenuList(){
        this.loading = true
        let dataIds = this.$route.query.ids
        let dataDiy = this.$route.query.diyTypeCode
        this.listQuery.ids = dataIds
        this.listQuery.diyTypeCode = dataDiy 
        getMenuListAPI(this.listQuery).then(res=>{
          if( res.data.code == 0 ){
            let rows = res.data.data.list
            this.loading = false
            this.isLoading = false
            this.total = res.data.data.total
            if( rows == null || rows.length === 0 ){
              this.finished = true
              return
            }
            this.list = this.list.concat(rows)
            if( this.list.length >= this.total ){ 
              this.finished = true
            }
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      onLoad(){
        this.listQuery.pageNum++
        this.getMenuList()
      },
      onRefresh(){
        this.finished = false
        this.loading = true
        this.list = []
        this.listQuery.pageNum = 1
        this.getMenuList()
      }
    },
}
</script>
<style lang='less' scoped>
  .chinesCase{
    .van-pull-refresh {
        height: 100%;
        .van-pull-refresh__track {
            display: flex;
            flex-direction: column;
            .scrollBox {
                margin-top:0.7rem;
                .allBook{
                    // width:100%;
                    // height:auto;
                    padding:0 0.125rem;
                    // position:relative;
                    // .itemCon{
                    //   position:absolute;
                    //   bottom:0;
                    //   left:0;
                    // }
                }
            }   
        }
    }
    .chinesTop{
      width:100%;
      position:fixed;
      top:0;
      left:0;
      background:#f3f3f3;
      z-index:99;
      .title{
        width:100%;
        height:0.44rem;
        background:#BB0606;
        text-align: center;
        line-height:0.44rem;
        font-size:0.17rem;
        color:#fff;
        font-weight:bold;
      }
      .titleBottom{
        width:3.45rem;
        height:0.37rem;
        margin:0.1rem auto;
        line-height:0.37rem;
        .area{
          width:0.5rem;
          height:0.37rem;
          float:left;
          span{
            display:inline-block;
            width:0.3rem;
            height:0.16rem;
            overflow:hidden;
            line-height:0.16rem;
            color:#333;
            font-size:0.14rem;
            display:inline-block;
            float:left;
            margin-top:0.09rem;
          }
          img{
            width:0.15rem;
            height:0.15rem;
            float:left;
            margin-top:0.1rem;
          }
        }
        .searchCn{
          input{
            width:2.434rem;
            height:0.37rem;
            background: url("../../assets/img/list/nav_search.png") no-repeat #fff 0.1rem 0.1rem;
            background-size: 0.13rem 0.14rem;
            float:left;
            border:none;
            border-radius:0.18rem;
            padding-left:0.35rem;

          }
        }
        .classify{
          width:0.5rem;
          height:0.37rem;
          line-height:0.37rem;
          float:right;
          img{
            width:0.14rem;
            height:0.14rem;
            float:left;
            margin:0.11rem 0.05rem;
          }
          span{
            display:inline-block;
            float:left;
          }
        }
      }
    }
    .sitting{
      width:100%;
      height:0.57rem;
    }
    .center{
      margin-bottom:0.49rem;
    }
    .noList{
      img{
        margin:0.5rem auto 0.2rem auto;
      }
      p{
        font-size:0.16rem;
        color:#ccc;
        text-align: center;
      }
    }
  }
</style>
