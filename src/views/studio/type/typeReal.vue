<template>
  <!--实名认证-->
  <div class="authentication">
    <studioHeader></studioHeader>
    <div class="authentication-con">
      <van-form @submit="onSubmit" label-width="90" input-align="right">
        <van-field v-model="form.name" label="姓名" name="name" placeholder="请输入真实姓名 与证件保持一致" :disabled="disabled" class="require-red" :rules="[{ required: true, message: '' }]" />
        <van-field class="require-red" readonly clickable name="sex"  label="性别" :disabled="disabled"
          :value="form.sex" placeholder="选择性别" @click="disabled?'':showPicker = true"/>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
        <!--  省市区 -->
        <van-field class="require-red" readonly clickable name="area" :value="form.areaStr" :disabled="disabled"
          label="地区" placeholder="点击选择省市区" @click="disabled?'':showArea = true"/>
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="saveArea" @cancel="showArea = false"/>
        </van-popup>
        <!-- <van-field v-model="form.name" label="姓名" name="name" placeholder="请输入真实姓名 与证件保持一致" class="require-red" :rules="[{ required: true, message: '' }]" />
        <van-field class="require-red" readonly clickable name="sex"  label="性别"
          :value="form.sex" placeholder="选择性别" @click="showPicker = true"/>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" confirm="onConfirm" />
        </van-popup> -->
        <!--  省市区 -->
        <!-- <van-field class="require-red" readonly clickable name="area" :value="form.areaStr"
          label="地区" placeholder="点击选择省市区" @click="showArea = true"/>
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="saveArea" @cancel="showArea = false"/>
        </van-popup> -->


        <van-field v-model="form.master" class="no-require" label="师承" name="master" :disabled="disabled" placeholder="" />
        <van-field  v-model="form.good" class="require-red" rows="2" autosize  label="擅长" name='good' :disabled="disabled"
              type="textarea" maxlength="50" placeholder="如擅长使用食疗治疗失眠等" show-word-limit/>
        <van-field v-model="form.synopsis" class="require-red" rows="2" autosize  label="简介" name="synopsis" :disabled="disabled"
              type="textarea" maxlength="200" placeholder="如毕业于北京中医药大学，从事中医行业20多年且对养生保健有独到的见解" show-word-limit/>
        <van-field name="idcard" class="no-require" label="身份证正反面">
          <template #input>
              <div class="id-pic">
                  <div class="pic">
                      <van-uploader  v-model="idcardImgFront" :after-read="readIdF" @delete="deleteIdF" :disabled="disabled" multiple :max-count="1"/>
                      <van-uploader v-model="idcardImgBack" :after-read="readIdB" @delete="deleteIdB" :disabled="disabled" multiple :max-count="1"/>
                      <div class="img-id" @click="openImg('id-front.png')">
                        <img src="@/assets/img/studio/id-front.png" alt="">
                        <div><span>示例</span></div>
                      </div>
                      <div class="img-id" @click="openImg('id-back.jpg')">
                        <img  src="@/assets/img/studio/id-back.jpg" alt="">
                        <div><span>示例</span></div>
                      </div>
                      <van-overlay :show="show" @click="show = false">
                        <div class="wrapper" @click="show = false">
                          <div>
                            <img class="open-img" :src="`../../../assets/img/studio/${imgAdd}`" alt="">
                          </div>
                        </div>
                      </van-overlay>
                  </div>
              </div>
            
          </template>
        </van-field>
        <div class="check-agree">
          <van-checkbox v-model="checked" checked-color="#BA9F74" icon-size=".14rem">
            <span class="text">已阅读并同意</span>
            <span class="agree">《医道传承工作室使用协议》</span>
          </van-checkbox>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" :disabled="disabled">
            提交
          </van-button>
        </div>
      </van-form>
      
    </div>
    <div class="tip" v-if="showTip">
      <div class="tip-con">
        <img  src="@/assets/img/studio/add-bg.png" alt="">
        <span>
          您的认证资料我们已经收到！请耐心等待1~3个工作日，审核结果我们会以手机短信的方式通知您，感谢您的理解和支持！
        </span>
      </div>
      
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import studioHeader from '../../../components/header/studioHeader.vue';
  import {uploadSchoolAPI,saveAPI,updateAPI} from '@/api/studio/studio.js';
  import { imgAdd } from '@/utils/global.js';
  import mapList from './gaode.json'
  export default {
    name: '',
    data() {
      return {
        uploadUrl:imgAdd,
        checked:false,
        show:false,
        imgAdd:'',
        showNext:true,  // 是否显示下一步
        form:{           // 表单
          name:'',       // 姓名
          sex:'男',      // 性别
          area:"",       // 地区
          city:"",
          province:'',
          master:"",     // 师承
          areaStr:'',
          synopsis:"",  // 简介
          good:"",        // 擅长
          // idcard:"",              // 证件类型
          idcardImgFront:'',     // 身份证
          idcardImgBack:'',

        },
        idcardImgFront:[],
        idcardImgBack:[],
        showPicker: false,
        columns: ['男', '女'],
        showArea:false,
        areaList:{
          province_list: {},
          city_list: {},
          county_list: {}
        },

        map:{},
        showTip:false,
        pushStatus:false,
        memberStatus:'1',
        id:'',
        disabled:false,
      }
    },
    computed: {
      studioData() {  //通过方法访问
        return this.$store.state.studioData;
      },
    },
    components: {studioHeader},
    created() {
      this.areaList = this._initData(mapList.districtList)
      let query = this.$route.query
      if(query){
        // 0：审核未通过 1：审核通过 2：待审核 3：禁用
        this.memberStatus = query.status
        if(this.memberStatus == '2'){
          this.disabled = true
        }else{
          this.disabled = false
        }
        let data = this.studioData
        console.log(data)
        this.form = {
          name:data.name,       // 姓名
          sex:data.sex == 0?'女':'男',      // 性别
          area:data.area,       // 地区
          city:data.city,
          province:data.province,
          areaStr:this._changeMap(data.area, data.city,data.province,this.areaList), 
          master:data.master,     
          synopsis:data.synopsis||'',  // 简介
          good:data.good||'',        // 擅长
          idcardImgFront:data.idcardImgFront,       // 身份证
          idcardImgBack:data.idcardImgBack,
        }
        this.id = data.id
        this.idcardImgFront=this._changePic(data.idcardImgFront,this.uploadUrl)     // 身份证
        this.idcardImgBack=this._changePic(data.idcardImgBack,this.uploadUrl)
      }
    },
    watch: {

    },
    methods: {

      // 返显示数据
      _changeMap(area,city,province,list){
        let str = list['province_list'][province]+'/'+list['city_list'][city]+'/'+list['county_list'][area]
        return str
      },
      /* 返显图片 */
      _changePic(url,address){
        let arr =[]
        let str
        // http://122.14.50.6:2018/file/file/?fileName=9bddc98d2c754bb382ec3aeced35a8ef&isOnLine=true
        if(url){
          console.log(address)
          str = `${address}?fileName=${url}&isOnLine=true`
        }
        arr.push({ url:str,isImage: true })
        return arr
      },
      /* 地图数据 */
      _initData(data){
        let list ={
            province_list:{},
            city_list:{},
            county_list:{}
        }
        function fun(data){
            data.forEach(el => {
                switch(el.level){
                    case "province":
                        list.province_list[el.adcode] = el.name
                    break;
                    case "city":
                        list.city_list[el.adcode] = el.name
                    break;
                    case "district":
                        list.county_list[el.adcode] = el.name
                    break; 
                }
                if(el.districtList&&el.districtList.length > 0){
                    fun(el.districtList)
                }
            });
        }
        fun(data)
        return list
      },



      // 选择性别
      onConfirm(value) {
        this.form.sex = value;
        this.showPicker = false;
      },
      
      // 选择省市区
      saveArea(value) {
        this.form.province  = value[0].code
        this.form.city  = value[1].code
        this.form.area = value[2].code
        this.form.areaStr = value.map(item => item.name).join('/');
        this.showArea = false
      },
      /* 上传图片 */
      readIdF(file){
        this._picture(this,file.file,'idcardImgFront')
      },
      readIdB(file){
        this._picture(this,file.file,'idcardImgBack')
      },
      _picture(that,file,key){
        let formData = new FormData()
        formData.append('file', file)
        uploadSchoolAPI(formData).then(res => {
            if(res.status == '200'){
                that.$message.success('上传图片成功')
                that.form[key] = res.data
            }else{
                that.$message.error('图片上传失败')
            }
        })
      },
      /* 删除图片 */
      deleteIdF(){
        this.form.idcardImgFront = ''
      },
      deleteIdB(){
        this.form.idcardImgBack = ''
      },

      // 提交表单
      onSubmit(values) {
        if(this.pushStatus) return 
        if(!this.checked){
          this.$toast('请勾选工作室使用协议');
          return
        }
        let status = this._validator(this.form)
        if(status){
          this.form.sex = this.form.sex==='男'?1:0
          this.form.authenticationType = 2
          let API
          console.log(this.memberStatus)
          if(this.memberStatus == "0"){
            this.form.id = this.id
            API = updateAPI(this.form)
          }else{
            API = saveAPI(this.form)
          }
          API.then(res => {
            if(res.data.code == '0'){
              this.pushStatus = true
                this.showTip = true
                setTimeout(()=>{
                  this.showTip = false
                  this.pushStatus = false
                  this.$router.push({path:'viewStudio'})
                },10000)
            }else{
                this.$toast.fail(res.data.msg);
            }
            // this.form
          })
        }
      },
      /* 查看大图 */
      openImg(img){
        this.show = true
        this.imgAdd = img
      },
      /* 验证规则 */
      _validator(data){
        let status = false
        let num = 0
        var valid={
          'name':(val) =>{
            if(status) return
            status = true
            if(val.length>10){
              this.$toast('姓名不超过10个字');
            }else if(val.length ==0){
              this.$toast('姓名不能为空');
            }else{
              status = false
              num++
            }
          },
          'sex':function(val){
            num++
          },
          'area':(val) =>{
            if(status) return
            status = true
            if(val.length ==0){
              this.$toast('请选择地区');
            }else{
              status = false
              num++
            }
          },
          'areaStr':function(val){
          },
          'city':function(val){
          },
          'province':function(val){
          },
          'master':function(val){
            num++
          },
          'good':(val)=>{
            if(status) return
            status = true
            if(val.length>50){
              this.$toast('擅长不超过50个字');
            }else if(val.length ==0){
              this.$toast('擅长不能为空');
            }else{
              status = false
              num++
            }
          },
          'synopsis':(val)=>{
            if(status) return
            status = true
            if(val.length>200){
              this.$toast('简介不超过200个字');
            }else if(val.length ==0){
              this.$toast('简介不能为空');
            }else{
              status = false
              num++
            }
          },
          'idcardImgFront':(val) =>{
            if(status) return
            status = true
            if(val.length ==0){
              this.$toast('请上传身份证正面照片');
            }else{
              status = false
              num++
            }
          },
          'idcardImgBack':(val) =>{
            if(status) return
            status = true
            if(val.length ==0){
              this.$toast('请上传身份证反面照片');
            }else{
              status = false
              num++
            }
          },
        }
        for(let key in data){
          console.log(key,data[key])
          valid[key](data[key])
        }
        return num===8? true:false
      }

    },
  }
