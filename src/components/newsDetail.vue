<template>
  <div class='container'>
    <h3>{{newsDetail.newstitle}}</h3>
    <div v-html="newsDetail.newsbody"></div>
  </div>
</template>

<script>
/* global setTitle */
export default {
  name: 'createOrder',
  data () {
    return {
      loadFlag: false,
      newsDetail: {
        newstitle: '',
        newsbody: ''
      }
    }
  },
  created () {
    setTitle('推文')
    let newsid = this.$route.params.newsid
    this.initPage(newsid)
  },
  methods: {
    // 获取新闻详情
    initPage (newsid) {
      this.axios.get('/wxapp/getNewsDetail', {
        params: {
          newsid: newsid
        }
      }).then(res => {
        console.log('新闻详情：', res.data.data)
        if (res.data.data) {
          this.newsDetail = res.data.data
        }
        this.loadFlag = true
      }).catch(errMsg => {
        console.error(errMsg) // 错误提示信息
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container{margin: 0 .3rem; height: 100%;
  h3{margin: .3rem 0; padding: 0; word-break: break-all; word-wrap: break-word;}
}
</style>
