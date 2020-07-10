<template>
    <div class='setPassword'>
        <div class='title'>
            <span class='titleLeft' @touchend='prev'><img src="../../../assets/img/list/fhjt.png" alt=""></span>
            <span class='titleCenter'>设置密码</span>
        </div>
        <img class='setImg' src="../../../assets/register/setpassword.png" alt="">
        <div class='password'>
            <span>密码</span>
            <input type="password" placeholder='字符、数字或符号的组合，6-20个字符' ref='password' v-model='passwordNum' @blur='passwordBlur' oninput="value=value.replace(/[ ]/g,'')">
            <img v-if='eyeShow==true' class='passKeyNo' src="../../../assets/register/bkj.png" alt="" @touchstart='eyePassword'>
            <img v-else class='passKey' src="../../../assets/register/kj.png" alt=""  @touchstart='eyePasswordNo'>
        </div>
        <div class='btnRegister' @touchend='registerBtn'>立即注册</div>
        <div class='agreement'>
            <span>注册表示您同意</span>
            <router-link to='../registerAgr'><span class='agreementSpan'>《用户注册协议》</span></router-link>            
        </div>
        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText" :position="position" width='auto'></toast>
    </div>
</template>
<script>
export default {
    data(){
        return{
            showPositionValue: false, //是否显示提示
            position: 'center', //提示信息的位置
            toastText: '', // 提示文本
            eyeShow:false,
            passwordNum:'',

        }
    },
    computed:{

    },
    created(){

    },
    methods:{
        passwordBlur(){
            if( this.passwordNum.length < 6 || this.passwordNum.length > 20 ){
                this.showPositionValue = true;
                this.toastText = '长度必须在6-20个字符之间'
            }else if( this.passwordNum !== '' ){
                let reg = /^[0-9a-zA-Z@#-_]+$/
                let regS = /^[0-9]+$/
                let regA = /^[a-zA-Z]+$/
                let regB = /^[@]+$/
                let regC = /^[#]+$/
                let regD = /^[-]+$/
                let regE = /^[_]+$/
                if( !reg.test(this.passwordNum) ){
                    this.showPositionValue = true;
                    this.toastText = '非法字符'
                }else if( regS.test(this.passwordNum) || regA.test(this.passwordNum ) || regB.test(this.passwordNum ) || regC.test(this.passwordNum )|| regD.test(this.passwordNum )|| regE.test(this.passwordNum ) ){
                    this.showPositionValue = true;
                    this.toastText = '不能使用同一字符'
                }
            }
        },
        registerBtn(){

        },
        prev(){
            this.$router.go(-1)
        },
        eyePassword(){
            this.eyeShow = false
            this.$refs.password.setAttribute('type','password')
        },
        eyePasswordNo(){
            this.eyeShow = true
            this.$refs.password.setAttribute('type','text')
        },
    },
}
</script>
<style lang='less' scoped>
    .setPassword{
        overflow:hidden;
        background:#fff;
        .title{
            width:100%;
            height:0.64rem;
            background:url('../../../assets/register/top-bg.png') no-repeat center;
            background-size:100%;
            color:#fff;
            font-size:0.18rem;
            line-height:0.64rem;
            text-align: center;
            .titleLeft{
                height:100%;
                display:inline-block;
                float:left;
                margin-left:0.12rem;
                font-size:0.35rem;
                img{
                    width:0.28rem;
                    height:0.25rem;
                    margin-top:0.19rem;
                }
            }
            .titleCenter{
                margin-left:-0.29rem;
                letter-spacing: 0.02rem;
            }
        }
        .setImg{
            width:2.55rem;
            height:0.83rem;
            margin:0.1rem auto 0.5rem auto;
        }
        .password{
            width:3.45rem;
            height:0.6rem;
            border-bottom:0.01rem solid #E3E3E3;
            margin:auto;
            line-height:0.6rem;
            span{
                color:#202021;
                font-size:0.15rem;
            }
            input{
                width:2.5rem;
                background:#fff;
                margin-left:0.05rem;
                border:none;
                font-size:0.12rem;
            }
            .passKeyNo{
                float:right;
                width:0.17rem;
                height:0.08rem;
                margin:0.27rem 0.1rem;
            }
            .passKey{
                float:right;
                width:0.2rem;
                height:0.14rem;
                margin:0.23rem 0.1rem;
            }
        }
        .btnRegister{
            width:3.01rem;
            height:0.42rem;
            border:none;
            background:url('../../../assets/register/loginBackground.png') no-repeat center;
            background-size:100%;
            border-radius: 0.21rem;
            color:#fff;
            -webkit-box-shadow:0rem 0.03rem 0.09rem #BBD5FD;
            -moz-box-shadow:0rem 0.03rem 0.09rem #BBD5FD;
            box-shadow:0rem 0.03rem 0.09rem #BBD5FD;
            margin:0.4rem auto 0.5rem auto;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            text-align: center;
            line-height:0.42rem;
        }
        .agreement{
            font-size:0.13rem;
            text-align: center;
            .agreementSpan{
                color:#0D70BA;
            }
        }
    }
</style>

