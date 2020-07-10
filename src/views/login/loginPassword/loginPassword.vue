<template>
    <transition v-on:before-enter='beforeEnter' v-on:enter='enter' v-on:after-enter='afterEnter'>
        <div class='loginPas'>
            <div class='title'>密码登录</div>
            <div class='iphone'>
                <img src="../../../assets/register/iphone.png" alt="">
                <input type="text" placeholder="请输入手机号或用户名" v-model='phoneNum' v-on:input='change' @blur='phoneBlur' >
                <img v-if='this.closeShow' class='iphoneClose' src="../../../assets/register/close.png" alt="" @touchend='closeIphone'>
            </div>
            <div class='verCode'>
                <img class='verLeft' src="../../../assets/register/password.png" alt="">
                <input type="password" placeholder="请输入密码" ref='passwordRef' v-model='passwordNum' @blur='passwordBlur' >
                <img v-if='eyeShow' class='verCodeBkj' src="../../../assets/register/bkj.png" alt="" @touchend='eyeBtn'>
                <img v-else class='verCodekj' src="../../../assets/register/kj.png" alt="" @touchend='eyeBtnNo'>            
            </div>
            <div class='verCode' v-if='countShow'>
                <img class='verLeft' src="../../../assets/register/yzm.png" alt="">
                <input type="text" class='verCodeInput' placeholder="请输入数字验证码" v-model='countNum' >
                <img :src="baseImg" alt="" class='verCodeImg'>
            </div>
            <button :class='btnState?"login":"loginNo"' @touchend='btnState?loginBtn():""'>登录</button>
            <div class='goRegister'>
                <router-link to='../resetOne'><div class='forget'>忘记密码？</div></router-link>
                <span class='goRSpan02' @touchend='goRegister'>去注册</span>
            </div>
            <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText" :position="position" width='auto'></toast>
            <div class='returnGo' @click='$router.go(-1)'></div>
        </div>
    </transition>
