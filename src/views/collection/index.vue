<template>
  <!--我的收藏-->
    <div class="collection">
      <myHeader></myHeader>
      <div class="resType">
        <h1 v-for="(item,index) in typeList" :key="index" :class="isType==item.type?'active':''" @click="changeType(item)">{{item.name}}</h1>
      </div>
      <div :style="{width:'3.75rem',overflowX:'hidden',overflowY:'auto',height:list.length>0?winH+'px':''}"
           v-infinite-scroll="load"
           infinite-scroll-disabled="disabled">
      <ul class="dataList" ref='remove'>
        <li v-for="(itemRes,indexRes) in list" :key="indexRes" :style="moveId==itemRes.id?slideEffect:''">
          <div class="col-list">
            <div class="book"  v-if="itemRes.objectType == '2-1'&&indexRes<1"  @touchstart='touchStart($event,itemRes.id)' @touchmove='touchMove($event,itemRes.id)'
               @touchend='touchEnd'>
                <img :src="imgLink(itemRes.cover)" alt="" v-if="itemRes.cover">
                <div class="word">
                    <h1 @click="linkDetail(itemRes)">{{itemRes.title}}</h1>
                    <p :id="`col${indexRes}`">{{Ellipsis(`col${indexRes}`,2,itemRes.intro,'.2')}}</p>
                    <div class="con-info">
                        <span class="info-author"></span>
                        <span class="info-time">{{itemRes.createTime}}</span>
                    </div>
                </div>
            </div>
            <div class="text" v-if="itemRes.objectType != '2-1'"  @touchstart='touchStart($event,itemRes.id)' @touchmove='touchMove($event,itemRes.id)'
               @touchend='touchEnd'>
                <div class="text-con">
                    <h1 @click="linkDetail(itemRes)">{{itemRes.title}}</h1>
                    <p :id="`col${indexRes}`">{{Ellipsis(`col${indexRes}`,2,itemRes.intro,'.2')}}</p>
                </div>
                <div class="text-time">
                    <span></span>
                    <span>{{itemRes.createTime}}</span>
                </div>
            </div>
            <div class="noneCont" @click.stop="delBtn(itemRes)">删除</div>
          </div>
            
            
        </li>
      </ul>
      </div>
      <noHave v-if="(loading==2||loading==0)&&list.length==0" :mess="{top:winH,loading:loading}"></noHave>
    </div>
</template>

