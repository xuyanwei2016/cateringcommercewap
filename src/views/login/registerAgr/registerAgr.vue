<template>
    <div class='registerXY'>  
        <div class='text' v-html='this.text'></div>
        <div class='next' v-if='this.viewShow'>
            <div class='nextLeft' @touchend='clickProtocol'>
                <img v-if='!this.showData' src="../../../assets/img/list/wgx.png" alt="">
                <img v-else src="../../../assets/img/list/ygx.png" alt="">
                <span>我同意遵守上述协议</span>
            </div>
            <div :class='showData ? "nextRightYes" : "nextRight"' @touchend='showData?nextClick():""'>下一步</div>
        </div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
import {getAgreementAPI} from '@/api/login/login'
export default {
    data(){
        return{
            text:'',
            showData:false,
            viewShow:false
        }
    },
    created(){
        this.getAgreementList()
        let type = this.$route.query.type
        if( type == 'view' ){
            this.viewShow = true
        }
    },
    methods:{
        prev(){
            this.$router.go(-1)
        },
        getAgreementList(){
            getAgreementAPI().then(res=>{
                this.text = res.data.data.value
            })
        },
        clickProtocol(){
            this.showData = !this.showData
        },
        nextClick(){
            this.$router.push({path:'/register'})
        }
    }
}
</script>
<style lang='less' scoped>
    .registerXY{
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .text{
            width:3.5rem;
            margin:0.1rem auto 0.6rem auto;
            font-size:0.14rem;
            letter-spacing:0.01rem;
            line-height:0.2rem;
            text-align: left;
        }
        .next{
            width:100%;
            height:0.49rem;
            background:rgba(255,255,255,1);
            box-shadow:0 0 0.6rem 0.01rem rgba(47,47,47,0.21);
            position:fixed;
            bottom:0;
            z-index:99;
            .nextLeft{
                width:1.5rem;
                height:0.49rem;
                line-height:0.49rem;
                float:left;
                img{
                    width:0.13rem;
                    height:0.13rem;
                    float:left;
                    margin:0.17rem 0.07rem 0 0.13rem;
                }
                span{
                    display:inline-block;
                    float:left;
                }
            }
            .nextRight{
                width:0.65rem;
                height:0.3rem;
                background:#ccc;
                float:right;
                border-radius: 0.05rem;
                text-align: center;
                line-height:0.3rem;
                color:#fff;
                margin:0.1rem 0.13rem;
            }
            .nextRightYes{
                width:0.65rem;
                height:0.3rem;
                background:#BB0606;
                float:right;
                border-radius: 0.05rem;
                text-align: center;
                line-height:0.3rem;
                color:#fff;
                margin:0.1rem 0.13rem;
            }
        }
    }
</style>
