<template>
  <div id="app" class="main">
    <router-view/>
    <loading v-if='LOADING' :loadWord="LoadWord"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import loading from './components/loading'
export default {
  name: 'App',
  components: {loading},
  computed: {
    ...mapState([
      'LOADING', 'LoadWord'
    ])
  }
}
</script>

<style>
@import './assets/style.scss';
</style>
