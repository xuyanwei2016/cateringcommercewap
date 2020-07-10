<template>
    <div class='worksTwo'>
        <div class='food'>
            <div class='shicai'>
                <img src="../../../assets/img/list/shicai.png" alt="">
                <h3>食材</h3>
            </div>
            <ul>
                <li v-for='(i,e) in foodList' :key='e'>
                    <input type="text" placeholder="填写食材" v-model='i.name' v-on:input="changeInput(e)">
                    <div class='soled'></div>
                    <p>
                        <input type="number" placeholder="10克" v-model='i.dosage'>
                    </p>
                    <div class='clear' v-if='e!=0' @click='clearSoled(e)'>×</div>
                </li>
            </ul>
        </div>
        <div class='food'>
            <div class='shicai'>
                <img src="../../../assets/img/list/tiaoliao.png" alt="">
                <h3>调料</h3>
            </div>
            <ul>
                <li v-for='(i,e) in relishList' :key='e'>
                    <input type="text" placeholder="填写用料" v-model='i.name' v-on:input="changeInputRelish(e)">
                    <div class='soled'></div>
                    <p>
                        <input type="number" placeholder="10克" v-model='i.dosage'>
                    </p>
                    <div class='clear' v-if='e!=0' @click='clearSoledTl(e)'>×</div>
                </li>
            </ul>
        </div>
        <div class='food jifa'>
            <div class='shicai'>
                <img src="../../../assets/img/list/jifa.png" alt="">
                <h3>技法</h3>
            </div>
            <div class='jifaBox'>
                <div>{{jifaName}}</div>
                <img v-if='this.jifaShow' src="../../../assets/img/list/fbzpbtm.png" alt="" @click='jifaTopClick'>
                <img v-else src="../../../assets/img/list/fbzptop.png" alt=""  @click='jifaBtmClick'>
                <div class='xiala' v-if='!this.jifaShow'>
                    <ul>
                        <li v-for='(i,e) in jifaList' :key='e' @click='slillClick(i)'>
                            <span>{{i}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class='food jifa' style='margin-bottom:0.7rem'>
            <div class='shicai'>
                <img src="../../../assets/img/list/diyu.png" alt="">
                <h3>地域</h3>
            </div>
            <div class='jifaBox'>
                <div>{{cityName}}</div>
                <img v-if='this.cityShow' src="../../../assets/img/list/fbzpbtm.png" alt="" @click='cityTopClick'>
                <img v-else src="../../../assets/img/list/fbzptop.png" alt="" @click='cityBtmClick'>
                <div class='xiala' v-if='!this.cityShow' >
                    <ul>
                        <li v-for='(i,e) in cityList' :key='e' @click='ctClick(i)'>
                            <span>{{i.showName}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class='next' @click='nextClick'>下一步</div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {setLocal} from '@/utils/LocalStorageUtils.js';
import { getCookingListAPI,getSipleListAPI } from '@/api/my'
export default {
    data(){
        return{
            foodList:[
                {name:'',dosage:'10克',type:1}
            ],
            relishList:[
                {name:'',dosage:'10克',type:2}
            ],
            craft:[
                {type:3,name:''}
            ],
            territory:[
                {code:'',diyTypeId:''}
            ],
            jifaList:[],
            cityList:[],
            jifaShow:true,
            jifaName:'',
            cityShow:true,
            cityName:'',

        }
    },
    beforeCreate(){
      document.title = this.$route.meta
    },
    created(){
        this.getCookingList()
        this.getSipleList()
    },
    mounted(){
        document.body.style.backgroundColor = '#F5F2F5'
    },
    methods:{
        clearSoled(e){
            this.foodList.splice(e,1)
        },
        clearSoledTl(e){
            this.relishList.splice(e,1)
        },
        cityTopClick(){
            this.cityShow = false
        },
        cityBtmClick(){
            this.cityShow = true
        },
        ctClick(i){
            this.cityName = i.showName
            this.cityShow = true
            this.territory[0].code = i.code
            this.territory[0].diyTypeId = i.id
        },
        slillClick(i){
            this.jifaName = i
            this.jifaShow = true
            this.craft[0].name = i
        },
        jifaTopClick(){
            this.jifaShow = false
        },
        jifaBtmClick(){
            this.jifaShow = true
        },
        getSipleList(){
            getSipleListAPI().then(res=>{
                if( res.data.code == 0 ){
                    this.cityList = res.data.data
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        getCookingList(){
            getCookingListAPI().then(res=>{
                if( res.data.code == 0 ){
                    this.jifaList = res.data.data
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        changeInput(e){
            if( this.foodList[this.foodList.length-1].name ){
                this.foodList.push({dosage:'10克',type:1})
            }
        },
        changeInputRelish(e){
            if( this.relishList[this.relishList.length-1].name ){
                this.relishList.push({dosage:'10克',type:2})
            }
        },
        nextClick(){
            if( this.foodList[0].name == '' ){
                this.$toast('请依次填写食材！')
            }else if( this.relishList[0].name == '' ){
                this.$toast('请依次填写调味料！')
            }else if( this.craft[0].name == '' ){
                this.$toast('请选择技法！')
            }else if( this.territory[0].code == '' ){
                this.$toast('请选择地域！')
            }else{
                setLocal('menuIngredients',this.foodList.concat(this.relishList).concat(this.craft))
                setLocal('territoryList',this.territory)
                this.$router.push('/worksThree')
            }
        }
    }
}
</script>
<style lang='less' scoped>
    .worksTwo{
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .next{
            width:3.35rem;
            height:0.45rem;
            background:linear-gradient(90deg,rgba(228,34,34,1) 0%,rgba(187,6,6,1) 100%);
            box-shadow:0px 1px 18px 0px rgba(186,159,116,0.5);
            border-radius:0.225rem;
            text-align: center;
            line-height:0.45rem;
            color:#fff;
            font-size:0.15rem;
            position:fixed;
            bottom:0.15rem;
            left:0.2rem;
        }
        .jifa{
            width:100%;
            height:auto;
            background:#F9F9F9;
            .jifaBox{
                width:3.35rem;
                height:0.5rem;
                margin:auto;
                background:#F9F9F9;
                line-height:0.5rem;
                position:relative;
                div{
                    float:left;
                    font-size:0.14rem;
                    color:#333;
                }
                img{
                    width:0.2rem;
                    height:0.2rem;
                    float:right;
                    margin-top:0.15rem;
                }
                .xiala{
                    width:3.65rem;
                    height:2rem;
                    background:url('../../../assets/img/list/fbjifa.png') no-repeat center;
                    background-size:3.65rem 2rem;
                    border-radius: 0.1rem;
                    position:absolute;
                    top:0.3rem;
                    left:-0.15rem;
                    z-index:999;
                    ul{
                        width:3.37rem;
                        height:1.7rem;
                        overflow-y:auto;
                        background:#fff;
                        margin:0.13rem auto 0 auto;
                        li{
                            display: block;
                            width:3.37rem;
                            height:0.45rem;
                            border-bottom:0.01rem solid #eee;
                            line-height:0.45rem;
                            text-align:left;
                        }
                    }
                }
            }
        }
        .food{
            width:100%;
            height:auto;
            margin-bottom:0.1rem;
            .shicai{
                width:100%;
                height:0.5rem;
                background:#fff;
                line-height: 0.5rem;
                img{
                    width:0.14rem;
                    height:0.14rem;
                    float:left;
                    margin:0.17rem 0.05rem 0 0.15rem;
                }
                h3{
                    font-size:0.15rem;
                    color:#333;
                    float:left;
                }
            }
            ul{
                width:100%;
                height:auto;
                background:#F9F9F9;
                li{
                    display:block;
                    width:100%;
                    height:0.48rem;
                    line-height:0.48rem;
                    p{
                        width:1.3rem;
                        height:0.48rem;
                        border:none;
                        background:#F9F9F9;
                        float:left;
                        input{
                            width:0.5rem;
                            height:0.48rem;
                        }
                    }
                    input{
                        width:1.3rem;
                        height:0.48rem;
                        border:none;
                        background:#F9F9F9;
                        float:left;
                        margin-left:0.19rem;
                    }
                    .soled{
                        width:0.01rem;
                        height:0.18rem;
                        background:#E4E4E4;
                        float:left;
                        margin:0.155rem 0.03rem 0 0.335rem;
                    }
                    .clear{
                        width:0.16rem;
                        height:0.16rem;
                        float:left;
                        background:#ccc;
                        border-radius: 50%;
                        text-align: center;
                        line-height:0.16rem;
                        font-size:0.16rem;
                        margin-top: 0.16rem;
                        margin-left: 0.23rem;
                        color:#efefef;
                    }
                }
            }
            ul::after{
                content:".";
                clear:both;
                display:block;
                height:0;
                overflow:hidden;
                visibility:hidden;
            }
        }
    }
</style>
