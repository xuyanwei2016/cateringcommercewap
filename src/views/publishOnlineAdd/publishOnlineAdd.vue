<template>
    <div class='pnAdd'>
        <myHeader></myHeader>
        <div class='name' style='margin-top:0.75rem;'>
            <div class='nameBox'>
                <p>选题名称</p>
                <input type="text" placeholder="请输入选题名称" v-model='title' oninput="value=value.replace(/[ ]/g,'')">
                <img src="@/assets/img/personal/iconleft.png" alt="">
            </div>
        </div>
        <div class='name'>
            <div class='nameBox'>
                <p>姓名</p>
                <input type="text" placeholder="请输入姓名" v-model='name' oninput="value=value.replace(/[ ]/g,'')">
                <img src="@/assets/img/personal/iconleft.png" alt="">
            </div>
        </div>
        <div class='name'>
            <div class='nameBox'>
                <p>手机号码</p>
                <input type="text" placeholder="请输入手机号码" v-model='phone' oninput="value=value.replace(/[ ]/g,'')">
                <img src="@/assets/img/personal/iconleft.png" alt="">
            </div>
        </div>
        <div class='details'>
            <div class='detailsBox '>
                <p>主要内容</p>
                <textarea placeholder="出版价值，主要内容以及特点，出版价值主要内容以及特点" v-model='detailsDat' oninput="value=value.replace(/[ ]/g,'')"></textarea>
            </div>
        </div>
        <div class='explain'>
            <p>在线出版申请说明：</p>
            <span>1.上传到平台的资源想要进行整合出版 </span>
            <span>2.有出版意向，但资源未上传到平台上 </span>
            <span>3.此处在线出版只在现上申请具体事宜线下沟通。</span> 
        </div>
        <button @touchend='savePublishList'>提交申请</button>
    </div>
</template>
<script>
import {savePublishAPI} from '@/api/login/login.js'
import myHeader from '../../components/myHeader.vue';
import Cookies from 'js-cookie';
export default {
    data(){
        return{
            title:'',
            name:'',
            phone:'',
            detailsDat:'',
        }
    },
    components:{
        myHeader
    },
    mounted(){
        
    },
    created(){
        this.name = Cookies.get('publishName')
        this.phone = Cookies.get('publishPhone')
    },
    methods:{

        savePublishList(){
            if( this.title.length <= 0 ){
                this.$message.warning('选题名称不能为空！')
                return
            }
            if( this.name.length <= 0 ){
                this.$message.warning('姓名不能为空！')
                return
            }
            let reg = /^1[3456789]\d{9}$/
            if( !reg.test(this.phone) ){
                console.log('777')
                this.$message.warning ('请输入正确的手机号')
                return
            }
            if( this.detailsDat.length <= 0 ){
                this.$message.warning('主要内容不能为空！')
                return
            }
            let data = {
                title:this.title,
                creater :this.name,
                phone :this.phone ,
                content :this.detailsDat
            }
            savePublishAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    this.$message.success('提交成功！')
                    setTimeout(()=>{
                        this.setPublish()
                    },1500)
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        setPublish(){
            this.$router.push({path:'/publishOnline'})
        },
    },
}
</script>
<style lang="less" scoped>
    .pnAdd{
        width:100%;
        height:100%;
        position:fixed;
        background:#eee;
        .name{
            width:100%;
            height:0.53rem;
            border-bottom:0.01rem solid #eee;
            background:#fff;
            line-height:0.53rem;
            .nameBox{
                width:3.5rem;
                height:100%;
                margin:auto;
                p{
                    width:0.8rem;
                    height:100%;
                    text-align: left;
                    font-size:0.15rem;
                    color:#333;
                    float:left;
                }
                input{
                    width:2.5rem;
                    height:100%;
                    border:none;
                    float:left;
                    text-align:right;
                    color:#666;
                }
                img{
                    width:0.08rem;
                    height:0.15rem;
                    float:right;
                    margin-top:0.18rem;
                }
            }
        }
        .details{
            width:100%;
            min-height:0.74rem;
            background:#fff;
            .detailsBox{
                width:3.5rem;
                height:auto;
                margin:auto;
                p{
                    width:0.8rem;
                    height:100%;
                    text-align: left;
                    font-size:0.15rem;
                    color:#333;
                    float:left; 
                    margin-top:0.2rem;
                }
                textarea{
                    width: 2.6rem;
                    height: 0.5rem;
                    border: none;
                    float:right;
                    margin-top:0.22rem;
                    color:#666;
                }
            }
        }
        .explain{
            width:3.5rem;
            height:1rem;
            margin:auto;
            p{
                color:#BA9F74;
                font-size:0.12rem;
                margin:0.14rem 0 0.1rem 0;
            }
            span{
                display:block;
                color:#999;
                font-size:0.12rem;
                margin-bottom:0.02rem;
            }
        }
        button{
            display:block;
            width:3.35rem;
            height:0.45rem;
            background:#BA9F74;
            color:#fff;
            border-radius:0.225rem;
            margin:1.4rem auto 0 auto;
            text-align: center;
            line-height:0.45rem;
            font-size:0.17rem;
            letter-spacing: 0.02rem;
            border:none;
        }
    }
</style>