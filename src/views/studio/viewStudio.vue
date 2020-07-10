<template>
  <div >
    <studio-header></studio-header>
    <!-- <div class="DetailTit">
      <div class="back" @click="$router.go(-1)">
        <img src="@/assets/img/list/back.png" alt="">
      </div>
      <div class="set">认证</div>
      <div></div>
    </div> -->
    <div class="view-con">
        <img class="view-img" src="@/assets/img/studio/view-bg.png" alt="">
        <div class="view-text">认证审核中，请耐心等待</div>
        <div class="view-now"><span @click="linkDetail">查看认证信息</span></div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '../../components/Foot.vue';
import studioHeader from '../../components/header/studioHeader.vue';
import {getMemberStudio} from '@/api/studio/studio.js';
export default {
  name: 'viewCreate',
  data() {
    return {
      memberStatus:{  // 0：审核未通过 1：审核通过 2：待审核 3：禁用
        '0':()=>{
          this.$router.push({path:'studioType',query:{status:'0'}})
        },
        '1':()=>{
          this.$router.push({path:'personalStudio'})
        },
        '2':()=>{
          this.$router.push({path:'studioType',query:{status:'2'}})
        },
        '3':'',
      }
    }
  },
  components:{studioHeader,Foot},
  created() {
    let winW=document.documentElement.clientWidth;
    this.winH=document.documentElement.clientHeight-(winW*142/375);
  },
  watch: {
  },
  computed: {
    // token() {  //通过方法访问
    //   return this.$store.state.token;
    // },
  },
  methods: {
    linkDetail(id){
      getMemberStudio().then(res=>{
        if(res.data.code == 0){
          let data = res.data.data
          console.log(data,111111111)
          this.memberStatus[data]()
        }else{
          this.$toast.fail(res.data.msg);
        }
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.DetailTit {
    width: 100%;
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    background: #BA9F74;
    // background: url("../assets/img/list/top-bg.png") no-repeat;
    // background-size: cover;
    padding-top: .33rem;
    height: .31rem;
    display: flex;
    justify-content: space-between;
    .back {
    width: .11rem;
    height: .18rem;
    padding-left: .12rem;
    padding-top: .05rem;
    img {
        width: .11rem;
        height: .18rem;
    }
    }
    .set {
    color: #fff;
    font-size: .18rem;
    font-weight: bold;
    }
    .send {
    display: block;
    height: .31rem;
    line-height: .28rem;
    color: #fff;
    font-size: .15rem;
    padding-right: .12rem;

    }
}
.view-con{
    display: flex;
    flex-direction: column;
    align-items: center;
    .view-img{
        margin-top: 1rem;
        margin-bottom: .2rem;
    }
    .view-text{
        font-family: PingFang-SC-Medium;
        font-size: .17rem;
        line-height: .19rem;
        color: #222;
    }
    .view-now{
        margin-top: .6rem;
        padding: 0 .2rem;
        span{
            padding: .145rem 1.16rem;
            border-radius: .45rem;
            background: #BB9E73;
            font-size: .17rem;
            line-height: .19rem;
            color: #eee;
        }
    }
}
</style>
