<template>
    <div class='publishOnline'>
        <div class='top'> 
            <div class='topLeft' @touchend='prev'>
                <img src="@/assets/img/jingdian/icon_fanhui_black.png" alt="">
            </div>
            <div class='topTitle'>在线出版</div>
            <div class='topAdd' @touchend='publishAdd'>+</div>
        </div>
        <div class='topBorder'></div>
        <div class='publishOn' v-for='(item,index) in dataList' :key='index'>
            <div class='title'>{{item.title}}</div>
            <div class='titleCen' :class="{'retract': item.stat}" :style="{'max-height':item.stat ? textHeight: ''}" ref='textContainer'>{{item.content}}</div>
            <div class='audit'>
                <div class='left'>
                    <span v-if='item.stat' @click="item.stat = false">查看更多</span>
                </div>
                <img src="@/assets/img/jingdian/shz.png" alt="" v-if='item.status == "0"'>
                <img src="@/assets/img/jingdian/shcg.png" alt="" v-if='item.status == "1"'>
                <img src="@/assets/img/jingdian/shsb.png" alt="" v-if='item.status == "2"'>
            </div>
        </div>
        <div class='dataShow' v-if='dataShow'>暂无数据...</div>
    </div>
</template>
<script>
import {getOnlinePublishAPI} from '@/api/login/login.js'
export default {
    data(){
        return{
            moreShow:false,
            dataList:[
                // {status:"0",title:'水电费',content:'打算发大水'},
                // {status:"2",title:'水电费',content:'打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水打算发大水'},
            ],
            textHeight: null,
            dataShow:false
        }
    },
    components:{
        
    },
    created(){
        this.getOnlinePublish()
    },
    mounted(){
        // 点击查看更多
        this.dataList.forEach((ele, index) => {
            this.$set(this.dataList, index, Object.assign({}, ele, { stat: null }))
        })
        this.$nextTick(() => {
            setTimeout(() => {
                this.calculateText()
            }, 900)
        })

        window.onresize = () => {
            this.dataList.forEach((ele, index) => {
                this.$set(this.dataList, index, Object.assign({}, ele, { stat: null }))
            })
            setTimeout(() => {
                this.calculateText()
            }, 900)
        }
    },
    methods:{
        getOnlinePublish(){
            this.dataShow = false
            getOnlinePublishAPI().then(res=>{
                if( res.data.code == 0 ){
                    if( res.data.data.length > 0 ){
                        this.dataList = res.data.data
                    }else{
                        this.dataShow = true
                    }
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        prev(){
            this.$router.go(-1)
        },
        publishAdd(){
            this.$router.push({path:'/publishOnlineAdd'})
        },
        // 计算文字 显示展开 收起
        calculateText() {
            let twoHeight = 44
            this.textHeight = twoHeight
            let txtDom = this.$refs.textContainer
            for (let i = 0; i < txtDom.length; i++) {
                let curHeight = txtDom[i].offsetHeight
                if (curHeight > twoHeight) {
                    this.$set(this.dataList, i, Object.assign({}, this.dataList[i], { stat: true }))
                } else {
                    this.$set(this.dataList, i, Object.assign({}, this.dataList[i], { stat: null }))
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .publishOnline{
        .top{
           height: 0.64rem;
           width:100%;
           background:#BA9F74;
           position:fixed;
           top:0;
           left:0;
           z-index:9;
           .topLeft{
               width:0.3rem;
               height:0.2rem;
               float:left;
               margin:0.24rem 1.05rem 0  0.155rem;
               img{
                    width:0.1rem;
                    height:0.17rem;
                }
           }
           .topTitle{
               font-size:0.18rem;
               color:#fff;
               font-weight:bold;
               letter-spacing: 0.03rem;
               float:left;
               margin-top:0.22rem;
           }
            .topAdd{
                width:0.22rem;
                height:0.22rem;
                border:0.02rem solid #fff;
                border-radius: 50%;
                float:right;
                margin:0.2rem 0.15rem 0 0;
                color:#fff;
                text-align: center;
                line-height:0.22rem;
                font-size:0.22rem;
            }
       }
        .topBorder{
            width:100%;
            height:0.1rem;
            background:#eee;
            margin-top:0.64rem;
        }
        .publishOn{
            width:3.51rem;
            height:auto;
            border-bottom:0.01rem solid #eee;
            margin:auto;
            .title{
                color:#202021;
                font-size:0.15rem;
                font-weight:bold;
                margin-top:0.2rem; 
            }
            .titleCen{
                color:#666;
                font-size:0.13rem;
                margin-top:0.05rem;
            }
            .retract {
                height:0.35rem;
                position: relative;
                overflow: hidden;
            }
            .retract:after {
                content: '......';
                position: absolute;
                bottom: 0;
                right: 0.01rem;
                width: 0.25rem;
                padding-left: 0.22rem;
                background: linear-gradient(to right, transparent, #fff 45%);
            }
            .audit{
                width:100%;
                height:0.555rem;
                margin:0.11rem 0;
                .left{
                    width:50%;
                    height:100%;
                    float:left;
                    span{
                        display:block;
                        width:0.51rem;
                        height:auto;
                        background:#eee;
                        color:rgba(186,159,116,1);
                        font-size:0.11rem;
                        text-align: center;
                        line-height:0.19rem;
                        border-radius:0.03rem;
                        margin-top:0.15rem;
                    }
                }
                img{
                    width:0.555rem;
                    height:0.555rem;
                    float:right;
                }
            }
        }
        .dataShow{
            text-align: center;
            margin-top:1.5rem;
            color:#D8D7D7;
            font-size:0.15rem;
        }
    }
</style>