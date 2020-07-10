<template>
    <div class='sutra'>
        <div class='sutraBox'>
            <div class='top'> 
                <div class='topLeft' @touchend='prev'>
                    <img src="@/assets/img/jingdian/icon_fanhui_black.png" alt="">
                </div>
                <div class='title'>经典</div>
            </div>
            <div class='serch'>
                <router-link :to="{name:'search',query:{sutraStatus:1}}">
                    <input type="text" placeholder="请输入标题、来源、内容等" >
                </router-link>
                <div class='tab'>
                    <ul>
                        <li v-for='(item,index) in special' :key='index' @touchend='linktab(item)'>
                            <img :src="item.img" alt="">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class='yian' v-if='yianList!=null'>
            <div class='yianBox'>
                <div class='yianTop'>
                    <div class='left'>医案</div>
                    <div class='right' @touchend='nextYian'>
                        <span>更多</span>
                        <img src="@/assets/img/personal/iconleft.png" alt="">
                    </div>
                </div>
                <div class='yianCenter' v-for="(item,index) in yianList" :key="index"  @click="linkDetail(item)">
                    <div class='title'>{{item.name}}</div>
                    <div class='label' v-if='item.keywords!=null'>
                        <ul>
                            <li v-for="(key,val) in item.keywords.split(',')" :key='val'>{{key}}</li>
                        </ul>  
                        <div class='after'></div>              
                    </div>
                    <div class='center'>{{item.description}}</div>
                    <div class='button'>
                        <div class='laiyuan' v-if='item.source'>来源：《{{item.source}}》</div>
                        <div class='price' v-if='item.priceOption==1'>
                            <del v-if='item.price'>￥{{item.price}}</del>
                            <span v-if='item.realPrice'>￥{{item.realPrice}}</span>
                        </div>
                        <div class='mianfei' v-else>免费</div>
                    </div>
                </div>
            </div>
        </div>
        <div class='yaowu' v-if='yaowuList!=null'>
            <div class='yaowuBox'>
                <div class='yaowuTop'>
                    <div class='left'>药物</div>
                    <div class='right' @touchend='nextYaowu'>
                        <span>更多</span>
                        <img src="@/assets/img/personal/iconleft.png" alt="">
                    </div>
                </div>
                <div class='yaowuCenter'>
                    <ul>
                        <li v-for='(item,index) in yaowuList' :key='index'  @click="linkDetail(item)">
                            <img :src="imgLink(item.img)" alt="" v-if='item.img'>
                            <img src="../../../assets/img/cover.png" alt="" v-else >
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class='fangji' v-if='fangjiList!=null'>
            <div class='fangjiBox'>
                <div class='yaowuTop'>
                    <div class='left'>方剂</div>
                    <div class='right' @touchend='nextFangji'>
                        <span>更多</span>
                        <img src="@/assets/img/personal/iconleft.png" alt="">
                    </div>
                </div>
                <div class='fangjiBorder'  v-for="(item,index) in fangjiList" :key="index"   @click="linkDetail(item)">
                    <div>{{item.name}}</div>
                    <img src="@/assets/register/rightjt.png" alt="">
                </div>
            </div>
        </div>
        <div class='yizhu' v-if='yizhuList!=null'>
            <div class='yizhuBox'>
                <div class='yaowuTop'>
                    <div class='left'>医著</div>
                    <div class='right' @touchend='nextYizhu'>
                        <span>更多</span>
                        <img src="@/assets/img/personal/iconleft.png" alt="">
                    </div>
                </div>
                <div class='yizhuCenter'>
                    <ul>
                        <li v-for='(item,index) in yizhuList' :key='index'  @click="linkDetail(item)">
                            <img :src="imgLink(item.img)" alt="">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class='ysbj' v-if='yanglist!=null'>
            <div class='ysbjBox'>
                <div class='yaowuTop'>
                    <div class='left'>养生保健</div>
                    <div class='right' @touchend='nextYsbj'>
                        <span>更多</span>
                        <img src="@/assets/img/personal/iconleft.png" alt="">
                    </div>
                </div>
                <div class='YS' v-for="(item,index) in yanglist" :key="index"  @click="linkDetail(item)">
                    <div class='top' v-if='item.img!=null'>
                        <img :src="imgLink(item.img)" alt="" @click="linkDetail(item)">
                    </div>
                    <div class='title'>{{item.name}}</div>
                    <div class='text' v-if='item.description!=null'>{{item.description}}</div>
                    <div class='button'>
                        <div class='key'>
                            <img src="@/assets/img/list/look.png" alt="">
                            <span>{{item.browseNum}}次浏览</span>
                        </div>
                        <div class='price' v-if='item.priceOption==1'>
                            <span>￥<del>{{item.price}}</del></span>
                            <span>￥{{item.realPrice}}</span>
                        </div>
                        <div class='free' v-else>免费</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import yangsheng from '../../../components/list/yangsheng'
