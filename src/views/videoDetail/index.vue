<template>
  <!--视频详情-->
    <div class="videoDetail">
      <myHeader></myHeader>
      <div class="video">
        <video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                       :options="playerOptions"
        ></video-player>
      </div>
      <div class="title lineCss">
        <h1>{{detail.name}}</h1>
        <div class="other">
          <h2>{{detail.learnTimes}}学习过</h2>
         <!-- <h3>08-03 11:49</h3>-->
          <h3>{{detail.uploadTime}}</h3>
        </div>
      </div>
      <div class="title lineCss">
        <h1 class="padding1">{{detail.name}}</h1>
        <div class="other other2">
          <h2>{{detail.learnTimes}}学习过</h2>
          <h4>购买</h4>
          <h5>已购买</h5>
        </div>
      </div>
      <div class="word">
        <p>{{detail.synopsis}}</p>
      </div>
    </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
  import {getVideoDetailAPI,changeCountAPI} from '../../api/xnew';
  import {uploadUrl} from '../../utils/global';
    export default {
        data() {
            return {
              uploadUrl:uploadUrl,
              detail:{},
              playerOptions: {
                height: '215',
                autoplay: false,
                muted: false,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                  type: "video/mp4",
                  // mp4
                  src: "",
                  // webm
                  // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                }],
                poster: "",//封面
              },
            }
        },
        components: {
          myHeader
        },
      created(){
          this.getDetail();

      },
        methods: {
        getDetail(){
          getVideoDetailAPI(this.$route.query.id).then((res)=>{
            this.detail=res.data.data;
            this.playerOptions.sources[0].src=`http://192.168.2.242:8501/file/file/?fileName=${this.detail.video}&isOnLine=true`;
            this.changeCount();
          })
        },
          changeCount(){
            changeCountAPI(this.$route.query.id).then(res=>{})
          },
        }
    }
</script>

<style scoped lang="less">
.videoDetail{
  .video{
    padding-top: .44rem;
  }
  .title{
    background: #fff;
    padding-bottom: .2rem;
    overflow: hidden;
    h1{
      line-height: .23rem;
      color: #333333;
      font-size: .16rem;
      padding: .18rem .15rem .22rem .15rem;
    }
    .padding1{padding-bottom: .09rem}
    .other{
      padding: 0 .15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2,h3{font-size: .13rem;color: #9C9D9C;font-weight: normal}
      h2:after{
        content: '';
        display: block;
        background: url("../../assets/img/detail/study.png") no-repeat;
        width: .11rem;
        height: .11rem;
        float: left;
        background-size: cover;
        margin-right: .02rem;
        margin-top: .03rem;
      }
      h4{
        width: .56rem;height: .25rem;
        line-height: .25rem;
        text-align: center;
      font-size: .13rem; color:#BA9F74;
      border: .01rem solid #BA9F74;
        border-radius: .03rem}
      h5{
        width: .56rem;
        height:.25rem;
        line-height: .25rem;
        text-align: center;
        background: #F4F4F4;
        font-size: .13rem;
        color: #999999;
        font-weight: normal;
        border-radius: .03rem
      }
    }

  }
  .lineCss{
    border-bottom: .1rem solid #F3F3F3;
    width: 100%;
  }
  .word{
    p{
      padding: .22rem .15rem;
      font-size: .15rem;
       color: #565656;
      line-height: .26rem;
    }
  }


}
</style>
