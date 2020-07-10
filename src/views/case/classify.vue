<template>
    <div class='classify'>
        <!-- <div class='title'>
            <span class='titleLeft' @touchend='prev'><img src="../../assets/img/list/fhjtBlack.png" alt=""></span>
            <span class='titleCenter'>分类</span>
        </div> -->
        <div class='caixi'>
            <div class='caixiBox' v-for='(item,index) in dataList' :key='index'>
                <h4>{{item.name}}</h4>
                <ul>
                    <li v-for='(i,y) in item.list' :key='y' :class="dataId.includes(i.id)?'active':''"  @click='clickName(i.id)'>{{i.name}}</li>
                </ul>
            </div>
        </div>
        <div class='returnGo' @click='prev'>确 定</div>
        <div class='returnGofh' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {getMenuLableListAPI} from '@/api/chinesGreen/index'
export default {
    data(){
        return{
            dataList:[],
            dataId:[]
        }
    },
    beforeCreate(){
        document.title=this.$route.meta
    },
    created(){
        this.getMenuLableList()
        let itemId = this.$route.query.ids
        if( itemId ){
            itemId = itemId.map(Number)
            this.dataId = itemId
        }
    },
    mounted(){
        document.body.style.backgroundColor = '#fff'
    },
    methods:{
        clickName(val){
            if( this.dataId.includes(val) ){
                let index = this.dataId.findIndex(function (value, index, arr) {
                    return value == val;
                })
                this.dataId.splice(index, 1);
                this.dataId.length == 0 ? this.dataId.push('null') : true;
            }else{
                this.dataId.push(val)
            }
        },
        prev(){
            if( this.dataId[0] === 'null' || this.dataId[0] === NaN && !this.dataId[1] ){
               this.dataId = []
                this.$router.push({path:'/caseList'})
            }else{
                this.$router.push({path:'/caseList',query:{ids:this.dataId}})
            }
        },
        getMenuLableList(){
            getMenuLableListAPI().then(res=>{
                if( res.data.code == 0 ){
                    this.dataList = res.data.data
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
    .classify{
        .returnGofh{
            width:0.57rem;
            height:0.305rem;
            background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:#BB0606;
            color:#fff;
            text-align: center;
            line-height: 0.305rem;
            margin:0.2rem auto;
            border-radius: 0.05rem;
            font-size:0.07rem;
        }
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
        .caixi{
            background:#fff;
            .caixiBox{
                width:3.45rem;
                height:auto;
                margin:auto;
                h4{
                    display:block;
                    font-size:0.17rem;
                    margin-top:0.3rem;
                }
                ul{
                    li{
                        display:inline-block;
                        width:auto;
                        height:0.31rem;
                        background:#F3F3F3;
                        line-height:0.31rem;
                        padding:0 0.15rem;
                        border-radius: 0.05rem;
                        color:#333;
                        font-size:0.12rem;
                        margin: 0.1rem 0.1rem 0 0;
                    }
                    .active{
                        background:#BB0606;
                        color:#fff;
                    }
                }
            }
        }
    }
</style>

