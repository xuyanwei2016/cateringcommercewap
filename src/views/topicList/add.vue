<template>
  <!--添加话题-->
  <div class="addTopic1">
    <myHeader></myHeader>
    <div class="cont1">
      <h1><i>*</i>标题</h1>
      <input type="text" v-model="title">
    </div>
    <div class="cont2">
      <h1>内容</h1>
      <textarea name="" id="" cols="30" rows="10" maxlength="500" v-model="cont" style="resize:none;"></textarea>
      <h2>{{cont.length}}/500</h2>
    </div>
    <div class="cont3">
      <h1>选择图片</h1>
      <ul class="image">
        <li v-for="(img,imgIndex) in image" :key="imgIndex"><img :src="imgLink(img)" alt=""><i class="el-icon-close del" @click="delImg(img)"></i></li>
        <li><input id="upload_file" type="file" accept='image/*' name="file" @change="fileChange($event)"/>
          <i class="el-icon-plus add"></i></li>
      </ul>
    </div>
    <div class="button" @click="addTopic">
      提交
    </div>
  </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
  import {addTopicAPI,saveImgAPI} from '../../api/xnew';

  export default {
    data() {
      return {
        title: '',
        cont: '',
        image: [],
      }
    },
    components: {myHeader},
    methods: {
      /*上传图片*/
      fileChange(e){
        console.log('上传图片',e.target.files[0].size)
        let file = e.target.files[0];
        let that = this;
        let isJPG = (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/bmp' || file.type == 'image/gif');
        if (!isJPG) {
          that.$valert.show('上传图片只能是 JPG/JPEG/PNG/GIF/BMP 格式!');
          return isJPG
        }
        if(e.target.files[0].size>10240){
          that.$valert.show('上传的图片不能超过10M!');
          return
        }
        if(this.image.length>=5){
          that.$valert.show('最多只能上传5张图片!');
          return
        }
        let formData = new FormData();
        formData.append('file', file);

        saveImgAPI(formData).then(res=>{
          if(res.data){
            this.image=[...this.image,res.data];
            that.$valert.show('上传图片成功');
          }else{
            that.$valert.show('图片上传失败')
          }
        })
      },
      delImg(id){
        var ids=this.image.filter((item)=>{
          return item != id;
        });
        this.image=ids;
      },
      addTopic(){
        addTopicAPI({
          content: this.cont,
          name: this.title,
          image:this.image[0],
          twoImage:this.image[1],
          threeImage:this.image[2],
          fourImage:this.image[3],
          fiveImage:this.image[4],
        }).then(res => {
        console.log('添加',res)
          if(res.data.status){
            this.$router.push('/topicList');
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .addTopic1 {
    width: 100%;
    height: 100%;
    background: #faf7fa;
    .cont1 {
      border-top: .1rem solid #faf7fa;
      padding: 0 .2rem 0 .12rem;
      height: .5rem;
      background: #fff;
      margin-top: .44rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1 {
        font-size: .15rem;
        color: #333333;
        font-weight: normal;
        i {
          color: #F48D0E;
          font-size: .12rem;
          padding-right: .03rem
        }

      }
      input {
        height: .24rem;
        line-height: .24rem;
        width: 2.9rem;
        border: none
      }
    }
    .cont2 {
      margin-top: .1rem;
      background: #fff;
      padding: 0 .2rem .14rem;
      position: relative;
      h1 {
        font-size: .15rem;
        color: #333333;
        font-weight: normal;
        padding-top: .18rem;
      }
      textarea {
        width: 100%;
        padding-top: .07rem;
        border: none;
      }
      h2 {
        font-size: .12rem;
        color: #C7C7C7;
        font-weight: normal;
        bottom: .1rem;
        right: .2rem;
        position: absolute;
      }
    }
    .cont3 {
      height: 1.3rem;
      margin-top: .1rem;
      background: #fff;
      padding: 0 .2rem .14rem;
      h1 {
        font-size: .15rem;
        color: #333333;
        font-weight: normal;
        padding-top: .18rem;
        height: .3rem;
      }
      .image {
        display: flex;
        justify-content: flex-start;

        li {
          width: .69rem;
          height: .69rem;
          margin-right: .1rem;
          position: relative;
          img {
            width: .69rem;
            height: .69rem;
          }
          .del {
            position: absolute;
            background: rgba(0, 0, 0, .4);
            width: .14rem;
            height: .14rem;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            right: 0;
            top: 0
          }
          .add {
            color: #CCCCCC;
            font-size: .3rem;
            border: .01rem #EBEBEB dashed;
            border-radius: .05rem;
            width: .69rem;
            height: .69rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          input{
            width: .71rem;
            height: .71rem;
            background: #ccc;
            opacity: 0;
            position: absolute;
            top:0;
            left: 0;
            z-index: 11;
          }
        }

      }
    }
    .button {
      width: 3.35rem;
      height: .45rem;
      line-height: .45rem;
      margin: 0 auto;
      background: #BA9F74;
      font-size: .17rem;
      color: #fff;
      text-align: center;
      font-weight: bold;
      border-radius: .22rem;
      margin-top: .45rem;
      box-shadow: 0rem 0rem .1rem rgba(186, 159, 116, 0.5);
    }

  }
</style>
