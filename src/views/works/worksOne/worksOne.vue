<template>
    <div class='worksOne'>
        <div class='top'>
            <div class='topBox'  style='background:#fff;'>
                <p class='topBoxP'>选择图片</p>
                <div class='setImg'>
                    <van-uploader v-model="fileList" deletable :max-count="1"  :after-read="afterRead" accept='image/*'/>
                </div>
            </div>
            <div class='video'  style='background:#fff;'>
                <div class='videoBox'>
                    <div>
                        <van-uploader v-model="videoList" deletable :max-count="1"  :after-read="afterReadVideo" accept='video/*' />
                    </div>
                    <p>点击上传制作视频（可选）视频大小不超过50MB</p>
                </div>
            </div>
            <div class='name'  style='background:#fff;'>
                <div class='nameBox'>
                    <p>作品名</p>
                    <input type="text" v-model='name' placeholder="请输入作品名">
                </div>
            </div>
            <div class='cuisine' style='background:#fff;'>
                <div class='cuisineBox'>
                    <div class='cuisineTop'>
                        <div>请选择菜系</div>
                        <p @click='nextCuisine'>更多</p>
                    </div>
                    <div class='below'>
                        <ul>
                            <li v-for='(i,e) in list' :key='e'>
                                <span>{{i.name}}</span>
                                <div @click='deletBelow(i)'><img src="../../../assets/img/list/worksOnegb.png" alt=""></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class='next' @click='nextClick'>下一步</div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import { saveImgAPI,saveVideoAPI } from '@/api/my.js'
