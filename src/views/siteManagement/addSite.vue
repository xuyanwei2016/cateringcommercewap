<template>
    <div class='addSite'>
        <div class='detail'>
            <div class='area'>
                <div class='areaBox'>
                    <div class='left'>
                        <span>*</span>
                        <p>所在地区</p>
                    </div>
                    <div class='right' @click='cityChecked'>
                        <x-address title="" v-model="value" :list="this.addressData" placeholder="请选择地址" :show.sync="showAddress" @on-shadow-change='changeAdd' ></x-address>
                    </div>
                </div>

            </div>
            <div class='street'>
                <div class='streetBox'>
                    <div class='left'>
                        <span>*</span>
                        <p>详细住址</p>
                    </div>
                    <div class='right'>
                        <textarea placeholder="请输入详细地址：如道路、门牌号、小区等" v-model='detailedText' ></textarea>
                    </div>
                </div>
            </div>
            <div class='area'>
                <div class='areaBox'>
                    <div class='left'>
                        <span>*</span>
                        <p>收货人</p>
                    </div>
                    <div class='right' @click='isShow=true,isType=1'>{{this.info.name}}</div>
                </div>
            </div>
            <div class='area'>
                <div class='areaBox'>
                    <div class='left'>
                        <span>*</span>
                        <p>手机号码</p>
                    </div>
                    <div class='right' @click='isShow=true,isType=2'>{{this.info.phone}}</div>
                </div>
            </div>
            <div class='area' style='border-bottom:none'>
                <div class='areaBox'>
                    <div class='left'>
                        <span></span>
                        <p>固定电话</p>
                    </div>
                    <div class='right' @click='isShow=true,isType=3'>{{this.info.number}}</div>
                </div>
            </div>
            <div class='emailTop'></div>
            <div class='area'>
                <div class='areaBox'>
                    <div class='left'>
                        <span></span>
                        <p>邮箱地址</p>
                    </div>
                    <div class='right' @click='isShow=true,isType=4'>{{this.info.email}}</div>
                </div>
            </div>
        </div>
        <p class='tips'>用来接收订单提醒邮件，便于您及时了解订单状态</p>
        <div class='subButton'>
            <div @click='saveBtn' class='save'>保存</div>
            <div @click='$router.go(-1)' class='cancel'>取消</div>
        </div>
        <div class="setCont" v-if="isShow" @click="isShow=false">
            <div class="setName" v-if="isType==1 ||isType==2||isType==3||isType==4" @click.stop="">
                <h1 v-if='isType==1'>请输入收货人姓名</h1>
                <h1 v-if='isType==2'>请输入手机号码</h1>
                <h1 v-if='isType==3'>请输入固定电话</h1>
                <h1 v-if='isType==4'>请输入邮箱地址</h1>
                <input type="text" v-model="name" v-if="isType==1" maxlength="15" placeholder="收货人字符不要超过15个字符" >
                <input type="text" v-model='phone' v-model.trim='phone' v-if="isType==2" placeholder="请输入手机号码">
                <input type="text" v-model="number" v-if="isType==3" placeholder="请输入固定电话号码">
                <input type="text" v-model="email" v-if="isType==4" placeholder="请输入邮箱">
                <div class="button">
                    <span @click="cancelName" class="button-close">取消</span>
                    <span @click="saveName" class="button-confirm">确定</span>
                </div>
            </div>
        </div>
        <router-view  v-wechat-title="$route.meta.title">新增地址</router-view>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import { XAddress, ChinaAddressV4Data } from 'vux'