</script>
<style lang="less">
.no-require::before{
  content: "*";
  color: #fff;
  width: 0.08rem;
}
.require-red::before{
  content: "*";
  color: red;
  width: 0.08rem;

}

.van-button--info{
    background: #BA9F74;
    border: #BA9F74;
}
.id-pic{
    position: relative;
    height: 1rem;
    .pic{
        position: absolute;
        top: .3rem;
        right: 0;
        display: flex;
      .img-id{
        height: .7rem;
        width: .7rem;
        margin-right: .1rem;
        margin-bottom: .1rem;
        position: relative;
        img{  
          height: .7rem;
          width: .7rem;
          border-radius: .04rem;
        }
        div{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: .27rem;
          text-align: center;
          background: rgba(0,0,0,0.4);
          border-bottom-left-radius: 0.04rem;
          border-bottom-right-radius: 0.04rem;
        }
      }
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        div{
          width: 2rem;
          height: 2rem;
          background-color: #fff;
          .open-img{
            display: block;
            width: 2rem;
            height: 2rem;
          } 
        }
      }
    }

}

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.authentication{
  position: relative;
  .authentication-con{
    margin-top: .5rem;
  }
  .tip{
    position: fixed;
    margin: 0 .35rem;
    top: 2.5rem;
    background: rgba(0,0,0,0.7);
    border-radius: .04rem;
    
    .tip-con{
      padding: .28rem .18rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        margin-bottom: .06rem;
      }
      span{
        color:#f8f8f8;
        font-size: .14rem;
        line-height: .22rem;
      }
    }
    
  }
}
.check-agree{
  margin-bottom: .5rem;
  margin-top: .1rem;
  padding: 0 .1rem;
  display: flex;
  flex-direction: row;
  font-size: .12rem;
  .text{
    color: #999999;
  }
  .agree{
    color: #BB9D75;
  }
}
</style>
