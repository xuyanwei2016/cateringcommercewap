<template>
    <div class='myBook'>
        <div class='myLikeTop'>
            <ul class='myLikeNav' @click='clickNav'>
                <li title='全部' :class='isCulture==true?"active":""'>全部</li>
                <li title='图书' :class='isChina==true?"active":""'>图书</li>
                <li title='电子书' :class='isBook==true?"active":""'>电子书</li>
            </ul>
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
                        <bookCom @clickBookItem="clickBookItem ( 1, item )" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" /> 
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
                        <bookCom @clickBookItem="clickBookItem ( 1, item )" v-for="( item, key ) in getAllBookListData" :key="key" :item="item" /> 
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
import {getMyCoursePageListAPI,} from '@/api/my'
import bookCom from '../../components/sy/bookCom'
export default {
    data(){
        return{
            loading: false,
            finished: false,
            isLoading: false,
            totalPage: 0,
            totalNum: 0,
            isCulture:true,
            isChina:false,
            isBook:false,
            getAllBookListData:[],
            getAllBookListParams: {
                pageNum: 1,
                pageSize: 10,
                resourceType: 5
            },
        }
    },
    components:{
        bookCom
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    created(){
        this.getMyCoursePageList()
    },
    mounted(){

    },
    methods:{
        clickNav(e){
            let target = e.target.title
            this.loading = false;
            this.finished = false;
            this.isLoading = false;
            this.totalPage = 0;
            this.totalNum = 0;
            this.getAllBookListData = [];
            this.getAllBookListParams.pageNum = 1;
            this.getAllBookListParams.pageSize = 10;
            switch(target){
                case '全部':
                    this.isCulture=true
                    this.isChina=false
                    this.isBook=false
                    this.getAllBookListParams.resourceType = ''
                    this.getMyCoursePageList()
                    break;
                case '图书':
                    this.isCulture=false
                    this.isChina=true
                    this.isBook=false
                    this.getAllBookListParams.resourceType = 2
                    this.getMyCoursePageList()
                    break;
                case '电子书':
                    this.isCulture=false
                    this.isChina=false
                    this.isBook=true
                    this.getAllBookListParams.resourceType = 1
                    this.getMyCoursePageList()
                    break;
            }
        },
        getMyCoursePageList(){
            getMyCoursePageListAPI(this.getAllBookListParams).then(res=>{
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
                this.getMyCoursePageList()
                return false
            }else if( this.isChina ){
                this.getAllBookListParams.pageNum++
                this.getMyCoursePageList()
                return false
            }else if( this.isBook ){
                this.getAllBookListParams.pageNum++
                this.getMyCoursePageList()
            }
        },
        onRefresh(){
            this.finished = false
            this.loading = true
            this.getAllBookListParams.pageNum = 1
            this.getAllBookListData = []
            this.getMyCoursePageList()
        },
    }
}
</script>
<style lang='less' scoped>
.myBook{
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
                    min-height:2rem;
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
                // width:0.68rem;
                float:left;
                line-height:0.46rem;
                margin-right:0.35rem;
                font-size:0.15rem;
                color:#333;
            }
            .active{
                font-size:0.17rem;
                color:#000;
                font-weight:bold;
            }
        }
    }
}
</style>
