<template>
  <div class="commentItemBox">
    <dl>
      <dt>
        <img v-if='item.userImg' :src="`${domain}${requestPath.file}?fileName=${item.userImg}&isOnLine=true`" alt="">
        <img v-else src="../../assets/img/list/zgctx.png" alt="">
      </dt>
      <dd>
        <h2>{{ item.userName }}</h2>
        <p>{{ item.content }}</p>
        <span>{{ item.releaseTime }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
export default {
  name: 'commentCom',
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
    
  }
}
</script>

<style lang="less" scoped>
  .commentItemBox {
    width: 3.44rem;
    border-bottom: 1px #EEEEEE solid;
    padding-bottom: .155rem;
    margin: 0.195rem auto 0 auto;
    dl {
      width: 100%;
      display: flex;
      dt {
        width: .4rem;
        height: .4rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      dd {
        flex: 1;
        margin-left: .1rem;
        padding-top: .13rem;
        h2 {
          color: #333333;
          font-size: .16rem;
        }
        p {
          color: #454545;
          font-size: .13rem;
          line-height: .22rem;
          margin: .16rem 0;
        }
        span {
          color: #888888;
          font-size: .12rem;
        }
      }
    }
  }
</style>