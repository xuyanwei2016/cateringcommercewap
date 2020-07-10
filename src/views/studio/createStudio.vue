<template>
  <!--民族列表-->
    <div>
        <div class="cerateStudio">
            <div class="create-title">创建工作室</div>
            <span class="create-text">资源共享，有偿付出 </span>
            <span class="create-text">自由沟通，在线出版</span>
            <img class="create-img" :src="imgBg" alt="">
            <div class="create-now">
                <span @click="linkHref">立即进行认证</span>
            </div>
        </div>

      <Foot></Foot>
    </div>
</template>

<script>
import Foot from '../../components/Foot.vue';
import { uploadUrlT} from '@/utils/global.js';

import imgBg from '@/assets/img/studio/ad-bg.png';
export default {
    name: '',
    data() {
        return {
            imgBg:imgBg,
            
        }
    },
  components:{
    Foot,
  },
  computed: {
    token() {  //通过方法访问
      return this.$store.state.token&&this.$store.state.token!='null'?true:false;
    },
  },
  created() {
    console.log(this.token)
    
  },
  watch: {},
  methods: {
    /*详情*/
    linkHref(val){
      if(!this.token){
        this.$router.push('/loginPassword');
      }else{
        this.$router.push({path:'/studioType'})
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cerateStudio{
    display: flex;
    flex-direction: column;
    align-items: center;
    .create-title{
        margin-top: 1.5rem;
        margin-bottom: .21rem;
        font-size: .27rem;
        font-weight: SC-Heavy;
        line-height: .3rem;
        color: #333;
    }
    .create-text{
        font-size: .12rem;
        color: #666;
        line-height: .2rem;
    }
    .create-img{
        margin-top: .15rem;
        margin-bottom: .77rem;
    }
    .create-now{
        margin: 0 .2rem;
        span{
            padding: .145rem 1rem;
            border-radius: .45rem;
            background: #BB9E73;
            font-size: .17rem;
            line-height: .19rem;
            color: #eee;
        }
    }
}
</style>
