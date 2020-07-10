<template>
  <!--互动详情-->
    <div class="interactionDetail">
      <myHeader></myHeader>
      <div class="interaction lineCss">
        <h1>{{detail.name}}</h1>
        <p>{{detail.content}}</p>
        <img :src="imgLink(detail.image)" alt="" v-if="detail.image">
        <img :src="imgLink(detail.twoImage)" alt="" v-if="detail.twoImage">
        <img :src="imgLink(detail.threeImage)" alt="" v-if="detail.threeImage">
        <img :src="imgLink(detail.fourImage)" alt="" v-if="detail.fourImage">
        <img :src="imgLink(detail.fiveImage)" alt="" v-if="detail.fiveImage">
      </div>


      <!--评论列表-->
      <div class="evaluate">
        <div class="tit">全部评论 <!--<span>({{total}})</span>--></div>
        <div class="send">
          <input v-model="value" type="text" placeholder="内容这么赞，快来评论吧！" @keypress="keyFn"><!---->
          <!--<h1 @click="keyFn">确定</h1>-->
        </div>
        <div class="list" v-if="data&&data.length>0" v-for="(item,index) in data" :key="index">
          <div class="every" v-if="index<10">
            <div class="head">
              <img v-if="item.userImg" :src="imgLink(item.userImg)" alt="">
              <img src="../../assets/img/detail/head.png" alt="" v-else>
            </div>
            <div class="word">
              <div class="start">
                <h1>{{item.userName}}</h1>
                <!--<div class="fraction">
                  <ul>
                    <li class="startY"><span v-for="item in item.score"></span></li>
                    <li class="startK" v-for="item in 5"></li>
                  </ul>
                  <h2><span>{{item.score}}</span>分</h2>
                </div>-->
              </div>
              <p>
                {{item.content}}
              </p>

              <div class="other">
                <h1>{{item.releaseTime}}</h1>
                <ul>
                  <li
                    @click="$router.push({path:'/commentDetail',query:{id:$route.query.id,mainId:item.id,type:'话题详情'}})">
                    <img src="../../assets/img/detail/eval.png" alt="">{{item.score}}
                  </li>
                  <li @click="agree(item)">
                    <img src="../../assets/img/detail/fabulousB.png" alt="" v-if="item.isAgree">
                    <img src="../../assets/img/detail/fabulous.png" alt="" v-else>
                    {{item.fabulousNum}}
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <!--<div class="more" v-if="loading==1&&data.length>0&&!noMore">加载中...</div>-->
          <div class="noHave" v-if="noMore&&data.length>0">
            这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
          </div>


        </div>

        <div class="more" @click="data.length>0&&toMore()">{{data && data.length > 0 ? '查看更多留言>>' : '快去评论吧...'}}</div>
      </div>

      <div class="foot">
        <ul>
          <li @click="linkFn"><img :src="`./static/img/${comment}.png`" alt=""><span>({{commentTotal}})</span></li>
          <li @click="collectionFn"><img :src="`./static/img/${collection}.png`" alt=""></li>
        </ul>
      </div>

    </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
  import {getTopicDetailAPI,getCommentsListAPI,saveTopicCommentAPI,givethumbsUpAPI} from '../../api/xnew';
    export default {
        data() {
            return {
              comment:'com',
              collection:'love',
              detail:{},
              commentTotal:11,
              total:2,
              value:'',
              object: {bookDetail: 1,},
              data:[],
              noMore:false,
              commentList:[],
              pageSize:10,
              pageNum:1,
              isAgree:true,
            }
        },
        components: {myHeader},
      computed:{
        token() {  //通过方法访问
          return this.$store.state.token;
        },
      },
      created(){
          this.getDetail();
          this.getCommentList();
      },
        methods: {
        getDetail(){

          getTopicDetailAPI(this.$route.query.id).then(res=>{
            this.detail=res.data.data;
            this.collection=this.detail.thumbsUp==1?'loveB':'love';
          })
        },
          getCommentList(){
            getCommentsListAPI({
              id:this.$route.query.id,
              pageNum:this.pageNum,
              pageSize:this.pageSize,
            }).then(res=>{

              this.data=res.data.data.list;
              this.commentTotal=res.data.data.total;
            })
          },
          linkFn(){
            if(this.token){
              this.$router.push({path:'/comment',query:{id:this.$route.query.id,type:"话题详情"}});
            }else{
              this.$router.push('/loginPassword');
            }
          },
          collectionFn(){
            /*givethumbsUpAPI({
              commentId:this.$route.query.id,
              singin:this.token?1:0,
              action:1,//操作类型 0:取消点赞，1：点赞
              type:0,
            }).then(res=>{
              this.$valert.show('点赞成功');
            })*/

            if(!this.token){
              this.$router.push('/loginPassword');
              return}
              //取消点赞接口没有
            /*let API=this.detail.thumbsUp==1?delCollectAPI:givethumbsUpAPI;*/
            givethumbsUpAPI({
              commentId:this.$route.query.id,
              singin:this.token?1:0,
              action:this.detail.thumbsUp==1?0:1,//操作类型 0:取消点赞，1：点赞
              type:0,
              }
            ).then(res => {
              if (res.data.status) {
               /* this.detail.thumbsUp=this.detail.thumbsUp==1?0:1;*/
                this.$set(this.detail,'thumbsUp',this.detail.thumbsUp==1?0:1);
                this.collection=this.detail.thumbsUp==1?'loveB':'love';
                this.$valert.show(`${this.detail.thumbsUp==1?'已点赞':'已取消点赞'}`);
              }
            })

          },

          keyFn(e) {
            let self = this;
            /*e.keyCode === 13*/
            if (e.keyCode === 13) {
              if (!this.token) {
                this.$router.push('/loginPassword');
                return
              }
              var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,str='';
              str=this.value.replace(regStr,"");


              if (this.value.trim() == '') {
                this.$valert.show('请输入内容');
                return
              } else{
                if(str.length < 3){
                  if(regStr.test(this.value)){
                    this.$valert.show('暂不支持表情输入');
                  }else{
                    this.$valert.show('输入的评论内容3-300字以内');
                  }
                  return
                }

              }
              saveTopicCommentAPI({
                accessMedium: 3,
                content: str,
                fatherId: 0,
                mainId: 0,
                resourceId: this.$route.query.id,
                resourceName: this.detail.name,
                score: 5,
              }).then(res => {
                if (res.data.code==0) {
                  self.$valert.show('评论成功');
                  self.value = '';
                  self.getCommentList();
                } else if(res.data.code==1){
                  self.$valert.show(res.data.msg);
                  self.$router.push('/loginPassword');
                } else {
                  self.$valert.show(res.data.msg);
                }

              })
            }
          },
          toMore() {
            this.$router.push({path: '/comment', query: {id: this.$route.query.id, type: '话题详情'}});
          },
          /*评论点赞*/
          agree(item){
            if(!this.token){
              this.$router.push('/loginPassword');
              return
            }
            if(item.isAgree==1){this.$valert.show('已点赞成功');return}
            if(!this.isAgree){return}
            this.isAgree=false;
            givethumbsUpAPI({
                commentId:item.id,
                singin:this.token?1:0,
                action:1,//操作类型 0:取消点赞，1：点赞
                type:1,
              }
            ).then(res => {
              if (res.data.status) {
                this.$valert.show('点赞成功');
                item.fabulousNum++;
                this.$set(item,'isAgree',1);
                this.isAgree=true;
                /*this.detail.thumbsUp=this.detail.thumbsUp==1?0:1;
                this.collection=this.detail.thumbsUp==1?'collectionB':'love';*/
                /*this.$valert.show(`${this.detail.thumbsUp==1?'已点赞':'已取消点赞'}`);*/
              }
            })

          },
        }
    }