import { setTimeout } from 'timers';
import {setLocal} from '@/utils/LocalStorageUtils.js';
export default {
    data(){
        return{
            name:'',
            list:[],
            idList:[],
            fileList: [],
            videoList:[],
            cover:[{imgId:''}],
            video:''
        }
    },
    beforeCreate(){
      document.title = this.$route.meta.title
    },
    created(){
          
    },
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = false;
        next();
    },
    beforeRouteEnter(to, from, next){
        next(vm=>{
            vm.routeQuery()
        })
        
    },
    
    mounted(){
        document.body.style.backgroundColor = '#F5F2F5'
    },
    methods:{
        nextCuisine(){
            this.list = []
            this.$router.push({path:'/cuisineList'})
        },
        routeQuery(){
            let dataName = this.$route.params.dataName
            let dataId = this.$route.params.dataId
            if( dataName ){
                for( let i=0; i<dataName.length; i++ ){
                    let data = []
                    data.name = dataName[i]
                    this.list.push(data)
                }
            }
            if( dataId ){
                for( let i=0; i<dataId.length; i++ ){
                    let data = []
                    data = dataId[i]
                    this.idList.push(data)
                }
            }
        },
        deletBelow(e){
            this.list.splice(e,1)
            this.idList.splice(e,1)
        },
        afterReadVideo(file) {
            if( file.file.size > 50*1024*1024 ){
                this.$toast('视频大小不能超过50MB')
                file.status = 'failed'
                return
            }else{
                this._video(this,file.file,'videoList')
            }
        },  
        _video(that,file,key){
            let formData = new FormData();
            formData.append('file', file)
            saveVideoAPI(formData).then(res=>{
                if( res.status == '200' ){
                    that.$toast('上传成功')
                    this.video = res.data
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
        afterRead(file) {
            console.log(file,'121212121')
            this._picture(this,file.file,'fileList')
        },  
        _picture(that,file,key){
            let formData = new FormData();
            formData.append('file', file)
            saveImgAPI(formData).then(res=>{
                if( res.status == '200' ){
                    that.$toast('上传成功')
                    this.cover[0].imgId = res.data
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
        nextClick(){
            if( this.cover[0].imgId == '' ){
                this.$toast('请选择图片！')
            }else if( this.video == '' ){
                this.$toast('请上传视频！')
            }else if( this.name == '' ){
                this.$toast('请输入作品名！')
            }else if( this.idList.length === 0 ){
                this.$toast('请选择菜系！')
            }else{
                setLocal('relations',this.cover)
                setLocal('video',this.video)
                setLocal('title',this.name)
                setLocal('lables',this.idList)
                this.$router.push('/worksTwo')
            }
            
        }
    }
}
</script>
<style lang='less' scoped>
    .worksOne{
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
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
        .top{
            width:100%;
            height:auto;
            // background:#fff;
            .cuisine{
                width:100%;
                height:auto;
                background:#fff;
                margin:0.1rem 0 0.8rem 0;
                .cuisineBox{
                    width:3.45rem;
                    height:auto;
                    margin:auto;
                    background:#fff;
                    .cuisineTop{
                        height:0.5rem;
                        width:100%;
                        line-height:0.5rem;
                        div{
                            font-size:0.15rem;
                            color:#333;
                            float:left;
                        }
                        p{
                            color:#C7C7C7;
                            font-size:0.12rem;
                            float:right;
                        }
                    }
                    .below{
                        ul{
                            width:100%;
                            height:auto;
                            background:#fff;
                            // padding-bottom:0.15rem;
                            li{
                                display:block;
                                width:auto;
                                height:0.275rem;
                                line-height:0.29rem;
                                padding:0 0.15rem;
                                background:#F9EBEE;
                                border-radius: 0.05rem;
                                color:#BB0606;
                                float:left;
                                margin:0.05rem 0.1rem 0.05rem 0;
                                position:relative;
                                div{
                                    position:absolute;
                                    right:-0.03rem;
                                    top:-0.04rem;
                                    img{
                                        width:0.135rem;
                                        height:0.135rem
                                    }
                                }
                            }
                            li:last-child{
                                margin-bottom:0.15rem;
                            }
                        }
                        ul::after{
                            content:".";
                            clear:both;
                            display:block;
                            height:0;
                            overflow:hidden;
                            visibility:hidden;
                        }
                    }
                }
            }
            .name{
                width:100%;
                height:0.5rem;
                background:#fff;
                .nameBox{
                    width:3.45rem;
                    height:100%;
                    margin:auto;
                    p{
                        width:0.51rem;
                        height:100%;
                        float:left;
                        font-size:0.15rem;
                        color:#333;
                        line-height:0.5rem;
                    }
                    input{
                        border:none;
                        width:2.8rem;
                        height:0.5rem;
                        float:right;
                        color:#999;
                    }
                    input::-webkit-input-placeholder {
                        color: #C7C7C7;
                    }
                    input::-o-input-placeholder {
                        color: #C7C7C7;
                    }
                    input::-moz-input-placeholder {
                        color: #C7C7C7;
                    }
                    input::-ms-input-placeholder {
                        color: #C7C7C7;
                    }
                }
            }
            .video{
                width:100%;
                height:0.99rem;
                background:#fff;
                margin:0.1rem 0;
                .videoBox{
                    width:3.45rem;
                    height:100%;
                    margin:auto;
                    div{
                        width:0.8rem;
                        // height:0.69rem;
                        background-size:0.69rem;
                        margin-top:0.05rem;
                        float:left;
                    }
                    p{
                        font-size:0.1rem;
                        color:#C7C7C7;
                        line-height:0.99rem;
                        // margin-left:0.1rem;
                        float:right;
                    }
                }
            }
            .topBox{
                width:100%;
                height:1.41rem;
                margin:auto;
                background:#fff;
                .topBoxP{
                    height:0.47rem;
                    line-height:0.55rem;
                    margin-left:0.15rem;
                }
                .setImg{
                    width:0.8rem;
                    // height:0.69rem;
                    background:url('../../../assets/img/list/fbimgbox.png') no-repeat center;
                    background-size:0.69rem;
                    float:left;
                    margin-right:0.1rem;
                    margin-left:0.15rem;
                }
            }
        }
    }
</style>
