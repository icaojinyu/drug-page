<template>
  <div class="loading">
    <div class="inner">
      <i class="iconfont icon-loading"></i>
      <span>{{text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      text: {
        type: String,
        default: '正在加载...'
      }
    }
  }
</script>

<style lang="scss">
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .inner {
      padding: 10px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 5px;
      display: flex;
      align-items: center;
      .icon-loading {
        font-size: 30px;
        color: #fff;
        animation: rotate 1s infinite linear;
      }
      > span {
        margin-left: 8px;
        color: #fff;
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
</style>
