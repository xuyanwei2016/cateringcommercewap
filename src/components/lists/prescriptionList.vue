<template>
    <div>
        <div class='fangjiBorder'  v-for="(item,index) in list" :key="index" @click="linkDetail(item)" >
            <div v-html='item.name'></div>
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
</style>