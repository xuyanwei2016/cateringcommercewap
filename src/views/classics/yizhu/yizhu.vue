<template>
    <div class='yizhu' :style="{height:winH+'px'}">
        <div class='cup'>
            <div class='top'> 
                <div class='topLeft' @touchend='prev'>
                    <img src="@/assets/img/jingdian/icon_fanhui_black.png" alt="">
                </div>
                <div class='title'>医著</div>
            </div>
            <div class='jdScreen'>
                <div class='screen'>
                    <div class='search'>
                        <input type="text" placeholder="请输入标题、来源、内容等" v-model='value'>
                        <span @click='isScreen=true'>筛选</span>
                    </div>
                    <div v-if="isScreen" class='searFiex'>
                        <ul>
                            <li v-for="(itemNa,indexNa) in nationList" :key="indexNa" :class="curNation.includes(itemNa.id)?'active':''"
                                @click="changeNation(itemNa,indexNa)">{{itemNa.name}}
                            </li>
                        </ul>
                        <div class="button">
                            <span @click="reset">重置</span>
                            <span @click="sumbit">确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :style="{overflow:'auto',height:list.length>0?winH+'px':''}"   v-infinite-scroll="load" infinite-scroll-disabled="disabled" v-if="list.length>0">
            <yizhu :list="list"></yizhu> 
            <div class="more" v-if="loading==1&&list.length>0">加载中...</div>
            <div class="noHave" v-if="noMore&&list.length>0">
                这是我的底线 <img src="../../../assets/img/list/nohave.png" alt="">
            </div>
        </div>
        <noHave v-if="(loading==2||loading==0)&&list.length==0" :mess="{top:winH,loading:loading}"></noHave>
    </div>
