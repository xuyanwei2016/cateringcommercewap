<template>
  <div @click="clickThisItem" class="cultureComBox" :class="{'borderNone': item.articleType === 1}">
    <dl class="dlOne" v-if="item.articleType === 0">
      <dd>
        <h2>{{ showvalue( item.title, 26 ) }}</h2>
        <div>
          <span>热门</span>
          <span>美食作家{{ item.author }}</span>
          <span>{{ item.num }}人喜欢</span>
        </div>
      </dd>
      <dt>
        <img v-if="item.img" :src="`${domain}${requestPath.file}?fileName=${item.img}&isOnLine=true`" alt="">
        <img v-else src="../../../static/img/cultureMoren.png" alt="">
      </dt>
    </dl>

    <dl class="dlTwo" v-else>
      <dt>
        <img v-if="item.img" :src="`${domain}${requestPath.file}?fileName=${item.img}&isOnLine=true`" alt="">
        <img v-else src="../../../static/img/cultureMoren.png" alt="">
        <img src="../../../static/img/play.png" alt="">
        <ul>
          <li>美食作家·{{ item.author }}</li>
          <li>{{ item.num }}人喜欢</li>
        </ul>
      </dt>
      <dd>{{ item.title }}</dd>
    </dl>
  </div>
</template>

<script>
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
export default {
  name: 'cultureView',
  props: [
    'item'
  ],
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
    }
  },

  methods: {
    showvalue (value, _length){
      if ( value ) {
        var str=value.replace(/<[^>]+>/g, ""); 
        var neirong=str.replace("&nbsp;","");
        var wenben=neirong.replace( /^\s*/, '');
        if(wenben.length > _length){
            return wenben.substr(0, _length) + "...";
        }else{
            return wenben;
        }
      }
    },

    clickThisItem () {
      this.$emit('clickThisItem')
    }
  }
}
</script>

<style lang="less" scoped>
  .cultureComBox {
    width: 100%;
    border-bottom: 1px solid #EBEBEB;
    margin-top: .15rem;
    &:last-child {
      border: none;
    }
    .dlOne {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #EBEBEB;
      padding-bottom: .185rem;
      margin-top: .165rem;
      &:last-child {
        border: none;
      }
      dd {
        position: relative;
        line-height: 1;
        flex: 1;
        margin-right: .1rem;
        h2 {
          color: #333333;
          font-size: .15rem;
          line-height: .225rem;
        }
        div {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          span {
            font-size: .11rem;
            &:nth-of-type(1) {
              display: inline-block;
              color: #fff;
              width: .3rem;
              height: .15rem;
              background: #BB0606;
              text-align: center;
              line-height: .17rem;
              border-radius: 5px;
            }
            &:nth-of-type(2) {
              color: #999999;
              margin-left: .09rem;
            }
            &:nth-of-type(3) {
              color: #999999;
              float: right;
            }
          }
        } 
      }
      dt {
        width: 1.19rem;
        height: .89rem;
        img {
          width: 100%;
          height: 100%;;
        }
      }
    }
    
    .dlTwo {
      width: 100%;
      dt {
        width: 100%;
        height: 1.45rem;
        position: relative;
        img:nth-of-type(1) {
          width: 100%;
          height: 100%;
        }
        img:nth-of-type(2) {
          width: .5rem;
          height: .5rem;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
        ul {
          width: 100%;
          height: .3rem;
          background: url(../../../static/img/caiBg.png) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          color: #FFFFFF;
          font-size: .13rem;
          line-height: .3rem;
          padding: 0 .15rem;
          justify-content: space-between;
        }
      }
      dd {
        width: 100%;
        height: .75rem;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow:0px 1px 10px rgba(204,204,204,0.7);
        color: #333333;
        font-size: .18rem;
        font-weight: bold;
        line-height: .27rem;
        padding: .1rem .15rem 0;
      }
    }
  }
  .borderNone {
    border: none;
  }
</style>