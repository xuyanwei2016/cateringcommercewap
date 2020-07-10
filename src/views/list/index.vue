<template>
  <!--资源列表-->
  <div class="resources"  :style="{height:winH+'px'}">
    <div class="bg">
      <div class="search">
        <div class="searchRight" @click="$router.push({path:'/'})">
          <img src="../../assets/img/list/back.png" alt="">
        </div>
        <div class="searchLeft">
          <input type="text" placeholder="请输入疾病、药方、医书等" v-model="value" @click="inputClick"><!-- @keypress="keyFn" -->
          <!-- <img src="@/assets/img/list/icon_search_shanchu.png" alt=""  @click="value=''" v-if="value.trim()"> -->
        </div>

      </div>
      <!--模块-->
      <div class="Modular">
        <div class="item" v-for="(item,index) in modulars" :key="index"  @click="curModular=index">
          <span :class="curModular==index?'active':''" >{{item.name}}</span>
        </div>
      </div>
    </div>

    <div class="condition">
      <div class="left">
        <span v-for="(item,index) in conditions" :key="index" :class="curCondition==index?'active':''" @click="curCondition=index">{{item.name}}</span>
      </div>
      <div :class="{right:true,active:isScreen}" @click="isScreen=!isScreen">筛选 <img
        :src="`./static/img/${isScreen?'screenB':'screen'}.png`" alt=""></div>
    </div>

    <div class="total">
      为您找到<span>{{total}}</span>条资源
    </div>

    <div class="dataList"  :style="{overflow:'auto',height:list.length>0?winH+'px':''}"   v-infinite-scroll="load" infinite-scroll-disabled="disabled" v-if="list.length>0">
      <!--全部-->
      <ul v-if="curModular==0&&list.length>0" class="therapyList">
        <li v-for="(item,index) in list" :key="index">
          <div v-if="item.resourceType == 51" class="list-master">
            <div class="doc"  @click="linkDetail(item)">
              <img :src="imgLink(item.img)" alt="">
            </div>
            <div class="info">
              <h1 @click="linkDetail(item)" v-html="item.name"></h1>
              <h2>擅长：{{item.good}}</h2>
              <p :id="`description${index}`">{{Ellipsis(`description${index}`,2,item.description,'.19')}}</p>
            </div>
          </div>

          <div v-if="item.resourceType == 35" class="list-case">
            <div class='title' @click="linkDetail(item)" v-html='item.name'></div>
            <div class='label' v-if='item.keywords!=null'>
                <ul>
                    <li>{{item.keywords}}</li>
                </ul>  
                <div class='after'></div>              
            </div>
            <div class='center'>{{item.description}}</div>
            <div class='button'>
                <div class='laiyuan'>来源：
                  <span v-html="item.bookName"></span></div>
                <div class='price' v-if='item.priceOption==1'>
                    <del>￥{{item.price}}</del>
                    <span>￥{{item.realPrice}}</span>
                </div>
                <div class='mianfei' v-else>免费</div>
            </div>
          </div>
          <div v-if="item.resourceType ==32" class="list-medicine">
            <img :src="imgLink(item.img)" alt="" v-if='item.img'>
            <img src="../../assets/img/cover.png" alt="" v-else >
            <span @click="linkDetail(item)" v-html='item.name'></span>
            <img src="@/assets/register/rightjt.png" alt="">
          </div>

          <div v-if="item.resourceType == 33" class="list-prescription">
            <div @click="linkDetail(item)" v-html='item.name'></div>
            <img src="@/assets/register/rightjt.png" alt="">
          </div>

          <div v-if="item.resourceType == 1" class="list-book">
            <div class='left'>
                <img :src="imgLink(item.img)" alt="">
            </div>
            <div class='right'>
                <div class='title' @click="linkDetail(item)" v-html='item.name'></div>
                <div class='center'>
                    <div class='author'>作者 {{item.author}}</div>
                    <div class='price' v-if='item.priceOption==1'>
                        <span>￥<del>{{item.price}}</del></span>
                        <span>￥{{item.realPrice}}</span>
                    </div>
                    <div class='free' v-else>免费</div>
                </div>
                <div class='bottom'>{{item.description}}</div>
            </div>
          </div>

          <div v-if="item.resourceType == 40" class="list-health">
            <div class='top'>
                  <img :src="imgLink(item.img)" alt="" @click="linkDetail(item)">
              </div>
              <div class='title' @click="linkDetail(item)"  v-html='item.name'></div>
              <div class='button'>
                  <div class='key'>
                      <img src="@/assets/img/list/look.png" alt="">
                      <span>2099次浏览</span>
                  </div>
                  <div class='price' v-if='item.priceOption==1'>
                      <span>￥<del>{{item.price}}</del></span>
                      <span>￥{{item.realPrice}}</span>
                  </div>
                  <div class='free' v-else>免费</div>
              </div>
          </div>

        </li>
      </ul>
      
      <div v-if="curModular== 1&&list.length>0">
        <masterList :list="list" @linkDetail="linkDetail"></masterList>
      </div>
      <!--医案-->
      <div class="doctorList" v-if="curModular==2&&list.length>0">
        <caseList :list="list" @linkDetail="linkDetail"></caseList>
      </div>
      <!-- 药物 -->
      <div class="doctorList" v-if="curModular==3&&list.length>0">
        <medicineList :list="list" @linkDetail="linkDetail"></medicineList>
      </div>
      <!-- 方剂 -->
      <div class="doctorList" v-if="curModular==4&&list.length>0">
        <prescriptionList :list="list" @linkDetail="linkDetail"></prescriptionList>
      </div>
      <!-- 医著 -->
      <div class="doctorList" v-if="curModular==5&&list.length>0">
        <bookList :list="list" @linkDetail="linkDetail"></bookList>
      </div>
 
 
      <!-- 养生保健 -->
      <div v-if="curModular== 6&&list.length>0">
        <healthList :list="list" @linkDetail="linkDetail"></healthList>
      </div>

      <div class="more" v-if="loading==1&&list.length>0">加载中...</div>
      <div class="noHave" v-if="noMore&&list.length>0">
        这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
      </div>
    </div>

    <!--没有数据-->
    <noHave v-if="(loading==2||loading==0)&&list.length==0" :mess="{top:winH,loading:loading}"></noHave>

    <!--筛选-->
    <div class="screen" v-if="isScreen">
      <ul>
        <li v-for="(itemNa,indexNa) in nationList" :key="indexNa" :class="curNation.includes(itemNa.id)?'active':''"
            @click="changeNation(itemNa,indexNa)">{{itemNa.name}}
        </li>
      </ul>
      <div class="button">
        <span @click="reset">重置</span>
        <span @click="sumbit">确定</span>
      </div>
    </div>

  </div>

