<template>
  <div class='details'>
    <div class='chinesBox'>
      <div class='top'>
          <img v-if='dataList.cover' :src="imgLink(dataList.cover)" alt="">
          <img v-else src="../../assets/img/list/zgcdt.png" alt="">
          <div>
              <span>浏览量：{{thousandChina(dataList.traffic)}}</span>
              <span>收藏：{{thousandChina(this.kollect)}}</span>
          </div>
      </div>
      <div class='bottom'>
          <div class='name'>{{dataList.title}}</div>
          <div class='imgName'>
              <img v-if='dataList.img' :src="imgLink(dataList.img)" alt="">
              <img v-else src="../../assets/img/list/zgctx.png" alt="">
              <span>{{dataList.author}}</span>
          </div>
      </div>
    </div>
    <div class='dosing'>
      <div class='dosingBox'>
        <h4>食材配料</h4>
        <ul>
          <li v-for='(item,index) in foodMaterial' :key='index'>
            <span>{{item.name}}</span>
            <span>{{item.dosage}}</span>
          </li>
        </ul>
        <h4>调味料</h4>
        <ul>
          <li v-for='(item,index) in foodSeasoner' :key='index'>
            <span>{{item.name}}</span>
            <span>{{item.dosage}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class='skills'>
      <div class='skillsBox'>
        <strong>技法：</strong>
        <span>{{dataList.skills}}</span>
      </div>
    </div>
    <div class='process'>
      <div class='processBox'>
        <h4>制作工序</h4>
        <div v-for='(item,index) in menuProcess' :key='index'>
          <span>{{index+1}} {{item.steps}}</span>
          <img :src="imgLink(item.cover)" alt="">
        </div>
      </div>
    </div>
    <div class="partFour">
      <h2 class="partTitle">评论</h2>
      <div class="noData" v-if="getCommentListData.length === 0">
        <dl>
          <dt>
            <img src="../../../static/img/nocomment.png" alt="">
          </dt>
          <dd>你将成为第一个发言人~</dd>
        </dl>
      </div>
      <div class="commentList" v-else>
        <commentCom v-for="( item, key ) in getCommentListData" :key="key" :item="item" />
      </div>
      <button v-if="getCommentListData.length !== 0" class="moreComments" @click="goAllComments">更多精彩评论</button>
    </div>

    <div class='bottomEnsh'>
      <div class='bottomEnshBox'>
        <input type="text" placeholder="内容这么赞，快来评论吧！"  @click="goAddComment">
        <div>
          <img src="../../assets/img/list/pinglun.png" alt="">
          <span>{{getCommentListDataTotal}}</span>
        </div>
        <div>
          <img v-if='cancelShow' src="../../assets/img/list/dsc.png" alt="" @click='collectionClick'>
          <img v-else src="../../assets/img/list/ysc.png" alt="" @click='cancelClick'>
          <span>{{collectionNum}}</span>
        </div>
      </div>
    </div>
    <div class='returnGo' @click='$router.go(-1)'></div>
  </div>
</template>
<script>
import commentCom from '../../components/sy/commentCom'
import { getMenuDetailAPI,getCollectionCountAPI,getCollectionAPI,saveCollectionAPI ,deleteCollectionAPI} from '@/api/chinesGreen/index'
import {getCommentListAPI} from '@/api/sy'
import Cookies from 'js-cookie';
export default {
  data(){
    return{
      dataList:'',
      menuProcess:'',
      foodMaterial:[],
      foodSeasoner:[],
      kollect:'',
      getCommentListData: [],
      getCommentListParams: {
        resourceId: this.$route.query.id,
        resourceType: 4,
        pageNum: 1,
        pageSize: 3,
        orderBy: null
      },
      getCommentListDataTotal:null,
      cancelShow:true,
      collectionNum:null
    }
  },
  components: {
    commentCom
  },
  beforeCreate(){
    document.title=this.$route.meta
    // document.documentElement.scrollTop = 0;
    // this.$router.afterEach((to, from, next) => {
    //     window.scrollTo(0, 0)
    // })
  },
  
  updated() {
    // window.scroll(0, 0);
    // document.documentElement.scrollTop = 0;
  },
  mounted(){
    // document.documentElement.scrollTop = 0;
    document.body.style.backgroundColor = '#F3F3F3'
    
  },
  created(){
    this.getMenuDetail()
    this.getCollectionCountList()
    this.getCommentList()
    this.getCollection()
    
  },
  computed: {
      token() {  //通过方法访问
        return this.$store.state.token&&this.$store.state.token!='null'?true:false;
      },
    },
  methods:{
    
    collectionClick(){
      if( this.token ){
        this.cancelShow = false
        this.collectionNum++
        let data = {
          goodsList:[
            {id:this.$route.query.id,type:'4'}
          ],
          goodsType:'4',
          memberId:this.dataList.memberId
        }
        saveCollectionAPI(data).then(res=>{
          if( res.data.code == 0 ){
            
          }else{
            this.$message.error(res.data.msg)
          }
        })
      }else{
        this.$router.push({
          path: 'loginPassword'
        })
      }
    },
    cancelClick(){
      this.cancelShow = true
      this.collectionNum--
      let data = {
        goodsList:[
          {id:this.$route.query.id,type:'4'}
        ],
        goodsType:'4',
        memberId:this.dataList.memberId
      }
      deleteCollectionAPI(data).then(res=>{
        if( res.data.code == 0 ){
          
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    getCollection(){
      let data = this.$route.query.id
      getCollectionAPI(data).then(res=>{
        if( res.data.code == 0 ){
          this.collectionNum = res.data.data
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    getCommentList () {
      getCommentListAPI ( this.getCommentListParams ) 
      .then ( res => {
        if ( res.data.code === 0 ) {
          this.getCommentListData = res.data.data.list
          this.getCommentListDataTotal = res.data.data.total
        }
      })
    },
    goAllComments () {
      if( this.token ){
        this.$router.push({
          path: 'allComments',
          query: {
            oid: this.$route.query.oid,
            resourceType: 4,
          }
        })
      }else{
        this.$router.push({
          path: 'loginPassword'
        })
      }
    },
    goAddComment () {
      if ( this.token ) {
        this.$router.push ({
          path: 'caseComment',
          query: {
            resourceId: this.dataList.id,
            resourceName: this.dataList.title,
            resourceType: 4
          }
        }) 
      } else {
        this.$router.push({
          path: 'loginPassword'
        })
      }
    },
    getCollectionCountList(){
      getCollectionCountAPI().then(res=>{
        if( res.data.code == 0 ){
          this.kollect = res.data.data
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    getMenuDetail(){
      let data = this.$route.query.id
      getMenuDetailAPI(data).then(res=>{
        if( res.data.code == 0 ){
          this.dataList = res.data.data
          this.menuProcess = res.data.data.menuProcess
          let food = res.data.data.menuIngredients
          food.forEach(el => {
            if( el.type == '1' ){
              let ingredient = {}
              ingredient.name = el.name
              ingredient.dosage = el.dosage
              this.foodMaterial.push(ingredient)
            }else if( el.type == '2' ){
              let seasoner = {}
              seasoner.name = el.name
              seasoner.dosage = el.dosage
              this.foodSeasoner.push(seasoner)
            }
          })
        }else{
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
  .details{
    .returnGo{
        width:0.57rem;
        height:0.305rem;
        background:url('../../assets/img/list/fanhuiRight.png') no-repeat right;
        background-size: 0.57rem 0.305rem;
        position:fixed;
        right:0;
        bottom:0.9rem;
    }
    .chinesBox{
        width:100%;
        // height:2.2rem;
        margin:0 auto 0.1rem auto;
        .top{
            width:100%;
            height:1.45rem;
            position:relative;
            img{
                width:100%;
                height:1.45rem;
            }
            div{
                width:100%;
                height:0.3rem;
                background: url(../../../static/img/caiBg.png) no-repeat;
                background-size: 100% 100%;
                position:absolute;
                bottom:0;
                font-weight: 500;
                color:#fff;
                line-height:0.3rem;
                font-size:0.13rem;
                span:nth-child(1){
                    display:inline-block;
                    width:1.5rem;
                    float:left;
                    text-align: left;
                    margin-left:0.15rem;
                }
                span:nth-child(2){
                    display:inline-block;
                    width:1.5rem;
                    float:right;
                    text-align: right;
                    margin-right:0.15rem;
                }
            }
        }
        .bottom{
            width:100%;
            height:0.75rem;
            background:#fff;
            margin:0 auto;
            .name{
                width:2.5rem;
                height:0.75rem;
                float:left;
                font-weight:bold;
                line-height:0.75rem;
                font-size:0.18rem;
                margin-left:0.15rem;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .imgName{
                width:0.5rem;
                height:0.75rem;
                float:right;
                overflow: hidden;
                margin:0 0.15rem 0 0;
                padding-top:0.09rem;
                img{
                    width:0.45rem;
                    height:0.45rem;
                    margin:0 0 0.02rem 0.02rem;
                    border-radius: 50%;
                }
                span{
                    display:inline-block;
                    width:0.5rem;
                    height:0.15rem;
                    overflow:hidden;
                    text-align: center;
                    font-size:0.09rem;
                    line-height:0.15rem;
                    color:#333;
                }
            }
        }
    }
    .dosing{
      width:100%;
      height:auto;
      background:#fff;
      padding-bottom:0.2rem;
      .dosingBox{
        width:3.45rem;
        height:auto;
        margin:auto;
        h4{
          width:100%;
          height:0.55rem;
          line-height:0.55rem;
          font-size:0.15rem;
        }
        ul{
          li{
            width:100%;
            height:0.35rem;
            line-height:0.35rem;
            span:first-child{
              float:left;
              margin-left:0.1rem;
            }
            span:last-child{
              float:right;
              margin-right:0.1rem;
            }
          }
          li:nth-child(odd){
            background:#F9F9F9;
          }
        }
      }
    }
    .skills{
      width:100%;
      min-height:0.5rem;
      margin:0.1rem auto;
      background:#fff;
      .skillsBox{
        width:3.45rem;
        margin:auto;
        font-size:0.15rem;
        line-height:0.25rem;
        padding-top:0.15rem;
      }
    }
    .process{
      width:100%;
      height:auto;
      background:#fff;
      padding-bottom:0.2rem;
      .processBox{
        width:3.45rem;
        height:auto;
        margin:auto;
        h4{
          display:inline-block;
          font-size:0.15rem;
          margin:0.2rem 0;
        }
        div{
          span{
            font-size:0.13rem;
            line-height:0.2rem;
          }
          img{
            width:3.45rem;
            height:1.75rem;
            margin:0.1rem 0 0.25rem 0;
          }
        }
      }
    }

    .partFour {
      margin-top: .05rem;
      background:#fff;
      h2 {
        color: #222222;
        font-size: .17rem;
        margin-left:0.15rem;
        padding-top:0.2rem;
        margin-top:0.1rem;
      }
      ul {
        width: 100%;
        max-height: 1.25rem;
        overflow: hidden;
        li {
          width: 100%;
          line-height: .25rem;
        }
      }
      .ulStyle {
        overflow: initial;
        height: initial;
      }
      em {
        display: block;
        width: 100%;
        height: .49rem;
        text-align: center;
        line-height: .49rem;
        img {
          display: inline-block;
          width: .125rem;
          height: .13rem;
        }
      }
    }

    .partFour {
      .commentInputBox {
        width: 100%;
        height: .37rem;
        input {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          border:none;
          outline: none;
          border: 1px solid #e8e8e8;
          text-indent: 2em;
        }
      }
      .moreComments {
        width: 100%;
        height: .59rem;
        text-align: center;
        line-height: .59rem;
        color: #C8CAD2;
        font-size: .13rem;
        border: none;
        outline: none;
        background: #fff;
      }
      .noData {
        width:100%;
        padding-top:.45rem;
        float:left;
        padding-bottom:.65rem;
        background:#fff;
        dl {
          width:1.45rem;
          margin:0 auto;
          dt {
            width:1.41rem;
            height:1.25rem;
            img {
              width:100%;
              height:100%;
            }
          }
          dd {
            text-align:center;
            margin-top:.2rem;
            color:#BDC2CB;
            font-size:.14rem;
          }
        }
      }
    }
    .goCritic{
      display:block;
      height:0.6rem;
      line-height:0.6rem;
      text-align:center;
      color:#C8CAD2;
      font-size:0.13rem;
    }
    .bottomEnsh{
      width:100%;
      height:0.49rem;
      border-top:0.01rem solid #eee;
      background:#fff;
      float:left;
      .bottomEnshBox{
        width:3.45rem;
        height:100%;
        margin:auto;
        input{
          width:2.225rem;
          height:0.33rem;
          border-radius: 0.16rem;
          float:left;
          line-height:0.33rem;
          background:rgba(241,241,243,1);
          color:#ADADAD;
          margin-top:0.08rem;
          border:none;
          margin-right:0.22rem;
          padding-left:0.2rem;
        }
        div{
          width:0.35rem;
          height: 0.2rem;
          margin-top: 0.17rem;
          float:left;
          img{
            width:0.15rem;
            height:0.15rem;
            float:left;
            margin-right: 0.05rem;
          }
          span{
            display:block;
            float:left;
          }
        }
        div:nth-child(2){
          margin-right:0.1rem;
        }
      }
    }
  }
</style>
