<template>
  <!--编辑资料-->
  <div class="edit">
    <div class='title'>
        <!-- <span class='titleLeft' @touchend='$router.go(-1)'><img src="../../assets/img/list/fhjtBlack.png" alt=""></span> -->
        <span class='titleCenter'>个人信息</span>
    </div>
    <ul class="cont">
      <li><h1>头像</h1>
        <input id="upload_file" type="file" accept='image/*' name="file" @change="fileChange($event)" style="display: none"/>
        <div  @click="fileClick()">
          <img :src="img?img:(imgId?imgLink(imgId):defoultHead)" alt="" class="big">
          <img src="../../assets/img/personal/iconleft.png" alt="" class="small"></div>
      </li>
      <li><h1>昵称</h1>
        <div @click="isShow=true,isType=2">{{info.nickName?info.nickName:info.account}}<img src="../../assets/img/personal/iconleft.png" alt="" class="small">
        </div>
      </li>
      <li><h1>性别</h1>
        <div @click="isShow=true,isType=3" style='width:1rem;'>{{isSEX==1?'男':isSEX==0?'女':''}}<img src="../../assets/img/personal/iconleft.png" alt="" class="small"></div>
      </li>
      <li><h1>重新认证</h1>
        <div >
          <span v-if='this.cookStatus=="0"' @click="$router.push({path:'/attestation'})">未认证</span>
          <span v-if='this.cookStatus=="1"'>审核中</span>
          <span v-if='this.cookStatus=="2"' @click="$router.push({path:'/attestation'})">已认证</span>
          <span v-if='this.cookStatus=="3"' @click="$router.push({path:'/attestation'})">审核未通过</span>          
          <img src="../../assets/img/personal/iconleft.png" alt="" class="small">
        </div>
      </li>
      <div class='saveBtn' @click='saveInfo'>保存</div>
    </ul>
    <div class="setCont" v-if="isShow" @click="isShow=false">
      <div class="setHead" v-if="isType==1" @click.stop="">
        <h1>拍照</h1>
        <h1>从相册选择</h1>
      </div>
      <div class="cancel" v-if="isType==1||isType==3" @click="isShow=false">取消</div>
      <!--设置昵称-->
      <div class="setName" v-if="isType==2||isType==4" @click.stop="">
        <h1>{{isType == 2 ? '输入昵称' : '输入姓名'}}</h1>
        <input type="text" placeholder="请输入昵称不超过8个字符" v-model="nickName" v-if="isType==2" maxlength="8">
        <input type="text" placeholder="姓名不得超过10个字符" v-model="name" maxlength="10" v-else>
        <div class="button">
          <span @click="cancelName" class="button-close">取消</span>
          <span @click="saveName" class="button-confirm">确定</span>
        </div>
      </div>
      <!--设置性别-->
      <div class="setGender setHead" v-if="isType==3" @click.stop="">
        <h1 v-for="(iSex,indexS) in sex" :key="indexS" @click="isSEX=iSex.code,isShow=false">{{iSex.sex}}</h1>
      </div>
    </div>
    <div class='returnGo' @click='$router.go(-1)'></div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import listHeader from '../../components/listHeader.vue';
  import defoultHead from '../../assets/img/list/zgctx.png';
  import {getMemberAPI,saveInfoAPI,saveImgAPI} from '@/api/my.js';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        nickName:'',
        isSEX:2,
        sex:[{sex:'男',code:1},{sex:'女',code:0}],
        isShow: false,
        isType: 0,
        info:{
          img:null,
          account:null,
        },
        img:'',
        defoultHead:defoultHead,
        imgList:null,
        datas: new FormData(),
        files:0,
        size:0,
        imgId:null,
        saveImg:true,
        id:null,
        cookStatus:null,
      }
    },
    beforeCreate(){
        document.title = this.$route.meta
    },
    components: {

    },
    created() {
      this.getMember();
    },
    watch: {
      isShow(n,o){
        if(n){
          this.nickName='';
          this.name='';
        }else{
        }
      },
    },
    methods: {
      saveInfo(){
        if(!this.saveImg){
          return
        }
        let  data={
          account: this.info.account,
          nickName: this.info.nickName,
          sex: this.isSEX,
          id:this.id,
          img:this.imgId
        }
        saveInfoAPI(data).then(res=>{
          if(res.data.status){
            this.$valert.show('修改成功');
            this.$router.push('/my');
          }
        })
      },
      getMember() {
        getMemberAPI(this.$store.state.userId).then(res => {
          this.info = res.data.data;
          this.nickName=this.info.nickName;
          this.imgId=this.info.img;
          this.isSEX=this.info.sex;
          this.id = this.info.id
          this.cookStatus = this.info.cook
        })
      },
      //调用相册&相机
      fileClick() {
        // console.log(document.getElementById())
        $('#upload_file').click();
      },


      fileChange(el) {
        let self=this;
        if(el.target.files[0].type.indexOf('image'>=0)){
          let file = el.target.files[0]
          let formData = new FormData()
          formData.append('file',file)
          saveImgAPI(formData).then(res=>{
            if( res.status == '200' ){
              this.$toast('上传成功')
              this.imgId = res.data
            }else{
              this.$toast(res.data.msg)
            }
          })
        }else{
          this.$valert.show('请选择图片');
        }
      },

      fileList(fileList) {
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
          }
        }
      },


      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
              _this.folders(file[i]);
            }
          }
        })
      },
      fileAdd(file) {
        this.imgList=[];
        console.log(8,file)
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          file.src = 'wenjian.png';
          this.imgList.push({
            file
          });
        } else {
          let reader = new FileReader();
          reader.vue = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            this.vue.imgList.push({
              file
            });
          }
        }

        let formData = new FormData();
        formData.append("file", file);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.saveImg = false
        saveImgAPI(formData).then(res=>{
          console.log('上传图片成功',res.data)
          this.imgId=res.data;
          this.saveImg = true
          /*if(res.data.status){
            console.log('上传图片成功',res.data)
          }*/
        })
      },
      bytesToSize(bytes) {
        console.log(10)
        if (bytes === 0){
          return '0 B';
        }
        let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      saveName(){
        console.log(this.isType,'ddddddddd')
        if(this.isType==2){
          /*验证昵称 */
          // let regexp=/^[A-Za-z0-9]{2,8}$/;regexp.test(this.nickName)
          if(this.nickName.length>0&&this.nickName.length<10){
            this.isShow=false;
            this.$set(this.info,'nickName',this.nickName);
          }else{
            this.$valert.show('请输入8个以内的字符');
          }

        }else{
          if(this.name.length>0&&this.name.length<10){
            this.isShow=false;
            this.$set(this.info,'name',this.name);
          }else{
            this.$valert.show('请输入10个以内的字符');
          }
        }
      },
      cancelName(){
        this.isShow=false;
        /*if(this.isType==2){
          this.nickName=this.info.nickName;
        }else{
          this.name=this.info.name;
        }*/
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.returnGo{
      width:0.57rem;
      height:0.305rem;
      background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
      background-size: 0.57rem 0.305rem;
      position:fixed;
      right:0;
      bottom:0.9rem;
  }
  .edit {
    width: 100%;
    height: 100%;
    background: #fff;
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
        z-index:999;
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
            // margin-left:-0.29rem;
            font-weight:bold;
            text-align:center;
        }
    }
    .cont {
      background: #fff;
      width: 100%;
      padding-top: 0.65rem;
      .uploatBtn{
        img{
          width:0.63rem;
          height:0.63rem;
          border-radius: 50%;
        }
      }
      li {
        padding: .15rem;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: .18rem;
        line-height: .18rem;
        h1 {
          font-size: .15rem;
          color: #202021;
          font-weight: normal;
          line-height: .18rem;
        }
        div {
          display: flex;
          justify-content: flex-end;
          align-content: center;
          align-items: center;
          color: #696969;
          font-size: .13rem;
          .big {
            width: .63rem;
            height: .63rem;
            border-radius: 50%;
          }
          .small {
            width: .16rem;
            height: .14rem;
            padding-left: .08rem;
          }
        }
      }
      .saveBtn{
        width:3.35rem;
        height:0.45rem;
        background:linear-gradient(90deg,rgba(228,34,34,1) 0%,rgba(187,6,6,1) 100%);
        box-shadow:0px 1px 18px 0px rgba(186,159,116,0.5);
        border-radius:0.225rem;
        margin:1.4rem auto 0 auto;
        text-align: center;
        line-height:0.45rem;
        color:#fff;
        font-size:0.16rem;
        letter-spacing: 0.02rem;
      }
    }

    /*设置*/
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
      .setHead {
        width: 3.51rem;
        height: 1.15rem;
        background: #fff;
        border-radius: .1rem;
        position: fixed;
        bottom: .75rem;
        text-align: center;
        h1 {
          font-size: .16rem;
          color: #222;
          font-weight: normal;
          line-height: .57rem;
          border-bottom: 1px solid #EBEBEB;
        }
        h1:last-child {
          border: none;
        }
      }
      .cancel {
        font-size: .16rem;
        color: #222;
        position: fixed;
        width: 3.51rem;
        height: .57rem;
        line-height: .57rem;
        background: #fff;
        border-radius: .1rem;
        bottom: .08rem;
        text-align: center;

      }

      /*设置昵称*/
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
