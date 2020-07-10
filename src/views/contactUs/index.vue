<template>
    <div class='contact'>
        <div class='phone'>客服电话：</div>
        <div class='inputCon'>
            <input type="text" v-model='phone'>
        </div>
        <div class='email'>客服邮箱：</div>
        <div class='inputCon'>
            <input type="text" v-model='email'>
        </div>
        <div class='email'>官网地址：</div>
        <div class='inputCon'>
            <input type="text" v-model='site'>
        </div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {getContacuUsAPI} from '@/api/my'
export default {
    data(){
        return{
            phone:'15896965656',
            email:'1584655522@163.com',
            site:'www.baidu.com'
        }
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    mounted(){
        document.body.style.backgroundColor = '#F3F3F3'
    },
    created(){
        this.getContacuUs()
    },
    methods:{
        getContacuUs(){
            getContacuUsAPI('kefu_phone').then(res=>{
                if( res.data.code == 0 ){
                    this.phone = res.data.data.value
                }else{
                    this.$toast(res.data.msg)
                }
            })
            getContacuUsAPI('kefu_email').then(res=>{
                if( res.data.code == 0 ){
                    this.email = res.data.data.value
                }else{
                    this.$toast(res.data.msg)
                }
            })
            getContacuUsAPI('kefu_adress').then(res=>{
                if( res.data.code == 0 ){
                    this.site = res.data.data.value
                }else{
                    this.$toast(res.data.msg)
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
    .contact{
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .phone{
            width:3.45rem;
            height:0.425rem;
            margin:auto;
            line-height:0.5rem;
            color:#999;
            font-size:0.13rem;
        }
        .email{
            width:3.45rem;
            height:0.33rem;
            margin:auto;
            line-height:0.33rem;
            color:#999;
            font-size:0.13rem; 
        }
        .inputCon{
            width:100%;
            height:0.5rem;
            background:#fff;
            input{
                width:3.45rem;
                height:0.5rem;
                margin-left:0.15rem;
                border:none;
                color:#333;
                font-size:0.15rem;
                line-height:0.5rem;
            }
        }
    }
</style>

