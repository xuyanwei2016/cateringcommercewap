<template>
  <!--我的收藏 我的书架-->
  <div class="Collection">
    <div class="changTit">
      <div class="back" @click="$router.go(-1)"><img src="../../assets/img/list/back.png" alt=""></div>

      <div class="type">
        <div class="item" v-for="(item,index) in chang" :key="index" :class="isType==index?'active':''"
             @click="isType=index">{{item}}<span v-if="isType==index"></span></div>
      </div>

    </div>
    <div :style="{width:'3.75rem',overflowX:'hidden',overflowY:'auto',height:list.length>0?winH+'px':''}"
         v-infinite-scroll="load"
         infinite-scroll-disabled="disabled">
      <ul class="list" v-if="isType==0&&list.length>0" ref='remove'>
        <li v-for="(item,index) in list" :key="index" :style="moveId==item.id?slideEffect:''">
          <div class="blockCont" @touchstart='touchStart($event,item.id)' @touchmove='touchMove($event,item.id)'
               @touchend='touchEnd'>
            <img :src="imgLink(item.cover)" alt="" v-if="item.cover"
                 @click="linkDetail(item.objectId)">
            <div :class="item.cover?'css1':'info'">
              <h1 :id="'tit'+index" @click="linkDetail(item.objectId)">{{Ellipsis('tit'+index,2,item.title,'.19')}}</h1>
              <p :id="'intr'+index"  v-if="!item.cover">{{Ellipsis('intr' + index, 2, item.text, '.2')}}</p>
              <h2>{{item.createTime}}</h2>
            </div>
          </div>
          <div class="noneCont" @click.stop="delBtn(item)">删除</div>
        </li>
        <li class="moreOnly" v-if="!noMore">
          <div v-if="loading==1&&list.length>0">加载中...</div>
        </li>
        <li v-if="noMore&&list.length>10"><div class="noHave" >
          这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
        </div></li>
      </ul>

      <ul class="booklist" v-if="isType==1&&list.length>0" ref='remove'>
        <li v-for="(itemB,indexB) in list" :key="indexB" :style="moveId==itemB.id?slideEffect:''">

          <div class="blockCont" @touchstart='touchStart($event,itemB.id)' @touchmove='touchMove($event,itemB.id)'
               @touchend='touchEnd'>
            <img :src="imgLink(itemB.cover)" alt="" v-if="itemB.cover" @click="linkDetail(itemB.objectId)">
            <img src="../../assets/img/cover.png" alt="" v-else @click="linkDetail(itemB.objectId)">
            <div class="info">
              <h1 @click="linkDetail(itemB.objectId)">{{itemB.title}}</h1>
              <p :id="'intro'+indexB">{{Ellipsis('intro' + indexB, 2, itemB.intro, '.19')}}</p>
              <div class="other">
                <h3>{{itemB.author ? itemB.author : ''}}</h3>
                <h2>{{itemB.createTime}}</h2>
              </div>
            </div>
          </div>

          <div class="noneCont" @click.stop="delBtn(itemB)">删除</div>
        </li>
        <li class="moreOnly" v-if="!noMore">
          <div v-if="loading==1&&list.length>0">加载中...</div>
        </li>
        <li v-if="noMore&&list.length>10"><div class="noHave" >
          这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
        </div></li>
      </ul>

      <!--<div class="more" v-if="loading==1&&list.length>0">加载中...</div>
      <div class="noHave" v-if="noMore&&list.length>0">
        这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
      </div>-->
    </div>


    <!--<p v-if="loading==1" style="padding-top:1rem">正在加载中</p>-->
    <noHave v-if="(loading==2||loading==0)&&list.length==0" :mess="{top:winH,loading:loading}"></noHave>
  </div>
</template>