import { getListAPI} from '@/api/list';

export default {
    data(){
        return{
            special:[
                {img:'./static/img/yian.png',name:'医案',link:'/yian'},
                {img:'./static/img/yaowu.png',name:'药物',link:'/yaowu'},
                {img:'./static/img/fangji.png',name:'方剂',link:'/fangji'},
                {img:'./static/img/yizhu.png',name:'医著',link:'/yizhu'},
                {img:'./static/img/ysbj.png',name:'养生保健',link:'/yangsheng'},
            ],
            yaowuList:[],
            yizhuList:[],
            yianList:[],
            fangjiList:[],
            yanglist:[],
        }
    },
    components:{
        
    },
    computed:{
        
    },
    created(){
        this.getList()
        this.getYaoList()
        this.fangList()
        this.yzList()
        this.ysList()
    },
    methods:{
         /*详情*/
        linkDetail(item){
            console.log(item.resourceType)
            let obj={35:'/read',32:'/read',33:'/read',1:'/bookDetail',40:'/read',51:'/masterDetail'};
            this.$router.push({path:obj[item.resourceType],query:{id:item.id}});
        },
        // 养生保健
        ysList() {
            let data = {
                pageNum: 1,
                pageSize: 2,
                resourceType: 40,
                orderBy:'uploadTime desc',
            };
            getListAPI(data).then(res => {
                if (res.data.code == 0) {
                    this.yanglist = res.data.data.resList
                }else{
                    this.$message.error(res.data.msg)
                }
                
            })
        },
        // 医著
        yzList() {
            let data = {
                pageNum: 1,
                pageSize: 3,
                resourceType: 1,
                orderBy:'uploadTime desc',
            };
            getListAPI(data).then(res => {
                if (res.data.code == 0) {
                    this.yizhuList = res.data.data.resList
                }else{
                    this.$message.error(res.data.msg)
                }
                
            })
        },
        // 方剂
        fangList() {
            let data = {
                pageNum: 1,
                pageSize: 3,
                resourceType: 33,
                orderBy:'uploadTime desc',
            };
            getListAPI(data).then(res => {
                if (res.data.code == 0) {
                    this.fangjiList = res.data.data.resList
                }else{
                    this.$message.error(res.data.msg)
                }
                
            })
        },
        // 药物
        getYaoList() {
            let data = {
                pageNum: 1,
                pageSize: 6,
                resourceType: 32,
                orderBy:'uploadTime desc',
            };
            getListAPI(data).then(res => {
                if (res.data.code == 0) {
                    this.yaowuList = res.data.data.resList
                }else{
                    this.$message.error(res.data.msg)
                }
                
            })
        },
        // 医案 35
        getList() {
            let data = {
                pageNum: 1,
                pageSize: 2,
                resourceType: 35,
                orderBy:'uploadTime desc',
            };
            getListAPI(data).then(res => {
                if (res.data.code == 0) {
                    this.yianList = res.data.data.resList
                }else{
                    this.$message.error(res.data.msg)
                }
                
            })
        },
        linktab(val){
            this.$router.push(val.link)
        },
        prev(){
            this.$router.go(-1)
        },
        nextYian(){
            this.$router.push({path:'/yian'})
        },
        nextYaowu(){
            this.$router.push({path:'/yaowu'})
        },
        nextFangji(){
            this.$router.push({path:'/fangji'})
        },
        nextYizhu(){
            this.$router.push({path:'/yizhu'})
        },
        nextYsbj(){
            this.$router.push({path:'/yangsheng'})
        }
    }
}
</script>
<style lang="less" scoped>
    .sutra{
        width:100%;
        height:auto;
        background:#F8F8F8;
        .sutraBox{
            width:100%;
            position:fixed;
            top:0;
            left:0;
            z-index:99;
        }
        .top{
           height: 0.5rem;
           width:100%;
           line-height:0.5rem;
           background:#BA9F74;
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
       .serch{
            width:100%;
            height:1.48rem;
            margin:auto;
            background:#fff;
            margin-bottom:0.1rem;
            input{
                width:3.135rem;
                height:0.37rem;
                margin:0.1rem 0 0.2rem 0.15rem;
                border-radius: 0.185rem;
                color:#888888;
                border:none;
                background: url("../../../assets/img/list/nav_search.png") no-repeat #F2F2F2 0.1rem center;
                background-size: 0.13rem 0.14rem;
                padding-left:0.3rem;
            }
            .tab{
                width:3.435rem;
                height:0.8rem;
                margin:auto;
                ul{
                    display: flex;
                    justify-content: space-between;
                    li{
                        width: 0.63rem;
                        text-align: center;
                        overflow: hidden;
                        img{
                            width: 0.4rem;
                            height: 0.4rem;
                            margin:0 auto 0.08rem auto;
                        }
                        span{
                            color: #222222;
                            font-size: 0.12rem;
                        }
                    }
                }
            }
        }
        .yian{
            width:100%;
            height:auto;
            background:#fff;
            margin: 2.1rem auto 0.1rem auto;
            border-top: 0.1rem solid #F8F8F8;
            .yianBox{
                width:3.435rem;
                height:100%;
                margin:auto;
                .yianTop{
                    width:100%;
                    height:0.555rem;
                    border-bottom:0.01rem solid #eee;
                    line-height:0.555rem;
                    .left{
                        float:left;
                        font-size:0.17rem;
                        font-weight:bold;
                        color:#000;
                    }
                    .right{
                        width:0.36rem;
                        height:0.555rem;
                        float:right;
                        font-size:0.12rem;
                        color:#999999;
                        span{
                            float:left;
                        }
                        img{
                            width:0.05rem;
                            height:0.085rem;
                            float:right;
                            margin-top:0.235rem;
                        }
                    }
                }
                .yianCenter{
                width:3.44rem;
                height:auto;
                margin:auto;
                border-bottom:0.01rem solid #eee;
                .title{
                    width:100%;
                    font-size:0.15rem;
                    font-weight:800;
                    color:#000;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                    margin:0.1rem 0 0.04rem 0;
                }
                .label{
                    .after{
                        content: "";
                        height: 0;
                        clear: both;
                        overflow: hidden;
                        display: block;
                        visibility: hidden;
                    }
                    ul{
                        li{
                            height:0.18rem;
                            border:0.01rem solid rgba(210,194,168,1);
                            border-radius:0.06rem 0.01rem 0.06rem 0.01rem;
                            float:left;
                            background:rgba(246,241,232,1);
                            color:#BA9F74;
                            margin-right:0.1rem;
                            padding:0 0.075rem;
                            line-height:0.18rem;
                            margin-top:0.05rem;
                        }
                    }
                }
                .center{
                    width:100%;
                    font-size:0.125rem;
                    color:#8F8F8F;
                    line-height:0.17rem;
                    margin-top:0.13rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .button{
                    width:100%;
                    height:0.15rem;
                    margin:0.1rem 0;
                    .laiyuan{
                        width:50%;
                        height:100%;
                        float:left;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        color:#CBD0D9;
                        font-size:0.11rem;
                    }
                    .price{
                        width:50%;
                        height:100%;
                        float:right;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                        text-align: right;
                        del{
                            color:#CBD0D9;
                            font-size:0.1rem;
                        }
                        span{
                            color:#FE2023;
                            font-size:0.14rem;
                            font-weight:500;
                        }
                    }
                    .mianfei{
                        width:50%;
                        height:100%;
                        float:right;
                        text-align: right;
                        color:#219319;
                        font-size:0.11rem;
                    }
                }
            }
            .yianCenter:last-child{
                border-bottom:none;
            }
            }
        }
        .yaowu,.fangji,.yizhu,.ysbj{
            width:100%;
            background:#fff;
            margin-bottom:0.1rem;
            .yaowuBox,.fangjiBox,.yizhuBox,.ysbjBox{
                width:3.435rem;
                margin:auto;
                .yaowuTop{
                    width:100%;
                    height:0.2rem;
                    line-height:0.2rem;
                    padding-top:0.3rem;
                    .left{
                        float:left;
                        font-size:0.17rem;
                        font-weight:bold;
                        color:#000;
                    }
                    .right{
                        width:0.36rem;
                        height:0.16rem;
                        float:right;
                        font-size:0.12rem;
                        color:#999999;
                        span{
                            float:left;
                        }
                        img{
                            width:0.05rem;
                            height:0.085rem;
                            float:right;
                            margin-top:0.05rem;
                        }
                    }
                }
            }
        }
        .yaowu{
            height:3rem;
            .yaowuBox{
                height:auto;
                .yaowuCenter{
                    width:3.435rem;
                    height:auto;
                    margin:auto;
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        li{
                            width: 30%;
                            height:1.1rem;
                            text-align: center;
                            overflow: hidden;
                            margin-top:0.15rem;
                            img{
                                width: 1.06rem;
                                height: 0.73rem;
                                margin:0 auto 0.08rem auto;
                            }
                            span{
                                display:block;
                                width:100%;
                                height:0.15rem;
                                color: #222222;
                                font-size: 0.12rem;
                                overflow:hidden;
                                white-space:nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
        }
        .fangji{
            height:auto;
            .fangjiBorder{
                width:3.45rem;
                height:0.5rem;
                border-bottom:0.01rem solid #eee;
                margin:auto;
                div:nth-child(1){
                    width:90%;
                    height:100%;
                    float:left;
                    font-size:0.15rem;
                    color:#000;
                    // font-weight:bold;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow: ellipsis;
                    line-height:0.5rem;
                }
                img{
                    width:0.115rem;
                    height:0.115rem;
                    float:right;
                    margin-top:0.19rem;
                }
            }
            div:last-child{
                border-bottom:none;        
            }
        }
        .yizhu{
            height:2.71rem;
            .yizhuBox{
                .yizhuCenter{
                    ul{
                        display:flex;
                        flex-wrap:wrap;
                        justify-content: space-between;
                        li{
                            width:30%;
                            height:2.1rem;
                            text-align: center;
                            overflow:hidden;
                            img{
                                width:0.98rem;
                                height:1.41rem;
                                margin:0.2rem auto 0.12rem auto;
                            }
                            span{
                                color:#222;
                                font-size:0.14rem;
                                // margin-top:0.12rem;
                                font-weight:bold;
                            }
                        }
                    }
                }
            }
        }
        .ysbj{
            height:auto;
            .ysbjBox{
                .YS{
                    width:3.45rem;
                    margin:auto;
                    border-bottom:0.01rem solid #eee;
                    .top{
                        width:3.45rem;
                        height:1.6rem;
                        margin-top:0.2rem;
                        img{
                            width:3.45rem;
                            height:1.6rem;
                        }
                    }
                    .title{
                        font-size:0.15rem;
                        font-weight: bold;
                        line-height:0.22rem;
                        margin:0.1rem 0;
                    }
                    .text{
                        width:100%;
                        height:0.38rem;
                        color:#808287;
                        font-size:0.13rem;
                        overflow:hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .button{
                        width:100%;
                        height:0.14rem;
                        margin-bottom:0.15rem;
                        .key{
                            width:50%;
                            height:100%;
                            float:left;
                            img{
                                float:left;
                                margin:0.03rem 0.02rem 0 0;
                            }
                            span{
                                display:inline-block;
                                float:left;
                                color:#999;
                                font-size:0.1rem;
                            }
                        }
                        .price{
                            width:50%;
                            height:100%;
                            float:right;
                            text-align: right;
                            span:nth-child(1){
                                color:#BDBEBD;
                                font-size:0.12rem;
                            }
                            span:nth-child(2){
                                color:#FE2023;
                                font-size:0.14rem;
                            }
                        }
                        .free{
                            width:50%;
                            height:100%;
                            float:right;
                            text-align: right;
                            color:#219319;
                            font-size:0.11rem;
                        }
                    }
                }
                .YS:last-child{
                    border-bottom:none;
                    margin-bottom:0.2rem;
                }
            }
        }
    }
</style>