</template>

<script>
  import noHave from '@/components/noHave.vue';
  import masterList from '../../components/lists/masterList.vue';
  import prescriptionList from '../../components/lists/prescriptionList.vue';
  import medicineList from '../../components/lists/medicineList.vue';
  import caseList from '../../components/lists/caseList.vue';
  import bookList from '../../components/lists/bookList.vue';
  import healthList from '../../components/lists/healthList.vue';


  import {getNationAPI, getListAPI} from '@/api/list';
  import {addHotswAPI} from '@/api/home';

  export default {
    name: 'HelloWorld',
    components: {
      noHave,
      masterList,
      healthList,
      prescriptionList,
      medicineList,
      caseList,
      bookList
    },
    data() {
      return {
        modulars: [
          {name: '全部', code: null},
          {name: '大师', code: 51}, 
          {name: '医案', code: 35}, 
          {name: '药物',code: 32}, 
          {name: '方剂', code:33},
          {name: '医著', code: 1},
          {name: '养生保健', code: 40}
        ],
        curModular: 0,
        conditions: [{name:'默认',code:null},{name:'最热',code:'browseNum desc'},{name:'最新',code:'uploadTime desc'}],
        curCondition: 0,
        nationList: [{name: '全部', id: 'null'}],
        curNation: ['null'],
        isScreen: false,

        pageNum: 1,
        pageSize: 10,
        loading: 0,
        list:[],
        total:0,
        winH:0,
        orderBy:null,
        value:'',
        sutraStatus:this.$route.query.sutraStatus
      }
    },
    
    computed: {
      noMore () {
        return this.list.length == this.total;
      },
      disabled () {
        return this.loading==1||this.noMore||this.total<=10;
      }
    },
    created() {
      if(this.$route.query.hig){
        this.winH=this.$route.query.hig;
      }else{
        let winW=document.documentElement.clientWidth;
        this.winH=document.documentElement.clientHeight-(winW*175/375);
      }

      this.value=this.$route.query.val?this.$route.query.val:'';
      this.curModular=this.$route.query.resType?this.$route.query.resType:0;
      if(this.$route.query.resType==undefined){
        this.getList();
      }
      this.sutraList()
    },
    watch: {
      $route(n,o){
        this.curModular=this.$route.query.resType||0;
        this.value=this.$route.query.val?this.$route.query.val:'';
      },
      curModular(n, o) {
        this.$router.push({path:this.$route.fullPath,query:{resType:n}});
        this.total=0;
        this.list=[];
        this.pageNum=1;
        this.loading=1;
        this.getList();
      },
      isScreen(n, o) {
        if (n) {
          let {length: len} = this.nationList;
          if (len > 1) return;
          getNationAPI().then(res => {
            let obj = res.data.data;
            Object.keys(obj).forEach((item) => {
              let itemObj={
                id:item,
                name:obj[item]
              };
              this.nationList.push(itemObj)
            })
          })
        }
      },
      curCondition(n,o){
        this.list=[];
        this.pageNum=1;
        this.loading=0;
        this.orderBy=this.conditions[n].code;
        this.getList();

      },
      value(n,o){
        if(n==''){
          this.list=[];
          this.pageNum=1;
          this.loading=0;
          this.$router.push('/list')
          this.getList();
        }else{
        }
      }
    },
    methods: {
      // 判断从经典过来不显示 大师
      sutraList(){
        if( this.sutraStatus == 1 ){
          let sutraData = []
          sutraData.push(
            {name: '全部', code: null},
            {name: '医案', code: 35}, 
            {name: '药物',code: 32}, 
            {name: '方剂', code:33},
            {name: '医著', code: 1},
            {name: '养生保健', code: 40}
          )
          this.modulars = sutraData
        }
      },
      load () {
        this.loading = 1;
        this.pageNum += 1;
        this.getList();
      },
      /* 跳转搜索页面 */
      inputClick(){
        this.$router.push({path:'search'})
      },
      // keyFn(e) {
      //   if (e.keyCode === 13) {
      //     if(this.value.trim()==''){this.$valert.show('请输入内容');return};
      //     this.$router.push({path:this.$route.fullPath,query:{val:this.value}});
      //     this.pageNum=1;
      //     this.loading=0;
      //     this.list=[];
      //     this.total=0;
      //     this.getList();
      //     this.addHotsw(this.value.trim());
      //   }
      // },
      /*添加热词*/
      addHotsw(val){
        addHotswAPI({
          content:val
        }).then(res=>{

        })
      },
      /*列表*/
      getList() {
        /*资源类型 31理论 32药物 33方剂 34临床 35医案 36文化 37机构 38医论 48其他 1医著 2医家 39特色疗法*/
        let data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          resourceType: this.modulars[this.curModular].code,
          orderBy:this.orderBy,
          content:this.value.trim(),
          nationsType:this.curNation.includes('null')?null:this.curNation,
        };
        getListAPI(data).then(res => {
          if (res.data.status) {
            let resList
            let totalCount
            if(res.data.data&&res.data.data.resList){
              resList = res.data.data.resList
              totalCount = res.data.data.totalCount
            }else{
              resList = []
              totalCount = 0
            }
            console.log(resList)
            this.isScreen=false;
            this.loading = 2;
            this.list=[...this.list,...resList];
            this.total=totalCount;
          }

        })
      },

      changeNation(item) {
        if (item.id == 'null') {
          this.curNation = ['null'];
        } else {
          if (this.curNation.includes('null')) {
            this.curNation = [];
          }

          if (this.curNation.includes(item.id)) {
            let index = this.curNation.findIndex(function (value, index, arr) {
              return value == item.id;
            })
            this.curNation.splice(index, 1);
            this.curNation.length == 0 ? this.curNation.push('null') : true;
          } else {
            this.curNation.push(item.id);
          }
        }
      },
      /*确定*/
      sumbit(){
        this.pageNum = 1;
        this.loading = 0;
        this.total = 0;
        this.list=[];
        this.getList();
      },
      /*重置*/
      reset(){
        this.curNation=['null'];
        this.pageNum = 1;
        this.loading = 0;
        this.total = 0;
        this.list=[];
        this.getList();
      },

      /*详情*/
      linkDetail(item){
        console.log(item.resourceType)
        // {name: '全部', code: null},
        //     {name: '医案', code: 35}, 
        //     {name: '药物',code: 32}, 
        //     {name: '方剂', code:33},
        //     {name: '医著', code: 1},
        //     {name: '养生保健', code: 40}
        let obj={35:'/read',32:'/read',33:'/read',1:'/bookDetail',40:'/read',51:'/masterDetail'};
        this.$router.push({path:obj[item.resourceType],query:{id:item.id}});
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.resources {
  .bg {
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.1rem;
    .search {
      padding: 0.06rem 0 0.05rem 0;
      height: 0.33rem;
      display: flex;
      justify-content: space-between;
      background: #BA9F74;
      .searchLeft {
        margin-right: 0.23rem;
        width: 3.1rem;
        height: 0.33rem;
        position: relative;
        input {
          background: url("../../assets/img/list/nav_search.png") no-repeat #F1F1F1 0.1rem center;
          background-size: 0.13rem 0.14rem;
          width: 2.4rem;
          height: 0.33rem;
          line-height: 0.33rem;
          border-radius: 0.17rem;
          border: none;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          font-size: 0.14rem;
          color: #000;
        }
        input::-webkit-input-placeholder {
          color: #B4B4B4;
        }
        input::-o-input-placeholder {
          color: #B4B4B4;
        }
        input::-moz-input-placeholder {
          color: #B4B4B4;
        }
        input::-ms-input-placeholder {
          color: #B4B4B4;
        }
        img {
          width: 0.14rem;
          height: 0.14rem;
          /*margin-top: -0.3rem;*/
          position: absolute;
          right: 0.09rem;
          top: 0.09rem;
        }
      }
      .searchRight {
        width: 0.4rem;
        height: 0.33rem;
        padding-left: 0.15rem;
        text-align: left;
        img {
          width: .1rem;
          height: .18rem;
          padding-top: .08rem;
        }

      }

    }

    .Modular {
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      overflow-x: scroll;
      white-space: nowrap;
      padding-left:.15rem;
      .item {
        display: inline-block;
        margin-right: 0.25rem;
        color: #666;
        font-size: .15rem;
        line-height: .45rem;
        font-weight: bold;
        text-align: center;

      }
      .active {
        border-bottom: .03rem solid #BA9F74;
        border-radius:0.02rem;
        color: #000;
        font-size: 0.17rem;
      }
    }
  }

  .condition {
    position: fixed;
    z-index: 11;
    top: 1.1rem;
    height: .4rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #E3E3E3;
    .left {
      flex: 0 0 3rem;
      // padding-left: .26rem;
      font-size: .14rem;
      // width: 2.12rem;
      color: #777;
      display: flex;
      // justify-content: space-between;
      span {
        padding: 0  .3rem;
        margin: .1rem 0 ;
        border-right: 1px solid #E3E3E3;
        height: .2rem;
        line-height: .2rem;
        display: inline-block;
      }
      .active {
        color: #BA9F74;
      }
    }
    .right {
      flex: 1;
      font-size: .14rem;
      color: #777;
      // padding-right: .26rem;
      // padding-left: .33rem;
      margin-top: .08rem;
      height: .24rem;
      line-height: .24rem;
      img {
        width: .11rem;
        display: inline-block;
        margin-top: -.01rem;
      }
    }
    .active {
      color: #BA9F74;
    }
  }

  .total {
    padding-top: 1.51rem;
    width: 100%;
    text-align: center;
    height: .24rem;
    line-height: .24rem;
    background: #F7F7F7;
    font-size: .12rem;
    color: #9A9A9A;
    span {
      color: #DD3549;
    }
  }

  /*列表*/
  .dataList {
    .therapyList {
      li{
        margin: 0 .15rem;
        // padding: .12rem 0;
        border-bottom: 1px solid #EEEEEE;
        .list-master{
          .doc {
            flex: 0 0 .73rem;
            width: 0.63rem;
            height: 0.95rem;
            img {
              margin-top: 0.06rem;
              border-radius: 50%;
              width: .63rem;
              height: .63rem;
              background: #BA9F74;
            }
          }
          .info {
              flex: 1;
            h1 {
              color: #222222;
              font-size: .15rem;
              line-height: .20rem;
              .lineOne
            }
            h2 {
              font-weight: normal;
              color: #BA9F74;
              font-size: .11rem;
              line-height: .25rem;
              .lineOne
            }
            p {
              line-height: .19rem;
              color: #333;
              font-size: .12rem;
              line-height: .18rem;
            }
          }
        }
        .list-case{
          width:3.44rem;
          height:auto;
          margin:auto;
          border-bottom:0.01rem solid #eee;
          .title{
              width:100%;
              font-size:0.15rem;
              font-weight:800;
              color:#000;
              overflow:hidden;
              white-space:nowrap;
              text-overflow:ellipsis;
              margin:0.1rem 0 0.04rem 0;
          }
          .label{
              .after{
                  content: "";
                  height: 0;
                  clear: both;
                  overflow: hidden;
                  display: block;
                  visibility: hidden;
              }
              ul{
                  li{
                      height:0.18rem;
                      border:0.01rem solid rgba(210,194,168,1);
                      border-radius:0.06rem 0.01rem 0.06rem 0.01rem;
                      float:left;
                      background:rgba(246,241,232,1);
                      color:#BA9F74;
                      margin-right:0.1rem;
                      padding:0 0.075rem;
                      line-height:0.18rem;
                      margin-top:0.05rem;
                  }
              }
          }
          .center{
              width:100%;
              font-size:0.125rem;
              color:#8F8F8F;
              line-height:0.17rem;
              margin-top:0.13rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
          }
          .button{
              width:100%;
              height:0.15rem;
              margin:0.1rem 0;
              .laiyuan{
                  width:50%;
                  height:100%;
                  float:left;
                  overflow:hidden;
                  white-space:nowrap;
                  text-overflow:ellipsis;
                  color:#CBD0D9;
                  font-size:0.11rem;
              }
              .price{
                  width:50%;
                  height:100%;
                  float:right;
                  overflow:hidden;
                  white-space:nowrap;
                  text-overflow: ellipsis;
                  text-align: right;
                  del{
                      color:#CBD0D9;
                      font-size:0.1rem;
                  }
                  span{
                      color:#FE2023;
                      font-size:0.14rem;
                      font-weight:500;
                  }
              }
              .mianfei{
                  width:50%;
                  height:100%;
                  float:right;
                  text-align: right;
                  color:#219319;
                  font-size:0.11rem;
              }
          }
        }
        .list-medicine{
          width:3.45rem;
          height:1.015rem;
          margin:auto;
          border-bottom:0.01rem solid #eee;
          img:nth-child(1){
              width:1.06rem;
              height:0.73rem;
              float:left;
              margin-top:0.14rem;
          }
          span{
              width:2rem;
              height:100%;
              font-size:0.16rem;
              color:#000;
              font-weight:bold;
              float:left;
              line-height:1.015rem;
              margin-left:0.15rem;
              overflow:hidden;
              white-space:nowrap;
              text-overflow: ellipsis;
          }
          img:nth-child(3){
              width:0.2rem;
              height:0.2rem;
              float:right;
              margin-top:0.43rem;
          }
        }
        .list-prescription{
          width:3.45rem;
          height:0.5rem;
          border-bottom:0.01rem solid #eee;
          margin:auto;
          div:nth-child(1){
              width:90%;
              height:100%;
              float:left;
              font-size:0.15rem;
              color:#000;
              // font-weight:bold;
              overflow:hidden;
              white-space:nowrap;
              text-overflow: ellipsis;
              line-height:0.5rem;
          }
          img{
              width:0.2rem;
              height:0.2rem;
              float:right;
              margin-top:0.16rem;
          }
        }
        .list-book{
          width:3.44rem;
          height:1.545rem;
          border-bottom:0.01rem solid #eee;
          margin:auto;
          .left{
              width:0.8rem;
              height:1.15rem;
              float:left;
              img{
                  width:0.8rem;
                  height:1.15rem;
                  margin-top:0.2rem;
              }
          }
          .right{
              width:2.5rem;
              height:1.15rem;
              float:right;
              margin-top:0.2rem;
              .title{
                width: 95%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                  font-size:0.15rem;
                  font-weight:bold;
                  color:#000;
              }
              .center{
                  width:100%;
                  height:0.14rem;
                  margin:0.13rem 0 0.25rem 0;
                  .author{
                      width:50%;
                      height:0.14rem;
                      float:left;
                      color:#BA9F74;
                      font-size:0.11rem;
                      overflow:hidden;
                      white-space:nowrap;
                      text-overflow: ellipsis;
                  }
                  .price{
                      width:50%;
                      height:0.14rem;
                      float:left;
                      text-align: right;
                      span:nth-child(1){
                          color:#BDBEBD;
                          font-size:0.12rem;
                      }
                      span:nth-child(2){
                          color:#FE2023;
                          font-size:0.14rem;
                      }
                  }
                  .free{
                      width:50%;
                      height:0.14rem;
                      float:left;
                      text-align: right;
                      font-size:0.11rem;
                      color:#219319;
                  }
              }
              .bottom{
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  font-size:0.13rem;
                  color:#808287;
                  line-height:0.2rem;
                  letter-spacing: 0.01rem;
              }
          }
        }
        .list-health{
          width:3.45rem;
          margin:auto;
          border-bottom:0.01rem solid #eee;
          .top{
              width:3.45rem;
              height:1.6rem;
              margin-top:0.2rem;
              img{
                  width:3.45rem;
                  height:1.6rem;
              }
          }
          .title{
              font-size:0.15rem;
              font-weight: bold;
              line-height:0.22rem;
              margin:0.1rem 0;
          }
          .button{
              width:100%;
              height:0.14rem;
              margin-bottom:0.15rem;
              .key{
                  width:50%;
                  height:100%;
                  float:left;
                  img{
                      float:left;
                      margin:0.03rem 0.02rem 0 0;
                  }
                  span{
                      display:inline-block;
                      float:left;
                      color:#999;
                      font-size:0.1rem;
                  }
              }
              .price{
                  width:50%;
                  height:100%;
                  float:right;
                  text-align: right;
                  span:nth-child(1){
                      color:#BDBEBD;
                      font-size:0.12rem;
                  }
                  span:nth-child(2){
                      color:#FE2023;
                      font-size:0.14rem;
                  }
              }
              .free{
                  width:50%;
                  height:100%;
                  float:right;
                  text-align: right;
                  color:#219319;
                  font-size:0.11rem;
              }
          }
        }
      }
    }
    .doctorList {
      padding: 0 .14rem;
    }
  }

    /*筛选*/
  .screen {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #fff;
    padding-top: 1.7rem;
    top: 0;
    left: 0;
    z-index: 10;
    ul {
      padding: 0 0 0 .15rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        width: .78rem;
        margin-right: .09rem;
        height: .31rem;
        line-height: .31rem;
        text-align: center;
        border: 1px solid #D2D6D9;
        border-radius: .03rem;
        font-size: .13rem;
        color: #3C3F46;
        margin-bottom: .09rem;
      }
      .active {
        border-color: #DE6209;
        color: #DE6209;
      }
    }
    .button {
      width: 2.92rem;
      padding: 0 .4rem;
      position: fixed;
      display: flex;
      justify-content: space-between;
      bottom: .5rem;
      z-index: 12;
      span {
        display: block;
        width: 1.4rem;
        height: .4rem;
        background: #EEEEEE;
        text-align: center;
        line-height: .4rem;
        color: #333333;
        font-size: .15rem;
      }
      span:last-child {
        // background: url("../../assets/img/list/okBG.png") no-repeat;
        background: #BA9F74;
        background-size: cover;
        color: #fff;
        font-size: .17rem;
      }
    }
  }

}
.lineOne{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