</script>

<style scoped lang="less">
  .interactionDetail{
    .interaction{
      padding: .44rem .15rem .2rem .15rem;
      h1{color: #333333;font-size: .16rem; line-height: .18rem;padding: .2rem 0;}
      p{
        line-height: .22rem;
        font-size: .13rem;
        color: #454545;
        text-indent: 2em;
      }
      img{
        max-width: 100%;
        margin-top: .1rem;
      }

    }

    /*精彩评价*/
    .evaluate {
      padding: .2rem .14rem 0 .14rem;
      margin-bottom: .5rem;
      .tit {
        height: 0.36rem;
        font-size: .17rem;
        color: #222222;
        font-weight: bold;
        span {
          color: #454545;
          font-weight: normal;
          font-size: .14rem;
        }
      }
      .send {
        width: 100%;
        height: 0.34rem;
        margin-bottom: 0.34rem;
        input {
          width: 3.2rem;
          display: block;
          height: 0.34rem;
          background: #E7ECEF;
          border-radius: 0.17rem;
          border: none;
          padding: 0 0.15rem;
        }
        input::-webkit-input-placeholder {
          color: #BBBBBB;
        }
        input::-o-input-placeholder {
          color: #BBBBBB;
        }
        input::-moz-input-placeholder {
          color: #BBBBBB;
        }
        input::-ms-input-placeholder {
          color: #BBBBBB;
        }
      }

      .list {
        .every {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #EEEEEE;
          margin-bottom: 0.2rem;
          .head {
            width: .4rem;
            height: .4rem;
            img {
              width: .4rem;
              height: .4rem;
              border-radius: 50%;
            }
          }
          .word {
            width: 3rem;
            .start {
              width: 100%;
              display: flex;
              justify-content: space-between;
              height: .36rem;
              align-items: center;
              h1 {
                font-size: 0.16rem;
                font-weight: bold;
                color: #222;
              }
              .fraction {
                height: .36rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                ul {
                  width: 100%;

                  height: 0.25rem;
                  position: relative;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  li {
                    float: left;
                    padding-right: 0.05rem;
                    width: 0.1rem;
                    height: 0.1rem;
                  }
                  .startY {
                    position: absolute;
                    width: 100%;
                    span {
                      float: left;
                      padding-right: 0.05rem;
                      display: block;
                      width: 0.1rem;
                      height: 0.1rem;
                      background: url("../../assets/img/detail/start1.png") no-repeat;
                      background-size: contain;
                    }
                  }
                  .startK {
                    background: url("../../assets/img/detail/start.png") no-repeat;
                    background-size: contain;
                    /*margin-left: -0.2rem;*/
                  }

                }
                h2 {
                  font-size: .08rem;
                  -webkit-text-size-adjust: none;
                  font-weight: normal;
                  color: #F66B23;

                  span {
                    font-size: .13rem;
                    font-weight: bold;
                    padding-right: 0.02rem;
                  }
                }
              }
            }
            p {
              line-height: .22rem;
              font-size: .13rem;
              color: #454545;
              margin-bottom: .15rem;
              /*text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 5;
              -webkit-box-orient: vertical;*/
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 5;
              flex-direction: column;
              max-height: 1.1rem;
            }

            .other {
              display: flex;
              justify-content: space-between;
              padding-bottom: .16rem;

              h1 {
                font-size: .13rem;
                color: #888888;
                font-weight: normal;

              }
              ul {
                display: flex;
                justify-content: flex-start;
                li {
                  color: #888888;
                  padding-left: .17rem;
                  display: flex;
                  justify-content: flex-start;
                  img {
                    height: .12rem;
                    display: inline-block;
                    margin-right: .04rem;
                  }
                }
              }
            }
          }
        }
      }
      .more {
        width: 100%;
        text-align: center;
        font-size: .13rem;
        color: #C8CAD2;
        padding-bottom: 0rem;
      }

    }

    .foot{
      position: fixed;
      z-index: 20;
      bottom: 0;
      margin-bottom: -.06rem;
      left: 0;
      height: 0.5rem;
      width: 100%;
      background: #fff;
      box-shadow: 0.05rem 0.05rem 0.1rem 0.05rem rgba(0,0,0,0.1);
      ul{
        padding: 0.12rem 0.8rem 0 0.8rem;
        display: flex;
        justify-content: space-between;
        li{
          display: flex;
          align-items: center;
          a{
            display: flex;
            align-items: center;
          }
          img{
            width: 0.24rem;
          }

          span{
            font-size: 0.13rem;
            color: #999999;
            padding-left: 0.05rem;
          }
        }
        li:first-child img{width: 0.22rem;}
      }

    }
  }
</style>
