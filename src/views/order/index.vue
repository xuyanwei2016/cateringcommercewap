<template>
  <div class="order">
    <ul class="changeTab">
      <li :class="isChange==index?'active':''" v-for="(item,index) in changes" :key="index" @click="changType(index)">{{item.name}}</li>
    </ul>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if='this.list.length > 0'>
      <!-- <div style='height:0.425rem;width:100%'></div> -->
      <div class="allBook" v-if='this.isChange == 0'>
          <van-list v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad">
            <ul class="list">
              <li v-for='(i,e) in list' :key='e' @click='nextDetail(i.id,1)'>
                <div class='top'>{{i.createTime}}</div>
                <div class='center'>
                  <div class='number'>
                    <p class='numberP1'>订单编号：{{i.code}}</p>
                    <p class='numberP2'>{{i.statusZh}}</p>
                  </div>
                  <div class='book' v-for='(k,j) in i.infoList' :key='j'>
                    <div class='bookBox'>
                      <div class='bookLeft'>
                        <img v-if='k.cover' :src="imgLink(k.cover)" alt="">
                        <img v-else  src="/static/img/bookpic.png" alt="">
                        <span v-if='k.type=="1"'>电子书</span>
                        <span v-if='k.type=="2"'>图书</span>                
                      </div>
                      <div class='bookRight'>
                        <div class='bookName'>{{k.name}}</div>
                        <div class='bookNum'>
                          <p>×{{k.num}}</p>
                          <span>小计：￥{{k.salePrice}}</span>
                        </div>
                        <div class='bookAgain' v-if='k.type=="2"'>再次购买</div>              
                      </div> 
                    </div>           
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
      </div>
      <div class="allBook"  v-if='this.isChange == 1'>
        <van-list v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad">
          <ul class="list">
            <li v-for='(h,g) in list' :key='g' @click='nextDetail(h.id,2)'>
              <div class='center' style='margin-top:0.1rem'>
                <div class='number'>
                  <p class='numberP1'>订单编号：{{h.code}}</p>
                  <p class='numberP2' style='color:#ccc;'>{{h.createTime}}</p>
                </div>
                <div>
                  <div class='book' v-for='(w,n) in h.infoList' :key='n'>
                    <div class='bookBox'>
                      <div class='bookLeft'>
                        <img v-if='w.cover' :src="imgLink(w.cover)" alt="">
                        <img v-else  src="/static/img/bookpic.png" alt="">
                        <span v-if='w.type=="1"'>电子书</span>
                        <span v-if='w.type=="2"'>图书</span>
                      </div>
                      <div class='bookRight'>
                        <div class='bookName'>{{w.name}}</div>
                        <div class='bookNum'>
                          <p>×{{w.num}}</p>
                          <span>小计：￥{{w.salePrice}}</span>
                        </div>          
                      </div> 
                    </div>           
                  </div>
                </div>
                <div class='buttonBtm'>
                  <div class='goPay'>立即支付</div>
                  <div class='cancel'>取消订单</div>
                </div>
              </div>
            </li>
          </ul>
        </van-list>
      </div>
    </van-pull-refresh>
    <div  class='noList' v-else>
      <img src="@/assets/img/backgroundno.png" alt="">
      <p>暂无数据</p>
    </div>
    <div class='returnGo' @click='$router.go(-1)'></div>
  </div>
</template>

