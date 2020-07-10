<template>
  <div class="tryReadBookBox">
    <div class="tryReadBookCon">
      <h2>随园食单</h2>
      <h3>随园食单</h3>
      <ul>
        <li>白常继 作</li>
        <li>推荐 序</li>
      </ul>
      <p>学问之道，先知而后行，饮食亦然。作《须知单》。 　　
            1.先天须知　治佳肴要原料先　子才细说须知单。随园厨房有一采购兼管理员，是袁枚的老乡，对袁枚忠贞不二、勤勤恳恳、不循私情，连供货商一根烟都没抽过，进货时分角必争，能给老板省点就省点。有便宜的就不买贵的，平时因进货经常与厨房发生冲突。这天进了一批火腿，王小余不用，还大吵大叫。采购很委屈地说：“这火腿怎么小了，能用不就行了吗?咱不就买点便宜货给东家省点钱。这王小余老刁难我。”后来二人打到袁枚那里。王小余说：“物各有先天，其物天分好，我乃治；如货不好，我不做。”袁枚跟他很对脾气，将他的很多话整理后收入《随园食单》，此话就被收录在《须知单》首篇，先天须知：“凡物各有先天，如人各有资禀。人性下愚，虽孔孟教之，无益也；物性不良，虽易牙烹之，亦无味也。”此事挺为难的，都是为了工作，最后折中，凡购买贵重原料，王小余必亲至市场挑选商品。 做菜原料确实关键，而且同一原料产地不同，质量也不相同。就拿火腿来说。同为火腿，有北腿、南腿和云腿。北腿产自江苏如皋、南通；云腿产自云南宣威；南腿产自浙江金华
      </p>
      <button>购买</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tryReadBook',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .tryReadBookBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .tryReadBookCon {
      width: 100%;
      flex: 1;
      background: #fff;
      line-height: 1;
      padding: .1rem .125rem .155rem;
      h2 {
        color: #999999;
        font-size: .12rem;
      }
      h3 {
        color: #333333;
        font-size: .24rem;
        margin: .245rem 0 .195rem 0;
      }
      ul {
        li {
          color: #666666;
          font-size: .15rem;
          line-height: .225rem;
        }
      }
      p {
        color: #333333;
        font-size: .18rem;
        line-height: .28rem;
        text-indent: 2em;
        margin-top: .4rem;
      }
      button {
        display: block;
        width: 2.6rem;
        height: .39rem;
        border: none;
        outline: none;
        margin: .215rem auto 0;
        color: #FFFFFF;
        font-size: .16rem;
        background: #BB0606;
      }
    }
  }
</style>