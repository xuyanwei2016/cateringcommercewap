<template>
  <div class="chosePayTypeBox">
    <div class="top">
      <img src="../../../static/img/payTypeIcon.png" alt="">
      <p>下单后，请在24小时内完成支付，若未完成支付系统自动取消订单需重新下单购买。</p>
    </div>
    <div class="orderDetailCon"> 
      <ul>
        <li>
          <span>所付金额</span>
          <span v-if="orderDetail.orderPayment">￥{{ orderDetail.orderPayment }}</span>
        </li>
        <li>
          <span>订单号</span>
          <span v-if="orderDetail.code">{{ orderDetail.code }}</span>
        </li>
      </ul>
    </div>
    <div class="payTypeCon">
      <h2>常用支付方式</h2>
      <ul>
        <li>
          <dl>
            <dt>
              <img src="../../../static/img/zfb.png" alt="">
            </dt>
            <dd>
              <ol>
                <li>支付宝</li>
                <li>支付宝快捷支付</li>
              </ol>
            </dd>
          </dl>
          <div @click="aLiPay( 1 )">
            <img src="../../../static/img/noChecked.png" alt="">
          </div>
        </li>
        <li>
          <dl>
            <dt>
              <img src="../../../static/img/wx.png" alt="">
            </dt>
            <dd>
              <ol>
                <li>微信</li>
                <li>微信安全支付</li>
              </ol>
            </dd>
          </dl>
          <div>
            <img src="../../../static/img/noChecked.png" alt="">
          </div>
        </li>
      </ul>
    </div>

    <button class="payBtn" @click="goPay">立即支付</button>
  </div>
</template>

<script>
import {
  createOrderAPI,
  getOrderDetailAPI,
  payAPI
} from '@/api/sy'
export default {
  name: 'chosePayType',
  data () {
    return {
      orderId: null,
      payAPIP: {
        code: null,
        payType: null,
        source: 1
      },
      payUrl: null,
      orderDetail: null,
    }
  },

  mounted () {
    this.createOrder()
    this.getOrderDetail()
  },

  methods: {
    createOrder () {
      let createOrderP = JSON.parse(localStorage.getItem('creatOrderNeedInfo'))
      createOrderAPI ( createOrderP )
      .then ( res => {
        console.log( res, '生成订单的信息' )
        if ( res.data.code === 0 ) {
          this.orderId = res.data.data
          console.log(this.orderId, '222')
        }
      })
    },

    getOrderDetail () {
      setTimeout ( () => {
        console.log(this.orderId, 'OPOP')
        getOrderDetailAPI ( this.orderId )
        .then ( res => {
          console.log( res, '根据订单id查出的订单详情' )
          if ( res.data.code === 0 ) {
            this.payAPIP.code = res.data.data.code;
            this.orderDetail = res.data.data
          }
        })
      }, 1000)
    },

    aLiPay ( _index ) {
      if ( _index === 1 ) {
        this.payAPIP.payType = 0
        
        payAPI ( this.payAPIP ) 
        .then ( res => {
          console.log(res, 'iiiii')
          if ( res.data.code === 0 ) {
            this.payUrl = res.data.data.url
            // console.log(this.payUrl.split('<form')[1].split('</form>')[0])
            // this.payUrl = '<form' + this.payUrl.split('<form')[1].split('</form>')[0] + '</form>'
            console.log(this.payUrl, '::::::::::::::')
          }
        })
      }
    },

    goPay () {
      // const div = document.createElement('div')
      // /* 此处form就是后台返回接收到的数据 */
      // div.innerHTML = this.payUrl
      // document.body.appendChild(div)
      // document.forms[0].submit()

      let divForm = document.getElementsByTagName('divform')
      if (divForm.length) {
        document.body.removeChild(divForm[0])
      }
      const div=document.createElement('divform');
      div.innerHTML=this.payUrl; // data就是接口返回的form 表单字符串
      document.body.appendChild(div);
      document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
      document.forms[0].submit();
    }

  }
}
</script>

<style lang="less" scoped>
.chosePayTypeBox {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .top {
    width: 100%;
    height: .8rem;
    background: url(../../../static/img/payTypeBg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 .125rem;
    img {
      width: .375rem;
      height: .35rem;
    }
    p {
      color: #FFFFFF;
      font-size: .11rem;
      line-height: .17rem;
      margin: .05rem 0 0 .19rem;
    }
  }
  .orderDetailCon {
    background: #fff;
    width: 100%;
    height: .84rem;
    ul {
      width: 100%;
      height: 100%;
      padding: .2rem .125rem 0;
      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        span {
          font-size: .14rem;
          &:nth-of-type(1) {
            color: #888888
          }
          &:nth-of-type(2) {
            color: #333333;
          }
        }
        &:last-child {
          margin-top: .13rem;
        }
      }
    }
  }
  .payTypeCon {
    width: 100%;
    background: #fff;
    margin-top: .1rem;
    padding: .2rem .125rem .215rem;
    h2 {
      color: #333333;
      font-size: .14rem;
      margin-bottom: .2505rem;
    }
    ul {
      width: 100%;
      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:last-child {
          margin-top: .34rem;
        }
        dl {
          display: flex;
          align-items: center;
          dt {
            width: .3rem;
            height: .3rem;
            margin-right: .11rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          dd {
            ol {
              li {
                &:last-child {
                  margin-top: initial;
                  color: #999999;
                  font-size: .12rem
                }
                &:first-child {
                  color: #333333;
                  font-size: .15rem;
                }
              }
            }
          }
        }
        div {
          width: .2rem;
          height: .2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .payBtn {
    display: block;
    width: 3.35rem;
    height: .625rem;
    background: url(../../../static/img/payBtn.png) no-repeat;
    background-size: 100% 100%;
    color: #FFFFFF;
    font-size: .15rem;
    outline: none;
    border: none;
    margin: 1.77rem auto 0;
  }
}
</style>