<script>
  document.title = '我的订单'
  import noHave from '../../components/noHave.vue';
  import {getOrderListAPI} from '@/api/my.js';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        changes:[{name:'已完成订单',code:6},{name:'未支付订单',code:0}],
        isChange:0,
        list:[],
        loading: false,
        isLoading:false,
        finished: false,
        total:0,
        listQ:{
          pageNum:1,
          pageSize:10,
          status:1,
        },
      }
    },
    mounted(){
        document.body.style.backgroundColor = '#F5F2F5'
    },
    components: {noHave},
    created() {
      this.getOrderList();
    },
    watch: {},
    methods: {
      nextDetail(id,k){
        this.$router.push({path:'/orderDetail',query:{id:id,orderStatus:k}})
      },
      // 0未付款    1已完成
      changType(index){
        this.isChange = index
        this.loading = false;
        this.total = 0;
        this.list = [];
        if( index == 0 ){
          this.listQ.status = 1
          this.getOrderList()
        }else if( index == 1 ){
          this.listQ.status = 0
          this.getOrderList()
        }
        
      },
      getOrderList(){
        getOrderListAPI(this.listQ).then(res=>{
          if( res.data.code == 0 ){
            let rows = res.data.data.list 
            this.loading = false
            this.isLoading = false
            this.total = res.data.data.total
            if( rows == null || rows.length === 0 ){
              this.finished = true
              return
            }
            this.list = this.list.concat(rows)
            if( this.list.length >= this.total ){
              this.finished = true
            }
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      onLoad(){
        this.listQ.pageNum++
        this.getOrderList()
      },
      onRefresh(){
        this.finished = false
        this.loading = true
        this.listQ.pageNum = 1
        this.list = []
        this.getOrderList()
      },
    },
  }
</script>
<style scoped lang="less">
  .order {
    .noList{
      img{
        margin:1rem auto 0.2rem auto;
      }
      p{
        font-size:0.16rem;
        color:#ccc;
        text-align: center;
      }
    }
    .returnGo{
        width:0.57rem;
        height:0.305rem;
        background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
        background-size: 0.57rem 0.305rem;
        position:fixed;
        right:0;
        bottom:0.9rem;
    }
    .changeTab{
      width:100%;
      height:0.425rem;
      background:#fff;
      position:fixed;
      top:0;
      left:0;
      z-index:9;
      li{ 
        display:inline-block;
        width:0.75rem;
        height:0.425rem;
        float:left;
        line-height:0.425rem;
        margin:0 0.56rem;
        color:#666;
        font-size:0.14rem;
        text-align: center;
      }
      li:first-child:after{
        position: absolute;
        width: 1px;
        height: .19rem;
        background: #E5E5E5;
        content: '';
        margin-left: .55rem;
        margin-top: .1rem;
      }
      .active{
        color:#BB0606;
        font-weight:bold;
        font-size:0.14rem;
        border-bottom:0.02rem solid #BB0606;
      }
    }

    .list{
      li{
        width:100%;
        height:auto;
      }
      li:after{
        content:'.';
        clear: both;
        display:block;
        height:0;
        overflow:hidden;
        visibility:hidden;
      }
      .top{
        width:100%;
        height:0.385rem;
        line-height:0.47rem;
        text-align: center;
        color:#ccc;
        font-size:0.11rem;
      }
      .center{
        width:3.55rem;
        height:auto;
        margin:auto;
        background:#fff;
        border-radius: 0.1rem;
        .number{
          width:100%;
          height:0.47rem;
          line-height:0.63rem;
          .numberP1{
            width:2.5rem;
            height:0.47rem;
            float:left;
            margin-left:0.1rem;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:1;
            -webkit-box-orient:vertical;
            color:#888;
          }
          .numberP2{
            width:0.7rem;
            height:0.47rem;
            float:right;
            margin-right:0.1rem;
            overflow:hidden;
            text-align: right;
            color:#BB0606;
            font-size:0.11rem;
          }
        }
        .buttonBtm{
          width:100%;
          height:0.5rem;
          margin-top:0.15rem;
          div{
            width:0.8rem;
            height:0.3rem;
            float:right;
            font-size:0.13rem;
            border-radius: 0.25rem;
            text-align: center;
            line-height:0.3rem;
          }
          .cancel{
            border:0.01rem solid #E4E4E4;
          }
          .goPay{
            border:0.01rem solid #BB0606;
            color:#BB0606;
            margin:0 0.1rem;
          }
        }
        .book{
          width:100%;
          height:auto;
          background:#fff;
          padding:0.15rem 0 0 0;
          .bookBox{
            width:3.35rem;
            height:auto;
            margin:auto;
            .bookLeft{
              width:0.55rem;
              height:0.755rem;
              float:left;
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
            .bookRight{
              width:2.65rem;
              height:auto;
              float:right;
              border-bottom:0.01rem solid #EBEBEB;
              .bookName{
                width:100%;
                height:0.2rem;
                font-size:0.15rem;
                color:#333;
                font-weight:bold;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:1;
                -webkit-box-orient:vertical;
              }
              .bookNum{
                width:100%;
                height:0.2rem;
                margin-top:0.39rem;
                margin-bottom:0.14rem;
                p{
                  width:1rem;
                  float:left;
                  font-size:0.1rem;
                  color:#ccc;
                  margin-top:0.04rem;
                  overflow:hidden;
                }
                span{
                  display:block;
                  width:1rem;
                  float:right;
                  text-align:right;
                  color:#333333;
                  font-size:0.13rem;
                  overflow:hidden;
                }
              }
              .bookAgain{
                width:0.8rem;
                height:0.3rem;
                background:url('../../assets/img/list/zcgm.png') no-repeat center;
                background-size:0.8rem 0.3rem;
                line-height:0.3rem;
                text-align: center;
                font-size:0.13rem;
                color:#BB0606;
                float:right;
                margin:0.16rem 0;
              }
            }
          }
        }
        .book:after{
          content:'.';
          clear: both;
          display:block;
          height:0;
          overflow:hidden;
          visibility:hidden;
        }
        .book:last-child{
          border-radius: 0.1rem;
          .bookRight{
            border-bottom:none;
          }
        }
      }
    }


  }
</style>