<script>
import myHeader from '../../components/myHeader.vue';
import noHave from '../../components/noHave.vue';
import {getCollectAPI} from '@/api/my';
import {delCollectionAPI} from '@/api/detail';
var desW = 375,
winW = document.documentElement.clientWidth, //动态获取设备的屏幕宽度
ratio = winW / desW;
let curWidth = ratio * 120;
export default {
  data() {
    return {
      typeList:[
          {name:'文章',type:'2-2',},
          {name:'课程',type:'2-3',},
          {name:'病例',type:'2-5',},
          {name:'医著',type:'2-1',}
      ],
      cur:0,
      loading: 0,
      winH: 0,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      list: [],
      isType:'2-2',
      status: {1:'待审核', 2:'审核通过', 3:'审核不通过', 4:'已上架', 5:'已下架'},

      listQuery:{
        pageNum:1,
        pageSize:20,
        goodsType:'2-2',
        memberType:3
      },

      moveId: null,
      startX: 0,//开始触摸的位置
      startY: 0,//开始触摸的位置
      moveX: 0,//滑动时的位置
      endX: 0,//结束触摸的位置
      disX: 0,//移动距离
      slideEffect: '',//滑动时的效果,使用v-bind:style="deleteSlider"
      hrefType:{
        '2-2':"read",
        '2-3':"lessonDetail",
        '2-5':"caseDetail",
        '2-1':"bookDetail",
      }
    }
  },
  components: {myHeader,noHave},
  watch: {
  },
  computed: {
    noMore() {
      return this.list.length == this.total;
    },
    // disabled() {
    //   /*console.log(this.loading == 1 || this.noMore||this.total<=10);*/
    //   return this.loading == 1 || this.noMore||this.total<=10;
    // },
    token() {  //通过方法访问
      return this.$store.state.token;
    },
  },
  created(){
    let winW=document.documentElement.clientWidth;
    this.winH=document.documentElement.clientHeight-(winW*110/375);
    this.getCollect();
  },
  methods: {
    load() {
      this.loading = 1;
      this.pageNum += 1;
      /*this.getCollect();*/
    },
    getCollect() {
      getCollectAPI(this.listQuery).then(res => {
        this.list = [...this.list, ...res.data.data.list];
        this.total = res.data.data.total;
        this.loading = 2;
      })
    },
    changeType(item){
      this.isType=item.type;
      this.listQuery.goodsType = item.type
      this.list = []
      this.getCollect()
      this.slideEffect = ''
    },

    // 跳转详情
    linkDetail(item){
      this.$router.push({
          path: this.hrefType[item.objectType], query: {
          id: item.objectId
          }
      })
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
      this.endX = ev.changedTouches[0].clientX;
      let btnWidth = this.$refs.remove.offsetWidth;
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
      let btnWidth = this.$refs.remove.offsetWidth;  //$refs 减少获取dom节点的消耗
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
      let data = {
        followId:item.objectId,
        followType:item.objectType,
        memberType:3
      }
      delCollectionAPI(data).then(res => {
        if (res.data.status) {
          this.$valert.show(`已取消收藏`);
          this.listQuery.pageNum = 1;
          this.loading = 0;
          this.total = 0;
          this.list = [];
          this.getCollect();
        } else {
          this.$valert.show(res.data.msg);
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
.collection{
    width: 100%;
    height: 100%;
    .resType{
        position: fixed;
        top: .64rem;
        left:0;
        width: 100%;
        height: .46rem;
        line-height: .46rem;
        overflow-x: scroll;
        white-space: nowrap;
        display: flex;
        align-items: center;
        background: #fff;
        border-bottom: .04rem solid #FDF9FE;
        h1{
            flex: 1;
            font-size: .15rem; 
            color:#666666;
            margin:0 .25rem;
            display: inline-block;
            text-align: center}
        .active{
            font-size: .17rem;color:#000;
            position: relative;
            overflow: hidden;
            height: .24rem;
            line-height: .24rem;
        }
        .active:after{
            position: absolute;
            width: 100%;
            bottom: -.07rem;
            display: block;
            border:.07rem solid #BA9F74;
            content: ' ';
            z-index: 0;
            opacity: 0.4;
        }
    }
    .dataList{
        padding-top: 1.14rem;
        li{
            padding: 0 .13rem;
            border-bottom: .005rem solid #eee;
            .col-list{
              position: relative;
              .book{
                  padding: .14rem 0;
                  display: flex;
                  img{
                      flex:  0 0 .8rem;
                      width: .8rem;
                      height: 1.15rem;
                      margin-right: .15rem;
                  }
                  .word{
                      flex: 1;
                      padding: 0.05rem 0;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-between;
                      h1{ color: #222; font-size: .16rem;height: .12rem; line-height: .12rem; padding-bottom: .02rem}
                      p{ font-size: .13rem; color: #8F8F8F;line-height: .2rem; margin-bottom: .08rem;overflow: hidden;}
                      .con-info{
                          display: flex;
                          justify-content: space-between;
                          .info-author{
                              font-size: .13rem;
                              line-height: .21rem;
                              color: #BA9F74;
                          }
                          .info-time{
                              font-size: .11rem;
                              line-height: .19rem;
                              color: #BCC1CB;
                          }
                      }
                  }
              }
              .text{
                width: 3.51rem;
                  padding: .14rem 0 ;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  .text-con{
                      padding-bottom: 0.1rem;
                      h1{
                          color: #222;
                          font-size: .15rem;
                          line-height: .2rem;
                      }
                      p{
                          
                          color: #8f8f8f;
                          font-size: .13;
                          line-height: .2rem;
                      }
                  }
                  .text-time{
                      display: flex;
                      justify-content: space-between;
                      span{

                      }
                  }
              }
              .noneCont {
                width: .6rem;
                height: 100%;
                background-color: #EE5931;
                right: -.73rem;
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
    }
    
}
</style>
