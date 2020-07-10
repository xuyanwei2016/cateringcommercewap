<template>
    <div class='discuss'>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if='this.list.length>0'>
            <van-list v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="onLoad">
                <div class='center' v-for='(i,e) in list' :key='e'>
                    <div class='centerBox'>
                        <div class='top'>
                            <img v-if='userData.img' :src="imgLink(userData.img)" alt="">
                            <img v-else src="../../assets/img/list/zgctx.png" alt="">
                            <span>{{userData.account}}</span>
                            <p>{{i.releaseTime}}</p>
                        </div>
                        <div class='middle'>{{i.content}}</div>
                        <div class='bottom' @click='goDetail(i)'>
                            <div class='nameBo'>
                                <span v-if='i.resourceType==4'>中国菜</span>
                                <span v-if='i.resourceType==1'>图书</span>
                            </div>                         
                            <div class='bookBo'>{{i.resourceName}}</div>
                            <div class='autherBo'>--{{i.userName}}</div>
                            <img src="../../assets/img/list/plright.png" alt="">
                        </div>                
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <div  class='noList' v-else>
            <img src="@/assets/img/backgroundno.png" alt="">
            <p>暂无数据</p>
        </div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {getPersonalPageListAPI,getMemberAPI} from '@/api/my'
export default {
    data(){
        return{
            isLoading:false,
            finished:false,
            loading:false,
            listQuery:{
                pageSize:20,
                pageNum:1,
            },
            totals:null,
            list:[],
            userData:''
        }
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    mounted(){
        document.body.style.backgroundColor = '#F9F9F9'
    },
    created(){
        this.getPersonalPageList()
        this.getMember()
    },
    methods:{
        goDetail(e){
            let resourceType = e.resourceType
            let resourceId = e.resourceId
            if( resourceType == '1' || resourceType == '2' ){   //跳转到图书详情
                this.$router.push({path:"/bookDetailNew",query:{oid:resourceId}})
            }else if( resourceType == '4' ){   //跳转到中国菜详情
                this.$router.push({path:"/detail",query:{id:resourceId}})
            }
        },
        getMember() {
            getMemberAPI().then(res => {
                if( res.data.code == 0 ){
                    this.userData = res.data.data
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        getPersonalPageList(){
            getPersonalPageListAPI(this.listQuery).then(res=>{
                if( res.data.code == 0 ){
                    let rows = res.data.data.list
                    this.loading = false
                    this.isLoading = false
                    this.totals = res.data.data.total
                    if( rows == null || rows.length === 0 ){
                        this.finished = true
                        return
                    }
                    this.list = this.list.concat(rows)
                    if( this.list.length >= this.totals ){
                        this.finished = true
                    }
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        onLoad(){
            this.listQuery.pageNum++
            this.getPersonalPageList()
        },
        onRefresh(){
            this.finished = false
            this.loading = true
            this.list = []
            this.listQuery.pageNum = 1
            this.getPersonalPageList()
        }
    }
}
</script>
<style lang='less' scoped>
    .discuss{
        .noList{
            img{
                margin:1rem auto 0.2rem auto;
            }
            p{
                font-size:0.16rem;
                color:#ccc;
                text-align: center;
            }
        }
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .center{
            width:100%;
            height:1.725rem;
            background:#fff;
            margin-bottom:0.1rem;
            .centerBox{
                width:3.45rem;
                height:1.725rem;
                margin:auto;
                .top{
                    width:100%;
                    height:0.3rem;
                    line-height:0.3rem;
                    padding-top:0.2rem;
                    img{
                        width:0.3rem;
                        height:0.3rem;
                        border-radius: 50%;
                        float:left;
                        margin-right:0.09rem;
                    }
                    span{
                        display:block;
                        width:1.3rem;
                        height:0.3rem;
                        float:left;
                        color:#000;
                        font-weight:bold;
                        font-size:0.14rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1; 
                        -webkit-box-orient: vertical;
                    }
                    p{
                        float:right;
                        color:#ccc;
                        font-size:0.11rem;
                    }
                }
                .middle{
                    width:100%;
                    height:0.45rem;
                    color:#454545;
                    font-size:0.14rem;
                    line-height:0.2rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; 
                    -webkit-box-orient: vertical;
                    margin: 0.1rem 0 0.18rem 0;
                    padding-top:0.05rem;
                }
                .bottom{
                    width:100%;
                    height:0.47rem;
                    background:#F5F2F5;
                    line-height:0.47rem;
                    .nameBo{
                        width:0.8rem;
                        height:0.47rem;
                        float:left;
                        font-size:0.15rem;
                        color:#000;
                        font-weight:bold;
                        margin-left:0.15rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1; 
                        -webkit-box-orient: vertical;
                    }
                    .bookBo{
                        width:1.45rem;
                        height:0.47rem;
                        float:left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1; 
                        -webkit-box-orient: vertical;
                        text-align: right;
                    }
                    .autherBo{
                        width:0.75rem;
                        height:0.47rem;
                        float:left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1; 
                        -webkit-box-orient: vertical;
                        text-align: right;
                    }
                    img{
                        width:0.12rem;
                        height:0.12rem;
                        float:right;
                        margin:0.17rem 0.15rem 0 0;
                    }
                }
            }
        }
    }
</style>
