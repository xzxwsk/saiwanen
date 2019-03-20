<template>
  <div id="app">
    <router-view/>
    <loading v-if='LOADING'/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import './assets/fonts/iconfont'
export default {
  name: 'App',
  computed: {
    ...mapState([
      'LOADING'
    ])
  }
}
</script>

<style>
@import './assets/style.scss';
</style>
