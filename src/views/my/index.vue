<template>
  <div class="my">
    <div class='topBackground'>
      <img src="../../assets/img/list/myBackground.png" alt="">
      <div class='headPt'>
        <div class='headImg' @click='edit'>
          <img v-if='userData.img' :src="imgLink(userData.img)" alt="">
          <img v-else src="../../assets/img/list/zgctx.png" alt="">
        </div>
        <div class='headLogin' v-if='!this.tokenHiden'>
            <span @click='$router.push({path:"/loginPassword"})'>登录</span>
        </div>
        <div class='headName' v-else>
          <div class='headBox'>
            <strong>{{userData.account}}</strong>
            <span v-if='userData.cook==0' @click='$router.push({path:"/attestation"})'>去认证</span>
            <span v-if='userData.cook==1'>审核中</span>
            <span v-if='userData.cook==3' @click='$router.push({path:"/attestation"})'>审核未通过</span>            
            <div class='headYet' v-else-if='userData.cook==2' @click='$router.push({path:"/attestation"})'>
              <img src="../../assets/img/list/yetzs.png" alt="">
              已认证
            </div>
          </div>
          <p>{{userData.phone}}</p>
        </div>
      </div>
    </div>
    <div class='bind' style='height:2.74rem;'>
      <ul>
        <li v-for='(item,index) in list' :key='index' @click='linkHref(item,index)'>
          <div><img :src='item.img' alt=""></div>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class='bindTwo' style='height:0.94rem;top:3.94rem;'>
      <ul>
        <li v-for='(item,index) in listTwo' :key='index' @click='linkHrefOther(item)'>
          <div><img :src='item.img' alt=""></div>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class='bindThree' style='height:auto;top:4.98rem;margin-bottom:0.6rem'>
      <ul>
        <li v-for='(item,index) in listThree' :key='index' @click='linkHrefOther(item)'>
          <div><img :src='item.img' alt=""></div>
          <span>{{item.name}}</span>
        </li>
        <li v-if='this.tokenHiden' @click='popoutClick' >
          <div><img src='../../../static/img/tcdl.png' alt=""></div>
          <span>退出登录</span>
        </li>
      </ul>
    </div>
    <!-- 退出弹框 -->
    <div class="setCont" v-if="isAlert" @click="isAlert=false">
      <div class="setName" @click.stop="empt">
        <h2>是否退出账号</h2>
        <div class="buttonLogin">
          <span @click="isAlert=false">取消</span>
          <span @click="sumbit">确定</span>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Foot from '../../components/Foot.vue';
  import Cookies from 'js-cookie';
  import {getMemberAPI} from '@/api/my'
  import {loginOutAPI} from '@/api/login/login'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list:[
          {name:'我的订单',link:'/order',img:'./static/img/wddd.png'},
          {name:'我的作品',link:'/worksList',img:'./static/img/wdzp.png'},
          {name:'我的喜欢',link:'/myLike',img:'./static/img/wdxh.png'},
          {name:'我的书架',link:'/myBook',img:'./static/img/wdsj.png'},
          {name:'地址管理',link:'/siteList',img:'./static/img/dzgl.png'},
          {name:'购物车',link:'/order',img:'./static/img/gwc.png'},          
        ],
        listTwo:[
          {name:'我的评论',link:'/discuss',img:'./static/img/wdpl.png'},
          {name:'意见反馈',link:'/opinion',img:'./static/img/yjfk.png'},
        ],
        listThree:[
          {name:'联系我们',link:'/contactUs',img:'./static/img/lxwm.png'},
        ],
        info:{
          account:'',img:''
        },
        tokenHiden:false,
        userData:{},
        isAlert:false
      }
    },
    components: {
      Foot,
    },
    mounted(){
      document.body.style.backgroundColor = '#f3f3f3'
    },
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token&&this.$store.state.token!='null'?true:false;
      },
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    created() {
      if(this.token){
          this.tokenHiden = true
          this.getMember()
        }else{
          this.tokenHiden = false
        }
    },
    watch: {
      
    },
    methods: {
      popoutClick(){
        this.isAlert = true
      },
      sumbit(){
        this.$router.push('/loginPassword');
        this.$store.commit('signOUT');
        loginOutAPI().then(res=>{
          if( res.data.code == 0 ){
            
          }else{

          }
        })
      },
      getMember() {
        getMemberAPI().then(res => {
          if( res.data.code == 0 ){
            this.userData = res.data.data
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      edit(){
        if(this.token){
          this.$router.push('/edit');
        }
        else{
          this.$router.push('/loginPassword');
        }
      },
      linkHref(item,index){
        if(!this.token){
          this.$router.push('/loginPassword');
          return
        }else{
          this.$router.push(item.link);
        }
        Cookies.set('phone',this.info.phone);
      },
      linkHrefOther(item){
        if(!this.token){
          this.$router.push('/loginPassword');
          return
        }
        this.$router.push(item.link);
        Cookies.set('phone',this.info.phone);
      },
      empt(){}
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .my {
    position:relative;
    .title{
        width:100%;
        height:0.44rem;
        background-size:100%;
        color:#000;
        font-size:0.17rem;
        line-height:0.44rem;
        text-align:center;
        background:#fff;
        .titleCenter{
            font-weight:bold;
        }
    }
    .topBackground{
      width:100%;
      height:2rem;
      overflow:hidden;
      img{
        width:4.2rem;
        height:2rem;
        margin-left:-0.2rem;
      }
      .headPt{
        width:3.45rem;
        height:0.6rem;
        margin:auto;
        position:absolute;
        top:0.225rem;
        left:0.15rem;
        .headImg{
          width:0.6rem;
          height:0.6rem;
          float:left;
          margin-right:0.11rem;
          img{
            width:0.6rem;
            height:0.6rem;
            border-radius: 50%;
            margin-left:0;
          }
        }
        .headLogin{
          width:0.9rem;
          height:0.43rem;
          line-height:0.43rem;
          float:left;
          color:#fff;
          font-size:0.18rem;
          font-weight:bold;
        }
        .headName{
          width:2.5rem;
          height:0.6rem;
          float:left;
          .headBox{
            width:2.5rem;
            height:0.25rem;
            margin-top:0.11rem;
            strong{
              display:inline-block;
              float:left;
              font-size:0.18rem;
              color:#fff;
              font-weight:bold;
              margin-right:0.1rem;
            }
            span{
              display:inline-block;
              float:left;
              width:auto;
              height:0.15rem;
              padding:0 0.05rem;
              line-height:0.17rem;
              margin-top:0.05rem;
              text-align: center;
              background:url(../../../static/img/qurenzheng.png) no-repeat center;
              background-size: 100% 100%;
              color:#fff;
              font-size:0.09rem;
            }
            .headYet{
              width:0.58rem;
              height:0.15rem;
              float:left;
              background:url('../../assets/img/list/myRZ.png') no-repeat center;
              font-size:0.09rem;
              color:#000;
              border-radius: 0.03rem;
              margin-top: 0.02rem;
              font-size:0.09rem;
              line-height:0.15rem;
              img{
                width: 0.11rem;
                height: 0.11rem;
                float: left;
                margin: 0.02rem 0.01rem 0 0.04rem;
              }
            }
          }
          p{
            display:block;
            color:#fff;
            font-size:0.11rem;
            margin-top:0.015rem;
          }
        }
      }
    }
    .bind,.bindTwo,.bindThree{
      width:3.45rem;
      margin:auto;
      background:#fff;
      position: absolute;
      top: 1.1rem;
      left: 0.15rem;
      border-radius: 0.1rem;
      ul{
        li{
          width:3.45rem;
          height:0.45rem;
          background:url('../../assets/img/personal/iconleft.png') no-repeat 3.2rem center;
          background-size:0.07rem 0.12rem;
          div{
            width:0.49rem;
            height:0.45rem;
            float:left;
            img{
              width:0.15rem;
              height:0.15rem;
              margin-top:0.15rem;
              margin-left:0.2rem;
            }
          }
          span{
            display:inline-block;
            width:2.95rem;
            height:0.445rem;
            border-bottom:0.01rem solid #EBEBEB;
            float:right;
            font-size:0.16rem;
            line-height:0.445rem;
          }
        }
        li:last-child{
            span{
              border-bottom:none;
            }
          }
      }
    }
    .setCont {
      width: 100%;
      height: 100%;
      position: fixed;
      background: rgba(0, 0, 0, 0.3);
      padding-top: 1.7rem;
      top: 0;
      left: 0;
      z-index: 40;
      display: flex;
      justify-content: center;
      .setName {
        width: 2.7rem;
        height: 1.44rem;
        background: rgba(255, 255, 255, 1);
        border-radius: .1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        h1 {
          font-size: .18rem;
          color: #333333;
          padding-top: .22rem;
          height: .17rem;
          line-height: .17rem;
        }
        h2 {
          color:#666666;
          font-size: .16rem;
          font-weight: normal;
          padding-top: .4rem;
        }
        .buttonLogin {
          width: 100%;
          border-top: 1px solid #D9DADE;
          display: flex;
          justify-content: space-between;
          span {
            display: inline-block;
            width: 49.5%;
            line-height: .49rem;
            text-align: center;
            color: #333333;
            font-size: .18rem;
            border-right: 1px solid #D9DADE;
          }
          span:last-child {
            border: none;color: #BB0606;
          }
        }
      }
    }
  }
</style>
