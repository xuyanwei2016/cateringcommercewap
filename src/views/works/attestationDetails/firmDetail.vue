<template>
    <div class='userDetail'>
        <div class='title'>
            <h3>基本信息</h3>
            <div class='titleBox'>
                <div class='name'>
                    <div>
                        <span>*</span>
                        <p>真实姓名</p>
                    </div>
                    <input type="text" placeholder="请输入真实姓名 与证件保持一致" v-model='name'>
                </div>
            </div>
            <div class='titleBox'>
                <div class='name'>
                    <div>
                        <span>*</span>
                        <p>工作单位</p>
                    </div>
                    <input type="text" v-model='jobUnite'>
                </div>
            </div>
            <div class='titleBox'>
                <div class='name'>
                    <div>
                        <span>*</span>
                        <p>现任职位</p>
                    </div>
                    <input type="text" v-model='post'>
                </div>
            </div>
            <div class='titleBox'>
                <div class='name'>
                    <div>
                        <span>*</span>
                        <p>个人简介</p>
                    </div>
                    <input type="text" v-model='synopsis'>
                </div>
            </div>
        </div>
        <div class='title' v-for='(item,e) in rankList' :key='e' style='margin-top:0.1rem;'>
            <h3>认证资料</h3>
            <span class='deleteTitle' @click='deleteClick(e)'>X</span>
            <div class='titleBox'>
                <div class='name'>
                    <div>
                        <span><strong v-if='e==0'>*</strong></span>
                        <p>机构名称</p>
                    </div>
                    <input type="text" v-model='item.name'>
                </div>
            </div>
            <div class='titleBox'>
                <div class='name'>
                    <div>
                        <span><strong v-if='e==0'>*</strong></span>
                        <p>证件名称</p>
                    </div>
                    <input type="text"  v-model='item.certificateName '>
                </div>
            </div>
            <div class='titleBox' style='border-bottom:none'>
                <div class='name'>
                    <div>
                        <span><strong v-if='e==0'>*</strong></span>
                        <p>证件图片</p>
                    </div>
                    <p class='uploadImg'>上传证件图片</p>
                </div>
            </div>
            <div class='uploatBtn'>
                <van-uploader v-model="fileList[e]" deletable :max-count="1" :before-delete='deleteImg'  :after-read="file=>afterRead(file,e)" accept='image/*'/>
            </div>
        </div>
        <div class='add' @click='addClick'>
            <div class='addBox'>
                <img src="../../../assets/img/list/tjxyx.png" alt="">
                <h1>添加下一项</h1>
            </div>
        </div>
        <div class='saveBtn' @click='saveBtn'>提交</div>
        <div class='returnGo' @click='$router.go(-1)'></div>
        <!-- 认证提交成功弹框 -->
        <div class='popout' @click.stop='popout' v-if='isShowTi'>
            <div class='popoutBox'>
                <div>
                    <img src="../../../assets/img/list/xyshtg.png" alt="">
                </div>
                <h3>恭喜您,资料已提交成功！</h3>
                <p>请等候审核！</p>
            </div>
            <img src="../../../assets/img/list/yzgb.png" alt="" @click='isShowTiClick'>
        </div>
    </div>
