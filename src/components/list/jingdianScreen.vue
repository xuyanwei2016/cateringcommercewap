<template>
    <div class='jdScreen'>
        <div class='top' v-if='!isScreen'>
            <input type="text" placeholder="请输入标题、来源、内容等" @click='isScreen=true'>
            <span>筛选</span>
        </div>
        <div class='screen' v-if='isScreen'>
            <div class='search'>
                <input type="text" placeholder="请输入标题、来源、内容等">
                <span>筛选</span>
            </div>
            <ul>
                <li v-for="(itemNa,indexNa) in nationList" :key="indexNa" :class="curNation.includes(itemNa.id)?'active':''"
                    @click="changeNation(itemNa,indexNa)">{{itemNa.name}}
                </li>
            </ul>
            <div class="button">
                <span @click="reset">重置</span>
                <span @click="sumbit">确定</span>
            </div>
        </div>
    </div>
</template>
<script>
import {getNationTypeListAPI} from '@/api/login/login.js'
import {getListAPI} from '@/api/list'
export default {
    data(){
        return{
            nationList:[{name: '全部', id: 'null'}],
            isScreen:false,
            curNation: ['null'],
            value: '',

        }
    },
    created(){
        
    },
    watch: {
      isScreen(n, o) {
        if (n) {
          let {length: len} = this.nationList;
          if (len > 1) return;
          getNationTypeListAPI().then(res => {
            let obj = res.data.data;
            Object.keys(obj).forEach((item) => {
              let itemObj={
                id:item,
                name:obj[item]
              };
              this.nationList.push(itemObj)
            })
          })
        }
      },
    },
    methods:{
        changeNation(item){
            if (item.id == 'null') {
                    this.curNation = ['null'];
                } else {
                    if (this.curNation.includes('null')) {
                        this.curNation = [];
                    }

                if (this.curNation.includes(item.id)) {
                    let index = this.curNation.findIndex(function (value, index, arr) {
                        return value == item.id;
                    })
                    this.curNation.splice(index, 1);
                    this.curNation.length == 0 ? this.curNation.push('null') : true;
                } else {
                    this.curNation.push(item.id);
                }
            }
        },
        sumbit(){
            let data={
                pageNum:1,
                content:this.value.trim(),
                nationsType:this.curNation.includes('null')?null:this.curNation,
            };
            this.$emit('sonFn',data);
            this.isScreen=false;
        },
        /*重置*/
        reset(){
            this.curNation=['null'];
            let data={
            pageNum:1,
            content:this.value.trim(),
            nationsType:null,
            };
            this.$emit('sonFn',data);
            this.isScreen=false;
        },
    }
}
</script>
<style lang="less" scoped>
    .jdScreen{
        width:3.44rem;
        height:0.37rem;
        text-align: center;
        margin:0.1rem auto 0 auto;
        font-size:0.14rem;
        .top{
            input{
                width:2.75rem;
                height:0.37rem;
                border-radius: 0.185rem;
                color:#888888;
                border:none;
                background: url("../../assets/img/list/nav_search.png") no-repeat #F2F2F2 0.1rem center;
                background-size: 0.13rem 0.14rem;
                padding-left:0.3rem;
                float:left;
            }
            span{
                color:#000;
                font-weight:500;
                float:right;
                line-height:0.37rem;
            }
        }
        .screen{
            width:100%;
            height:100%;
            background:#fff;
            position:fixed;
            top:0;
            left:0;
            z-index:999;
            margin-top:0.746rem;
            .search{
                width:3.435rem;
                height:0.37rem;
                margin:auto;
               input{
                    width:2.75rem;
                    height:0.37rem;
                    border-radius: 0.185rem;
                    color:#888888;
                    border:none;
                    background: url("../../assets/img/list/nav_search.png") no-repeat #F2F2F2 0.1rem center;
                    background-size: 0.13rem 0.14rem;
                    padding-left:0.3rem;
                    float:left;
                }
                span{
                    color:#000;
                    font-weight:500;
                    float:right;
                    line-height:0.37rem;
                } 
            }
            ul {
                padding: 0.1rem 0 0 .15rem;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                li {
                    width: .78rem;
                    height: .31rem;
                    line-height: .31rem;
                    text-align: center;
                    border: 1px solid #D2D6D9;
                    border-radius: .03rem;
                    font-size: .13rem;
                    color: #3C3F46;
                    margin-bottom: .09rem;
                    margin-right: .09rem;
                }
                .active {
                    border-color: #DE6209;
                    color: #DE6209;
                }
            }
            .button {
                width: 2.92rem;
                padding: 0 .4rem;
                position: fixed;
                display: flex;
                justify-content: space-between;
                bottom: .5rem;
                z-index: 12;
                span {
                    display: block;
                    width: 1.4rem;
                    height: .4rem;
                    background: #EEEEEE;
                    text-align: center;
                    line-height: .4rem;
                    color: #333333;
                    font-size: .15rem;
                }
                span:last-child {
                    background: url("../../assets/img/personal/okbg.png") no-repeat;
                    background-size: cover;
                    color: #fff;
                    font-size: .17rem;
                }
            }
        }
    }
</style>