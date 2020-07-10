<template>
    <div>
        <div class='yaowu'  v-for="(item,index) in list" :key="index" @click="linkDetail(item)">
            <img :src="imgLink(item.img)" alt="" v-if='item.img'>
            <img src="../../assets/img/cover.png" alt="" v-else >
            <span v-html='item.name'></span>
            <img src="@/assets/register/rightjt.png" alt="">            
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
    .yaowu{
        width:3.45rem;
        height:1.015rem;
        margin:auto;
        border-bottom:0.01rem solid #eee;
        img:nth-child(1){
            width:1.06rem;
            height:0.73rem;
            float:left;
            margin-top:0.14rem;
        }
        span{
            width:2rem;
            height:100%;
            font-size:0.16rem;
            color:#000;
            font-weight:bold;
            float:left;
            line-height:1.015rem;
            margin-left:0.15rem;
            overflow:hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
        }
        img:nth-child(3){
            width:0.2rem;
            height:0.2rem;
            float:right;
            margin-top:0.43rem;
        }
    }
</style>