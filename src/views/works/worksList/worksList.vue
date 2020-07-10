<template>
    <div class='worksOne'>
        <!-- 资料审核中 -->
        <div class='inReview' v-if='this.list.length === 0'>
            <img src="../../../assets/img/list/zpzw.png" alt="">
            <p>暂无作品</p>
            <span>请点击发布上传您的作品</span>
            <h3 v-if='this.cookStatus == "1" '>资料审核中</h3>
            <h3 v-else-if='this.cookStatus == "3" '>审核未通过，请重新认证</h3>            
        </div>
        <!-- 作品列表 -->
        <div class='worksList' v-else>
            <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
                <div class='scrollBox'>
                    <div class="allBook">
                        <!-- <van-list v-model="loading"
                            :finished="finished"
                            :immediate-check="false"
                            finished-text="没有更多了"
                            @load="onLoad"> -->
                            <div class='chinesBox' v-for='(item,index) in list' :key='index' @click='clickDetail(item.id)'>
                                <div class='top'>
                                    <img v-if='item.cover' :src="imgLink(item.cover)" alt="">
                                    <img v-else src="../../../assets/img/list/zgcdt.png" alt="">
                                    <div>
                                        <span>浏览量：{{item.traffic}}k</span>
                                        <span>收藏：{{item.num}}k</span>
                                    </div>
                                </div>
                                <div class='bottom'>
                                    <div class='bottomTop'>
                                        <div class='name'>{{item.title}}</div>
                                        <div class='statusBottom' v-if='item.status==3||item.status==2'>审核中</div>
                                        <div class='statusBottom' v-if='item.status==1'>已通过</div>
                                        <div class='statusBot'  v-if='item.status==4'>未通过</div>
                                    </div>
                                    <div class='imgName'>
                                        <img v-if='item.img' :src="imgLink(item.img)" alt="">
                                        <img v-else src="../../../assets/img/list/zgctx.png" alt="">
                                        <span>{{item.author}}</span>
                                    </div>
                                </div>
                            </div>
                        <!-- </van-list> -->
                    </div>
                </div>
            <!-- </van-pull-refresh> -->
        </div>
        <div class='uploadImg' @click='saveClick'><p>上传作品</p></div>
        <!-- 审核中弹框 -->
        <div class='popout' @click.stop='popout' v-if='isShow'>
            <div class='popoutBox'>
                <div>
                    <img src="../../../assets/img/list/xydsh.png" alt="">
                </div>
                <h3>资料审核中</h3>
                <p>请耐心等候</p>
            </div>
            <img src="../../../assets/img/list/yzgb.png" alt="" @click='isShow=false'>
        </div>
        <div class='returnGo' @click='$router.push({path:"/my"})'></div>
    </div>
