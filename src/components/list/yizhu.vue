<template>
    <div class='yizhu'>
        <div >
            <div class='yizhuBox'  v-for="(item,index) in list" :key="index"  @click="linkDetail(item)">
                <div class='left'>
                    <img :src="imgLink(item.img)" alt="" v-if='item.img'>
                    <img src="../../assets/img/cover.png" alt="" v-else >
                </div>
                <div class='right'>
                    <div class='title'  v-html='item.name'></div>
                    <div class='center'>
                        <div class='author'>作者 {{item.author}}</div>
                        <div class='price' v-if='item.priceOption==1'>
                            <span v-if='item.price'>￥<del>{{item.price}}</del></span>
                            <span v-if='item.realPrice'>￥{{item.realPrice}}</span>
                        </div>
                        <div class='free' v-else>免费</div>
                    </div>
                    <div class='bottom'>{{item.description}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import noHave from '../../components/noHave.vue';
export default {
    props:{
        list:{
            type:Array,
            default:[]
        }
    },
    methods: {
        linkDetail(item){
            // let obj={35:'/read',32:'/read',33:'/read',1:'/bookDetail',40:'/read',51:'/masterDetail'};
            this.$router.push({path:'/bookDetail',query:{id:item.id}});
        },
        // linkDetail(value){
        //     this.$emit('linkDetail',value);
        // },
    }
}
</script>
<style lang="less" scoped>
    .yizhu{
        .yizhuBox{
            width:3.44rem;
            height:1.545rem;
            border-bottom:0.01rem solid #eee;
            margin:auto;
            .left{
                width:0.8rem;
                height:1.15rem;
                float:left;
                img{
                    width:0.8rem;
                    height:1.15rem;
                    margin-top:0.2rem;
                }
            }
            .right{
                width:2.5rem;
                height:1.15rem;
                float:right;
                margin-top:0.2rem;
                .title{
                    font-size:0.15rem;
                    font-weight:bold;
                    color:#000;
                }
                .center{
                    width:100%;
                    height:0.14rem;
                    margin:0.13rem 0 0.25rem 0;
                    .author{
                        width:50%;
                        height:0.14rem;
                        float:left;
                        color:#BA9F74;
                        font-size:0.11rem;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                    }
                    .price{
                        width:50%;
                        height:0.14rem;
                        float:left;
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
                        height:0.14rem;
                        float:left;
                        text-align: right;
                        font-size:0.11rem;
                        color:#219319;
                    }
                }
                .bottom{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    font-size:0.13rem;
                    color:#808287;
                    line-height:0.2rem;
                    letter-spacing: 0.01rem;
                }
            }
        }
    }
</style>