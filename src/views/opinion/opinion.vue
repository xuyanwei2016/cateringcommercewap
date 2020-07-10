<template>
    <div class='opinion'>
        <div class='center'>
            <textarea placeholder="请输入内容" maxlength="500" v-model='centerText' @blur='oninput'></textarea>
            <span>{{this.centerText.length}}/500</span>
        </div>
        <p class='textEmail'>你的邮箱：(非必填)</p>
        <div class='cat'>
            <input class='emailBox' type="text" placeholder="给出您的邮箱我们将第一时间回复您！" v-model='emailData' @blur='emailBlur'>
        </div>
        <div :class='btnState?"submit":"submitNo"' @click='btnState?submit():""' >提交</div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {feedbackSaveMAPI} from '@/api/my.js'
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            centerText:'',
            emailData:'',
            emailShow:false
        }
    },
    computed:{
        btnState(){
            return this.centerText !== '' && this.emailData != '' && this.emailShow
        }
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    mounted(){
        document.body.style.backgroundColor = '#F9F9F9'
    },
    methods:{
        submit(){
            let data = {
                content:this.centerText,
                email:this.emailData
            }
            feedbackSaveMAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    this.$toast.success('提交成功')
                    setTimeout(()=>{
                        this.$router.push({path:'/my'})
                    },1000)
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        oninput(){
            if( this.centerText.length >= 500 ){
                this.$toast('最多输入500个字符')
            }
        },
        emailBlur(){
            if( this.emailData != '' ){
                var reg=/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
                var re=new RegExp(reg);
                if(!re.test(this.emailData)){
                    this.$toast('邮箱格式不正确')
                    this.emailShow = false
                }else{
                    this.emailShow = true
                }
            }
        }
    }
}
</script>
<style lang='less' scoped>
    .opinion{
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .title{
            width:100%;
            height:0.44rem;
            background-size:100%;
            color:#000;
            font-size:0.18rem;
            line-height:0.44rem;
            text-align:center;
            position: fixed;
            top:0;
            z-index:999;
            background:#fff;
            .titleLeft{
                height:100%;
                display:inline-block;
                float:left;
                margin-left:0.12rem;
                font-size:0.35rem;
                img{
                    width:0.25rem;
                    height:0.25rem;
                    margin-top:0.1rem;
                }
            }
            .titleCenter{
                margin-left:-0.29rem;
                font-weight:bold;
            }
        }
        .center{
            width:100%;
            height:1.85rem;
            background:#fff;
            color:#333;
            textarea{
                display:block;
                width:3.45rem;
                height:1.4rem;
                border:none;
                margin:auto;
                padding-top:0.2rem;
                resize: none;
                font-size:0.15rem;
            }
            textarea::-webkit-input-placeholder{
            color: #C7C7C7;
            }
            textarea::-moz-input-placeholder{
            color: #C7C7C7;
            }
            textarea::-ms-input-placeholder{
                color: #C7C7C7;
            }
            span{
                float:right;
                margin-right:0.15rem;
                line-height:0.25rem;
            }
        }
        .textEmail{
            width:3.45rem;
            height:0.34rem;
            line-height:0.34rem;
            color:#999;
            font-size:0.13rem;
            margin:auto;
        }
        .cat{
            width:100%;
            height:0.5rem;
            background:#fff;
            .emailBox{
                width:3.45rem;
                height:0.5rem;
                background:#fff;
                line-height:0.5rem;
                font-size:0.15rem;
                color:#333;
                border:none;
                margin-left:0.15rem;
            }
        }
        .emailBox::-webkit-input-placeholder{
            color: #ccc;
        }
        .emailBox::-moz-input-placeholder{
            color: #ccc;
        }
        .emailBox::-ms-input-placeholder{
            color: #ccc;
        }
        .submit{
            width:3.35rem;
            height:0.45rem;
            background:#E42222;
            color:#fff;
            border-radius: 0.225rem;
            border:none;
            margin:2.2rem auto 0 auto;
            font-size:0.15rem;
            font-weight:bold;
            text-align: center;
            line-height:0.45rem;
        }
        .submitNo{
            width:3.35rem;
            height:0.45rem;
            background:#E6E6E6;
            color:#5F6775;
            border-radius: 0.225rem;
            border:none;
            margin:2.2rem auto 0 auto;
            font-size:0.15rem;
            font-weight:bold;
            text-align: center;
            line-height:0.45rem;
        }
    }
</style>