<script>
  import {getCollectAPI, getShelfListAPI, delCollectAPI} from '@/api/my';
  import axios from 'axios';
  import noHave from '../../components/noHave.vue';
  import {requestPath, uploadUrl} from '@/utils/global.js';

  var desW = 375,
    winW = document.documentElement.clientWidth, //动态获取设备的屏幕宽度
    ratio = winW / desW;
  let curWidth = ratio * 120;
  export default {
    name: 'HelloWorld',
    data() {
      return {
        chang: ['特色疗法', '图书'],
        isType: null,
        list: [],
        cancelFn: null,
        pageSize: 10,
        pageNum: 1,
        loading: 0,
        winH: 0,
        total: 0,
        moveId: null,
        startX: 0,//开始触摸的位置
        startY: 0,//开始触摸的位置
        moveX: 0,//滑动时的位置
        endX: 0,//结束触摸的位置
        disX: 0,//移动距离
        slideEffect: '',//滑动时的效果,使用v-bind:style="deleteSlider"
      }
    },

    components: {
      noHave
    },
    created() {
      this.winH = document.documentElement.clientHeight||document.body.clientHeight;
      this.isType=this.$route.query.resType==1?1:0;
      if(this.$route.query.resType==undefined){
        this.getCollect();
      }
    },
    watch: {
      isType(n, o) {
        this.$router.push({path:'/collection',query:{resType:this.isType}});
        this.pageNum = 1;
        this.loading = 0;
        this.total = 0;
        this.list = [];
        this.getCollect();
      },
      $route(n,o){
        this.isType=this.$route.query.resType==1?1:0;
      },

    },
    computed: {
      noMore() {
        return this.list.length == this.total;
      },
      disabled() {
        /*console.log(this.loading == 1 || this.noMore||this.total<=10);*/
        return this.loading == 1 || this.noMore||this.total<=10;
      },
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    methods: {
      load() {
        this.loading = 1;
        this.pageNum += 1;
        this.getCollect();
      },


      getCollect() {
        /*this.loading = true;*/
        let data = {
          goodsType: this.isType ? '2-1' : '2-2',
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };

        let API = this.$route.name == 'shelf' ? getShelfListAPI : getCollectAPI;
        API(data).then(res => {
          if (res.data.status) {
            this.loading = 2;
            this.list = [...this.list, ...res.data.data.list];
            this.total = res.data.data.total;
          }
        })

        /*let API = this.$route.name == 'shelf' ? `${requestPath.orderfg}/order/page/buy` : requestPath.resourcefg+'/member-collection/page';*/
        /*let CancelToken = axios.CancelToken;
        this.cancelFn = CancelToken.source();// 这里初始化source对象
        axios.get(`${process.env.BASE_API}${API}`,{
          params: data
        }, {
          cancelToken: this.cancelFn.token // 这里声明的cancelToken其实相当于是一个标记，
                                         // 当我们要取消请求的时候，可以通过这个找到该请求
        })
        .then(res => {
          // 你的逻辑
          if (res.data.status) {
            this.loading=2;
            this.list = res.data.data.list;
          }
        })
        .catch(res => {
          this.$valert.show('取消请求')
          // 如果调用了cancel方法，那么这里的res就是cancel传入的信息
          // 你的逻辑
        })*/
      },
      cancel() {
        this.cancelFn.cancel('这里你可以输出一些信息，可以在catch中拿到')
      },

      touchStart: function (ev, id) {
        if (this.moveId != id) {
          this.slideEffect = 'transform:translateX(' + '-' + 0 + 'px)';
        }
        this.moveId = id;
        ev = ev || event;
        /*ev.preventDefault();*/

        if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX; // 记录开始位置
          this.startY = ev.touches[0].clientY; // 记录开始位置
        }
      },
      touchEnd: function (ev) {
        ev = ev || event;
        /*ev.preventDefault();*/
        this.endX = ev.changedTouches[0].clientX;
        /*if(this.endX>100){
          console.log('移动超过显示距离')
          this.slideEffect = "transform:translateX("+'-'+100+ "px)";
        }else{
          this.slideEffect = 'transform:translateX(0px)';
        }*/
        let btnWidth = this.$refs.remove.offsetWidth;
        /*let btnImg = this.$refs.btnImg.offsetWidth;*/
//                      console.log(ev.changedTouches);
        if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          this.disX = this.startX - endX;
          if (this.disX > curWidth) {

            this.slideEffect = 'transform:translateX(' + '-' + curWidth / 2 + 'px);backgroundColor:#F6F6F6';
          } else if (this.disX != 0) {
            this.slideEffect = 'transform:translateX(' + '-' + 0 + 'px)';
          }

        }
      },

      touchMove: function (ev, id) {
        ev = ev || event;
        /*ev.preventDefault();*/
        let btnWidth = this.$refs.remove.offsetWidth;  //$refs 减少获取dom节点的消耗
        /*let btnImg = this.$refs.btnImg.offsetWidth;*/
        /*console.log(ev.targetTouches);
        console.log(ev.changedTouches);*/
        if (ev.touches.length == 1) {
          //滑动时距离浏览器左侧的距离
          this.moveX = ev.touches[0].clientX;
          let moveY= ev.touches[0].clientY;
          let x=Math.abs(this.startX - this.moveX),y=Math.abs(this.startY-moveY);
          if(y>x){return}

          //实时的滑动的距离-起始位置=实时移动的位置
          this.disX = this.startX - this.moveX;

          let num = this.slideEffect.match(/\d+/g) ? this.slideEffect.match(/\d+/g)[0] : 0;
          if (this.disX <= 0) {
            this.slideEffect = 'transform:translateX(' + 0 + 'px)';
          } else if (curWidth >= this.disX > 0) {
            if (num == curWidth) {
              return
            }
            this.slideEffect = 'transform:translateX(' + '-' + this.disX / 2 + 'px)';

            // 最大也只能等于删除按钮宽度
            /*if (this.disX >= btnWidth) {
              this.slideEffect = 'transform:translateX(' + (btnWidth - 375) + 'px)';
            }*/
          } else {
            this.slideEffect = 'transform:translateX(' + '-' + curWidth / 2 + 'px)';
          }
        }


      },

      delBtn(item) {
        if (!this.token) {
          this.$router.push('/loginPassword');
          return
        }
        delCollectAPI({
            "goodsList": [
              {
                "id": item.objectId,
                "type": this.isType ? '2-1' : '2-2'
              }
            ]
          }
        ).then(res => {
          if (res.data.status) {
            this.$valert.show(`已取消收藏`);
            this.pageNum = 1;
            this.loading = 0;
            this.total = 0;
            this.list = [];
            this.getCollect();
          } else {
            this.$valert.show(res.data.msg);
          }
        })
      },

      linkDetail(id) {
        let href = this.isType ? '/bookDetail' : '/read';
        this.$router.push({path: href, query: {id: id,resType:this.isType?1:39}});
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .Collection {
    height: 100%;
    .changTit {
      width: 100%;
      position: fixed;
      z-index: 12;
      top: 0;
      left: 0;
      background: url("../../assets/img/list/top-bg.png") no-repeat;
      background-size: cover;
      padding-top: .25rem;
      height: .4rem;
      display: flex;
      justify-content: space-between;
      .back {
        width: .11rem;
        height: .18rem;
        padding-left: .12rem;
        padding-top: .09rem;
        img {
          width: .11rem;
          height: .18rem;
        }
      }
      .type {
        height: .4rem;
        line-height: .39rem;
        width: 100%;
        padding: 0 .90rem 0 .70rem;
        display: flex;
        justify-content: space-between;

        .item {
          color: #D2E0F2;
          font-size: .18rem;
          font-weight: bold;
          text-align: center;
          span {
            margin: -3px auto 0;
            display: block;
            width: .25rem;
            height: 3px;
            background: #fff;
            border-radius: 2px;

          }
        }
        .active {
          color: #fff;
          /*border-bottom: .03rem solid #fff;
          border-radius:50%;*/

        }

      }
    }

    .list {
      padding: .65rem 0 0;
      li {
        width: 4.35rem;
        margin-right: 0;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .blockCont {
          width: 3.51rem;
          margin: .15rem .12rem 0 .12rem;
          border-bottom: 1px solid #EEEEEE;
          display: flex;
          justify-content: space-between;

          p {
            color: #808287;
            font-size: .13rem;
            line-height: .2rem;
            margin-bottom: .1rem;
          }
          h2 {
            text-align: right;
            color: #BCC1CB;
            font-weight: normal;
            font-size: .11rem;
            padding-bottom: .1rem;
          }
          img{
            width: 1.1rem;
            height: .73rem;
            padding-bottom: .1rem;
          }
          .info{
            width: 100%;
            h1 {
              line-height: .19rem;
              font-size: .16rem;
              color: #222222;
              height: .28rem;
              .lineone
            }
          }
          .css1{
            width: 2.22rem;
            h1{
              font-size: .16rem;
              color: #222222;
              line-height: .19rem;
              margin-bottom: .15rem;
              /*height: .5rem;*/
              /*.lineone*/
            }
          }
        }

        .noneCont {
          float: right;
          width: .6rem;
          height: 100%;
          background-color: #EE5931;
          right: 0;
          top: 0;
          position: absolute;
          color: #FFFFFF;
          font-size: .17rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

      }

    }
    .booklist {
      padding: .65rem 0 0;
      li {
        width: 4.35rem;
        margin-right: 0;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .blockCont {
          margin: .15rem .12rem 0 .12rem;
          padding-bottom: .1rem;
          border-bottom: 1px solid #EEEEEE;
          width: 3.51rem;
          display: flex;
          justify-content: space-between;
          img {
            width: 0.8rem;
            height: 1.15rem;
          }
          .info {
            width: 2.54rem;
            position: relative;
            h1 {
              font-size: .16rem;
              color: #222222;
              height: .28rem;
              .lineone
            }
            p {
              font-size: .13rem;
              color: #808287;
              line-height: .19rem;

            }
            .other {
              width: 100%;
              position: absolute;
              bottom: .05rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: .17rem;
              h3 {
                width: 1.35rem;
                height: .17rem;
                line-height: .17rem;
                color: #1A6DC2;
                font-size: .13rem;
                font-weight: normal;
                .lineone
              }
              h2 {
                text-align: right;
                width: 1.15rem;
                height: .17rem;
                line-height: .17rem;
                display: inline-block;
                color: #BCC1CB;
                font-weight: normal;
                font-size: 0.11rem;
              }
            }
          }
        }
        .noneCont {
          float: right;
          width: .6rem;
          height: 100%;
          background-color: #EE5931;
          right: 0;
          top: 0;
          position: absolute;
          color: #FFFFFF;
          font-size: .17rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

      }

    }
    .lineone {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
