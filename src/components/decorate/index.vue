<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Decorate',
  setup() {
    const title = ref('TETRIS')

    return {
      title,
    }
  },
})
</script>

<template>
  <div class="decorate">
    <!-- 面板左右装饰 -->
    <div class="topBorder">
      <span class="l mr" style="width:40px;" />
      <span class="l mr" />
      <span class="l mr" />
      <span class="l mr" />
      <span class="l mr" />
      <span class="r ml" style="width:40px;" />
      <span class="r ml" />
      <span class="r ml" />
      <span class="r ml" />
      <span class="r ml" />
    </div>
    <h1>{{ title }}</h1>
    <div class="view">
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <em />
      <b class="c" />
      <p />
      <em />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <em />
      <b class="c" />
      <p />
      <b class="c" />
      <b class="c" />
      <b class="c" />
      <b class="c" />
      <p />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <p />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <p />
      <em />
      <b class="c" />
      <div class="clear" />
      <em />
      <b class="c" />
      <div class="clear" />
      <em />
      <b class="c" />
      <div class="clear" />
      <em />
      <b class="c" />
    </div>
    <div class="view l">
      <em />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <p />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <p />
      <b class="c" />
      <b class="c" />
      <b class="c" />
      <b class="c" />
      <p />
      <em />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <em />
      <b class="c" />
      <p />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <em />
      <b class="c" />
      <div class="clear" />
      <em />
      <b class="c" />
      <p />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.decorate {
  h1 {
    position: absolute;
    width: 100%;
    text-align: center;
    font-weight: normal;
    top: -12px;
    left: 0;
    margin: 0;
    padding: 0;
    font-size: 30px;
  }
  .topBorder {
    position: absolute;
    height: 10px;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    overflow: hidden;
    span {
      display: block;
      width: 10px;
      height: 10px;
      overflow: hidden;
      background: #000;
      &.mr {
        margin-right: 10px;
      }
      &.ml {
        margin-left: 10px;
      }
    }
  }
  .view {
    position: absolute;
    right: -70px;
    top: 20px;
    width: 44px;
    em {
      display: block;
      width: 22px;
      height: 22px;
      overflow: hidden;
      float: left;
    }
    p {
      height: 22px;
      clear: both;
    }
    &.l {
      right: auto;
      left: -70px;
    }
  }
}
</style>
