<template>
  <div class="cultureDetailBox">
    <div class="cultureDetailCon">
      <h2>{{ cultureDetailD.title }}</h2>
      <ul class="aboutDetail">
        <li>美食作家{{ cultureDetailD.author}}</li>
        <li>{{ createTime }}</li>
        <li>{{ cultureDetailD.traffic }}</li>
        <li>{{ cultureDetailD.num }}</li>
      </ul>
      <div id="mse"></div>
      <div class="detailText" v-html="detailText"></div>
    </div>
    <div class="tip">版权归作者所有，未经允许禁止转载</div>
  </div>
</template>

<script>
import Player from 'xgplayer';
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import {
  getCultureDetailAPI,
  getFilePathAPI,
  getVideoFirstImgAPI
} from '@/api/sy'
export default {
  name: 'cultureDetail',
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      cultureDetailD: {},
      detailText: null,
      createTime: null,
      videoPoster: null,
      viderSrc: null,
      player: null,
      getFilePathP: {
        fileName: null
      }
    }
  },

  mounted () {
    this.getCultureDetail();
  },

  methods: {
    getCultureDetail () {
      getCultureDetailAPI ( this.$route.query.oid )
      .then ( res => {
        console.log( res, '文化详情' )
        if ( res.data.code === 0 ) {
          this.cultureDetailD = res.data.data;
          this.detailText = res.data.data.text
          this.createTime = res.data.data.createTime.split(' ')[0]
          this.getFilePathP.fileName = res.data.data.video
          this.videoPoster = this.domain + this.requestPath.file + '?fileName=' + res.data.data.img + '&isOnLine=true';
          this.getFilePath();
          this.getVideoFirstImg()
        }
      })
    },

    getFilePath () {
      setTimeout ( () => {
        console.log(this.getFilePathP.fileName, '000')
        if ( this.getFilePathP.fileName ) {
          getFilePathAPI ( this.getFilePathP )
          .then ( res => {
            console.log(res, '1231231')
            if ( res.data.code === 0 ) {
              // let videoAndPath = res.data.data;
              // const num = videoAndPath.indexOf('.')
              // videoAndPath = videoAndPath.slice(0,num)+'/index.m3u8'
              // console.log(videoAndPath, 'wowowow')
              this.videoSrc = this.domain + '/file/' + res.data.data;
              console.log(this.videoSrc)
              this.player = new Player({
                id: 'mse',
                autoplay: false,
                volume: 0.3,
                url: this.videoSrc,
                poster: this.videoPoster,
                playsinline: true,
              });
            }
          })
        }
      }, 500)
    },

    getVideoFirstImg () {
      getVideoFirstImgAPI ( this.getFilePathP )
      .then ( res => {
        console.log(res, '视频第一帧')
        if ( res.data.code === 0 ) {
          let isNull = this.videoPoster.split('fileName=')[1].split('&')[0]
          if ( isNull == 'null' ) {
            this.videoPoster = this.domain + this.requestPath.file + '?fileName=' + res.data.data + '&isOnLine=true';
          }
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.cultureDetailBox {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cultureDetailCon {
  width: 100%;
  flex: 1;
  padding: 0 .15rem;
  padding-top: .335rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  h2 {
    color: #333333;
    font-size: .24rem;
    font-weight: bold;
    line-height: .3rem;
  }
  .aboutDetail {
    display: flex;
    color: #9B9B9B;
    font-size: .12rem;
    margin-top: .195rem;
    position: relative;
    li:nth-of-type(2) {
      margin: .025rem 0 0 .1rem; 
    }
    li:nth-of-type(3) {
      background: url(../../../static/img/view.png) no-repeat;
      background-size: .195rem .13rem;
      padding: .02rem 0 0 0.25rem;
      margin-right: .15rem;
      background-position: 0 .023rem;
      position: absolute;
      right: .3rem;
    }
    li:nth-of-type(4) {
      background: url(../../../static/img/like.png) no-repeat;
      background-size: .1505rem .14rem;
      padding: .02rem 0 0 0.25rem;
      background-position: 0 .01rem;
      position: absolute;
      right: 0;
    }
  }

  .detailText {
    width: 100%;
    color: #333333;
    font-size: .16rem;
    line-height: .27rem;
    margin-top: .34rem;
    overflow: hidden;
  }

  #mse {
    width: 100% !important;
    height: 2.305rem !important;
    margin-top: .34rem;
  }
}

.tip {
  width: 100%;
  height: .44rem;
  line-height: .44rem;
  color: #9B9B9B;
  font-size: .12rem;
  text-align: center;
  background: #F3F3F3;
}
</style>

<style lang="less">
.detailText {
  p {
    a {
      width: 100% !important;
      height: initial !important;
    }
  }
  img {
    width: 100%;
    margin: .1rem 0;
  }
}
</style>