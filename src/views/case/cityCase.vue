<template>
    <div class='city'>
        <div class='title'>
            <span class='titleLeft' @touchend='$router.go(-1)'><img src="../../assets/img/list/fhjtBlack.png" alt=""></span>
            <span class='titleCenter'>选择城市</span>
        </div>
        <div style='height:0.44rem'></div>
        <div class='center'>
            <ul>
                <li v-for='(item,index) in dataList' :key='index' @click='clickLi(item)'><span>{{item.showName}}</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
import {getDiytypeListAPI} from '@/api/chinesGreen/index'
export default {
    data(){
        return{
            dataList:[
                {showName:'全部',code:'null'}
            ],
            value:1
        }
    },
    mounted(){
      document.body.style.backgroundColor = '#FAFAFA'
    },
    beforeCreate(){
        document.title=this.$route.meta
    },
    created(){
        this.getDiytypeList()
    },
    methods:{
        clickLi(item){
            if( item!='null' ){
                this.$router.push({path:'/caseList',query:{diyTypeCode:item.code,typeName:item.showName}})
            }else{
                this.$router.push({path:'/caseList'})
            }
        },
        getDiytypeList(){
            getDiytypeListAPI().then(res=>{
                if( res.data.code == 0 ){
                    let data = res.data.data
                    for( let i=0; i<data.length; i++ ){
                        let timeObj = {
                            code:data[i].code,
                            showName:data[i].showName
                        }
                        this.dataList.push(timeObj)
                    }
                }else{
                    this.$toast.fail(res.data.msg)
                }
            })
        }
    }
}
</script>
<style lang='less'>
    .city{
        .title{
            width:100%;
            height:0.44rem;
            background-size:100%;
            color:#000;
            font-size:0.18rem;
            line-height:0.44rem;
            text-align:center;
            position: fixed;
            top:0;
            background:#fff;
            .titleLeft{
                height:100%;
                display:inline-block;
                float:left;
                margin-left:0.12rem;
                font-size:0.35rem;
                img{
                    width:0.25rem;
                    height:0.25rem;
                    margin-top:0.1rem;
                }
            }
            .titleCenter{
                margin-left:-0.29rem;
                font-weight:bold;
            }
        }
        .center{
            ul{
                li{
                    display:inline-block;
                    width:100%;
                    height:0.39rem;
                    border-bottom:0.01rem solid #EBEBEB;
                    line-height:0.39rem;
                    font-size:0.15rem;
                    span{
                        margin-left:0.15rem;
                    }
                }
            }
        }
    }
</style>
