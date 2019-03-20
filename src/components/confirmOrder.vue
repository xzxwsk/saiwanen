<template>
  <div class='container'>
    <div class="bg"></div>
    <div class="rest_time">开通有效时间：{{detail.payRemainingTime}}</div>
    <div class="addr_box">
      <div class="title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dizhi"></use>
        </svg>
        <div class="name">{{userInfo.memname}}</div>
        <div class="txt">{{userInfo.mobileno}}</div>
      </div>
      <div class="word">{{address.conaddress ? address.conaddress : ''}}</div>
    </div>
    <div class="intro clearfix">
      <img :src="detail.covers" class="img" />
      <div class="title">{{detail.title}}</div>
      <div class="prompt">
        <div class="price">￥{{detail.price}}</div>
        <div class="state">{{detail.quantity}}</div>
      </div>
    </div>
    <div class="order_info">
      <p>订单编号：{{detail.orderno}}</p>
      <p>下单时间：{{detail.createdateStr}}</p>
    </div>
    <div class="count_label">合计：<span class="price">¥{{detail.sumamt}}</span></div>
    <input type="button" class="btn" value="确认支付" />
  </div>
</template>

<script>
/* global setTitle */
export default {
  name: 'createOrder',
  data () {
    return {
      userInfo: {
        memname: '王先生',
        mobileno: '152XXXX0011'
      },
      address: {
        conaddress: '幼儿园：四川省成都市武侯区红星幼儿园'
      },
      detail: {
        payRemainingTime: '29:00',
        covers: require('../assets/logo.png'),
        title: 'XXXXXXXXXX课程',
        price: 499.00,
        quantity: '半学期',
        orderno: '999090090XXXX',
        createdateStr: '2018-08-08 14:09:00',
        sumamt: 0.01
      }
    }
  },
  created () {
    setTitle('确认订单')
    // this.$store.commit('showLoading')
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container{height: 100%; overflow: hidden;}
.bg{position: absolute; left: 0; top: 0; z-index: 2; width: 100%; height: 2.2rem; background: #FFEAA3;}
.rest_time{position: relative; z-index: 3; margin: .5rem 0 0; text-align: center;}
.addr_box{
  display: flex; flex-direction: column; justify-content: space-between; position: relative; z-index: 3; margin: .4rem .2rem 0; padding: .4rem .2rem .2rem; width: 6.4rem; background: #fff; border-radius: 10px; box-shadow: 0 2px 2px #fff2c4; color: #333; text-align: left;
  .title {
    display: flex; flex-direction: row; justify-content: flex-start; flex: 1; font-size: .4rem; font-weight: bold; color: #000;
    .icon{
      width: .8rem; height: .8rem;
    }
    .name{
      margin: 0 .2rem 0 0;
    }
  }
  .word{
    margin: 0 0 0 .8rem;
  }
}
.intro{
  margin: .4rem .3rem; padding: 0 0 .3rem; border-bottom: 1px #ccc solid;
  .img{float: left; margin: 0 .2rem 0 0; width: 1rem; height: 1rem;}
  .title{margin: 0 0 .1rem; word-break:break-all; word-wrap: break-word;}
  .prompt{
    display: flex; flex-direction: row; justify-content: space-between;
    .state{color:#666;}
  }
}
.order_info{
  margin: 0 .3rem .2rem;
  p{line-height: 2; font-size: .3rem;}
}
.count_label{
  float: right; margin: 0 .2rem 0 0; font-weight: bold;
  .price{color: #FE3200; font-weight: normal;}
}
.btn{
  position: fixed; left: 0; bottom: 0; z-index: 10; width: 100%; height: 1rem; background-color: #FFEAA3; border: none;
}
</style>
