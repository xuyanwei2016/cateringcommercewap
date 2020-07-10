<template>
  <!--底部-->
  <div class="foot">
    <ul>
      <li :class="$route.path==item.link?'active':''" v-for="(item,index) in list" :key="index" @click="linkHref(item)">
        <img :src="$route.path==item.link?item.activeImg:item.img" alt="">
        <h1>{{item.name}}</h1>
      </li>

    </ul>
  </div>
</template>

<script>
import {getMemberStudio} from '@/api/studio/studio.js';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list: [
          {name: '首页', img: './static/img/shouye.png', activeImg: './static/img/shouyeAct.png', link: '/'},
          {name: '文化', img: './static/img/wenhua.png', activeImg: './static/img/wenhuaAct.png', link: '/culture'},
          {name: '中国菜', img: './static/img/cai.png', activeImg: './static/img/caiAct.png', link: '/caseList'},
          {name: '我的', img: './static/img/wode.png', activeImg: './static/img/wodeAct.png', link: '/my'},
        ],
        memberStatus:{  // 0：审核未通过 1：审核通过 2：待审核 3：禁用
              '0':()=>{
                this.$router.push({path:'studioType',query:{status:'0'}})
              },
              '1':()=>{
                this.$router.push({path:'personalStudio'})
              },
              '2':()=>{
                this.$router.push({path:'studioType',query:{status:'2'}})
              },
              '3':'',
              '4':()=>{
                this.$router.push({path:'createStudio'})
              },
            }
      }
    },
    created() {
      console.log(this.token)
    },
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    watch: {},
    methods: {
      linkHref(item) {
        if(item.name == '工作室'){
          if(this.token){
            getMemberStudio().then(res=>{
              if(res.data.code == 0){
                let data = res.data.data
                this.memberStatus[data]()
              }else{
                this.$toast.fail(res.data.msg);
              }
            })
          }else{
              this.$router.push(item.link);
          }
        }else{
          this.$router.push(item.link);
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .foot {
    width: 100%;
    height: 0.49rem;
    border-top: 1px solid #E3E3E3;
    background: #fff;
    background-size: cover;
    z-index: 15;
    position:fixed;
    bottom:0;
    ul {
      padding: 0.06rem 0.51rem 0 0.51rem;
      display: flex;
      justify-content: space-between;
      li {
        img {
          margin: 0 auto;
          width: 0.2rem;
          height: 0.2rem;
          margin-bottom: 0.05rem;
        }
        h1 {
          color: #A2A3AC;
          height: 0.12rem;
          line-height: 0.12rem;
          font-size: 0.12rem;
          font-weight: normal;
        }

      }
      .active {
        h1 {
          color: #BB0606;
        }
      }
    }
  }
</style>
