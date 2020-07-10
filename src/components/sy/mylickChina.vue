<template>
  <div class="recommendListItem" @click="clickThisItem">
    <dl>
      <dt>
        <img class="bigPic" :src="`${domain}${requestPath.file}?fileName=${item.cover}&isOnLine=true`" alt="">
        <span>
          <em>浏览量：{{ item.traffic }}</em>
          <em>收藏：{{ item.collections }}</em>
        </span>
        <em class="isDbc" v-if="item.prominent === 1">代表菜</em>
      </dt>
      <dd class="bigD" :class="{ 'bigDStyle': !this.$route.query.oid }"> 
        <div class="bigDleft" :class="{ 'bigDleftStyle': this.$route.query.oid }">
          <span>{{ item.name }}</span>
          <em v-if="this.$route.query.oid && item.status === 3 || item.status === 2">审核中</em>
          <em v-if="this.$route.query.oid && item.status === 1" :class="{ 'emChecked': item.status === 1 }">已审核</em>
          <em v-if="this.$route.query.oid && item.status === 0 || item.status === 4">未通过</em>
        </div>
        <div class="bigDRight">
          <dl>
            <dt>
              <img v-if="item.img" :src="`${domain}${requestPath.file}?fileName=${item.img}&isOnLine=true`" alt="">
              <img v-else src="../../../static/img/moren.png" alt="">
            </dt>
            <dd>{{ item.author }}</dd>
          </dl>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
export default {
  name: 'todayRecommend',
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
    clickThisItem () {
      this.$emit('clickThisItem')
    }
  }
}
</script>

<style lang="less" scoped>
  .recommendListItem {
    width: 100%;
    margin-bottom: .21rem;
    dl {
      width: 100%;
      &:last-child {
        margin-bottom: 0;
      }
      dt {
        width: 100%;
        height: 1.45rem;
        position: relative;
        .bigPic {
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          width: 100%;
          height: .3rem;
          line-height: .3rem;
          left: 0;
          bottom: 0;
          background: url(../../../static/img/caiBg.png) no-repeat;
          background-size: 100% 100%;
          em {
            color: #FFFFFF;
            font-size: .13rem;
            &:nth-of-type(1) {
              margin-left: .15rem;
            }
            &:nth-of-type(2) {
              float: right;
              margin-right: .15rem;
            }
          }
        }
        .isDbc {
          position: absolute;
          top: 0;
          left: 0;
          width: .4rem;
          height: .19rem;
          text-align: center;
          line-height: .19rem;
          background: url(../../../static/img/dbcBg.png) no-repeat;
          background-size: 100% 100%;
          color: #000000;
          font-size: .1rem;
        }
      }
      .bigD {
        width: 100%;
        display: flex;
        position: relative;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow:0px 1px 10px rgba(204,204,204,0.7);
        padding: 0 .16rem;
        justify-content: space-between;
        padding-bottom: .15rem;
        .bigDleft {
          span {
            color: #17171B;
            font-size: .18rem;  
            font-weight: 500;
          }
          em {
            display: block;
            width: 0.54rem;
            height: .185rem;
            text-align: center;
            line-height: .195rem;
            color: #FFFFFF;
            background: url(../../../static/img/checkingBg.png) no-repeat;
            background-size: 100% 100%;
            margin-top: .105rem;
          }
          .emChecked {
            background: url(../../../static/img/checkedBg.png) no-repeat;
            background-size: 100% 100%;
          }
        }

        .bigDleftStyle {
          padding-top: .15rem;
          line-height: 1;
        }
        
        .bigDRight {
          width: 0.4rem;
          dl {
            width: 0.5rem;
            height: 100%;
            padding-top: .06rem;
            dt {
              width: .45rem;
              height: .45rem;
              margin: 0 auto;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            dd {
              width: 100%;
              height:0.15rem;
              text-align: center;
              color: #fff;
              margin-inline-start: 0;
              line-height: initial;
              color: #000000;
              font-size: .09rem;
              overflow:hidden;
            }
          }
        }
      }     
      .bigDStyle{
        line-height: .75rem;
        padding-bottom: initial;
      } 
    }
  }
</style>