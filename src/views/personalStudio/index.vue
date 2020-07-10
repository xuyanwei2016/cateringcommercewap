<template>
  <!--个人工作室-->
  <div class="personalStudio">
    <div class="perCont">
      <div class="people">
        <img src="../../assets/img/personal/port.png" alt="" v-if="!detail.faceImg">
        <img :src="imgLink(detail.faceImg)" alt="" v-if="detail.faceImg">
        <div>
          <h1>{{detail.name}}</h1>
          <h2>{{status[detail.authenticationType]}}</h2>
        </div>
      </div>
      <ul class="number">
        <li><b>{{collectionNum}}</b>
          <p>关注</p></li>
        <li><b>{{resourceCount}}</b>
          <p>学习</p></li>
      </ul>
    </div>
    <ul class="cont1">
      <li @click="$router.push('/publishOnline')">在线出版</li>
      <li @click="$router.push('/myStudio')">我的主页</li>
    </ul>
    <div class="cont2">
      <h1  @click="$router.push('/releaseRes')">资源分享</h1>
      <ul v-if="resourceList.length>0">
        <li v-for="(item,index) in resourceList" :key="index" @click="$router.push({path:'/releaseRes',query:{type:item.type}})"><!--<img :src="`./static/img/${item.pic}.png`" alt="">-->
          <h2>{{item.name}}</h2>
          <h3>{{item.count}}</h3></li>
        <!--<li><img src="../../assets/img/personal/pIcon5.png" alt="">
          <h2>论文</h2>
          <h3>23</h3></li>
        <li><img src="../../assets/img/personal/pIcon6.png" alt="">
          <h2>保健养生</h2>
          <h3>23</h3></li>
        <li><img src="../../assets/img/personal/pIcon7.png" alt="">
          <h2>特色疗法</h2>
          <h3>23</h3></li>-->
      </ul>
    </div>
    <div class="cont3" @click="$router.push('/lineLesson')"><h1>在线课程</h1><img src="../../assets/img/personal/pIcon3.png" alt=""></div>
    <div class="cont3" @click="$router.push('/topicList')"><h2>话题互动</h2><img src="../../assets/img/personal/pIcon3.png" alt=""></div>


    <Foot></Foot>
  </div>
</template>

<script>
  import Foot from '../../components/Foot.vue';
  import {getUserMessAPI, getCollectionNumAPI, getResourceNumAPI,getResourceCountAPI} from '../../api/xnew';

  export default {
    data() {
      return {
        detail:{faceImg:'',},
        collectionNum: 0,
        resourceCount:0,
        shareList: [],
        resourceList: [],
        status:['医师资格认证','医学院师生认证','实名认证'],
      }
    },
    components: {Foot},
    created() {
      this.getDetail();
      this.getResourceNum();
      this.getResourceCount();
    },
    methods: {
      getDetail() {
        getUserMessAPI().then(res => {
          console.log('获取信息', res)
          this.detail=res.data.data;
          this.getCollectionNum();
        })
      },
      getCollectionNum() {
        getCollectionNumAPI().then(res => {
          this.collectionNum = res.data.data;
        })
      },
      getResourceCount(){
        getResourceCountAPI().then(res=>{
          this.resourceCount=res.data.data;
        })
      },
      getResourceNum() {
        /*分类 ydcc_bl 病例, ydcc_ysbj 养生保健, ydcc_thesis 论文, ydcc_tslf 特色疗法, ydcc_zyhy 中医会议, ydcc_pf 偏方, ydcc_story 故事, ydcc_other 其他*/
        getResourceNumAPI().then(res => {
          console.log('资源分享', res)
          this.resourceList = res.data.data;
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
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .personalStudio {
    background: #f0f5f5;
    width: 100%;
    height: 100%;
    .perCont {
      background: #BA9F74;
      width: 100%;
      height: 2.34rem;
      border-radius: 0 0 0 .2rem;
      .people {
        display: flex;
        justify-content: flex-start;
        padding: .68rem .1rem .27rem .1rem;
        img {
          margin-right: .2rem;
          width: .63rem;
          height: .63rem;
          border: .01rem solid #fff;
          border-radius: 50%;
        }
        div {
          height: .63rem;
          display: flex;
          justify-content: center;
          flex-direction: column;
          color: #fff;
          h1 {
            font-size: .2rem;
            padding-bottom: .06rem;
            height: .2rem;
            line-height: .2rem
          }
          h2 {
            font-size: .12rem;
            font-weight: normal;
            background: url("../../assets/img/personal/authentication.png") no-repeat left center;
            background-size: .1rem;
            padding-left: .15rem
          }
        }
      }
      .number {
        color: #fff;
        display: flex;
        justify-content: flex-start;
        padding: 0 .54rem 0 .67rem;
        li {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          b {
            font-size: .24rem
          }
          p {
            font-size: .1rem
          }
        }
      }
    }
    .cont1 {
      margin: -.18rem .1rem 0 .1rem;
      height: .65rem;
      border-radius: .05rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      /*padding: 0 .39rem 0 .49rem;*/
      margin-bottom: .07rem;
      li {
        font-size: .15rem;
        color: #000;
        font-weight: bold;
        margin-top: .22rem;
        height: .25rem;
        line-height: .25rem;
        width: 50%;
        text-align: center;
      }
      li:first-child {
        /*background: url("../../assets/img/personal/pIcon2.png") no-repeat;*/
        background-size: .17rem;
        border-right: .01rem solid #EEEEEE;
        /*padding-left: .25rem*/
      }
      li:last-child {
        /*background: url("../../assets/img/personal/pIcon1.png") no-repeat;*/
        background-size: .2rem;
        /*padding-left: .28rem*/
      }
    }
    .cont2 {
      margin: 0 .1rem 0 .1rem;
      height:auto;
      background: #fff;
      border-radius: .05rem;
      h1 {
        font-size: .14rem;
        color: #000;
        padding: .15rem .15rem .15rem .36rem;
        background: url("../../assets/img/personal/icon6.png") no-repeat .15rem;
        background-size: .15rem;


      }
      ul {
        border-top: .01rem solid #EBEBEB;
        display: flex;
        justify-content: space-between;
        padding: .07rem .16rem 0 .16rem;
        li {
          width: 100%;
          display: flex;
          justify-content: space-between;
          /*flex-direction: column;*/
          align-items: center;
          height: .46rem;
          line-height: .46rem;
          h2 {
            color:#333333;
            font-size: .16rem;
            padding-left:.2rem;
            font-weight: normal;
          }
          h3 {
            color: #999999;
            font-size: .14rem;
            font-weight: normal;
          }
        }
      }
    }
    .cont3 {
      margin: .07rem .1rem;
      background: #fff;
      border-radius: .05rem;
      height: .45rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /*padding: 0 .16rem 0 .15rem;*/
      h1 {
        font-size: .14rem;
        color: #000;
        padding: .15rem .15rem .15rem .36rem;
        background: url("../../assets/img/personal/icon7.png") no-repeat .15rem;
        background-size: .13rem;;
      }
      h2 {
        font-size: .14rem;
        color: #000;
        padding: .15rem .15rem .15rem .36rem;
        background: url("../../assets/img/personal/icon8.png") no-repeat .15rem;
        background-size: .15rem;
      }
      img {
        width: .05rem;
        padding-right: .16rem;
      }
    }

  }
</style>
