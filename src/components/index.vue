<template>
  <div>
    <div class="btn" ref='remove'>
                    <span ref='btnImg' class="btn-move"
                          @touchstart='touchStart'
                          @touchmove='touchMove'
                          @touchend='touchEnd'
                          :style="slideEffect"
                    >
                    </span>
    </div>
    <p class="tt" v-show="isShow">你滑动成功了！</p>
  </div>

</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        isShow:false,
        startX:0,//开始触摸的位置
        moveX:0,//滑动时的位置
        endX:0,//结束触摸的位置
        disX:0,//移动距离
        slideEffect:'',//滑动时的效果,使用v-bind:style="deleteSlider"
      }
    },
    created() {
    },
    watch: {},
    methods: {
      touchStart:function(ev) {
        ev = ev || event;
        ev.preventDefault();
//                      console.log(ev.targetTouches);
//                      console.log(ev.changedTouches);
        if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX; // 记录开始位置
        }
      },
      touchMove:function(ev) {
        ev = ev || event;
        ev.preventDefault();
        let btnWidth = this.$refs.remove.offsetWidth;  //$refs 减少获取dom节点的消耗
        let btnImg = this.$refs.btnImg.offsetWidth;
        console.log(ev.targetTouches);
        console.log(ev.changedTouches);
        if(ev.touches.length == 1) {
          //滑动时距离浏览器左侧的距离
          this.moveX = ev.touches[0].clientX;

          //实时的滑动的距离-起始位置=实时移动的位置
          this.disX = this.moveX-this.startX;
          if(this.disX<0 || this.disX == 0) {
            this.slideEffect = 'transform:translateX(0px)';
          }else if(this.disX>0){
            this.slideEffect = 'transform:translateX('+this.disX+'px)';

            // 最大也只能等于删除按钮宽度
            if(this.disX>=btnWidth) {
              this.slideEffect = 'transform:translateX('+(btnWidth-btnImg)+'px)';
            }
          }
        }
      },
      touchEnd:function(ev){
        ev = ev || event;
        ev.preventDefault();
        let btnWidth = this.$refs.remove.offsetWidth;
        let btnImg = this.$refs.btnImg.offsetWidth;
//                      console.log(ev.changedTouches);
        if(ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          this.disX = endX-this.startX;
          console.log(this.disX,'this.disX')
          console.log((btnWidth/2),'btnWidth/2');
          if(this.disX < (btnWidth/2)) {
            this.slideEffect = 'transform:translateX(0px)';
          }else {
            this.slideEffect = "transform:translateX("+(btnWidth-btnImg)+ "px)";
            //让字段显示出来，或者写你需要的逻辑
            this.isShow = true
          }
        }
      },





    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {background: #EEEEEE;}
  .box {text-align: center;}
  .btn {
    position: relative;
    width: 70%;
    height: 40px;
    margin: 150px auto;
    border-radius: 20px;
    background: #333333;
  }
  .btn-move {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: #ededed;
  }
  .tt {
    font-size: 20px;
    color: #008000;
    text-align: center;
    margin-top: 50px;
  }

</style>
