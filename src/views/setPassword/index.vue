<template>
  <!--设置密码-->
  <div class="setPassword">
    <myHeader></myHeader>

    <ul class="list">
      <li @click="$router.push('/modifyPass')"><span>修改密码</span><img src="../../assets/img/personal/iconleft.png" alt=""></li>
      <li @click="$router.push('/phoneVerification')"><span>手机验证</span><img src="../../assets/img/personal/iconleft.png" alt=""></li>

    </ul>
    <div class="button active" @click="signOUT">
      退出账号
    </div>
    <!--是否登录-->
    <div class="setCont" v-if="isAlert" @click="isAlert=false">
      <div class="setName" @click.stop="">
        <!--<h1>提示</h1>-->
        <h2>是否退出账号</h2>
        <div class="buttonLogin">
          <span @click="isAlert=false">取消</span>
          <span @click="sumbit">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
  import {loginOutAPI} from '@/api/login/login'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        isAlert: false,
      }
    },
    components: {
      myHeader
    },
    created() {
    },
    watch: {},
    methods: {
      signOUT(){
        this.isAlert=true;
        /*this.$router.push('/loginPassword');*/
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
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .setPassword {
    height: 100%;
    width: 100%;
    .list {
      border-top: .54rem solid #F3F3F3;
      background: #fff;
      li {
        border-bottom: 1px solid #EEEEEE;
        padding: 0 .12rem;
        height: .56rem;
        line-height: .56rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: .15rem;
          color: #202021
        }
        img {
          width: .08rem;
          height: .14rem;
        }
      }

    }

    .button {
      position: fixed;
      bottom: .9rem;
      left: .35rem;
      text-align: center;
      width: 3.05rem;
      height: .42rem;
      line-height: .42rem;
      font-size: .15rem;
      color: #5F6775;
      border-radius: .21rem;
      background: #E6E6E6;
      box-shadow: 0.01rem .03rem .06rem 0rem rgba(0,0,0,0.1);
    }
    .active{
      background: #BA9F74;
      background-size: cover;
      color: #fff;
      font-weight: bold;
      box-shadow: 0.01rem .03rem .06rem 0rem rgba(186, 159, 116, 0.5);

    }
    /*设置昵称*/
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
            border: none;color: #BA9F74;
          }
        }
      }
    }
  }
</style>
