<template>
    <div id='resetOne'>
        <div class='iphone'>
            <span>手机号</span>
            <input type="text" v-model='iphoneNum' placeholder="请绑定手机号" >
        </div>
        <div class='verCode'>
            <span>验证码</span>
            <input type="number"  placeholder="请输入验证码" v-model='codeNum'>
            <button @touchend="codeOne && addBtnFlag && getlogin()" class="verCodeRight" type="primary">{{ btnText }}</button>
        </div>
        <div class='verCode'>
            <span >密码</span>
            <input class='passwordInput' type="password" placeholder="字符、数字或符号的组合，6-20个字符" v-model='passwordNum'>
        </div>
        <div :class='btnstate? "buttonNext":"buttonNo"' @touchend='btnstate?next():""'>提交</div>
        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText" :position="position" width='auto'></toast>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {getCodeAPI,getPhoneRepeatAPI,RegisterPasswordAPI,getLoginValidatePhoneCodeTwoAPI} from '@/api/login/login.js'
import md5 from 'blueimp-md5';
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            showPositionValue: false, //是否显示提示
            position: 'center', //提示信息的位置
            toastText: '', // 提示文本
            addBtnFlag:true,
            codeNum:'',
            iphoneNum:'',
            totalCount:0,
            passwordNum:'',
            codeOne:true  
        }
    },
    computed:{
        btnText(){
            return this.totalCount !==0? `重新获取(${this.totalCount}s)`: "获取验证码"
        },
        btnstate(){
            return this.codeNum !== '' && this.iphoneNum !='' && this.passwordNum != ''
        }
    },
    created(){

    },
    mounted(){
        document.body.style.backgroundColor = '#fff'
    },
    methods:{
        next(){
            if( this.iphoneNum !==  ''){
                let reg = /^1[3456789]\d{9}$/
                if( !reg.test(this.iphoneNum) ){
                    this.showPositionValue = true;
                    this.toastText = '请输入正确的手机号'
                    return
                }
            }
            if( this.codeNum !== '' ){
                let reg = /^[0-9]+$/
                if( !reg.test(this.codeNum)){
                    this.showPositionValue = true;
                    this.toastText = '请输入正确的验证码'
                    return
                }
            }
            if( this.passwordNum !== '' ){
                if( this.passwordNum.length < 6 || this.passwordNum.length > 20 ){
                    this.showPositionValue = true;
                    this.toastText = '密码长度必须在6-20个字符'
                    return
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
                        this.toastText = '密码为非法字符'
                        return
                    }else if( regS.test(this.passwordNum) || regA.test(this.passwordNum ) || regB.test(this.passwordNum ) || regC.test(this.passwordNum )|| regD.test(this.passwordNum )|| regE.test(this.passwordNum ) ){
                        this.showPositionValue = true;
                        this.toastText = '密码不能使用同一字符'
                        return
                    }
                }
            }
            getPhoneRepeatAPI(this.iphoneNum).then(res=>{
                if( res.data.code == 0 ){
                    if( res.data.data == false ){
                        this.showPositionValue = true;
                        this.toastText = ('该手机号不存在！')
                    }else{
                        // this.RegisterPassword()
                        this.getLoginValidatePhoneCode()
                    }
                }else{
                    this.showPositionValue = true;
                    this.toastText = res.data.msg
                }
            })
        },
        getLoginValidatePhoneCode(){
            let data = {
                phone:this.iphoneNum,
                code:this.codeNum
            }
            getLoginValidatePhoneCodeTwoAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    this.RegisterPassword()
                }else{
                    this.showPositionValue = true;
                    this.toastText = '验证码输入错误！'
                }
            })
        },
        RegisterPassword(){
            let data = {
                phone:this.iphoneNum,
                phoneCode:this.codeNum,
                newPassword2:md5(this.passwordNum).toUpperCase()
            }
            RegisterPasswordAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    this.showPositionValue = true
                    this.toastText = '提交成功'
                    setTimeout(()=>{
                        this.$router.push({path:'/loginPassword'})
                    },1000)
                }else{
                    this.showPositionValue = true
                    this.toastText = res.data.msg
                }
            })
        },
        prev(){
            this.$router.go(-1)
        },
        getlogin(){
            this.codeOne = false
            if( this.iphoneNum.length != '11' ){
                this.showPositionValue = true;
                this.toastText = '请输入正确的手机号'
                return
            }else{
                let data = {
                    phone:this.iphoneNum,
                    type:1
                }
                getCodeAPI(data).then(res=>{
                    this.phoneUuid = res.data.uuid
                    if( res.data.code == 0 ){
                        this.totalCount=60
                        this.showPositionValue = true;
                        this.toastText = '已发送验证码'
                        
                        if( this.addBtnFlag ){
                            this.interval=setInterval(()=>{
                                this.totalCount--
                                this.addBtnFlag = false
                                if(this.totalCount === 0){
                                    clearInterval(this.interval)
                                    this.addBtnFlag = true
                                    this.codeOne = true
                                }
                            },1000);
                        }
                        if( res.data.data.count == '6' ){
                            this.showPositionValue = true;
                            this.toastText = '该手机号还可以验证4次，请尽快验证'
                        }
                    }else{
                        this.showPositionValue = true;
                        this.toastText = res.data.msg
                    }
                })
            }
        },
    }
}
</script>
<style scoped lang='less'>
    #resetOne{
        overflow:hidden;
        width:100%;
        height:100%;
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
        .iphone,.verCode{
            width:100%;
            height:0.63rem;
            margin:auto;
            border-bottom:0.01rem solid #E3E3E3;
            span{
                width:0.5rem;
                font-size:0.15rem;
                color:#333;
                float:left;
                margin:0.21rem 0.15rem 0 0.15rem;
            }
            input{
                width:2.4rem;
                border:none;
                font-size:0.14rem;
                float:left;
                margin-top:0.23rem;
            }
            .passKeyNo{
                float:right;
                width:0.17rem;
                height:0.1rem;
                margin:0.27rem 0.1rem;
            }
            .passKey{
                float:right;
                width:0.17rem;
                height:0.1rem;
                margin:0.27rem 0.1rem;
            }
            .verCodeRight{
                width:auto;
                height:0.18rem;
                background:url('../../../../static/img/zhucecode.png') no-repeat left #fff;
                float:right;
                font-size:0.13rem;
                color:#BC0606;
                margin:0.22rem 0.15rem;
                border:none;
                // border-left:0.01rem dashed #000;
                padding-left:0.1rem;
            }
        }
        .iphone{
            img{
                width:0.15rem;
                height:0.2rem;
            }
        }
        .verCode{
            .verCodeCup{
                width:1.2rem;
                height:100%;
                background:pink;
                float:right;
            }
            img{
                width:0.17rem;
                height:0.2rem;
            }
            input{
                width:1.5rem;
                padding-right:0.05rem;
            }
        }
        .buttonNext{
            width:3.35rem;
            height:0.45rem;
            margin:auto;
            text-align: center;
            line-height:0.45rem;
            background:linear-gradient(90deg,rgba(228,34,34,1) 0%,rgba(187,6,6,1) 100%);
            border-radius: 0.225rem;
            margin-top:0.5rem;
            font-size:0.17rem;
            color:#fff;
            // font-weight:bold;
        }
        .buttonNo{
            width:3.35rem;
            height:0.45rem;
            margin:auto;
            text-align: center;
            line-height:0.45rem;
            background: #E6E6E6;
            border-radius: 0.225rem;
            margin-top:0.5rem;
            font-size:0.17rem;
            color:#5F6775;
            // font-weight:bold;
        }
        .verCode{
            .passwordInput{
                width:2.5rem;
            }
        }
    }
</style>
