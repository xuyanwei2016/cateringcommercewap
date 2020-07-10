<template>
  <div class="addressListBox">
    <ul>
      <li @click="clickThisItem( key )" v-for="( item, key ) in getAddressListData" :key="key">
        <div>
          <span>{{ item.province }}  &nbsp;&nbsp;{{ item.receiver }}</span>
          <span v-if="item.isDefault === 1">默认</span>
        </div>
        <p>{{ item.city }}  &nbsp;&nbsp;{{ item.district }}{{ item.detailed }}  &nbsp;&nbsp;{{ item.mobile }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getAddressListAPI
} from '@/api/sy'
export default {
  name: 'addressList',
  data () {
    return {
      getAddressListParams: {
        pageNum: 1,
        pageSize: 10,
      },
      getAddressListData: []
    }
  },

  mounted () {
    this.getAddressList()
  },

  methods: {
    getAddressList () { 
      getAddressListAPI ( this.getAddressListParams )
      .then ( res => {
        console.log(res, '收获地址列表')
        if ( res.data.code === 0 ) {
          this.getAddressListData = res.data.data.list
        }
      })
    },

    clickThisItem ( key ) {
      this.$router.push({
        path: 'confirmOrder',
        query: {
          _index: key
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.addressListBox {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #f5f5f5;
  ul {
    width: 100%;
    background: #fff;
    padding: 0 .125rem;
    padding-top: .175rem;
    li {
      width: 100%;
      border-bottom: 1px solid #eee;
      padding-bottom: .245rem;
      margin-top: .175rem;
      &:first-child {
        margin-top: initial;
      }
      &:last-child {
        border:none;
      }
      div {
        span:nth-of-type(1) {
          color: #333333;
          font-size: .15rem;
          font-weight:bold;
        }
        span:nth-of-type(2) {
          color: #FFFFFF;
          font-size: .12rem;
          padding: .025rem .045rem;
          background: #BB0606;
          border-radius: 6px;
          margin-left: .19rem;
        }
      }
      p {
        color: #333333;
        font-size: .14rem;
        margin-top: .1rem;
        line-height: .22rem;
      }
    }
  }
}
</style>