<template>
  <div class='mock'>
    <div class="load_box">
      <div class="loadEffect">
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
      </div>
      <p>{{loadWord}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['loadWord']
}
</script>
<style>
  .mock{
    position:absolute; top:0; left:0; z-index:100; width:100%; height:100vh; background-color: rgba(0,0,0,.5); display: flex; flex-direction: column; justify-content: center;
  }
  .load_box{
    text-align: center; font-size: 1rem; line-height: 1.5; color: #fff;
  }
  .loadEffect {position: relative; margin: 0 auto; width:100px;height:100px;}
  .loadEffect div {width:100%;height:100%;position:absolute;-webkit-animation:load 2.08s linear infinite}
  .loadEffect div span {display:inline-block;width:20px;height:20px;border-radius:50%;background:#40c4ef;position:absolute;left:50%;margin-top:-10px;margin-left:-10px}
  @-webkit-keyframes load{
    0%{
      -webkit-transform: rotate(0deg);
    }
    10%{
      -webkit-transform: rotate(45deg);
    }
    50%{
      opacity: 1;
      -webkit-transform: rotate(160deg);
    }
    62%{
      opacity: 0;
    }
    65%{
      opacity: 0;
      -webkit-transform: rotate(200deg);
    }
    90%{
      -webkit-transform: rotate(340deg);
    }
    100%{
      -webkit-transform: rotate(360deg);
    }
  }
  .loadEffect div:nth-child(1){
    -webkit-animation-delay:0.2s;
  }
  .loadEffect div:nth-child(2){
    -webkit-animation-delay:0.4s;
  }
  .loadEffect div:nth-child(3){
    -webkit-animation-delay:0.6s;
  }
  .loadEffect div:nth-child(4){
    -webkit-animation-delay:0.8s;
  }
</style>
