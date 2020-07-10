<template>
  <div class='orderDetail'>
    <div class='topBg'>
      <img v-if='this.orderStatus == 2' src="../../assets/img/list/shibai.png" alt="">
      <img v-else src="../../assets/img/list/wancheng.png" alt="">
      <p v-if='this.orderStatus == 2'>未完成</p>
      <p v-else>已完成</p>
    </div>
    <div class='city'>
      <div class='cityBox'>
        <h3>{{list.city}}{{list.area}}  {{list.consigneeName}}</h3>
        <div>地址：{{list.address}}</div>
        <img src="../../assets/img/list/plright.png" alt="">
      </div>
    </div>
    <div class='centerLong'>
      <div class='book'>
        <div class='center' v-for='(k,j) in list.infoList' :key='j'>
          <div class='centerBox'>
            <div class='centerL'>
              <img v-if='k.cover' :src="imgLink(k.cover)" alt="">
              <img v-else  src="/static/img/bookpic.png" alt="">
              <span v-if='k.type=="1"'>电子书</span>
              <span v-if='k.type=="2"'>图书</span>
            </div>
            <div class='centerR'>
              <div class='centerBook'>
                <h4>{{k.name}}</h4>
              </div>
              <div class='part'>{{k.synopsis}}</div>
              <p>￥{{k.salePrice}}</p>
            </div>
          </div>
        </div>
        <div class='bottom'>
          <span>总金额:</span>
          <strong>￥{{list.payment}}</strong>
        </div>
      </div>
      <div class='orderForm'>
        <div class='orderFormBox'>
          <div>
            <span>物流单号：</span>
            <strong>{{list.courierNumber}}</strong>
          </div>
          <div>
            <span>订单编号：</span>
            <strong>{{list.code}}</strong>
          </div>
          <div>
            <span>下单时间：</span>
            <strong>{{list.createTime}}</strong>
          </div>
          <div>
            <span>支付方式：</span>
            <strong>{{list.payTypeZh}}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class='buttonBtm' v-if='this.orderStatus == 2'>
      <div class='goPay' >立即支付</div>
      <div class='cancel' @click='isAlert=true'>取消订单</div>
    </div>
    <div class="setCont" v-if="isAlert" @click="isAlert=false">
      <div class="setName" @click.stop="empt">
        <h2>确定取消订单吗？</h2>
        <div class="buttonLogin">
          <span @click="isAlert=false">取消</span>
          <span @click="sumbit">确定</span>
        </div>
      </div>
    </div>
    <div class='returnGo' @click='$router.go(-1)'></div>
  </div>
</template>