import { getAreaTreeAPI,getShoppingDetailAPI,shoppingSaveAPI } from '@/api/my'
export default {
    data(){
        return{
            isType:0,
            isShow:false,
            info:{},
            name:'',
            detailedText:'',
            phone:'',
            number:'',
            email:'',
            value:[],
            addressData:[],
            showAddress:false,
            dataDetail:[],
            listQuery:{
                province:'',
                city:'',
                district:''
            },
            siteCode:''
        }
    },
    mounted(){
        document.body.style.backgroundColor = '#F5F2F5'
    },
    watch:{
        isShow(n,o){
            if(n){
                this.name = ''
                this.phone = ''
                this.number = ''
                this.email = ''
            }
        }
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    created(){
        this.getAreaTreeList()
        let type = this.$route.query.id
        if( type ){
            this.getShoppingDetail()
        }
    },
    methods:{
        saveBtn(){
            if( this.value.length == 0 ){
                this.$toast('请选择所在地区！')
            }else if( this.detailedText == '' ){
                this.$toast('请填写详细住址！')
            }else if( this.info.name == '' ){
                this.$toast('请填写收货人！')
            }else if( this.info.phone == '' ){
                this.$toast('请填写手机号码！')
            }else{
                let data = {
                    province:this.listQuery.province,
                    city:this.listQuery.city,
                    district:this.listQuery.district,
                    detailed:this.detailedText,
                    mobile:this.info.phone,
                    phone:this.info.number,
                    receiver:this.info.name,
                    email:this.info.email,
                    addressCode:this.siteCode
                }
                shoppingSaveAPI(data).then(res=>{
                    if( res.data.code == 0 ){
                        this.$toast('新增地址成功')
                        this.$router.go(-1)
                    }else{
                        this.$toast(res.data.msg)
                    }
                })
            }
        },
        getShoppingDetail(){
            let data = this.$route.query.id
            getShoppingDetailAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    this.dataDetail = res.data.data
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        getAreaTreeList(){//省市区
            getAreaTreeAPI().then(res=>{
              console.log(11111,res.data.data)
                if( res.data.code == 0 ){
                    this.addressData = res.data.data
                }else{
                    this.$toast(res.data.msg)
                }
            })
        },
        cityChecked(){

        },
        changeAdd(i,n){
          console.log(22222,i,n)
            n.forEach(el => {
                this.listQuery.province = n[0]
                this.listQuery.city = n[1]
                this.listQuery.district = n[2]
            })
            this.siteCode = i.join(',')
        },
        cancelName(){
            this.isShow = false
        },
        saveName(){
            if( this.isType == 1 ){
                if( this.name.length > 0 && this.name.length < 16  ){
                    this.$set(this.info,'name',this.name)
                    this.isShow = false
                }else{
                    this.$toast('请输入15个以内的字符')
                }
            }else if( this.isType == 2 ){
                if( !(/^1[3456789]\d{9}$/).test(this.phone) ){
                    this.$toast('请输入正确格式的手机号')
                }else{
                    this.$set(this.info,'phone',this.phone)
                    this.isShow = false
                }
            }else if( this.isType == 3 ){
                if( !(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/).test(this.number) ){
                    this.$toast('请输入正确格式的电话号码')
                }else{
                    this.$set(this.info,'number',this.number)
                    this.isShow = false
                }
            }else if( this.isType == 4 ){
                if( !(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/).test(this.email) ){
                    this.$toast('请输入正确格式的邮箱')
                }else{
                    this.$set(this.info,'email',this.email)
                    this.isShow = false
                }
            }
        }
    }
}
</script>
<style lang='less' scoped>

    .addSite{
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .title{
            width:100%;
            height:0.44rem;
            background-size:100%;
            color:#fff;
            font-size:0.18rem;
            line-height:0.44rem;
            text-align:center;
            position: fixed;
            top:0;
            z-index:999;
            background:#BB0606;
            .titleLeft{
                height:100%;
                display:inline-block;
                float:left;
                margin-left:0.12rem;
                font-size:0.35rem;
                img{
                    width:0.2rem;
                    height:0.2rem;
                    margin-top:0.11rem;
                }
            }
            .titleCenter{
                margin-left:-0.29rem;
                font-weight:bold;
            }
        }
        .detail{
            width:100%;
            height:3.87rem;
            background:#fff;
            .area{
                width:100%;
                height:0.53rem;
                border-bottom:0.01rem solid #EBEBEB;
                .areaBox{
                    width:3.45rem;
                    height:0.52rem;
                    line-height:0.52rem;
                    margin:auto;
                    .left{
                        width:0.7rem;
                        height:0.52rem;
                        float:left;
                        span{
                            display:block;
                            width:0.1rem;
                            height:0.52rem;
                            color:#F48D0E;
                            float:left;
                            font-size:0.12rem;
                        }
                        p{
                            width:0.6rem;
                            float:left;
                            color:#333;
                            font-size:0.15rem;
                        }
                    }
                    .right{
                        width:2.5rem;
                        height:0.53rem;
                        float:right;
                        background:url('../../assets/img/list/plright.png') no-repeat right center;
                        background-size:0.16rem 0.16rem;
                        text-align: right;
                        padding-right:0.2rem;
                        line-height:0.54rem;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-line-clamp:1;
                        -webkit-box-orient:vertical;
                    }
                }
            }
            .area:last-child{
                border-bottom:none;
            }
            .emailTop{
                width:100%;
                height:0.1rem;
                background:#F5F2F5;
            }
            .street{
                width:100%;
                height:1.06rem;
                border-bottom:0.01rem solid #EBEBEB;
                .streetBox{
                    width:3.45rem;
                    height:1.06rem;
                    margin:auto;
                    .left{
                        width:0.7rem;
                        height:0.52rem;
                        float:left;
                        line-height:0.52rem;
                        span{
                            display:block;
                            width:0.1rem;
                            height:0.52rem;
                            color:#F48D0E;
                            float:left;
                            font-size:0.12rem;
                        }
                        p{
                            width:0.6rem;
                            float:left;
                            color:#333;
                            font-size:0.15rem;
                        }
                    }
                    .right{
                        width:2.5rem;
                        height:0.7rem;
                        float:right;
                        background:#ccc;
                        margin-top:0.16rem;
                        textarea{
                            width:2.5rem;
                            height:0.7rem;
                            border:none;
                            resize:none;
                            font-size:0.15rem;
                        }
                        textarea::-webkit-input-placeholder {
                            color: #C7C7C7;
                        }
                        textarea::-o-input-placeholder {
                            color: #C7C7C7;
                        }
                        textarea::-moz-input-placeholder {
                            color: #C7C7C7;
                        }
                        textarea::-ms-input-placeholder {
                            color: #C7C7C7;
                        }
                    }
                }
            }
        }
        .tips{
            font-size:0.1rem;
            color:#9A9A9A;
            line-height:0.5rem;
            margin-left:0.15rem;
        }
        .subButton{
            width:2.95rem;
            height:0.4rem;
            margin:0.6rem auto 0 auto;
            font-size:0.16rem;
            .save{
                width:1.4rem;
                height:0.4rem;
                background:#B90708;
                border-radius: 0.02rem;
                color:#fff;
                line-height:0.4rem;
                text-align:center;
                float:left;
            }
            .cancel{
                width:1.4rem;
                height:0.4rem;
                background:#fff;
                border-radius: 0.02rem;
                color:#000;
                line-height:0.4rem;
                text-align:center;
                float:right;
            }
        }
        .setCont {
            width: 100%;
            height: 100%;
            position: fixed;
            background: rgba(0, 0, 0, 0.3);
            padding-top: 1.7rem;
            top: 0;
            left: 0;
            z-index: 12;
            display: flex;
            justify-content: center;
            .setName {
                width: 2.7rem;
                height: 1.62rem;
                background: rgba(255, 255, 255, .9);
                border-radius: .1rem;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                h1 {
                    font-size: .18rem;
                    color: #333333;
                    padding-top: .22rem;
                    height: .17rem;
                    line-height: .17rem;
                }
                input {
                    width: 2.3rem;
                    height: .33rem;
                    line-height: .33rem;
                    border: 1px solid #CCCCCC;
                    padding-left: .07rem;
                    font-size: .12rem;
                    margin-top: .05rem;
                }
                input::-webkit-input-placeholder {
                    color: #C7C7CC;
                }
                input::-o-input-placeholder {
                    color: #C7C7CC;
                }
                input::-moz-input-placeholder {
                    color: #C7C7CC;
                }
                input::-ms-input-placeholder {
                    color: #C7C7CC;
                }
                .button {
                    width: 100%;
                    border-top: 1px solid #D9DADE;
                    display: flex;
                    justify-content: space-between;
                    span {
                        display: inline-block;
                        width: 49.5%;
                        line-height: .44rem;
                        text-align: center;
                        // color: #0650B4;
                        font-size: .18rem;
                        border-right: 1px solid #D9DADE;
                    }
                    span:last-child {
                        border: none;
                    }
                    .button-close{
                        color: #333;
                    }
                    .button-confirm{
                        color: #E42222;
                    }
                }
            }
        }
    }
</style>
