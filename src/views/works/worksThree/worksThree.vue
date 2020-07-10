<template>
    <div class='worksThree'>
        <div class='make'>
            <div class='shicai'>
                <img src="../../../assets/img/list/shicai.png" alt="">
                <h3>做法</h3>
            </div>
        </div>
        <div class='step'>
            <div class='stepBox'>
                <div class='stepDetail' v-for='(i,e) in list' :key='e'>
                    <div>
                        <span>{{e+1}}.</span>
                        <input type="text" placeholder="填写用法" v-model='i.steps'>
                    </div>
                    <van-uploader v-model="fileList[e]" deletable :max-count="1"  :after-read="file=>afterRead(file,e)" accept='image/*' />
                </div>
                <div class='add' @click='addClick'>
                    <div class='addBox'>
                        <img src="../../../assets/img/list/tjxyx.png" alt="">
                        <h1>添加下一步</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class='introduce'>
            <div class='introduceBox'>
                <textarea v-model='features' placeholder="介绍一下你的作品吧（如：作品特点、卖点、创意 创意、制作要点等等）"></textarea>
            </div>
        </div>
        <div class='next' @click='nextClick'>发布</div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import { saveImgAPI,mymenuSaveAPI } from '@/api/my.js'
import {getLocal,removeLocal} from '@/utils/LocalStorageUtils.js';
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            list:[
                {steps:''},
                {steps:''},
                {steps:''},                
            ],
            cover:'',
            fileList:[],
            coverE:null,
            features:''
        }
    },
    beforeCreate(){
      document.title = this.$route.meta
    },
    created(){

    },
    mounted(){
        document.body.style.backgroundColor = '#F5F2F5'
    },
    methods:{
        afterRead(file,e) {
            this._picture(this,file.file,'fileList',e) 
        },      
        _picture(that,file,key,e){
            let formData = new FormData();
            formData.append('file', file)
            saveImgAPI(formData).then(res=>{
                if( res.status == '200' ){
                    that.$toast('上传成功')
                    that.list[e].cover = res.data
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
        nextClick(){
            if( this.list[0].steps == '' ){
                this.$toast('请依次填写用法！')
            }else if( this.features == '' ){
                this.$toast('请输入作品介绍！')
            }else{
                let data = {
                    "video": getLocal('video'),
                    "title": getLocal('title'),
                    "lables": getLocal('lables'),
                    "menuIngredients":getLocal('menuIngredients'),
                    "diyTypes":getLocal('territoryList'),
                    "menuProcess":this.list,
                    "features":this.features,
                    "relations":getLocal('relations'),
                }
                mymenuSaveAPI(data).then(res=>{
                    if( res.data.code == 0 ){
                        this.$toast('发布成功')
                        setTimeout(()=>{
                            this.$router.push('/worksList')
                        },1000)
                        removeLocal('video')
                        removeLocal('title')
                        removeLocal('lables')
                        removeLocal('menuIngredients')
                        removeLocal('territoryList')
                        removeLocal('relations')
                    }else{
                        this.$toast(res.data.msg)
                    }
                })
            }
        },
        addClick(){
            this.list.push({})
        }
    }
}
</script>
<style lang='less' scoped>
    .worksThree{
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .step{
            width:100%;
            height:auto;
            background:#F9F9F9;
            .stepBox{
                width:3.35rem;
                height:auto;
                margin:auto;
                .stepDetail{
                    font-size:0.15rem;
                    div{
                        width:100%;
                        height:0.44rem;
                        line-height:0.44rem;
                        padding-top:0.03rem;
                        span{
                            color:#999;
                        }
                        input{
                            width:3rem;
                            height:0.44rem;
                            border:none;
                            background:#F9F9F9;
                            color:#999;
                        }
                        input::-webkit-input-placeholder {
                            color: #999;
                        }
                        input::-o-input-placeholder {
                            color: #999;
                        }
                        input::-moz-input-placeholder {
                            color: #999;
                        }
                        input::-ms-input-placeholder {
                            color: #999;
                        }
                    }
                    .van-uploader{
                        height:80px;
                    }
                }
                .add{
                    width:100%;
                    height:0.525rem;
                    background:#F9F9F9;
                    line-height:0.525rem;
                    margin-top:0.1rem;
                    padding-bottom:0.05rem;
                    .addBox{
                        width:3.45rem;
                        height:100%;
                        margin:auto;
                        img{
                            width:0.29rem;
                            height:0.29rem;
                            float:left;
                            margin:0.12rem 0.1rem 0 0 ;
                        }
                        h1{
                            font-size:0.15rem;
                            color:#333;
                            float:left;
                        }
                    }
                }
            }
        }
        .make{
            .shicai{
                width:100%;
                height:0.5rem;
                background:#fff;
                line-height: 0.5rem;
                img{
                    width:0.14rem;
                    height:0.14rem;
                    float:left;
                    margin:0.17rem 0.05rem 0 0.15rem;
                }
                h3{
                    font-size:0.15rem;
                    color:#333;
                    float:left;
                }
            }
        }
        .introduce{
            width:100%;
            height:1.85rem;
            background:#fff;
            margin:0.1rem 0 0.8rem 0;
            .introduceBox{
                width:3.45rem;
                height:100%;
                margin:auto;
                textarea{
                    width:3.45rem;
                    height:1.51rem;
                    margin:auto;
                    border:none;
                    line-height:0.21rem;
                    resize:none;
                    padding:0.17rem 0;
                    color:#999;
                    font-size:0.15rem;
                }
            }
        }
        .next{
            width:3.35rem;
            height:0.45rem;
            background:linear-gradient(90deg,rgba(228,34,34,1) 0%,rgba(187,6,6,1) 100%);
            box-shadow:0px 1px 18px 0px rgba(186,159,116,0.5);
            border-radius:0.225rem;
            text-align: center;
            line-height:0.45rem;
            color:#fff;
            font-size:0.15rem;
            position:fixed;
            bottom:0.25rem;
            left:0.2rem;
        }
    }
</style>
