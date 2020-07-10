<template>
  <div class="bookItemBox" @click="clickBookItem">
    <dl>
      <dt>
        <img v-if="item.cover" :src="`${domain}${requestPath.file}?fileName=${item.cover}&isOnLine=true`" alt="">
        <img v-else src="../../../static/img/bookpic.png" alt="">
        <span>{{ item.typeName }}</span>
      </dt>
      <dd>
        <h2>{{ showvalue(item.name, 16) }}</h2>
        <p v-html="showvalue( item.content, 35 )"></p>
        <!-- <p v-html="item.content"></p> -->
        <div v-if="item.realPrice !== '0.00' && item.realPrice != null">
          <span>￥{{ item.realPrice }}</span>
          <span>￥{{ item.price }}</span>
          <span v-if="item.realPrice !== item.price">{{ item.disCount }}折</span>
        </div>
        <div v-else style="color: #08B361; font-size: .14rem">免费</div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
export default {
  name: 'bookCom',
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
    clickBookItem () {
      this.$emit ('clickBookItem')
    },

    showvalue(value, _length){
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
  }
}
</script>

<style lang="less" scoped>
  .bookItemBox {
    width: 100%;
    dl {
      width: 100%;
      height: 1.065rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: .2rem;
      dt {
        width: .76rem;
        height: 100%;
        position: relative;
        img:nth-of-type(1) {
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          left: 0;
          top: 0;
          width: .4rem;
          height: .195rem;
          text-align: center;
          line-height: .2rem;
          background: url(../../../static/img/bookType.png) no-repeat;
          background-size: 100% 100%;
          color: #fff;
          font-size: .1rem;
        }
      }
      dd {
        flex: 1;
        margin-left: .12rem;
        height: 100%;
        position: relative;
        h2 {
          color: #333333;
          font-size: .15rem;
        }
        p {
          color: #666666;
          font-size: .13rem;
          line-height: .19rem;
          margin-top: .125rem;
        }
        div {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          span:nth-of-type(1) {
            color: #FC2845;
            font-size: .16rem;
          }
          span:nth-of-type(2) {
            color: #D4D2D2;
            font-size: .13rem;
            text-decoration: line-through;
            margin:0 .35rem 0 .05rem;
          }
          span:nth-of-type(3) {
            display: inline-block;
            color: #BB0606;
            font-size: .1rem;
            padding: 0 .08rem;
            height: .15rem;
            text-align: center;
            line-height: .15rem;
            background: rgba(187,6,6,.06);
            border-radius: 10px;
          }
        }
      }
    }
  }
</style>
