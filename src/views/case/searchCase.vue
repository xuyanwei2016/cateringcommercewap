<template>
    <div class='searchCase'>
        <div class='top'>
            <div class='search'>
                <input type="text" placeholder="请输入查询的内容" v-model='listQuery.name' @click='blurInput' >
            </div>
            <div class='tab'>
                <span v-for="(item,index) in conditions" :key="index" :class="curCondition==index?'active':''" @click="curCondition=index">{{item.name}}</span>
            </div>
            <div class='resource'  v-if='this.list.length>=1'>为您找到<span>{{this.total}}</span>条资源</div>
        </div>
        <div class='sitting'></div>
        <div v-if='this.list.length>=1'>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    finished-text="没有更多了"
                    @load="onLoad">
                    <chinesGreen :list='list'></chinesGreen>
                </van-list>
            </van-pull-refresh>
        </div>
        <div v-else class='noList'>
            <img src="@/assets/img/backgroundno.png" alt="">
            <p>暂无数据</p>
        </div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {getMenuListAPI} from '@/api/chinesGreen/index'
import chinesGreen from '../../components/cateringList/chinesGreen'
export default {
    data(){
        return{
            conditions: [{name:'默认',code:null},{name:'最热',code:'browseNum desc'},{name:'最新',code:'uploadTime desc'}],
            curCondition: 0,
            list:[],
            loading:false,
            finished:false,
            isLoading:false,
            total:0,
            listQuery:{
                pageSize:10,
                pageNum:1,
                orderBy:null,
                diyTypeCode:null,
                name:this.$route.query.val,
            },
        }
    },
    components:{
      chinesGreen
    },
    beforeCreate(){
        document.title=this.$route.meta
    },
    watch:{
        curCondition(n,o){
            this.list=[];
            this.listQuery.pageNum=1;
            this.listQuery.loading=0;
            this.listQuery.orderBy=this.conditions[n].code;
            this.getMenuList();
        },
    },
    created(){
        this.value=this.$route.query.val?this.$route.query.val:'';
        this.curModular=this.$route.query.resType?this.$route.query.resType:0;
        if(this.$route.query.resType==undefined){
            this.getMenuList();
        }
    },
    computed:{
        
    },
    methods:{
        
        blurInput(){
            this.$router.push({path:'search'})
        },
        getMenuList(){
            let data = this.listQuery
            getMenuListAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    let rows = res.data.data.list
                    this.total = res.data.data.total
                    this.loading = false
                    this.isLoading = false
                    if( rows == null || rows.length === 0 ){
                        this.finished = true
                        return
                    }
                    this.list = this.list.concat(rows)
                    if( this.list.length >= this.total ){
                        this.finished = true
                    }
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        onLoad(){
            this.listQuery.pageNum++
            this.getMenuList()
        },
        onRefresh(){
            this.finished = false
            this.loading = true
            this.list = []
            this.listQuery.pageNum = 1
            this.getMenuList()
        },
    }
}
</script>
<style lang='less' scoped>
    .searchCase{
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .top{
            height:1.21rem;
            width:100%;
            position: fixed;
            top:0;
            background:#fff;
            z-index:99;
            .title{
                width:100%;
                height:0.44rem;
                background-size:100%;
                color:#000;
                font-size:0.18rem;
                line-height:0.44rem;
                text-align:center;
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
            .search{
                width:3.45rem;
                height:0.37rem;
                margin:0.1rem auto;    
                input{
                    width:3.45rem;
                    height:0.37rem;
                    background: url("../../assets/img/list/nav_search.png") no-repeat #F2F2F2 0.1rem center;
                    background-size: 0.13rem 0.14rem;
                    float:left;
                    border:none;
                    border-radius:0.18rem;
                    padding-left:0.35rem;
                }
            }
            .tab{
                width:100%;
                height:0.4rem;
                span{
                    font-size:0.14rem;
                    color:#777;
                    display:inline-block;
                    width:0.94rem;
                    height:0.15rem;
                    line-height:0.15rem;
                    text-align: center;
                    margin-top:0.14rem;
                }
                span:nth-child(2){
                    border-right:0.01rem solid #eee;
                    border-left:0.01rem solid #eee;                    
                }
                .active{
                    color:#BB0606;
                }
            }
            .resource{
                width:100%;
                height:0.24rem;
                text-align: center;
                line-height:0.24rem;
                font-size:0.12rem;
                color:#9A9A9A;
                background:#f2f2f2;
                span{
                    color:#DD3549;
                }
            }
        }
        .sitting{
            height:1.21rem;
            width:100%;
        }
        .noList{
            img{
                margin:0.5rem auto 0.2rem auto;
            }
            p{
                font-size:0.16rem;
                color:#ccc;
                text-align: center;
            }
        }
    }
</style>
