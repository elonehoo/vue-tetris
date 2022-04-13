<template>
  <div class="logo" :style="{ display: display }">
    <div class="bg dragon" :class="className" />
    <p v-html="titleCenter" />
  </div>
</template>

<script lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
let Logo = {
  timeout: null
}
export default {
  props: {
    cur: {
      default: false,
      type: Boolean
    },
    reset: {
      default: false,
      type: Boolean
    },
  },
  setup (props) {
    const className = ref('r1')
    const display = ref('none')
    const titleCenter = ref('TETRIS')

    watch(props, (nextProps, oldProps) => {
      animate(nextProps)
      if (
        // 只有在游戏进入开始, 或结束时 触发改变
        ([oldProps.cur, nextProps.cur].includes(false) &&
          oldProps.cur !== nextProps.cur) ||
        oldProps.reset !== nextProps.reset
      ) {
        animate(nextProps)
      }
    }, {
      deep: true
    })

    const animate = async ({ cur, reset }) => {
      clearTimeout(Logo.timeout)
      className.value = 'r1'
      display.value = 'none'
      if (cur || reset) {
        display.value = 'none'
        return
      }

      let m = 'r' // 方向
      let count = 0

      const sleep = delay => {
        return new Promise((reslove) => {
          Logo.timeout = setTimeout(reslove, delay)
        })
      }

      const isShow = (func, value) => {
        display.value = value ? 'block' : 'none'
        func && func()
      }

      const eyes = (func, delay1, delay2) => {
        // 龙在眨眼睛
        return new Promise(async resolve => {
          await sleep(delay1)
          className.value = m + 2
          await sleep(delay2)
          className.value = m + 1
          func && func()
          return resolve()
        })
      }

      const run = async func => {
        // 开始跑步
        await sleep(100)
        className.value = m + 4
        await sleep(100)
        className.value = m + 3;
        count++
        if (count === 10 || count === 20 || count === 30) {
          m = m === 'r' ? 'l' : 'r'
        }
        if (count < 40) {
          run(func)
          return
        }
        className.value = m + 1
        await sleep(4000)
        func && func()
      }

      const dra = async () => {
        count = 0
        await eyes(null, 1000, 1500)
        await eyes(null, 150, 150)
        await eyes(() => {
            className.value = m + 2
            run(dra)
          }, 150, 150)
      }

      isShow(null, false)
      await sleep(150)
      isShow(null, true)
      await sleep(150)
      isShow(null, false)
      await sleep(150)
      isShow(dra, true)
    }

    onBeforeMount(() => {
      animate(props)
    })

    return {
      className,
      display,
      titleCenter
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 224px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 12px;
  text-align: center;
  overflow: hidden;

  p {
    position: absolute;
    width: 100%;
    line-height: 1.4;
    top: 100px;
    left: 0;
    font-family: initial;
    letter-spacing: 6px;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, .35);
  }

  .dragon {
    width: 80px;
    height: 86px;
    margin: 0 auto;
    background-position: 0 -100px;

    &.r1,
    &.l1 {
      background-position: 0 -100px;
    }

    &.r2,
    &.l2 {
      background-position: -100px -100px;
    }

    &.r3,
    &.l3 {
      background-position: -200px -100px;
    }

    &.r4,
    &.l4 {
      background-position: -300px -100px;
    }

    &.l1,
    &.l2,
    &.l3,
    &.l4 {
      transform: scale(-1, 1);
      -webkit-transform: scale(-1, 1);
      -ms-transform: scale(-1, 1);
      -moz-transform: scale(-1, 1);
      -o-transform: scale(-1, 1);
    }
  }
}
</style>
