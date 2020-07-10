<template>
  <div >
    <studio-header></studio-header>
    <div class="bg-line"></div>
    <ul class="list">
      <li v-for="(item,index) in list" :key="index" @click="linkHref(item)"><h1>
        <!-- <img :src="`./static/img/ico${index+1}.png`" alt=""> -->
        {{item.name}}</h1><span><img
        src="../../assets/img/personal/iconleft.png" alt=""></span></li>
    </ul>
  </div>
</template>

<script>
import studioHeader from '../../components/header/studioHeader.vue';
import {getMemberInfo} from '@/api/studio/studio.js';
export default {
  name: 'viewCreate',
  data() {
    return {
        list:[
            {name:'医师资格认证(推荐)',link:'typeDoctor',},
            {name:'医学院师生认证',link:'typeStudent',},
            {name:'实名认证',link:'typeReal',}
        ],
        type:{
          '0':(status)=>{
            this.$router.push({path:'typeDoctor',query:{status:status}})
          },
          '1':(status)=>{
            this.$router.push({path:'typeStudent',query:{status:status}})
          },
          '2':(status)=>{
            this.$router.push({path:'typeReal',query:{status:status}})
          },
        }
    }
  },
  components:{studioHeader},
  computed: {
    token() {  //通过方法访问
      return this.$store.state.token&&this.$store.state.token!='null'?true:false;
    },
  },
  created() {
    let query = this.$route.query
    console.log(query)
    if(this.token){
      getMemberInfo().then(res=>{
        if(res.data.code == 0){
          let data = res.data.data
          if(query&&query.status){
            // 0：审核未通过 1：审核通过 2：待审核 3：禁用
            this.$store.commit('setStudio',data)
            this.type[data.authenticationType](query.status)
          }
        }else{
          this.$toast.fail(res.data.msg);
        }
      })
    }
  },
  methods: {
    linkHref(item){
      this.$router.push({path:item.link})
    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bg-line{
    margin-top: .5rem;
    height: .1rem;
    background: #F8F8F8;
}
.list {
    background: #fff;
    li {
        margin: 0 .24rem;
        padding: .16rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #EBEBEB;
        h1 {
            font-size: .15rem;
            color: #000;
            font-weight: normal;
            height: .22rem;
            line-height: .22rem;
            display: flex;
            // img {
            //   width: .22rem;
            //   height: .22rem;
            //   padding-right: .15rem;
            //   display: inline-block;
            // }
        }
        span {
            img {
            width: .08rem;
            height: .14rem;
            }
        }
    }
}
</style>
