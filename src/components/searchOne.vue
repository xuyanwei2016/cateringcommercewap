<template>
    <div class="searchOne">
      <div class="search">
        <div class="searchLeft">
          <input type="text" v-model="value" placeholder="请输入搜索内容" @keypress="keyFn">
          <img src="@/assets/img/list/icon_search_shanchu.png" alt="" v-if="value!=''" @click="value='',$emit('sonFn','')">
        </div>
        <div class="searchRight" @click="cancel">
          <span>取消</span>
        </div>
      </div>
    </div>
</template>

<script>

    export default {
        name: 'HelloWorld',
        data() {
            return {
              value:'',
            }
        },
        created() {
        },
        watch: {
          value(n,o){
            if(n.trim()!=''){
              let data={val:n,boo:false};
              this.$emit('sonFn',data);
              console.log('离开页面2',this.$refs);

            }
          },
        },
        methods: {
          keyFn(e) {
            let self=this;
            if (e.keyCode === 13) {
              let data={val:this.value.trim()?this.value.trim():null,boo:true};
              self.$emit('sonFn',data);
              console.log('离开页面1',this.$refs);/*
              self.$refs.scanTextbox.setAttribute('readonly', 'readonly');*/
            }
          },
          cancel(){
            // this.$router.push({path:'/'})
            this.$router.go(-1)
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .searchOne{
    width: 100%;
    height:0.57rem;
    .search {
      //  background: url("../assets/img/list/top-bg.png") no-repeat;
       padding-top: 0.1rem;
       height: 0.57rem;
       display: flex;
       justify-content: space-between;
       .searchLeft {
         margin-left: 0.15rem;
         width: 3.1rem;
         height: 0.37rem;
         position: relative;
         input {
           background: url("../assets/img/list/nav_search.png") no-repeat #F2F2F2 0.1rem 0.1rem;
           background-size: 0.13rem 0.14rem;
           width: 3.1rem;
           height: 0.37rem;
           line-height: 0.37rem;
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
         padding-right: 0.08rem;
         text-align: left;
         margin-top:0.02rem;
         span {
           font-size: 0.14rem;
           color: #333;
           line-height: 0.33rem;
         }

       }

     }
  }

</style>
