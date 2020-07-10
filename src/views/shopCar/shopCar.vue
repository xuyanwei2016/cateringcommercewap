<template>
  <div class="shopCarBox">
    <div class="shopCarCon">
      <ul>
        <li v-for="( item, key ) in getShopCarListData" :key="key">
          <img @click="choseThis( item )" v-if="item.isItemSelected === 0" class="checkedIcon" src="../../../static/img/noChecked.png" alt="">
          <img @click="choseThis( item )" v-else class="checkedIcon" src="../../../static/img/checked.png" alt="">
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
              <img @click="deleteItem( item, key )" src="../../../static/img/deletePic.png" alt="">
            </li>
            <li>
              <span>
                <em @click="reduceFun( item, key )">-</em><em>{{ item.num }}</em><em @click="addFun( item, key )">+</em>
              </span>
              <span>
                <em v-if="subtotal">小计：￥{{ subtotal }}</em>
                <em v-else>小计：￥{{ item.salePrice * item.num }}</em>
              </span>
            </li>
            <li style="display:none">×1</li>
          </ol>
        </li>
      </ul>
    </div>
    <div class="shopCarFooter">
      <div class="left">
        <span>
          <img @click="checkedAll" v-if="!isCheckedAll" class="checkedIcon1" src="../../../static/img/noChecked.png" alt="">
          <img @click="checkedAll" v-else class="checkedIcon1" src="../../../static/img/checked.png" alt="">
          <em>全选</em>
        </span>
        <span>共{{ totalGoodsNum || 0 }}件商品</span>
        <span>
          <em>合计:</em>
          <em>￥{{ totalPrice || 0 }}</em>
        </span>
      </div>
      <div class="right" @click="goConfirmOrder">确认购买</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Cookies from 'js-cookie';
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import { Toast } from 'vant';
Vue.use(Toast);
import {
  getShopCarListAPI,
  upDataItemNumAPI,
  deleteShopCarItemAPI,
  updataCheckedStatusAPI,
  isSelectAllAPI
} from '@/api/sy'
export default {
  name: 'shopCar',
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      getShopCarListData: [],
      goodNum: 0,
      subtotal: null,
      upDataItemNumParams: {
        num: null,
        oid: null
      },
      deleteShopCarItemParams: [],
      updataCheckedStatusParams: {
        ids: [],
        operatingCode: null,//0是未选中，1是选中
      },
      isCheckedAll: true,
      totalGoodsNum: null,
      totalPrice: null
    }
  },

  mounted () {
    this.getShopCarList();
    this.isSelectAll()
  },

  methods: {
    choseThis ( item ) {
      this.updataCheckedStatusParams.ids = [];
      this.updataCheckedStatusParams.ids.push( item.id )
      if ( item.isItemSelected === 1 ) {
        item.isItemSelected = 0
        this.updataCheckedStatusParams.operatingCode = 0
        updataCheckedStatusAPI ( this.updataCheckedStatusParams )
        .then ( res => {
          this.getShopCarList()
          this.isCheckedAll = false;
          this.isSelectAll();
        })
      } else {
        item.isItemSelected = 1;
        this.updataCheckedStatusParams.operatingCode = 1;
        updataCheckedStatusAPI ( this.updataCheckedStatusParams )
        .then ( res => {
          this.getShopCarList()
          this.isSelectAll();
        })
      }
    },

    checkedAll () {
      if ( this.isCheckedAll === true ) {
        this.isCheckedAll = false;
        this.getShopCarListData.map ( ( item, index ) => {
          item.isItemSelected = 0;
          this.updataCheckedStatusParams.ids.push( item.id )
        } )


        this.updataCheckedStatusParams.operatingCode = 0
        updataCheckedStatusAPI ( this.updataCheckedStatusParams )
        .then ( res => {
          this.getShopCarList()
          //this.isSelectAll();
        })
      } else {
        this.isCheckedAll = true;
        this.getShopCarListData.map ( ( item, index ) => {
          item.isItemSelected = 1;
          this.updataCheckedStatusParams.ids.push( item.id )
        } )

        this.updataCheckedStatusParams.operatingCode = 1
        updataCheckedStatusAPI ( this.updataCheckedStatusParams )
        .then ( res => {
          this.getShopCarList()
          //this.isSelectAll();
        })
      }
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
            this.getShopCarListData.map ( ( item, index ) => {
              this.$set( item, 'isItemSelected', null)
              item.isItemSelected = item.isSelected
              if ( item.isSelected === 1) {
                itemNum.push(item.num)
                itemPrice.push(item.num * item.salePrice)
              }
            })
            this.totalGoodsNum = eval(itemNum.join('+'))
            this.totalPrice = eval(itemPrice.join('+'))
          }
        })
      }
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

    reduceFun ( item, index ) {
      this.upDataItemNumParams.oid = item.id
      this.upDataItemNumParams.num = item.num
      if ( item.num > 0 ) {
        this.upDataItemNumParams.num--
        item.num = this.upDataItemNumParams.num
        this.subtotal = item.num * item.salePrice
        upDataItemNumAPI ( this.upDataItemNumParams )
        .then ( res => {
          this.getShopCarList()
        }) 
      } else {
        Toast('购买商品数量不能为负数')
      }
    },

    addFun ( item, index ) {
      this.upDataItemNumParams.oid = item.id
      this.upDataItemNumParams.num = item.num
      this.upDataItemNumParams.num++;
      item.num = this.upDataItemNumParams.num
      this.subtotal = item.num * item.salePrice
      upDataItemNumAPI ( this.upDataItemNumParams )
      .then ( res => {
        this.getShopCarList()
      }) 
    },

    deleteItem ( item, index ) {
      this.deleteShopCarItemParams.push( item.id )
      this.getShopCarListData.splice( index, 1 )
      console.log(this.getShopCarListData, '123123')
      deleteShopCarItemAPI ( this.deleteShopCarItemParams )
      .then ( res => {
        if ( res.data.code === 0 ) {
          Toast('删除成功')
        }
      })
    },

    isSelectAll () {
      isSelectAllAPI () 
      .then ( res => {
        if ( res.data.code === 0 ) {
          this.isCheckedAll = res.data.data
        }
      })
    },

    goConfirmOrder () {
      this.$router.push({
        path: 'confirmOrder'
      })
    },
  }
}
</script>

<style lang="less" scoped>
.shopCarBox {
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.shopCarCon {
  flex: 1;
  width: calc(100% - .25rem);
  background: #fff;
  margin: .1rem auto .13rem;
  border-radius: 5px;
  ul {
    width: 100%;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: .15rem;
      margin-top: .15rem;
      .checkedIcon {
        width: .2rem;
        height: .2rem;
      }
      .bookCon {
        position: relative;
        width: .55rem;
        height: .755rem;
        margin: 0 .15rem;
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
          padding-bottom: .15rem;
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

.shopCarFooter {
  width: 100%;
  height: .5rem;
  display: flex;
  line-height: .5rem;
  background: #FFFFFF;
  padding-left: .175rem;
  .left {
    flex: 1;
    span:nth-of-type(1) {
      img {
        display: inline-block;
        width: .2rem;
        height: .2rem;
      }
      em {
        color: #333333;
        font-size: .14rem;
        vertical-align: bottom;
      }
    }
    span:nth-of-type(2) {
      margin: 0 .02rem 0 .615rem;
      color: #999999;
      font-size: .1rem;
    }
    span:nth-of-type(3) {
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