<template>
    <div class='fangji'>
        <div >
            <div class='fangjiBorder'  v-for="(item,index) in list" :key="index"   @click="linkDetail(item)">
                <div v-html='item.name'></div>
                <img src="@/assets/register/rightjt.png" alt="">
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
            this.$router.push({path:'/read',query:{id:item.id}});
        },
        // linkDetail(value){
        //     this.$emit('linkDetail',value);
        // },
    }
}
</script>
<style lang="less" scoped>

    .fangji{
        
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
                width:0.1rem;
                height:0.115rem;
                float:right;
                margin-top:0.19rem;
            }
        }
    }
</style>