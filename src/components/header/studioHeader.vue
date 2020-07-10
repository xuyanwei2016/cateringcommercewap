<template>
  <div class="listHeader">
    <div class="DetailTit">
      <div class="back" @click="$router.go(-1)">
        <img src="@/assets/img/list/back.png" alt="">
      </div>
      <div class="set">{{$route.meta}}</div>
      <div></div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'studioHeader',
    data() {
        return {

        }
    },
    created() {
    },
    watch: {

    },
    methods: {

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .listHeader {
    .DetailTit {
      width: 100%;
      position: fixed;
      z-index: 12;
      top: 0;
      left: 0;
      background: #BA9F74;
      // background: url("../assets/img/list/top-bg.png") no-repeat;
      // background-size: cover;
      padding-top: .1rem;
      height: .34rem;
      display: flex;
      justify-content: space-between;
      .back {
        width: .11rem;
        height: .20rem;
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
      }
      .send {
        display: block;
        height: .20rem;
        line-height: .20rem;
        color: #fff;
        font-size: .15rem;
        padding-right: .12rem;

      }
    }
  }
</style>
