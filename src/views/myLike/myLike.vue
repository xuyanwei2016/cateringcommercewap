<template>
    <div class='myLike'>
        <div class='myLikeTop'>
            <ul class='myLikeNav' @click='clickNav'>
                <li title='文化大观' :class='isCulture==true?"active":""'>文化大观</li>
                <li title='中国菜' :class='isChina==true?"active":""'>中国菜</li>
                <li title='直通书城' :class='isBook==true?"active":""'>直通书城</li>
            </ul>
            <p v-if='this.getAllBookListData.length > 0'>为您找到<span>{{totalPage}}</span>条资源</p>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if='this.getAllBookListData.length > 0'>
            <div class='scrollBox'>
                <div class="allBook" v-show="isCulture">
                    <van-list v-model="loading"
                            :finished="finished"
                            :immediate-check="false"
                            finished-text="没有更多了"
                            @load="onLoad">
                    <div class="itemCon">
                        <cultureView @clickBookItem="clickBookItem ( 1, item )" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" /> 
                    </div>
                    </van-list>
                </div>
                <div class="allBook" v-show="isChina">
                    <van-list v-model="loading"
                            :finished="finished"
                            :immediate-check="false"
                            finished-text="没有更多了"
                            @load="onLoad">
                    <div class="itemCon">
                        <mylickChina @clickBookItem="clickBookItem ( 1, item )" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" /> 
                    </div>
                    </van-list>
                </div>
                <div class="allBook" v-show="isBook">
                    <van-list v-model="loading"
                            :finished="finished"
                            :immediate-check="false"
                            finished-text="没有更多了"
                            @load="onLoad">
                    <div class="itemCon">
                        <bookCom @clickBookItem="clickBookItem ( 1, item )" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" /> 
                    </div>
                    </van-list>
                </div>
            </div>
        </van-pull-refresh>
        <div  class='noList' v-else>
            <img src="@/assets/img/backgroundno.png" alt="">
            <p>暂无数据</p>
        </div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {getMemberPageListAPI,getMemberWapPageListAPI} from '@/api/my.js'
import cultureView from '../../components/sy/cultureView'
import mylickChina from '../../components/sy/mylickChina'
import bookCom from '../../components/sy/bookCom'
export default {
    data(){
        return{
            loading: false,
            finished: false,
            isLoading: false,
            totalPage: 0,
            isCulture:true,
            isChina:false,
            isBook:false,
            getAllBookListData:[],
            getAllBookListParams: {
                pageNum: 1,
                pageSize: 10,
                goodsType: 5
            },
        }
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    created(){
        this.getMemberPageList()
    },
    mounted(){

    },
    components:{
        cultureView,
        mylickChina,
        bookCom
    },
    methods:{
        clickBookItem(){

        },
        clickNav(e){
            let target = e.target.title
            this.loading = false;
            this.finished = false;
            this.isLoading = false;
            this.totalPage = 0;
            this.getAllBookListData = [];
            this.getAllBookListParams.pageNum = 1;
            this.getAllBookListParams.pageSize = 10;
            switch(target){
                case '文化大观':
                    this.isCulture=true
                    this.isChina=false
                    this.isBook=false
                    this.getAllBookListParams.goodsType = 5
                    this.getMemberPageList()
                    break;
                case '中国菜':
                    this.isCulture=false
                    this.isChina=true
                    this.isBook=false
                    this.getAllBookListParams.goodsType = 4
                    this.getMemberPageList()
                    break;
                case '直通书城':
                    this.isCulture=false
                    this.isChina=false
                    this.isBook=true
                    this.getAllBookListParams.goodsType = ''
                    this.getMemberWapPageList()
                    break;
            }
        },
        getMemberWapPageList(){
            getMemberWapPageListAPI(this.getAllBookListParams).then(res=>{
                if( res.data.code == 0 ){
                    let rows = res.data.data.list
                    this.loading = false
                    this.isLoading = false
                    this.totalPage = res.data.data.total
                    if( rows == null || rows.length === 0 ){
                        this.finished = true
                        return
                    }
                    this.getAllBookListData = this.getAllBookListData.concat(rows)
                    if( this.getAllBookListData.length >= this.totalPage ){
                        this.finished = true
                    }
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        getMemberPageList(){
            getMemberPageListAPI(this.getAllBookListParams).then(res=>{
                if( res.data.code == 0 ){
                    let rows = res.data.data.list
                    this.loading = false
                    this.isLoading = false
                    this.totalPage = res.data.data.total
                    if( rows == null || rows.length === 0 ){
                        this.finished = true
                        return
                    }
                    this.getAllBookListData = this.getAllBookListData.concat(rows)
                    if( this.getAllBookListData.length >= this.totalPage ){
                        this.finished = true
                    }
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        onLoad() {
            if( this.isCulture ){
                this.getAllBookListParams.pageNum++
                this.getMemberPageList()
                return false
            }else if( this.isChina ){
                this.getAllBookListParams.pageNum++
                this.getMemberPageList()
                return false
            }else if( this.isBook ){
                this.getAllBookListParams.pageNum++
                this.getMemberWapPageList()
            }
            
        },
        onRefresh(){
            this.finished = false
            this.loading = true
            this.getAllBookListParams.pageNum = 1
            this.getAllBookListData = []
            if( this.isCulture ){
                this.getMemberPageList()
            }else if( this.isChina ){
                this.getMemberPageList()
            }else if( this.isBook ){
                this.getMemberWapPageList()
            }
        },
    }
}
</script>
<style lang='less' scoped>
.myLike{
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
    .van-pull-refresh {
        height: 100%;
        .van-pull-refresh__track {
            display: flex;
            flex-direction: column;
            .scrollBox {
                margin-top:0.7rem;
                .allBook{
                    padding:0 0.125rem;
                }
            }   
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
    .myLikeTop{
        width:100%;
        height:0.7rem;
        position:fixed;
        top:0;
        left:0;
        z-index:999;
        .myLikeNav{
            width:100%;
            height:0.46rem;
            display: flex;
            background:#fff;
            padding:0 0.1rem;
            li{
                display:block;
                width:0.68rem;
                float:left;
                line-height:0.46rem;
                margin-right:0.35rem;
                font-size:0.15rem;
                color:#333;
            }
            li:nth-child(2){
                width:0.52rem;
            }
            .active{
                font-size:0.17rem;
                color:#000;
                font-weight:bold;
            }
        }
        p{
            width:100%;
            height:0.24rem;
            background:#F5F5F5;
            line-height:0.24rem;
            text-align: center;
            color:#9A9A9A;
            span{
                color:#DD3549;
            }
        }
    }
}
</style>
