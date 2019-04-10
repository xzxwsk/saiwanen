<template>
  <div class='container'>
    <div class="bg"></div>
    <div class="addr_box">
      <div class="title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dizhi"></use>
        </svg>
        <div class="name">{{userInfo.memname}}</div>
        <div class="txt">{{userInfo.mobileno}}</div>
      </div>
      <div class="word" @click="onSelectAddr">{{address.conaddress ? address.conaddress : ''}}</div>
    </div>
    <div class="intro">
      <img :src="detail.covers" class="img" />
      <div class="title">{{detail.title}}</div>
    </div>
    <div class="detail">简介：{{detail.detaildescStr}}</div>
    <div class="ls" v-for="(item, index) in spec" :key="index">
      <div class="txt">{{item.specname}} <span v-if="item.show"><span class="price">{{item.discount}}</span>元</span></div>
      <input v-if="item.show" type="button" class="btn" value="购买" @click="onConfirmOrder(index)" />
    </div>
    <!--<div><input type="button" value="跳转公众号" @click="onGoWx"></div>-->
  </div>
</template>

<script>
/* global setTitle, WeixinJSBridge */
export default {
  name: 'createOrder',
  data () {
    return {
      loadFlag: false,
      // 跳转下单时使用
      proid: '',
      userInfo: {
        memname: '', // '王先生'
        mobileno: '' // '152XXXX0011'
      },
      // 当前地址
      address: {
        addid: '',
        conaddress: '',
        index: 0
      },
      // 地址列表
      addressLs: [],
      detail: {
        covers: require('../assets/logo.png'),
        title: '',
        detaildescStr: ''
      },
      // 规格
      spec: []
    }
  },
  created () {
    let proid = this.$route.params.prodid
    this.proid = proid
    setTitle('下单')
    console.log('proid: ', proid)
    // this.weui.alert('图形验证码不能为空！')
    // this.$store.commit('showLoading')
    // 获取用户信息
    this.getUserInfo(proid)
  },
  methods: {
    // 获取用户信息
    getUserInfo (proid) {
      this.axios.get('/weixin/getWxUserInfo').then(res => {
        console.log('getWxUserInfo: ', res.data)
        if (res.data.status === 302) {
          window.location = res.data.data
        } else {
          if (res.data.data) {
            this.userInfo = res.data.data
            // 初始化页面数据
            this.initPage(proid)
          }
        }
      })
    },
    // 初始化页面数据
    initPage (proid) {
      // 获取商品详情
      this.axios.get('/wxapp/getProDetail', {
        params: {
          proid: proid
        }
      }).then(res => {
        let detail = this.detail
        if (res.data.data) {
          detail = res.data.data
          detail.detaildescStr = detail.detaildesc.replace(/<\/?.+?>/g, '').replace(/ /g, '')
        }
        this.detail = detail

        // 获取商品规格
        return this.axios.get('/weixin/getSpeList', {
          params: {
            proid: proid
          }
        })
      }).then(res => {
        // 免费
        if (this.detail.kind === 2) {
          this.spec = [{
            specname: '免费',
            discount: '',
            show: false
          }]
        } else if (res.data.data.length > 0) {
          this.spec = res.data.data
          this.spec.forEach(item => {
            item.show = true
          })
        }

        // 获取地址列表
        return this.axios.get('/weixin/getAddressList')
      }).then(res => {
        if (res.data.data.list.length > 0) {
          let defaultAddress = {}
          res.data.data.list.forEach(item => {
            item.label = item.conaddress
            item.value = item.addid
            if (item.isdefault === 0) {
              defaultAddress = item
            }
          })
          this.address = defaultAddress.addid ? defaultAddress : res.data.data.list[0]
          this.addressLs = res.data.data.list
        }
        this.loadFlag = true
      }).catch(errMsg => {
        console.error(errMsg) // 错误提示信息
      })
    },
    // 选择地址
    onSelectAddr () {
      let me = this
      // 免费
      if (this.detail.kind === 2) {
        return
      }
      this.weui.picker(this.addressLs, {
        defaultValue: [this.address.index],
        // onChange (result) {
        //   console.log('onChange: ', result)
        // },
        onConfirm (result) {
          console.log('onConfirm: ', result)
          me.addressLs.some((item, index) => {
            me.address = item
            me.address.index = index
            return item.addid === result[0].value
          })
        }
      })
    },
    // 跳转确认订单
    onConfirmOrder (index) {
      // if (this.address.addid === '' || !this.address.addid) {
      //
      //   return
      // }
      this.axios.get('/wxapp/doOrder', {
        params: {
          addid: this.address.addid,
          proid: this.proid,
          specid: this.spec[index].specid
        }
      }).then(res => {
        if (!res.data.data) {
          return
        }
        this.$router.push({
          name: 'confirmOrder',
          params: {
            orderId: res.data.data,
            userInfo: this.userInfo,
            address: this.address
          }
        })
      })
    },
    // 跳转公众号测试
    onGoWx () {
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
    },
    doLocation (url) {
      var a = document.createElement('a')
      if (!a.click) {
        window.location = url
        return
      }
      a.setAttribute('href', url)
      a.setAttribute('target', '_blank')
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
    },
    onBridgeReady () {
      // WeixinJSBridge.call('closeWindow')
      this.doLocation('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5MDgwOTEyNw==#wechat_redirect')
      window.opener = null
      window.open('', '_self')
      window.close()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container{height: 100%; overflow: hidden;}
.bg{position: absolute; left: 0; top: 0; z-index: 2; width: 100%; height: 1.2rem; background: #FFEAA3;}
.addr_box{
  display: flex; flex-direction: column; justify-content: space-between; position: relative; z-index: 3; margin: .5rem .2rem 0; padding: .4rem .2rem .2rem; width: 6.4rem; background: #fff; border-radius: 10px; box-shadow: 0 2px 2px #fff2c4; color: #333; text-align: left;
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
  margin: .4rem .3rem .1rem;
  .img{margin: 0 .2rem 0 0; width: 1rem; height: 1rem; vertical-align: middle;}
  .title{display: inline-block; word-break:break-all; word-wrap: break-word; width: 5.2rem;}
}
.detail{
  margin: 0 .3rem .3rem; word-break:break-all; word-wrap: break-word;
}
.ls{
  display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin: .2rem .3rem; padding: .3rem 0; border-top: 1px #eee solid;
  .btn{
    padding: .1rem 0.3rem; background-color: #FFEAA3; border-radius: 5px; border: none;
  }
  &:last-child{
    border-bottom: 1px #eee solid;
  }
}
</style>
