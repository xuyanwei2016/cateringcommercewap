<template>
  <div class="confirmOrderBox">
    <div class="confirmOrderCon">
      <div class="adressBox" @click="goAddressList">
        <ul>
          <li>
            <span>{{ addressObj.province }}  &nbsp;&nbsp;{{ addressObj.receiver }}</span>
            <span v-if="addressObj.isDefault === 1">默认</span>
          </li>
          <li>{{ addressObj.city }}  &nbsp;&nbsp;{{ addressObj.district }}{{ addressObj.detailed }}  &nbsp;&nbsp;{{ addressObj.mobile }}</li>
        </ul>
        <div class="rightIconCon">
          <img src="../../../static/img/rightIcon.png" alt="">
        </div>
      </div>

      <div class="orderList">
        <div class="top">
          <span>订单编号：DX12254872</span>
          <span>2019-12-03  13:40:28</span>
        </div>
        <ul>
          <li v-for="( item, key ) in getShopCarListData" :key="key">
            <span class="bookCon">
              <img v-if="item.cover" :src="`${domain}${requestPath.file}?fileName=${item.cover}&isOnLine=true`" alt="">
              <img v-else src="../../../static/img/bookpic.png" alt="">
              <em v-if="item.goodsType === '1'">电子书</em>
              <em v-if="item.goodsType === '2'">图书</em>
              <em v-else>课程</em>
            </span>
            <ol class="listOl">
              <li>
                <span>{{ showvalue( item.name, 23 ) }}</span>
              </li>
              <li>
                <span>×{{ item.num }}</span>
                <span>
                  <em>小计：￥{{ item.num * item.salePrice }}</em>
                </span>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
    <div class="confirmOrderbot">
      <div class="left">
        <span>共{{ totalGoodsNum }}件商品</span>
        <span>
          <em>合计:</em>
          <em>￥{{ totalPrice }}</em>
        </span>
      </div>
      <div class="right" @click="goChosePayType">提交订单</div>
    </div>
  </div>
</template>

