<template>
    <div class='attestation'>
        <div class='box boxTop'>
            <div class='left'>
                <h3>个人认证</h3>
                <div>适用于企业、个体工商户单位社会团体，通过合法信息进行认证。</div>
            </div>
            <div class='right' @click='$router.push({path:"/protocol",query:{attestation:"user"}})'>
                <p>立即认证</p>
            </div>
        </div>
        <div class='box boxBottom'>
            <div class='left'>
                <h3>企业认证</h3>
                <div>适用于个人爱好者，用过个人身份进行认证大约需要1-2个工作日。</div>
            </div>
            <div class='right' @click='$router.push({path:"/protocol",query:{attestation:"firm"}})'>
                <p>立即认证</p>
            </div>
        </div>
        <div class='returnGo' @click='$router.go(-1)'></div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    beforeCreate(){
      document.title = this.$route.meta
    },
    created(){

    },
    methods:{

    }
}
</script>
<style lang='less' scoped>
    .attestation{
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .box{
            width:3.45rem;
            height:1.39rem;
            margin:auto;
            .left{
                width:1.615rem;
                height:0.8rem;
                float:left;
                margin:0.23rem 0 0 0.19rem;
                h3{
                    font-size:0.23rem;
                    color:#fff;
                    margin-bottom:0.1rem;
                }
                div{
                    font-size:0.13rem;
                    color:#fff;
                    line-height:0.19rem;
                    letter-spacing: 0.012rem;
                }
            }
            .right{
                width:0.98rem;
                height:0.32rem;
                float:right;
                margin:0.34rem 0.19rem 0 0;
                p{
                    width:0.96rem;
                    height:0.3rem;
                    border:0.01rem solid #fff;
                    border-radius: 0.05rem;
                    text-align: center;
                    line-height:0.3rem;
                    font-size:0.14rem;
                    color:#fff;
                }
            }
        }
        .boxTop{
            background:url('../../../assets/img/list/grrz.png') no-repeat center;
            background-size:3.45rem 1.39rem;
            margin-top:0.425rem;
        }
        .boxBottom{
            background:url('../../../assets/img/list/qyrz.png') no-repeat center;
            background-size:3.45rem 1.39rem;
            margin-top:0.19rem;
        }
    }
</style>