</template>
<script>
import {passwordLoginAPI,getImgCodeAPI,passwordLoginCheckPhoneAPI} from '@/api/login/login'
import md5 from 'blueimp-md5';
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            eyeShow:false,
            showPositionValue:false,
            toastText:'',
            position: 'center',
            phoneNum:'',
            passwordNum:'',
            countShow:false,
            countNum:'',
            baseImg:{},
            baseUuid:'',
            closeShow:false,
            // phoneShow:false
        }
    },
    mounted(){
        document.body.style.backgroundColor = '#fff'
    },
    computed:{
        btnState(){
            if( this.countShow ){
                return this.phoneNum!==''&&this.passwordNum!==''&&this.countNum!=='' 
            }else{
                return this.phoneNum!==''&&this.passwordNum!=='' 
            }
        }
    },
    created(){
        
    },
    methods:{
        goRegister(){
            this.$router.push({path:'../registerAgr',query:{type:'view'}})
        },
        prev(){
            this.$router.go(-1)
        },
        beforeEnter:function(el){
            
        },
        enter:function(el,done){
            
        },
        afterEnter:function(el){

        },
        change(){
            if( this.phoneNum.length>=1 ){
                this.closeShow = true
            }else{
                this.closeShow = false
            }
        },
        closeIphone(){
            this.phoneNum = ''
            this.closeShow = false
        },
        getImgCode(){
            getImgCodeAPI().then(res=>{
                this.baseImg = res.data.img
                this.baseUuid = res.data.uuid
            })
        },
        phoneBlur(){
            // let reg = /^[0-9a-zA-Z-_]{4,20}$/
            // if( !reg.test(this.phoneNum) && this.phoneNum.length !== 0 ){
            //     this.showPositionValue = true
            //     this.toastText = '输入不合法'
            // }
            // passwordLoginCheckPhoneAPI(this.phoneNum).then(res=>{
            //     if( res.data.code == 0 ){
            //         if( !res.data.data ){
            //             this.$toast('该手机号码不存在')
            //             this.phoneShow = false
            //         }else{
            //             this.phoneShow = true
            //         }
            //     }else{
            //         this.$toast(res.data.msg)
            //     }
            // })
        },
        passwordBlur(){
            // let reg = /^[0-9a-zA-Z@#-_]{6,20}$/
            // if( this.passwordNum.length < 6 || this.passwordNum.length > 20 ){
            //     this.showPositionValue = true
            //     this.toastText = '密码长度必须在6-20个字符'
            // }else if( !reg.test(this.passwordNum) ){
            //     this.showPositionValue = true
            //     this.toastText = '非法字符'
            // }
        },
        loginBtn(){
            let data = {
                account:this.phoneNum,
                password:md5(this.passwordNum).toUpperCase(),
                uuid:this.baseUuid,
                code:this.countNum,
                type:'1',
                channel:'1'
            }
            passwordLoginAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    
                    this.showPositionValue = true
                    this.toastText = '登录成功';
                    this.$store.commit('setToken',res.data.data)
                    this.$router.push({path:'/my'})
                }else if( res.data.code == '3' ){
                    //验证码
                }else{
                    this.showPositionValue = true
                    this.toastText = res.data.msg
                }
            })
        },
        eyeBtn(){
            this.eyeShow = false
            this.$refs.passwordRef.setAttribute('type','password')
        },
        eyeBtnNo(){
            this.eyeShow = true
            this.$refs.passwordRef.setAttribute('type','text')
        }
    },
}   
</script>
<style scoped lang='less'>
    #app{
        background:#fff;
    }
    .loginPas{
        width:100%;
        height:100%;
        overflow:hidden;
        background:#fff;
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .title{
            color:#333;
            font-size:0.22rem;
            font-weight:bold;
            text-align: left;
            text-align: left;
            margin:0.4rem 0 0.15rem 0.24rem;
        }
        .iphone,.verCode{
            width:3.45rem;
            height:0.63rem;
            margin:auto;
            border-bottom:0.01rem solid #E3E3E3;
            img{
                float:left;
                margin:0.21rem 0.15rem 0 0.12rem;
            }
            input{
                border:none;
                font-size:0.15rem;
                float:left;
                margin-top:0.23rem;
                background:#fff;
            }
        }
        .iphone{
            input{
              width: 2.0rem;
            }
            img{
                width:0.15rem;
                height:0.2rem;
            }
            .iphoneClose{
                float: right;
                width: 0.25rem;
                height: 0.25rem;
                margin: 0.19rem 0.1rem 0 0;
            }
        }
        .verCode{
            margin-bottom:0.3rem;
            .verLeft{
                width:0.17rem;
                height:0.2rem;
            }
            input{
                padding-right:0.05rem;
                width:2rem;
            }
            .verCodeBkj{
                width:0.2rem;
                height:0.08rem;
                margin-top:0.28rem;
                float:right;
            }
            .verCodekj{
                width:0.2rem;
                height:0.14rem;
                margin-top:0.28rem;
                float:right;
            }
            .verCodeInput{
                width:1.5rem;
            }
            .verCodeImg{
                float:right;
                margin:0.14rem 0.12rem 0 0 ;
            }
        }
        .login{
            display:block;
            width:3.3rem;
            height:0.42rem;
            border:none;
            border-radius: 0.21rem;
            color:#fff;
            background:linear-gradient(90deg,rgba(228,34,34,1) 0%,rgba(187,6,6,1) 100%);
            margin:0 auto 0.21rem auto;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            line-height:0.42rem;
            text-align: center;
        }
        .loginNo{
            display:block;
            width:3.3rem;
            height:0.42rem;
            border:none;
            border-radius: 0.21rem;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            line-height:0.42rem;
            text-align: center;
            background:#E6E6E6;
            color:#5F6775;
            margin:0 auto 0.21rem auto;
        }
        .loginNum{
            color:#BA9F74;
            font-size:0.13rem;
            margin-bottom:2rem;
            text-align: center;
        }
        .goRegister{
            font-size:0.13rem;
            width:3.3rem;
            height:0.2rem;
            margin:auto;
            .forget{
                color:#BCBCBE;
                float:left;
            }
            .goRSpan02{
                color:#BC0606;
                float:right;
            }
        }
    }
</style>
