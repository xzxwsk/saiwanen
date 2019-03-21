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
      <div class="word">{{address.conaddress ? address.conaddress : ''}}</div>
    </div>
    <div class="intro">
      <img :src="detail.covers" class="img" />
      <div class="title">{{detail.title}}</div>
    </div>
    <div class="detail">简介：{{detail.detaildescStr}}</div>
    <div class="ls" v-for="(item, index) in spec" :key="index">
      <div class="txt">{{item.specname}} <span class="price">{{item.discount}}</span>元</div>
      <input type="button" class="btn" value="购买" @click="onConfirmOrder(index)" />
    </div>
    <div><span class="iconfont icon-dizhi"></span></div>
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
        covers: require('../assets/logo.png'),
        title: 'XXXXXXXXXX课程',
        detaildescStr: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXX'
      },
      spec: [{
        specname: '一月',
        discount: 180
      }]

    }
  },
  created () {
    setTitle('下单')
    console.log(this.$route.params)
    this.weui.alert('图形验证码不能为空！')
    // this.$store.commit('showLoading')
    // this.axios.get('/weixin/getSpeList', {
    //   params: {
    //     proid: 2
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    onConfirmOrder (index) {
      this.$router.push({name: 'confirmOrder'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container{height: 100%; overflow: hidden;}
.bg{position: absolute; left: 0; top: 0; z-index: 2; width: 100%; height: 2rem; background: #FFEAA3;}
.addr_box{
  display: flex; flex-direction: column; justify-content: space-between; position: relative; z-index: 3; margin: 1rem .2rem 0; padding: .4rem .2rem .2rem; width: 6.4rem; background: #fff; border-radius: 10px; box-shadow: 0 2px 2px #fff2c4; color: #333; text-align: left;
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
