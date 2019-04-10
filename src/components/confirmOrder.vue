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
    <input type="button" class="btn" value="确认支付" @click="onPay" />
  </div>
</template>

<script>
/* global setTitle, WeixinJSBridge */
export default {
  name: 'createOrder',
  data () {
    return {
      loadFlag: false,
      orderid: '',
      userInfo: {
        memname: '',
        mobileno: ''
      },
      address: {
        conaddress: ''
      },
      detail: {
        payRemainingTime: '',
        covers: require('../assets/logo.png'),
        title: '',
        price: 0,
        quantity: '',
        orderno: '',
        createdateStr: '',
        sumamt: 0
      },
      brandWCPayRequest: {}
    }
  },
  created () {
    setTitle('确认订单')
    // this.$store.commit('showLoading')
    this.orderId = this.$route.params.orderId
    this.userInfo = this.$route.params.userInfo
    this.address = this.$route.params.address
    this.initPage(this.orderId)
  },
  methods: {
    // 获取订单详情
    initPage (orderId) {
      this.axios.get('/wxapp/getOrderDetails', {
        params: {
          orderid: orderId
        }
      }).then(res => {
        console.log('订单详情：', res.data.data)
        if (res.data.data) {
          this.detail = res.data.data
        }
        this.loadFlag = true
      }).catch(errMsg => {
        console.error(errMsg) // 错误提示信息
      })
    },
    // 付款
    onPay (e) {
      console.log('orderId: ', this.orderId)
      this.axios.get('/weixinpay/buileorder_weixinpay', {
        params: {
          orderid: this.orderId
        }
      }).then(res => {
        console.log('获取支付参数结果：', res.data.data)
        this.brandWCPayRequest = res.data.data
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
          }
        } else {
          this.onBridgeReady()
        }
      })
    },
    onBridgeReady () {
      let getBrandWCPayRequest = this.brandWCPayRequest
      getBrandWCPayRequest.package = getBrandWCPayRequest._package
      let me = this
      console.log('getBrandWCPayRequest: ', getBrandWCPayRequest)
      // alert('支付参数brandWCPayRequest: ' + JSON.stringify(getBrandWCPayRequest))
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', getBrandWCPayRequest,
        function (res) {
          console.log(res.errMsg)
          // alert('支付结果res: ' + JSON.stringify(res))
          if (res.errMsg.indexOf('ok') !== -1) {
            // 支付成功
            // wx.miniProgram.redirectTo({url: 'pages/login/login'})
            // 跳转公众号
            me.doLocation('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5MDgwOTEyNw==#wechat_redirect')
          } else if (res.errMsg.indexOf('cancel') !== -1) {
            // 放弃支付
            console.log('放弃支付')
          } else {
            // 支付失败
            me.weui.alert('支付失败！')
          }
        })
    },
    doLocation (url) {
      var a = document.createElement('a')
      if (!a.click) {
        window.location = url
        return
      }
      a.setAttribute('href', url)
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
    }
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
