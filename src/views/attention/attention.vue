<template>
    <div class='attention'>
        <div class='top'> 
            <div class='topLeft' @touchend='prev'>
                <img src="@/assets/img/jingdian/icon_fanhui_black.png" alt="">
            </div>
            <div class='title'>我的关注</div>
        </div>
        <div class='center'>
            <div class='centerBox' v-for='(item,index) in dataList' :key='index'>
                <div class='left'>
                    <img :src="imgLink(item.faceImg)" alt="" v-if='item.faceImg'>
                    <img src="../../assets/img/03author.png" alt="" v-else >
                </div>
                <div class='author'>
                    <div class='name'>{{item.name}}</div>
                    <div class='detail'>{{item.synopsis}}</div>
                </div>
                <button class='right' @touchend='clickBtn(item.id)'>取消关注</button>
            </div>
        </div>
        <div v-if='this.noData' class='noBox'>
            <img src="@/assets/img/list/noData.png" alt="">
            <h1>抱歉，暂无相关内容</h1>
        </div>
        <div class='Popup' v-if="isShow==true">
            <div class="cancelOrder">
                <h1>提示</h1>
                <h2>确定要取消关注？</h2>
                <div class="button">
                    <span @click="isShow=false">取消</span>
                    <span @click='attenConfirm'>确定</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getCollectAPI,getDeleteAPI } from '@/api/login/login.js'
export default {
    data(){
        return{
            isShow:false,
            dataList:[],
            deleteId:'',
            noData:false
        }
    },
    created(){
        this.getCollectList()
    },
    methods:{
        prev(){
            this.$router.go(-1)
        },
        clickBtn(val){
            this.isShow = true
            this.deleteId = val
        },
        attenConfirm(){
            getDeleteAPI({followId:this.deleteId}).then(res=>{
                if( res.data.code == 0 ){
                    this.isShow = false
                    this.$message.success('取消关注成功！')
                    this.getCollectList()
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        getCollectList(){
            let data={
                pageNum:1,
                pageSize:10,
                type:'-4'
            }
            getCollectAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    this.dataList = res.data.data.list
                    if( this.dataList == null || this.dataList == undefined || this.dataList == '' ){
                        this.noData = true
                        console.log('没有数据')
                    }else{
                        this.noData = false
                        console.log('有数据')
                    }
                }else{
                    this.$message.warning(res.data.msg)
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .attention{
        width:100%;
        height:100%;
        background:#F3F3F3;
        .top{
           height: 0.64rem;
           width:100%;
           background:#BA9F74;
           .topLeft{
               width:0.3rem;
               height:0.2rem;
               float:left;
               margin:0.24rem 1rem 0  0.155rem;
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
               margin-top:0.22rem;
           }
        }
        .center{
            width:100%;
            height:auto;
            background:#fff;
            margin-top:0.1rem;
            .centerBox{
                width:3.51rem;
                height:0.935rem;
                border-bottom:0.01rem solid #eee;
                margin:auto;
                .left{
                    width:0.63rem;
                    height:0.63rem;
                    float:left;
                    margin-top:0.14rem;
                    img{
                        width:0.63rem;
                        height:0.63rem;
                        border-radius:50%;
                    }
                }
                .author{
                    width:1.75rem;
                    height:0.63rem;
                    float:left;
                    overflow:hidden;
                    margin:0.19rem 0 0 0.09rem;
                    .name{
                        width:1.75rem;
                        height:0.25rem;
                        font-size:0.15rem;
                        color:#000;
                        font-weight:bold;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                    }
                    .detail{
                        width:1.75rem;
                        height:0.32rem;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                }
                .right{
                    width:0.7rem;
                    height:0.25rem;
                    float:right;
                    border-radius: 0.125rem;
                    font-size:0.12rem;
                    color:#666666;
                    background:#fff;
                    border:0.01rem solid #E4E4E4;
                    margin-top:0.34rem;
                }
            }
            .centerBox:last-child{
                border-bottom:none;
            }
        }
        .noBox{
            // font-size:0.15rem;
            // text-align: center;
            // margin-top:1rem;
            img{
                width: 1.41rem;
                height: 1.26rem;
                padding-bottom: .2rem;
            }
            h1 {
                font-size: .14rem;
                color: #999999;
                font-weight: normal;
            }
        }
        .Popup{
            width: 100%;
            height: 100%;
            position: fixed;
            background: rgba(0, 0, 0, 0.3);
            top: 0;
            left: 0;
            z-index: 12;
            display: flex;
            align-items: center;
            justify-content: center;
            .cancelOrder{
                width: 2.7rem;
                height: 1.62rem;
                background: rgba(255,255,255,.95);
                border-radius: .1rem;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                h1{font-size: .18rem;padding-top: .22rem}
                h2{font-size: .16rem;font-weight:normal;color:#666;}
                .button{
                    width: 100%;
                    border-top: 1px solid #D9DADE;
                    display: flex;
                    justify-content: space-between;
                    span{
                        display: inline-block;
                        width: 49.5%;
                        line-height: .44rem;
                        text-align: center;
                        color: #333;
                        font-size: .18rem;
                        border-right: 1px solid #D9DADE;
                    }
                    span:last-child{
                        border: none;
                        color:#BA9F74;
                    }
                }
            }
        }
    }
</style>