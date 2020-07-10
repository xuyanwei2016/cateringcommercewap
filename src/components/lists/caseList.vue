<template>
<div>
    <div class='yianCenter' v-for="(item,index) in list" :key="index"  @click="linkDetail(item)">
        <div class='title' v-html='item.name'></div>
        <div class='label' v-if='item.keywords!=null'>
            <ul>
                <li v-for="(key,val) in item.keywords.split(',')" :key='val'>{{key}}</li>
            </ul>  
            <div class='after'></div>              
        </div>
        <div class='center'>{{item.description}}</div>
        <div class='button'>
            <div class='laiyuan' v-if='item.bookName'>来源：《{{item.bookName}}》</div>
            <div class='price' v-if='item.priceOption==1'>
                <del v-if='item.price'>￥{{item.price}}</del>
                <span v-if='item.realPrice'>￥{{item.realPrice}}</span>
            </div>
            <div class='mianfei' v-else>免费</div>
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
    data(){
        return{
        }
    },
    created(){
    },
    watch:{

    },
    computed:{
    
    },
    methods: {
     linkDetail(value){
        this.$emit('linkDetail',value);
    },
    },
}
</script>
<style lang="less" scoped>
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
</style>