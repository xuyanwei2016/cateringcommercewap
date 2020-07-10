<template>
    <div class='chinesGreen'>
        <div>
            <div class='chinesBox' v-for='(item,index) in list' :key='index' @click='clickDetail(item.id)'>
                <div class='top'>
                    <img v-if='item.cover' :src="imgLink(item.cover)" alt="">
                    <img v-else src="../../assets/img/list/zgcdt.png" alt="">
                    <div>
                        <span>浏览量：{{thousandChina(item.traffic)}}</span>
                        <span>收藏：{{thousandChina(item.num)}}</span>
                    </div>
                </div>
                <div class='bottom'>
                    <div class='name'>{{item.title}}</div>
                    <div class='imgName'>
                        <img v-if='item.img' :src="imgLink(item.img)" alt="">
                        <img v-else src="../../assets/img/list/zgctx.png" alt="">
                        <span>{{item.author}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    props:{
        list:{
            type:Array,
            default:[]
        }
    },
    created(){
        
    },
    methods:{
        clickDetail(id){
            this.$router.push({path:'detail',query:{id:id}})
        }
    }
}
</script>
<style lang='less' scoped>
.chinesGreen{
    .chinesBox{
        width:3.45rem;
        height:2.2rem;
        margin:0 auto 0.15rem auto;
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
                background: url(../../../static/img/caiBg.png) no-repeat;
                background-size: 100% 100%;
                position:absolute;
                bottom:0;
                font-weight: 500;
                color:#fff;
                line-height:0.3rem;
                font-size:0.13rem;
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
            .name{
                width:2.5rem;
                height:0.75rem;
                float:left;
                font-weight:bold;
                line-height:0.75rem;
                font-size:0.18rem;
                margin-left:0.15rem;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .imgName{
                width:0.5rem;
                height:0.75rem;
                float:right;
                overflow: hidden;
                margin:0 0.15rem 0 0;
                padding-top:0.09rem;
                img{
                    width:0.45rem;
                    height:0.45rem;
                    border-radius: 50%;
                    margin:0 0 0.02rem 0.02rem;
                }
                span{
                    display:inline-block;
                    width:0.5rem;
                    height:0.15rem;
                    overflow:hidden;
                    text-align: center;
                    font-size:0.09rem;
                    line-height:0.15rem;
                    color:#333;
                }
            }
        }
    }
    // .chinesBox:last-child{
    //     margin-bottom:0.7rem;
    // }
}
</style>