</template>
<script>
import { approveSaveAPI,saveImgAPI } from '@/api/my.js'
export default {
    data(){
        return{
            rankList:[
                {name:'',certificateName :''},
            ],
            name:'',
            jobUnite:'',
            post:'',
            synopsis:'',
            fileList:[],
            isShowTi:false,
        }
    },
    beforeCreate(){
      document.title = this.$route.meta
    },
    mounted(){
        document.body.style.backgroundColor = '#F5F2F5'
    },
    created(){

    },
    methods:{
        isShowTiClick(){
            this.isShowTi=false
            this.$router.push({path:"/worksList"})
        },
        popout(){},
        deleteClick(e){
            this.rankList.splice(e,1)
        },
        deleteImg(file){
            return new Promise((resolve, reject) => {
                this.rankList[0].cover[0] = []
	            resolve();
	        })
        },
        afterRead(file,e) {
            this._picture(this,file.file,'fileList',e)
        },  
        _picture(that,file,key,e){
            let formData = new FormData();
            formData.append('file', file)
            saveImgAPI(formData).then(res=>{
                if( res.status == '200' ){
                    that.$toast('上传成功')
                    let array = []
                    array.push(res.data)
                    that.rankList[e].cover = array
                    
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
        saveBtn(){
            if( this.name == '' ){
                this.$toast('请填写真实姓名！')
            }else if( this.jobUnite == '' ){
                this.$toast('请填写工作单位！')
            }else if( this.post == '' ){
                this.$toast('请填写现任职位！')
            }else if( this.synopsis == '' ){
                this.$toast('请填写个人简介！')
            }else if( this.rankList.length <= 0 ){
                this.$toast('请点击“添加下一项”')
            }else if( !this.rankList[0].name ){
                this.$toast('请填写机构名称！')
            }else if( !this.rankList[0].certificateName ){
                this.$toast('请填写证件名称！')
            }else if( !this.rankList[0].cover ){
                this.$toast('请上传证件图片！')
            }else if( this.rankList[0].cover[0].length == 0 ){
                this.$toast('请上传证件图片！')
            }else{
                let data = {
                    realName:this.name,
                    workUnits:this.jobUnite,
                    position:this.post,
                    introduction:this.synopsis,
                    list:this.rankList,
                    type:1
                }
                approveSaveAPI(data).then(res=>{
                    if( res.data.code == 0 ){
                        this.isShowTi = true
                    }else{
                        this.$toast(res.data.msg)
                    }
                })
            }
        },
        addClick(){
            this.rankList.push({})
        }
    },
    
}
</script>
<style lang='less' scoped>
    .userDetail{
        .popout{
            width:100%;
            height:100%;
            position:fixed;
            top:0;
            left:0;
            background:rgba(0,0,0,0.7);
            z-index:99;
            .popoutBox{
                width:2.72rem;
                height:1.925rem;
                background:url('../../../assets/img/list/shtk.png') no-repeat bottom;
                background-size:2.72rem 1.925rem;
                border-radius:0.1rem;
                margin:1.97rem 0 0.31rem 0.545rem;
                div{
                    width:0.375rem;
                    height:0.375rem;
                    margin:auto;
                    padding-top:0.28rem;
                    img{
                        width:0.375rem;
                        height:0.375rem;
                    }
                }
                h3{
                    font-size:0.16rem;
                    color:#333;
                    text-align: center;
                    margin:0.6rem 0 0.1rem 0;
                }
                p{
                    font-size:0.14rem;
                    color:#666;
                    text-align: center;
                }
            }
            img{
                width:0.275rem;
                height:0.275rem;
                margin:auto;
            }
        }
        .returnGo{
            width:0.57rem;
            height:0.305rem;
            background:url('../../../assets/img/list/fanhuiRight.png') no-repeat right;
            background-size: 0.57rem 0.305rem;
            position:fixed;
            right:0;
            bottom:0.9rem;
        }
        .title{
            width:100%;
            background:#fff;
            position:relative;
            h3{
                font-size:0.15rem;
                color:#000;
                line-height:0.55rem;
                margin-left:0.23rem;
            }
            .deleteTitle{
                display:block;
                width:0.2rem;
                height:0.2rem;
                background:#efefef;
                color:#ccc;
                border-radius: 50%;
                text-align: center;
                line-height:0.2rem;
                position:absolute;
                right:0.2rem;
                top:0.165rem;
            }
            .titleBox{
                width:100%;
                height:0.52rem;
                border-bottom:0.01rem solid #EBEBEB;
                .name{
                    width:3.45rem;
                    height:0.52rem;
                    margin:auto;
                    line-height:0.52rem;
                    div{
                        width:0.8rem;
                        height:100%;
                        float:left;
                        span{
                            display:block;
                            width:0.06rem;
                            height:0.52rem;
                            float:left;
                            color:#F4901E;
                            margin-right:0.02rem;
                            font-size:0.2rem;
                            margin-top:0.01rem;
                            strong{
                                font-weight:normal;
                            }
                        }
                        p{
                            font-size:0.15rem;
                            color:#333;
                            float:left;
                        }
                    }
                    input,.uploadImg{
                        width:2.3rem;
                        height:0.51rem;
                        border:none;
                        float:right;
                        color:#333;
                        font-size:0.15rem;
                    }
                }
            }
            .uploatBtn{
                height:0.9rem;
                background:#fff;
                margin-left:1.3rem;
            }
        }
        .add{
            width:100%;
            height:0.525rem;
            background:#fff;
            line-height:0.525rem;
            margin-top:0.1rem;
            .addBox{
                width:3.45rem;
                height:100%;
                margin:auto;
                img{
                    width:0.29rem;
                    height:0.29rem;
                    float:left;
                    margin:0.12rem 0.1rem 0 0 ;
                }
                h1{
                    font-size:0.15rem;
                    color:#333;
                    float:left;
                }
            }
        }
        .saveBtn{
            width:3.35rem;
            height:0.45rem;
            background:linear-gradient(90deg,rgba(228,34,34,1) 0%,rgba(187,6,6,1) 100%);
            color:#fff;
            text-align: center;
            line-height:0.45rem;
            border-radius: 0.225rem;
            margin:0.43rem auto 0.24rem auto;
            font-size:0.15rem;
        }
    }
</style>

