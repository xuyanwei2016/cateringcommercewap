<template>
  <!--在线课程-->
    <div class="lineLesson">
      <myHeader></myHeader>
      <ul class="dataList">
        <li v-for="(item,index) in list" :key="index">
          <div class="image" v-if="item.cover">
            <img :src="imgLink(item.cover)" alt="">
          </div>
          <div class="word" :style="{width:item.cover?'1.88rem':'100%'}">
            <h1>{{item.name}}</h1>
            <p :id="`details${index}`" >{{Ellipsis(`details${index}`,2,item.details,'.2')}}</p>
            <!--<p>{{item.details}}</p>-->
            <h2>{{status[item.status]}}</h2>
          </div>
        </li>
      </ul>
      <noHave :mess="{top:winH,loading:loading}" v-if="list.length==0"></noHave>
    </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
  import noHave from '../../components/noHave.vue';
  import {getLessonAPI} from '../../api/xnew';
    export default {
        data() {
            return {
              list:[],
              status:{1:'待审核', 2:'审核通过',3:'审核不通过', 4:'已上架', 5:'已下架'},
              total:0,
              loading: 0,
            }
        },
        components: {myHeader,noHave},
      created(){
        let winW=document.documentElement.clientWidth;
        this.winH=document.documentElement.clientHeight-(winW*44/375);
          this.getList();
      },
        methods: {
          getList(){
            getLessonAPI().then(res=>{
              this.list=res.data.data;
              this.loading=2;
              console.log('在线课程',this.list)
            })
          },

        }
    }
</script>

<style scoped lang="less">
  .lineLesson{
    width: 100%;
    height: 100%;
    background: #faf7fa;
    .dataList{
      padding-top: .44rem;
      li{
        width: 3.2rem;
        margin:.1rem auto;
        display: flex;
        justify-content: space-between;
        background: #fff;
        border-radius: .1rem;
        padding: .2rem .18rem .19rem .17rem;
        .image{
          width: 1.19rem;
          height: .89rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 1.19rem;
            height: .89rem;
          }
        }
        .image:after{
          width: .26rem;
          height: .26rem;
          position: absolute;
          /*top:0;
          left:0;*/
          content: " ";
          background: url("../../assets/img/list/video.png") no-repeat;
          background-size: cover;

        }
        .word{
          h1{ color: #202021; font-size: .15rem;height: .24rem; line-height: .24rem; padding-bottom: .02rem}
          p{ font-size: .13rem; color: #666666;line-height: .2rem;margin-bottom: .08rem}
          h2{ color: #D8D7D7; font-size: .11rem; font-weight: normal}
        }
      }
    }

  }
</style>