<script>
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import Cookies from 'js-cookie';
import {
  getAddressListAPI,
  // getOrderListAPI,
  getExpresstAPI,
  getShopCarListAPI
} from '@/api/sy'
export default {
  name: 'confirmOrder',
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      itemTotalPrice: null,
      totalGoodsNum: null,
      totalPrice: null,
      getAddressListParams: {
        pageNum: 1,
        pageSize: 10,
      },
      getAddressListData: [],
      addressObj: {},
      getOrderListParams: {
        addressId: null,//
        buyType: '3',//购物车传3
        express: null,//邮费
        goodsList: [],//
        invoiceForm: {
          id: null,
          invoiceContext: null,
          invoiceTel: null,
          invoiceTitle: null,
          invoiceType: null,
          taxpayerIdentificationNumber: null
        },
        needInvoice: null,
        orderId: null,
        payType: null,
        remark: null,
        shoppingCartIds: [],//
        source: 1//          
      },
      getExpresstParams: {
        code: 'POSTAGE'
      },
      getShopCarListData: [],
    }
  },

  mounted () {
    this.getAddressList();
    this.getExpresst();
    this.getShopCarList();
    // this.getOrderList();
  },

  methods: {
    goAddressList () {
      this.$router.push({
        path: 'addressList'
      })
    },

    getAddressList () { 
      getAddressListAPI ( this.getAddressListParams )
      .then ( res => {
        console.log(res, '收获地址列表')
        if ( res.data.code === 0 ) {
          this.getAddressListData = res.data.data.list
          if ( this.$route.query._index ) {
            this.addressObj = res.data.data.list[this.$route.query._index]
            this.getOrderListParams.addressId = this.addressObj.id
          } else {
            this.getAddressListData.map( ( item, index ) => {
              if ( item.isDefault ) {
                this.addressObj = item
                this.getOrderListParams.addressId = this.addressObj.id
              } else {
                this.addressObj = this.getAddressListData[0]
                this.getOrderListParams.addressId = this.addressObj.id
              }
            })
          }
        }
      })
    },

    getExpresst () {
      getExpresstAPI ( this.getExpresstParams )
      .then ( res => {
        if ( res.data.code === 0 ) {
          this.getOrderListParams.express = res.data.data.value
        }
      })
    },

    getShopCarList () {
      if ( Cookies.get('Y-Token') !== 'null' ) {
        getShopCarListAPI ()
        .then ( res => {
          console.log(res, '购物车列表')
          if ( res.data.code === 0 ) {
            this.getShopCarListData = res.data.data || [];
            let itemNum = [];
            let itemPrice = []
            let objArr = [];
            this.getShopCarListData.map ( ( item, index ) => {
              this.getOrderListParams.shoppingCartIds.push( item.id )
              itemNum.push(item.num)
              itemPrice.push(item.num * item.salePrice)
              objArr.push ({
                goodsId: item.goodsId,
                goodsType: item.goodsType,
                num: item.num,
                salePrice: item.salePrice
              })
            } )
            this.getOrderListParams.goodsList = objArr;
            this.totalGoodsNum = eval(itemNum.join('+'))
            this.totalPrice = eval(itemPrice.join('+'))
          }
        })
      }
    },

    // getOrderList () {
    //   console.log(this.getOrderListParams, 'L:L::')
    //   getOrderListAPI ( this.getOrderListParams ) 
    //   .then ( res => {
    //     console.log( res, '确认订单里的列表' )
    //   })
    // },

    goChosePayType () {
      localStorage.setItem( 'creatOrderNeedInfo', JSON.stringify (this.getOrderListParams ) )
      this.$router.push({
        path: 'chosePayType'
      })
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
.confirmOrderBox {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.confirmOrderCon {
  flex: 1;
  width: 100%;
  padding: 0 .125rem;
  .adressBox {
    display: flex;
    align-items: center;
    width: 100%;
    background: #fff;
    padding: .175rem 0 .235rem .15rem;
    margin: .1rem 0;
    ul {
      flex: 1;
      li:nth-of-type(1) {
        span:nth-of-type(1) {
          color: #333333;
          font-size: .15rem;
          font-weight:bold;
        }
        span:nth-of-type(2) {
          color: #FFFFFF;
          font-size: .12rem;
          padding: .025rem .045rem;
          background: #BB0606;
          border-radius: 6px;
          margin-left: .19rem;
        }
      }
      li:nth-of-type(2) {
        color: #333333;
        font-size: .14rem;
        margin-top: .1rem;
        line-height: .22rem;
      }
    }
    .rightIconCon {
      width: .38rem;
      text-align: center;
      height: .5rem;
      line-height: .5rem;
      img {
        display: inline-block;
        width: .08rem;
        height: .14rem;
      }
    }
  }

  .orderList {
    flex: 1;
    width: 100%;
    background: #fff;
    border-radius: 5px;
    padding: .195rem .1rem .15rem;
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      line-height: 1;
      span:nth-of-type(1) {
        color: #888888;
        font-size: .12rem;
      }
      span:nth-of-type(2) {
        color: #CCCCCC;
        font-size: .12rem;
      }
    }
    ul {
      width: 100%;
      li {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: .15rem;
        &:last-child {
          .listOl {
            border: none;
          }
        }
        .bookCon {
          position: relative;
          width: .55rem;
          height: .755rem;
          margin-right: .15rem;
          border-radius: 5px;
          img {
            width: 100%;
            height: 100%;
          }
          em {
            position: absolute;
            height: .18rem;
            padding: 0 .04rem;
            background: url(../../../static/img/bookType.png) no-repeat;
            background-size: 100% 100%;
            left: 0;
            top: 0;
            color: #fff;
            font-size: .09rem;
          }
        }
        .listOl {
          flex: 1;
          position: relative;
          height: .905rem;
          border-bottom: 1px solid #EBEBEB;
          padding-top: .05rem;
          li:nth-of-type(1) {
            display: flex;
            justify-content: space-between;
            height: initial;
            margin-top: initial;
            padding-bottom: .15rem;
            position: relative;
            span {
              color: #333333;
              font-size: .15rem;
              width: 89%;
            }
            img {
              width: .13rem;
              height: .14rem;
              position: absolute;
              right: .15rem;
              top: .025rem;
            }
          }
          li:nth-of-type(2) {
            position: absolute;
            left: 0;
            bottom: -.1rem;
            display: flex;
            justify-content: space-between;
            height: initial;
            margin-top: initial;
            padding-bottom: .1rem;
            span:nth-of-type(1) {
              em {
                display: inline-block;
                height: .225rem;
                text-align: center;
                &:nth-of-type(1), &:nth-of-type(3) {
                  width: .27rem;
                  border: 1px solid #CCCCCC;
                  color: #CCCCCC;
                }
                &:nth-of-type(1) {
                  border-radius: 4px 0 0 4px;
                }
                &:nth-of-type(3) {
                  border-radius: 0 4px 4px 0;
                }
                &:nth-of-type(2) {
                  width: .4rem;
                  border-top: 1px solid #CCCCCC;
                  border-bottom: 1px solid #CCCCCC;
                  color: #666666;
                  font-size: .14rem;
                  vertical-align: top;
                  line-height: initial;
                }
              }
            }
            span:nth-of-type(2) {
              line-height: .225rem;
              float: right;
              margin-right: .15rem;
              em {
                color: #333333;
                font-size: .12rem;
              }
            }
          }
        }
      }
    }
  }
}

.confirmOrderbot {
  width: 100%;
  height: .5rem;
  display: flex;
  line-height: .5rem;
  background: #FFFFFF;
  padding-left: .175rem;
  .left {
    flex: 1;
    text-align: end;
    margin-right: .1rem;
    span:nth-of-type(1) {
      margin: 0 .02rem 0 .615rem;
      color: #999999;
      font-size: .1rem;
    }
    span:nth-of-type(2) {
      em:nth-of-type(1) {
        color: #333333;
        font-size: .14rem;
      }
      em:nth-of-type(2) {
        color: #F45137;
        font-size: .12rem;
      }
    }
  }
  .right {
    width: 1rem;
    background: #BB0606;
    color: #FFFFFF;
    font-size: .15rem;
    text-align: center;
  }
}
</style>