</template>
<script>
import { getMemberAPI,getMymenuPageListAPI,getmemberIdAPI,getApproveAPI } from '@/api/my.js'
export default {
    data(){
        return{
            isShow:false,
            cookStatus:null,
            list:[],
            listQuery:{
                pageSize:10,
                pageNum:1,
            },
            loading:false,
            finished:false,
            isLoading:false,
            total:0,
            memberId:null,
            approveId:null,
        }
    },
    beforeCreate(){
      document.title = this.$route.meta
    },
    created(){
        this.getMember()
        // this.getMymenuPageList()
    },
    mounted(){
        document.body.style.backgroundColor = '#F5F2F5'
    },
    methods:{
        getMember(){
            getMemberAPI().then(res=>{
                if( res.data.code == 0 ){
                    this.memberId = res.data.data.id
                    this.cookStatus = res.data.data.cook
                    this.getmemberId()
                    if( this.cookStatus == '2' ){
                        this.getMymenuPageList()
                    }
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        getmemberId(){
            getmemberIdAPI(this.memberId).then(res=>{
                if( res.data.code == 0 ){
                    this.approveId = res.data.data.id
                    // this.getApprove()
                }
            })
        },
        getApprove(){
            // getApproveAPI(this.approveId).then(res=>{
            //     if( res.data.code == 0 ){
            //         // this.cookStatus = res.data.data.status
            //         // if( this.cookStatus == '2' ){
            //         //     this.getMymenuPageList()
            //         // }
            //     }else{
            //         this.$toast(res.data.msg)
            //     }
            // })
        },
        clickDetail(){

        },
        saveClick(){
            if( this.cookStatus == '0' ){ //未认证
                this.$router.push({path:'/attestation'})
            }else if( this.cookStatus == '2' ){ //审核通过
                this.$router.push({path:'/worksOne'})
            }else if( this.cookStatus == '1' ){ //待审核
                this.isShow = true
            }else if( this.cookStatus == '3' ){ //审核未通过
                this.$router.push({path:'/attestation'})
            }
        },
        getMymenuPageList(){
            getMymenuPageListAPI(this.listQuery).then(res=>{
                if( res.data.code == 0 ){
                    let rows = res.data.data.list
                    this.total = res.data.data.total
                    this.loading = false
                    if( rows == null || rows.length === 0 ){
                        this.finished = true
                        return
                    }
                    this.list = this.list.concat(rows)
                    if( this.list.length  >= this.total ){
                        this.finished = true
                    }
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        onload(){
            this.listQuery.pageNum++
            this.getMymenuPageList()
        },
        onRefresh(){},
        popout(){}
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
        .inReview{
            img{
                width:0.45rem;
                height:0.575rem;
                margin:0.58rem auto 0.2rem auto;
            }
            p{
                color:#666;
                font-size:0.15rem;
                text-align: center;
                
            }
            span{
                display:block;
                color:#999;
                font-size:0.15rem;
                text-align: center;
                line-height:0.4rem;
            }
            h3{
                color:#000;
                font-size:0.15rem;
                text-align: center;
                font-weight:normal;
                margin-top:0.2rem;
            }
        }
        .uploadImg{
            width:1.2rem;
            height:0.4rem;
            background:url('../../../assets/img/list/sczpan.png') no-repeat center;
            background-size:1.2rem 0.4rem;
            color:#fff;
            font-size:0.14rem;
            line-height:0.4rem;
            position:fixed;
            left:50%;
            bottom:0.25rem;
            margin-left:-0.6rem;
            p{
                margin-left:0.45rem
            }
        }
        .popout{
            width:100%;
            height:100%;
            position:fixed;
            top:0;
            left:0;
            background:rgba(0,0,0,0.7);
            z-index:99;
            .popoutBox{
                width:2.72rem;
                height:1.925rem;
                background:url('../../../assets/img/list/shtk.png') no-repeat bottom;
                background-size:2.72rem 1.925rem;
                border-radius:0.1rem;
                margin:1.97rem 0 0.31rem 0.545rem;
                div{
                    width:0.375rem;
                    height:0.375rem;
                    margin:auto;
                    padding-top:0.28rem;
                    img{
                        width:0.375rem;
                        height:0.375rem;
                    }
                }
                h3{
                    font-size:0.16rem;
                    color:#333;
                    text-align: center;
                    margin:0.6rem 0 0.1rem 0;
                }
                p{
                    font-size:0.14rem;
                    color:#666;
                    text-align: center;
                }
            }
            img{
                width:0.275rem;
                height:0.275rem;
                margin:auto;
            }
        }
        .worksList{
            .chinesBox{
                width:3.45rem;
                height:2.2rem;
                margin:0.1rem auto 0 auto;
                .top{
                    width:3.45rem;
                    height:1.45rem;
                    position:relative;
                    img{
                        width:3.45rem;
                        height:1.45rem;
                        border-radius:0.06rem 0.06rem 0 0;
                    }
                    div{
                        width:3.45rem;
                        height:0.3rem;
                        background: url(../../../../static/img/caiBg.png) no-repeat;
                        background-size: 100% 100%;
                        position:absolute;
                        bottom:0;
                        font-weight: 500;
                        color:#fff;
                        line-height:0.3rem;
                        span:nth-child(1){
                            display:inline-block;
                            width:1.5rem;
                            float:left;
                            text-align: left;
                            margin-left:0.15rem;
                        }
                        span:nth-child(2){
                            display:inline-block;
                            width:1.5rem;
                            float:right;
                            text-align: right;
                            margin-right:0.15rem;
                        }
                    }
                }
                .bottom{
                    width:3.45rem;
                    height:0.75rem;
                    background:#fff;
                    margin:0 auto;
                    border-radius:0 0 0.06rem 0.06rem;
                    .bottomTop{
                        width:2.5rem;
                        height:0.75rem;
                        float:left;
                        .name{
                            width:2.5rem;
                            height:0.38rem;
                            font-weight:bold;
                            line-height:0.38rem;
                            font-size:0.18rem;
                            margin-left:0.15rem;
                            overflow: hidden;
                            white-space:nowrap;
                            text-overflow:ellipsis;
                            margin-top:0.035rem;
                        }
                        .statusBottom,.statusBot{
                            width:0.54rem;
                            height:0.18rem;
                            background:#D4D4DA;
                            color:#fff;
                            font-size:0.12rem;
                            line-height:0.18rem;
                            text-align: center;
                            margin-left:0.15rem;
                            border-radius:0.03rem;
                        }
                        .statusBot{
                            background:linear-gradient(90deg,rgba(255,125,26,1),rgba(255,47,41,1));
                        }
                    }
                    .imgName{
                        width:0.45rem;
                        height:0.45rem;
                        border-radius: 50%;
                        float:right;
                        position:relative;
                        overflow: hidden;
                        margin:0.15rem 0.15rem 0 0;
                        img{
                            width:0.45rem;
                            height:0.45rem;
                        }
                        span{
                            display:inline-block;
                            width:0.45rem;
                            height:0.15rem;
                            position:absolute;
                            bottom:0;
                            background:rgba(0,0,0,1);
                            opacity:0.4;
                            text-align: center;
                            font-size:0.09rem;
                            line-height:0.15rem;
                            color:#fff;
                        }
                    }
                }
            }
            .chinesBox:last-child{
                margin-bottom:0.75rem;
            }
        }
    }
</style>

