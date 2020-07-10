// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import Cookies from 'js-cookie';
import '@/css/index.css';
import { Toast } from 'vux';
import { XAddress } from 'vux'
Vue.component('x-address', XAddress)
import VueWechatTitle from 'vue-wechat-title';  
Vue.use(VueWechatTitle)

router.afterEach((to, from, next) => {
  document.documentElement.scrollTop = document.body.scrollTop = 0;
  window.scrollTo(0, 0);
})
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import VeeValidate,{Validator} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Validator.localize('zh_CN', zh_CN);
const config = {
  errorBagName: 'errorBags', // change if property conflicts.
  fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate,config);
Vue.component('toast', Toast)
import '@/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import { uploadUrl} from '@/utils/global.js';
import lrz from 'lrz'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Cookies);
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VideoPlayer)

import valert from './components/alertMess/index.js'
Vue.use(valert);

/*id图片路径*/
Vue.prototype.imgLink=function(id){
  return `${uploadUrl}?fileName=${id}&isOnLine=true`;
}

Vue.prototype.Ellipsis = function(id, rows, str,lineH) {
  str = str?str.replace(/<\/?[^>]*>/g, '').replace(/&nbsp;/ig,''):'';
  if (!str || str == '') {
    return ''
  }
  this.$nextTick(function () {
    var winW=document.documentElement.clientWidth;
    var text = document.getElementById(id);
    var lineHeight = lineH*100*winW/375;
    var at = rows * parseInt(lineHeight);
    var tempstr = str;
    text.innerHTML = tempstr;
    var len = tempstr.length;
    var i = 0;
    if (text.offsetHeight <= at) {
    }else {
      var temp = "";
      text.innerHTML = temp;
      while (text.offsetHeight <= at) {
        temp = tempstr.substring(0, i + 1);
        i++;
        text.innerHTML = temp;
      }
      var slen = temp.length;
      tempstr = temp.substring(0, slen - 1);
      len = tempstr.length
      text.innerHTML = tempstr.substring(0, len - 3) + "...";
      text.height = at + "px";
    }
    return str
  })


}

Vue.prototype.userName=function(val){
  let name='';
  if(val.length>1){
    name = val.length==2?val.slice(0,1)+'*':val.slice(0,1)+'**'
  }else{
    name=val;
  }
  return name;
},

Vue.prototype.thousandChina=function(el){
  if( el<1000 ){
    return el
  }else{
    return (el/1000)+'k'
  }
}

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
// router.afterEach(() => {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
