<template>
  <div>
    <div class='YS' v-for="(item,index) in list" :key="index" @click="linkDetail(item)">
        <div class='top'  v-if='item.img!=null'>
            <img :src="imgLink(item.img)" alt="">
        </div>
        <div class='title'  v-html="item.name"></div>
        <div class='text' v-if='item.description!=null'>{{item.description}}</div>
        <div class='button'>
            <div class='key'>
                <img src="@/assets/img/list/look.png" alt="">
                <span>2099次浏览</span>
            </div>
            <div class='price' v-if='item.priceOption==1'>
                <span>￥<del>{{item.price}}</del></span>
                <span>￥{{item.realPrice}}</span>
            </div>
            <div class='free' v-else>免费</div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            default:[]
        }
    },
    created() {
      
    },
    computed: {
      
    },
    watch: {},
    methods: {
      linkDetail(value){
        this.$emit('linkDetail',value);
    },
    },
}
</script>
<style lang="less" scoped>
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
}
</style>