<template>
    <div class='addSite'>
        <div class='center' v-for='(item,index) in dataList' :key='index' >
            <div class='centerBox'>
                <div class='top'>
                    <div class='city' style='width:0.4rem'>{{item.province}}</div>
                    <div class='name'>{{item.receiver}}</div>
                    <div class='default' v-if='item.isDefault==1'>默认</div>
                    <div class='defaultSet' v-else @click='setDefault(item.id)'>设为默认</div>                    
                    <div class='topImg'>
                        <div class='delete' @click="showPopup(item.id)"><img src="../../assets/img/list/citydelete.png" alt=""></div>
                        <div class='modification' @click='setDetail(item.id)' ><img src="../../assets/img/list/cityxiugai.png" alt=""></div>
                    </div>      
                </div>
                <div class='bottom'>
                    {{item.detailed}}
                </div>
            </div>
        </div>
        <div style='height:0.85rem;width:100%'></div>
        <router-link to='/addSite' class='addRouter'><div class='addBtn' >添加收货地址</div></router-link>
        <router-view  v-wechat-title="$route.meta.title">地址管理</router-view>
        <div class='returnGo' @click='$router.go(-1)'></div>
        <!-- 删除弹框 -->
        <div class='dialog' v-if='show' @click='show = false'>
            <div @click.stop = 'mask'>
                <h3 style='color:#000'>确认删除地址吗？</h3>
                <span @click='show=false'>取消</span>
                <span @click='clickBtn'>确认</span>
            </div>
        </div>
    </div>
</template>
<script>
import {getShoppingPageAPI,deleteCityAPI,updateDefualtAPI} from '@/api/my'
export default {
    data(){
        return{
            dataList:[],
            show:false,
            itemId:null
        }
    },
    mounted(){
        document.body.style.backgroundColor = '#F5F2F5'
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    created(){
        this.getShoppingPage()
    },
    methods:{
        mask(){},
        showPopup(el){
            this.show = true
            this.itemId = el
        },
        setDefault(el){
            updateDefualtAPI(el).then(res=>{
                if( res.data.code == 0 ){
                    this.$toast('默认地址重置成功')
                    this.getShoppingPage()
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        clickBtn(){
            deleteCityAPI([this.itemId]).then(res=>{
                if( res.data.code == 0 ){
                    this.show = false
                    this.$toast('删除成功')
                    this.getShoppingPage()
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        setDetail(el){
            this.$router.push({path:'/editeSite',query:{id:el}})
        },
        getShoppingPage(){
            getShoppingPageAPI().then(res=>{
                if( res.data.code == 0 ){
                    this.dataList = res.data.data.list
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        back(){
            history.go(-1)
        }
    }

}
</script>
<style lang='less' scoped>
    .addSite{
        .dialog{
            width:100%;
            height:100%;
            background: rgba(0, 0, 0, 0.3);
            position:fixed;
            top:0;
            left:0;
            div{
                width:2.7rem;
                height:1.5rem;
                background:#fff;
                margin:1.5rem auto;
                border-radius: 0.1rem;
                z-index:9999;
                h3{
                    // color:#000;
                    text-align: center;
                    line-height:0.9rem;
                    font-size:0.19rem;
                }
                span{
                    display:inline-block;
                    width:40%;
                    height:0.3rem;
                    float:left;
                    text-align: center;
                    font-size:0.17rem;
                }
                span:nth-child(2){
                    margin-left:0.3rem;
                }
                span:nth-child(3){
                    color:#BB0606;
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
        .title{
            width:100%;
            height:0.44rem;
            background-size:100%;
            color:#fff;
            font-size:0.18rem;
            line-height:0.44rem;
            text-align:center;
            position: fixed;
            top:0;
            z-index:999;
            background:#BB0606;
            .titleLeft{
                height:100%;
                display:inline-block;
                float:left;
                margin-left:0.12rem;
                font-size:0.35rem;
                img{
                    width:0.2rem;
                    height:0.2rem;
                    margin-top:0.11rem;
                }
            }
            .titleCenter{
                margin-left:-0.29rem;
                font-weight:bold;
            }
        }
        .center{
            width:100%;
            height:0.97rem;
            background:#fff;
            border-bottom:0.01rem solid #EBEBEB;
            .centerBox{
                width:3.45rem;
                height:1.07rem;
                margin:auto;
                .top{
                    width:100%;
                    height:0.3rem;
                    padding-top:0.1rem;
                    line-height:0.3rem;
                    .city,.name{
                        width:0.7rem;
                        height:0.3rem;
                        float:left;
                        overflow: hidden;
                        // text-overflow: ellipsis;
                        // display: -webkit-box;
                        // -webkit-line-clamp: 1;
                        // -webkit-box-orient: vertical;
                        text-align: left;
                        font-weight:bold;
                        font-size:0.15rem;
                    }
                    .default{
                        width:0.3rem;
                        height:0.15rem;
                        background: url('../../assets/img/list/citymoren.png') no-repeat center;
                        background-size:0.3rem 0.15rem;
                        float:left;
                        color:#fff;
                        font-size:0.11rem;
                        text-align: center;
                        margin-top:0.08rem;
                        line-height:0.175rem;
                    }
                    .defaultSet{
                        width:0.525rem;
                        height:0.15rem;
                        background: url('../../assets/img/list/swmr.png') no-repeat center;
                        background-size:0.525rem 0.15rem;
                        color:#666;
                        float:left;
                        font-size:0.11rem;
                        text-align: center;
                        margin-top:0.08rem;
                        line-height:0.175rem;
                    }
                    .topImg{
                        width:0.6rem;
                        height:0.3rem;
                        float:right;
                        .delete{
                            img{
                                width:0.13rem;
                                height:0.14rem;
                                float:left;
                                margin:0.08rem 0 0 0;
                            }
                        }
                        .modification{
                            img{
                                width:0.13rem;
                                height:0.14rem;
                                float:right;
                                margin-top:0.08rem;
                            }
                        }
                    }
                }
                .bottom{
                    width:100%;
                    height:0.4rem;
                    font-size:0.14rem;
                    color:#333;
                    line-height:0.2rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .addBtn{
            width:3.35rem;
            height:0.45rem;
            border-radius: 0.225rem;
            background:url('../../assets/img/list/dzgladd.png') no-repeat #BB0606 1.05rem center;
            background-size:0.14rem 0.14rem;
            font-size:0.15rem;
            line-height:0.45rem;
            font-weight:bold;
            text-align: center;
            letter-spacing: 0.015rem;
            color:#fff;
            position:fixed;
            bottom:0.17rem;
            left:0.2rem;
        }
    }
</style>
