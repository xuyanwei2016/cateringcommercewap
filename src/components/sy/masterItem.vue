<template>
  <li>
    <dl>
      <dt>
        <img src="../../static/img/master.png" alt="">
      </dt>
      <dd>
        <div>
          <span>111111111</span>
          <span>2222222</span>
        </div>
        <p>3333333333333</p>
      </dd>
    </dl>
  </li>
</template>

<script>
  export default {
    name: 'masterItem',
    data () {
      return {

      }
    }
  }
</script>

<style lang="less">
li {
  border-bottom: 1px solid #EBEBEB;
  margin-top: .15rem;
  &:first-child {
    margin-top: .29rem;
  }
  &:last-child {
    border: none;
  }
  dl {
    width: 100%;
    height: .85rem;
    display: flex;
    dt {
      width: .7rem;
      height: .7rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    dd {
      flex: 1;
      margin-left: .085rem;
      padding-top: .095rem;
      div {
        width: 100%;
        line-height: 1;
        span:nth-of-type(1) {
          color: #FA6005;
          font-size: .15rem;
          vertical-align: top;
        }
        span:nth-of-type(2) {
          display: inline-block;
          height: .15rem;
          margin: 0 auto;
          background: url(../../../static/img/titleBg.png) no-repeat;
          background-size: 100% 100%;
          line-height: .15rem;
          color: #FFFFFF;
          font-size: .1rem;
          text-align: center;
          padding: 0 0.09rem 0 0.07rem;
          margin-left: .045rem;
        }
      }
      p {
        color: #666666;
        font-size: .13rem;
        line-height: .195rem;
        margin-top: .095rem;
      }
    }
  }
}
</style>