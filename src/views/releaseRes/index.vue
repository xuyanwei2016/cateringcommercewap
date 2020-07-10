<template>
  <!--发布的资源-->
    <div class="releaseRes">
      <myHeader></myHeader>
      <div class="resType" v-if="typeList.length>0">

        <h1 v-for="(item,index) in typeList" :key="index" :class="$route.query.type==item.type?'active':''" @click="changeType(item)">{{item.name}}</h1>
      </div>
      <div :style="{width:'3.75rem',overflowX:'hidden',overflowY:'auto',height:list.length>0?winH+'px':''}"
           v-infinite-scroll="load"
           infinite-scroll-disabled="disabled" v-if="list.length>0">
      <ul class="dataList">
        <li v-for="(itemRes,indexRes) in list" :key="indexRes">
          <img :src="imgLink(itemRes.cover)" alt="" v-if="itemRes.cover">
          <div class="word"  :style="{width:itemRes.cover?'1.88rem':'100%'}">
            <h1 @click="$router.push({path:'/read',query:{id:itemRes.id}})">{{itemRes.title}}</h1>
            <!--<p>{{itemRes.synopsis}}</p>-->
            <p :id="`description${indexRes}`">{{Ellipsis(`description${indexRes}`,2,itemRes.synopsis,'.2')}}</p>
            <h2>{{status[itemRes.status]}}</h2>
          </div>
        </li>
        <!--<li>
          <div class="word" :style="{width:' 100%'}">
            <h1>如果改善失眠</h1>
            <p>失眠症主要是指睡眠不好以及睡眠质量不高。睡...</p>
            <h2>未通过</h2>
          </div>
        </li>-->
      </ul>
      </div>
      <noHave v-if="(loading==2||loading==0)&&list.length==0" :mess="{top:winH,loading:loading}"></noHave>
    </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
  import noHave from '../../components/noHave.vue';
  import {getResourceNumAPI,getResourceListAPI} from '../../api/xnew';
    export default {
        data() {
            return {
              typeList:[],
              cur:0,
              loading: 0,
              winH: 0,
              total: 0,
              pageSize: 10,
              pageNum: 1,
              list: [],
              isType:'',
              status: {1:'待审核', 2:'审核通过', 3:'审核不通过', 4:'已上架', 5:'已下架'},
            }
        },
        components: {myHeader,noHave},
      watch: {
        isType(n, o) {
          this.$router.push({path:'/releaseRes',query:{type:this.isType}});
          this.pageNum = 1;
          this.loading = 0;
          this.total = 0;
          this.list = [];
          this.getResourceList();
        },
        /*$route(n,o){
          this.isType=this.$route.query.type;
        },*/

      },
      computed: {
        noMore() {
          return this.list.length == this.total;
        },
        disabled() {
          /*console.log(this.loading == 1 || this.noMore||this.total<=10);*/
          return this.loading == 1 || this.noMore||this.total<=10;
        },
        token() {  //通过方法访问
          return this.$store.state.token;
        },
      },
      created(){
        let winW=document.documentElement.clientWidth;
        this.winH=document.documentElement.clientHeight-(winW*90/375);

        this.getResourceNum();
        /*if(this.$route.query.type){
          this.getResourceList();
        }*/
        /*this.getResourceNum();*/
      },
        methods: {
          load() {
            this.loading = 1;
            this.pageNum += 1;
            /*this.getCollect();*/
          },
          getResourceNum() {
            /*分类 ydcc_bl 病例, ydcc_ysbj 养生保健, ydcc_thesis 论文, ydcc_tslf 特色疗法, ydcc_zyhy 中医会议, ydcc_pf 偏方, ydcc_story 故事, ydcc_other 其他*/
            getResourceNumAPI().then(res => {
              console.log('资源分享', res)
              this.typeList = res.data.data;
              res.data.data.forEach((item, index) => {
                switch (item.type) {
                  case 'ydcc_bl'://病例
                    item.pic = 'pIcon4';
                    item.name = '病例';
                    break;
                  case 'ydcc_ysbj'://养生保健
                    item.pic = 'pIcon6';
                    item.name = '养生保健';
                    break;
                  case 'ydcc_thesis'://论文
                    item.pic = 'pIcon5';
                    item.name = '论文';
                    break;
                  case 'ydcc_tslf'://特色疗法
                    item.pic = 'pIcon7';
                    item.name = '特色疗法';
                    break;
                  case 'ydcc_zyhy'://中医会议
                    item.pic = 'pIcon7';
                    item.name = '中医会议';
                    break;
                  case 'ydcc_pf'://偏方
                    item.pic = 'pIcon7';
                    item.name = '偏方';
                    break;
                  case 'ydcc_story'://故事
                    item.pic = 'pIcon7';
                    item.name = '故事';
                    break;
                  case 'ydcc_other'://其他
                    item.pic = 'pIcon7';
                    item.name = '其他';
                    break;

                }

              })
              if(this.$route.query.type==undefined){
                if(this.typeList.length>0){
                  this.isType=this.typeList[0].type;
                }else{
                  this.isType='';
                  this.loading = 2;
                }

              }else if(this.$route.query.type!=undefined){
                this.isType=this.$route.query.type;
              }
            })
          },
          changeType(item){
            this.isType=item.type;
          },
          getResourceList(){
            console.log('资源礼包')
            getResourceListAPI({
              pageSize:this.pageSize,
              pageNum:this.pageNum,
              type:this.isType,
            }).then(res=>{
              console.log('获取列表',res.data);
              this.list = [...this.list, ...res.data.data.list];
              this.total = res.data.data.total;
              this.loading = 2;
            })
          },
        }
    }
</script>

<style scoped lang="less">
  .releaseRes{
    width: 100%;
    height: 100%;
    background: #faf7fa;
    .resType{
      position: fixed;
      top: .44rem;
      left:0;
      width: 100%;
      height: .46rem;
      line-height: .46rem;
      overflow-x: scroll;
      white-space: nowrap;
      padding-left:.15rem;
      background: #fff;
      display: flex;
      align-items: center;

      h1{font-size: .15rem; color:#666666;margin:0 .15rem;display: inline-block;text-align: center}
      .active{
        font-size: .17rem;color:#000;
        position: relative;
        overflow: hidden;
        height: .24rem;
        line-height: .24rem;
      }
      .active:after{
        /*content: ' ';
        height: .06rem;
        background: #BA9F74;*/
        position: absolute;
         width: 100%;
        /*height: 50%;
        left: 50%;*/
        bottom: -.07rem;
        display: block;
        border:.07rem solid #BA9F74;
        content: ' ';
        z-index: 0;
        opacity: 0.4;
      }
    }
    .dataList{
      padding-top: .9rem;
      li{
        width: 3.2rem;
        margin:.1rem auto;
        display: flex;
        justify-content: space-between;
        background: #fff;
        border-radius: .1rem;
        padding: .2rem .18rem .19rem .17rem;
        img{
          width: 1.19rem;
          height: .89rem;
        }
        .word{
          /*width: 1.88rem;*/
          h1{ color: #202021; font-size: .15rem;height: .24rem; line-height: .24rem; padding-bottom: .02rem}
          p{ font-size: .13rem; color: #666666;line-height: .2rem; margin-bottom: .08rem}
          h2{ color: #D8D7D7; font-size: .11rem; font-weight: normal}
        }
      }
    }
  }
</style>