</template>  
<script>
import noHave from '@/components/noHave.vue';
import yizhu from '../../../components/list/yizhu.vue'
import { getListAPI} from '@/api/list';
import {getNationTypeListAPI} from '@/api/login/login.js'
import PullTo from 'vue-pull-to'
export default {
    data(){
        return{
            PullTo,
            pageNum: 1,
            pageSize: 10,
            loading: 0,
            list:[],
            total:0,
            winH:0,
            orderBy:null,

            nationList:[{name: '全部', id: 'null'}],
            isScreen:false,
            curNation: ['null'],
            value: '',
            nationsType:''
        }
    },
    components:{
        noHave,
        yizhu,
    },
    computed:{
        noMore () {
            return this.list.length == this.total;
        },
        disabled () {
            return this.loading==1||this.noMore||this.total<=10;
        }
    },
    created(){
        if(this.$route.query.hig){
            this.winH=this.$route.query.hig;
        }else{
            let winW=document.documentElement.clientWidth;
            this.winH=document.documentElement.clientHeight-(winW*115/375);
        }

        this.value=this.$route.query.val?this.$route.query.val:'';
        this.curModular=this.$route.query.resType?this.$route.query.resType:0;
        if(this.$route.query.resType==undefined){
            this.getList();
        }
    },
    watch:{
        isScreen(n, o) {
            if (n) {
                let {length: len} = this.nationList;
                if (len > 1) return;
                getNationTypeListAPI().then(res => {
                    let obj = res.data.data;
                    Object.keys(obj).forEach((item) => {
                    let itemObj={
                        id:item,
                        name:obj[item]
                    };
                    this.nationList.push(itemObj)
                    })
                })
            }
        },
    },
    methods:{
        prev(){
            this.$router.go(-1)
        },
        load () {
            this.loading = 1;
            this.pageNum += 1;
            this.getList();
        },
        getList() {
            /*资源类型 31理论 32药物 33方剂 34临床 35医案 36文化 37机构 38医论 48其他 1医著 2医家 39特色疗法*/
            let data = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                orderBy:'uploadTime desc',
                content:this.value.trim(),
                resourceType:1,
                nationsType:this.nationsType
            };
            getListAPI(data).then(res => {
            if (res.data.status) {
                let resList
                let totalCount
                if(res.data.data&&res.data.data.resList){
                resList = res.data.data.resList
                totalCount = res.data.data.totalCount
                }else{
                resList = []
                totalCount = 0
                }
                this.isScreen=false;
                this.loading = 2;
                this.list=[...this.list,...resList];
                this.total=totalCount;
            }

            })
        },
        changeNation(item){
            if (item.id == 'null') {
                    this.curNation = ['null'];
                } else {
                    if (this.curNation.includes('null')) {
                        this.curNation = [];
                    }

                if (this.curNation.includes(item.id)) {
                    let index = this.curNation.findIndex(function (value, index, arr) {
                        return value == item.id;
                    })
                    this.curNation.splice(index, 1);
                    this.curNation.length == 0 ? this.curNation.push('null') : true;
                } else {
                    this.curNation.push(item.id);
                }
            }
        },
        sumbit(){
            this.list=[]
            this.loading = 0
            this.pageNum = 1
            this.total = 0
            this.nationsType = this.curNation.includes('null')?null:this.curNation,
            this.isScreen=false;
            this.getList()
        },
        /*重置*/
        reset(){
            this.curNation = ['null']
            this.value = ''
        },
    }
}
</script>  
<style lang="less" scoped>
    .yizhu{
        .cup{
            width:100%;
            height:1.07rem;
            background:#fff;
        }
       .top{
           height: 0.5rem;
           width:100%;
           background:#BA9F74;
           line-height:0.5rem;
           .topLeft{
               width:0.3rem;
               height:0.2rem;
               float:left;
               margin:0.165rem 1.23rem 0  0.155rem;
               img{
                width:0.1rem;
                height:0.17rem;
            }
           }
           .title{
               font-size:0.18rem;
               color:#fff;
               font-weight:bold;
               letter-spacing: 0.03rem;
               float:left;
            //    margin-top:0.22rem;
           }
       }
       .jdScreen{
            width:3.44rem;
            height:0.37rem;
            text-align: center;
            margin:0.1rem auto 0 auto;
            font-size:0.14rem;
            .topInput{
                input{
                    width:2.75rem;
                    height:0.37rem;
                    border-radius: 0.185rem;
                    color:#888888;
                    border:none;
                    background: url("../../../assets/img/list/nav_search.png") no-repeat #F2F2F2 0.1rem center;
                    background-size: 0.13rem 0.14rem;
                    padding-left:0.3rem;
                    float:left;
                }
                span{
                    color:#000;
                    font-weight:500;
                    float:right;
                    line-height:0.37rem;
                }
            }
            .screen{
                width:100%;
                height:auto;
                background:#fff;
                .searFiex{
                    width:100%;
                    height:100%;
                    background:#fff;
                    z-index:9999;
                    position:fixed;
                    left:0;
                    overflow-y:hidden;
                }
                .search{
                    width:3.435rem;
                    height:0.37rem;
                    margin:auto;
                input{
                        width:2.75rem;
                        height:0.37rem;
                        border-radius: 0.185rem;
                        color:rgba(136, 136, 136, 1);
                        border:none;
                        background: url("../../../assets/img/list/nav_search.png") no-repeat #F2F2F2 0.1rem center;
                        background-size: 0.13rem 0.14rem;
                        padding-left:0.3rem;
                        float:left;
                        line-height:0.37rem;
                    }
                    span{
                        color:#000;
                        font-weight:500;
                        float:right;
                        line-height:0.37rem;
                    } 
                }
                ul {
                    padding: 0.1rem 0 0 .15rem;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    li {
                        width: .78rem;
                        height: .31rem;
                        line-height: .31rem;
                        text-align: center;
                        border: 1px solid #D2D6D9;
                        border-radius: .03rem;
                        font-size: .13rem;
                        color: #3C3F46;
                        margin-bottom: .09rem;
                        margin-right: .09rem;
                    }
                    .active {
                        border-color: #DE6209;
                        color: #DE6209;
                    }
                }
                .button {
                    width: 2.92rem;
                    padding: 0 .4rem;
                    position: fixed;
                    display: flex;
                    justify-content: space-between;
                    bottom: .5rem;
                    z-index: 12;
                    span {
                        display: block;
                        width: 1.4rem;
                        height: .4rem;
                        background: #EEEEEE;
                        text-align: center;
                        line-height: .4rem;
                        color: #333333;
                        font-size: .15rem;
                    }
                    span:last-child {
                        background: url("../../../assets/img/personal/okbg.png") no-repeat;
                        background-size: cover;
                        color: #fff;
                        font-size: .17rem;
                    }
                }
            }
        }
    }
</style>