<script>
import { getOrderDetailAPI,deleteOrderAPI } from '@/api/my'
export default {
    data() {
        return {
          orderId:'',  
          orderStatus:null,
          list:"",
          isAlert:false,
        }
    },
    beforeCreate(){
      document.title = this.$route.meta
    },
    mounted(){
      document.body.style.backgroundColor = '#F3F3F3'
    },
    components:{},
    created() {
      this.orderId = this.$route.query.id
      this.orderStatus = this.$route.query.orderStatus
      this.getOrderDetail()
    },
    watch: {},
    methods: {
      sumbit(){
        deleteOrderAPI(this.orderId).then(res=>{
          if( res.data.code == 0 ){
            this.$toast('取消订单成功！')
            this.isAlert = false
            this.$router.push('/order')
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      empt(){},
      getOrderDetail(){
        getOrderDetailAPI(this.orderId).then(res=>{
          if( res.data.code == 0 ){
            this.list = res.data.data
          }else{
            this.$toast(res.data.msg)
          }
        })
      }
    },
}
</script>
<style scoped lang="less">
.orderDetail{
  .returnGo{
      width:0.57rem;
      height:0.305rem;
      background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
      background-size: 0.57rem 0.305rem;
      position:fixed;
      right:0;
      bottom:0.9rem;
  }
  .setCont {
      width: 100%;
      height: 100%;
      position: fixed;
      background: rgba(0, 0, 0, 0.6);
      padding-top: 1.7rem;
      top: 0;
      left: 0;
      z-index: 40;
      display: flex;
      justify-content: center;
      .setName {
        width: 2.7rem;
        height: 1.44rem;
        background: rgba(255, 255, 255, 1);
        border-radius: .1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        h1 {
          font-size: .18rem;
          color: #333333;
          padding-top: .22rem;
          height: .17rem;
          line-height: .17rem;
        }
        h2 {
          color:#666666;
          font-size: .16rem;
          font-weight: normal;
          padding-top: .4rem;
        }
        .buttonLogin {
          width: 100%;
          border-top: 1px solid #D9DADE;
          display: flex;
          justify-content: space-between;
          span {
            display: inline-block;
            width: 49.5%;
            line-height: .49rem;
            text-align: center;
            color: #333333;
            font-size: .18rem;
            border-right: 1px solid #D9DADE;
          }
          span:last-child {
            border: none;color: #BB0606;
          }
        }
      }
  }
  .topBg{
    width:100%;
    height:1rem;
    background:#BB0606;
    padding-top:0.15rem;
    img{
      width:0.18rem;
      height:0.18rem;
      margin:0 auto 0.05rem auto;
    }
    p{
      color:#FCFCFC;
      font-size:0.15rem;
      text-align: center;
    }
  }
  .buttonBtm{
    width:100%;
    height:0.5rem;
    position:fixed;
    bottom:0;
    left:0;
    background:#fff;
    div{
      width:0.8rem;
      height:0.3rem;
      float:right;
      font-size:0.13rem;
      border-radius: 0.25rem;
      text-align: center;
      line-height:0.3rem;
      margin-top:0.1rem;
    }
    .cancel{
      border:0.01rem solid #E4E4E4;
    }
    .goPay{
      border:0.01rem solid #BB0606;
      color:#BB0606;
      margin: 0.1rem;
    }
  }
  .orderForm{
    width:100%;
    height:1.2rem;
    background:#fff;
    margin-top:0.1rem ;
    padding-top:0.19rem;
    .orderFormBox{
      width:3.55rem;
      margin:auto;
      div{
        width:3.55rem;
        height:0.21rem;
        font-size:0.13rem;
        line-height:0.2rem;
        span{
          color:#888;
          display:block;
          float:left;
        }
        strong{
          display:inline-block;
          width:2.7rem;
          height:0.2rem;
          float:left;
          font-weight:normal;
          color:#333;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-line-clamp:1;
          -webkit-box-orient:vertical;
        }
      }
    }
  }
  .centerLong{
    width:100%;
    height:4rem;
    overflow-y:auto;
  }
  .book{
    width:100%;
    height:auto;
    background:#fff;
    .center{
      width:100%;
      height:1.15rem;
      background:#fff;
      .centerBox{
        width:3.55rem;
        height:1.15rem;
        margin:auto;
        .centerL{
          width:0.55rem;
          height:0.755rem;
          float:left;
          margin-top:0.2rem;
          position:relative;
          img{
            width:0.55rem;
            height:0.755rem;
            border-radius: 0.045rem;
          }
          span{
            width:auto;
            height:0.13rem;
            padding:0 0.04rem;
            background:linear-gradient(90deg,rgba(255,125,26,1),rgba(255,47,41,1));
            line-height:0.13rem;
            color:#fff;
            font-size:0.09rem;
            border-top-left-radius: 0.045rem;
            border-bottom-right-radius: 0.045rem;   
            position:absolute;
            top:0;
            left:0;           
          }
        }
        .centerR{
          width:2.85rem;
          height:0.755rem;
          float:right;
          margin-top:0.2rem;
          .centerBook{
            width:100%;
            height:0.2rem;
            line-height:0.16rem;
            h4{
              font-size:0.15rem;
              width:2.5rem;
              height:0.16rem;
              float:left;
              overflow:hidden;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-line-clamp:1;
              -webkit-box-orient:vertical;
            }
          }
          .part{
            width:2.27rem;
            height:0.35rem;
            font-size:0.13rem;
            color:#666;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            line-height:0.19rem;
            margin-top:0.05rem;
          }
          p{
            font-size:0.125rem;
            color:#333;
            text-align: right;
          }
        }
      }
    }
    .bottom{
      width:100%;
      height:0.41rem;
      background:#fff;
      border-top:0.01rem solid #EBEBEB;
      line-height:0.41rem;
      text-align: right;
      span{
        font-size:0.14rem;
        color:#333;
      }
      strong{
        display:inline-block;
        font-size:0.16rem;
        color:#FC2845;
        margin-right:0.1rem;
      }
    }
  }
  .city{
    width:3.55rem;
    height:1.07rem;
    border-radius: 0.05rem;
    background:#fff;
    margin:-0.3rem auto 0.1rem auto;
    .cityBox{
      width:3.25rem;
      height:1.07rem;
      background:#fff;
      margin:auto;
      h3{
        width:100%;
        height:0.4rem;
        overflow:hidden;
        font-size:0.15rem;
        color:3333;
        line-height:0.45rem;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:1;
        -webkit-box-orient:vertical;
      }
      div{
        width:2.88rem;
        height:0.4rem;
        float:left;
        font-size:0.14rem;
        color:#666666;
        line-height:0.22rem;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
      }
      img{
        width:0.14rem;
        height:0.14rem;
        float:right;
        margin-top:0.05rem;
      }
    }
  }
}
</style>
