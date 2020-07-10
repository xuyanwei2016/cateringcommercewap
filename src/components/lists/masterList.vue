<template>
  <!-- 大师列表 -->
  <div>
      <ul class="list">
        <li v-for="(item,index) in list" :key="index">
          <div class="doc"  @click="linkDetail(item)">
            <img :src="imgLink(item.img)" alt="" v-if="item.img">
            <img src="@/assets/img/list/default-avator.png" alt="" v-else>
          </div>
          <div class="info">
            <h1 @click="linkDetail(item)" v-html="item.name"></h1>
            <h2>擅长：{{item.good}}</h2>
            <p :id="`description${index}`">{{Ellipsis(`description${index}`,2,item.description,'.19')}}</p>
          </div>
        </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'masterList',
    props:{
        list:{
            type:Array,
            default:[]
        }
    },
    created() {
      
    },
    computed: {
      
    },
    watch: {},
    methods: {
      linkDetail(value){
        this.$emit('linkDetail',value);
    },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.list {
      padding: 0 .14rem;
      li {
        padding-top: .17rem;
        height: 0.95rem;
        border-bottom: 1px solid #EEEEEE;
        display: flex;
        justify-content: space-between;
        .doc {
          flex: 0 0 .73rem;
          width: 0.63rem;
          height: 0.95rem;
          img {
            margin-top: 0.06rem;
            border-radius: 50%;
            width: .63rem;
            height: .63rem;
            background: #BA9F74;
          }
        }
        .info {
            flex: 1;
          h1 {
            color: #222222;
            font-size: .15rem;
            line-height: .20rem;
            .lineOne
          }
          h2 {
            font-weight: normal;
            color: #BA9F74;
            font-size: .11rem;
            line-height: .25rem;
            .lineOne
          }
          p {
            line-height: .19rem;
            color: #333;
            font-size: .12rem;
            line-height: .18rem;
          }

        }
      }
    }
.lineOne{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
