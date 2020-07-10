<template>
    <div class='cuisine'>
        <div class='cuisineBox'>
            <div class='top'>
                <input type="text" placeholder="这里可以输入您想要的菜系" v-model='name'>
                <div @click='add'>添 加</div>
            </div>
            <ul>
                <li v-for='(i,e) in list' :key='e' :class='dataId.includes(i.name)?"active":""' @click='clickName(i)'>{{i.name}}</li>
            </ul>
        </div>
        <div class='returnGo' @click='returnClick'>确 定</div>
        <div class='returnGofh' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {getMenuLableListAPI} from '@/api/chinesGreen/index'
export default {
    data(){
        return{
            list:[],
            name:'',
            dataId:[],
            intId:[]
        }
    },
    beforeCreate(){
      document.title = this.$route.meta
    },
    created(){
        this.getMenuLableList()
    },
    mounted(){
        document.body.style.backgroundColor = '#fff'
    },
    beforeRouteLeave(to, from, next) {
        if (to.path == "/worksOne") {
            to.meta.keepAlive = true;
        } else {
            to.meta.keepAlive = false;
        }
        next()
    },
    methods:{
        returnClick(){
            this.$router.push({name:'worksOne',params:{dataName:this.dataId,dataId:this.intId}})
        },
        clickName(val){
            let valName = val.name
            if( this.dataId.includes(valName) ){
                let index = this.dataId.findIndex(function (value, index, arr) {
                    return value == valName;
                })
                this.dataId.splice(index, 1);
                this.dataId.length == 0 ? this.dataId.push('null') : true;
            }else{
                this.dataId.push(valName)
            }

            if( this.intId.includes(val.id) ){
                let index = this.intId.findIndex(function(value,index,arr){
                    return value = val.id
                })
                this.intId.splice(index,1)
                this.intId.length == 0 ? this.intId.push('null') : true
            }else{
                this.intId.push(val.id)
            }
        },
        add(){
            if( this.name ){
                this.list.push({name:this.name})
                this.name = ''
            }
        },
        getMenuLableList(){
            getMenuLableListAPI().then(res=>{
                if( res.data.code == 0 ){
                    this.list = res.data.data[0].list
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
    .cuisine{
        width:100%;
        height:auto;
        background:#fff;
        .returnGofh{
            width:0.57rem;
            height:0.305rem;
            background:url('../../../assets/img/list/fanhuiRight.png') no-repeat right;
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
        .cuisineBox{
            width:3.45rem;
            height:auto;
            background:#fff;
            margin:auto;
            .top{
                width:100%;
                height:0.37rem;
                line-height:0.37rem;
                margin:0.125rem 0 0.15rem 0;
                input{
                    width:2.865rem;
                    height:0.37rem;
                    background:#F2F2F2;
                    border:none;
                    font-size:0.14rem;
                    color:#888;
                    line-height:0.37rem;
                    float:left;
                    padding-left:0.22rem;
                }
                div{
                    width: 0.5rem;
                    height: 0.3rem;
                    float: right;
                    color: #fff;
                    font-size: 0.14rem;
                    background: #BB0606;
                    text-align: center;
                    line-height: 0.3rem;
                    margin-top: 0.03rem;
                }
            }
            ul{
                li{
                    width:auto;
                    height:0.31rem;
                    background:#F3F3F3;
                    border-radius: 0.05rem;
                    line-height:0.31rem;
                    text-align:center;
                    padding:0 0.15rem;
                    margin:0 0.1rem 0.1rem 0;
                    float:left;
                }
                .active{
                    background:#BB0606;
                    color:#fff;
                }
            }
        }
        .cuisineBox:after{
            content:".";
            clear:both;
            display:block;
            height:0;
            overflow:hidden;
            visibility:hidden;
        }
    }
</style>
