<template>
    <div class="myHeader">
      <div class="DetailTit">
        <div class="back" @click="$router.go(-1)">
          <img src="../assets/img/list/back.png" alt="">
        </div>
        <div class="set">
          {{$route.meta}}
        </div>
        <div class="send">
          <img src="../assets/img/detail/share.png" alt="" v-if="$route.name=='videoDetail'">
          <img src="../assets/img/list/add.png" alt="" v-if="$route.name=='topicList'" style="width: .25rem;height: .25rem" @click="$router.push('/addTopic')">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
              num:0,
            }
        },
        created() {
        },
        watch: {},
        methods: {},
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.myHeader{
  .DetailTit {
    width: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background: #BA9F74;
    background-size: cover;
    padding-top: .1rem;
    height: .34rem;
    display: flex;
    justify-content: space-between;
    .back {
      width: .11rem;
      height: .18rem;
      padding-left: .12rem;
      padding-top: .05rem;
      img {
        width: .11rem;
        height: .18rem;
      }
    }
    .set {
      color: #fff;
      font-size: .18rem;
      font-weight: bold;
      /*padding-right: .2rem;*/
    }
    .send{
      display: flex;
      justify-content: center;
      align-items: center;
      height: .31rem;
      color: #fff;
      font-size: .15rem;
      padding-right: .12rem;
      img{
        width: .18rem;
        height: .18rem;
      }

    }
  }
}
</style>
