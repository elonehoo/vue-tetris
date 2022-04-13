<template>
  <div class="app" :style="size">
    <div class="rect" :class="drop?'drop':''">
      <Decorate/>
      <div class="screen">
        <div class="panel">
          <Matrix :propMatrix="matrix" :cur="cur" :reset="reset" />
          <Logo :cur="!!cur" :reset="reset" />
          <div class="state">
            <Point :cur="!!cur" :max="max" :point="points" />
            <p>{{pContent}}</p>
            <Number :number='cur ? clearLines : startLines' />
            <p>{{level}}</p>
            <Number :number='cur ? speedRun : speedStart' :length="1" />
            <p>{{nextText}}</p>
            <Next :data="next" />
            <div class="bottom">
              <Pause :data="pause" />
              <Number :propTime="true" />
            </div> 
          </div>
        </div>
      </div>
    </div>
    <Keyboard :filling='filling' :cur="!!cur" />
    <Guide/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { transform, lastRecord, speeds } from '~/utils/constant'
import { visibilityChangeEvent, isFocus } from '~/utils'
import states from '~/control/states'
import Decorate from '~/components/decorate/index.vue'
import Guide from '~/components/guide/index.vue'
import Keyboard from '~/components/keyboard/index.vue'
import Logo from '~/components/logo/index.vue'
import Matrix from '~/components/matrix/index.vue'
import Next from '~/components/next/index.vue'
import Number from '~/components/number/index.vue'
import Pause from '~/components/pause/index.vue'
import Point from '~/components/point/index.vue'

export default defineComponent({
  components: {
    Decorate,
    Guide,
    Keyboard,
    Logo,
    Matrix,
    Next,
    Number,
    Pause,
    Point
  },
  setup() {
    const store = useStore()
    const size = ref({})
    const w = ref(document.documentElement.clientWidth)
    const h = ref(document.documentElement.clientHeight)
    const filling = ref('')

    const matrix = computed(() => store.state.matrix)
    const keyboard = computed(() => store.state.keyboard)
    const pause = computed(() => store.state.pause)
    const next = computed(() => store.state.next)
    const cur = computed(() => store.state.cur)
    const speedStart = computed(() => store.state.speedStart)
    const speedRun = computed(() => store.state.speedRun)
    const startLines = computed(() => store.state.startLines)
    const clearLines = computed(() => store.state.clearLines)
    const points = computed(() => store.state.points)
    const max = computed(() => store.state.max)
    const reset = computed(() => store.state.reset)
    const drop = computed(() => store.state.drop)
    
    const pContent = ref(cur.value ? 'Cleans' : 'Start Line')
    const level = ref('Level')
    const nextText = ref('Next')

    onMounted(() => {
      window.addEventListener('resize', resize, true)
      render()
    })

    const resize = () => {
      w.value = document.documentElement.clientWidth
      h.value = document.documentElement.clientHeight
      render()
    }

    const render = () => {
      let _filling = 0
      const _size = (() => {
        
        const _w = w.value
        const _h = h.value
        const ratio = _h / _w
        let scale
        let css = {}
        if (ratio < 1.5) {
          scale = _h / 960
        } else {
          scale = _w / 640
          _filling = (_h - 960 * scale) / scale / 3
          css = {
            'padding-top': Math.floor(_filling) + 42 + 'px',
            'padding-bottom': Math.floor(_filling) + 'px',
            'margin-top': Math.floor(-480 - _filling * 1.5) + 'px'
          }
        }
        css[transform] = `scale(${scale})`
        return css
      })()
      size.value = _size
      filling.value = _filling
      start()
    }

    const start = () => {
      if (visibilityChangeEvent) {
        // 将页面的焦点变换写入store
        document.addEventListener(
          visibilityChangeEvent,
          () => {
            states.focus(isFocus())
          },
          false
        )
      }

      console.log("lastRecord", lastRecord)
      if (lastRecord) {
        // 读取记录
        if (lastRecord.cur && !lastRecord.pause) {
          // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
          let timeout = speeds[speedRun - 1] / 2 // 继续时, 给予当前下落速度一半的停留时间
          // 停留时间不小于最快速的速度
          timeout =
            speedRun < speeds[speeds.length - 1]
              ? speeds[speeds.length - 1]
              : speedRun
          states.auto(timeout)
        }

        if (!lastRecord.cur) {
          
          // 初始化界面
          states.overStart()
        }
      } else {
        // 初始化界面
        states.overStart()
      }
    }


    return {
      filling,
      size,
      w,
      h,
      matrix,
      keyboard,
      pause,
      next,
      cur,
      speedStart,
      speedRun,
      startLines,
      clearLines,
      points,
      max,
      reset,
      drop,
      pContent,
      level,
      nextText
    }
  }
})
</script>

<style lang="less">
body {
  width: 100%;
  min-height: 100vh;
  background: #009688;
  padding: 0;
  margin: 0;
  font: 20px/1 "HanHei SC", "PingHei", "PingFang SC", "STHeitiSC-Light", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  overflow: hidden;
  cursor: default;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: 'liga', 'kern';
  direction: ltr;
  text-align: left;
}

.r {
  float: right;
}

.l {
  float: left;
}

.clear {
  clear: both;
}

b {
  display: block;
  width: 20px;
  height: 20px;
  padding: 2px;
  border: 2px solid #879372;
  margin: 0 2px 2px 0;
  float: left;

  &:after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background: #879372;
    overflow: hidden;
  }

  &.c {
    border-color: #000;

    &:after {
      background: #000;
    }
  }

  &.d {
    border-color: #560000;

    &:after {
      background: #560000;
    }
  }
}

.bg {
  background: url('//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png') no-repeat;
  overflow: hidden;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  width: 640px;
  padding-top: 42px;
  box-shadow: 0 0 10px #fff inset;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -480px 0 0 -320px;
  background: #efcc19;
}

.rect {
  width: 480px;
  padding: 45px 0 35px;
  border: #000 solid;
  border-width: 0 10px 10px;
  margin: 0 auto;
  position: relative;

  &.drop {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
}

.screen {
  width: 390px;
  height: 478px;
  border: solid 5px;
  border-color: #987f0f #fae36c #fae36c #987f0f;
  margin: 0 auto;
  position: relative;

  .panel {
    width: 380px;
    height: 468px;
    margin: 0 auto;
    background: #9ead86;
    padding: 8px;
    border: 2px solid #494536;
  }
}

.state {
  width: 108px;
  position: absolute;
  top: 0;
  right: 15px;

  p {
    line-height: 47px;
    height: 57px;
    padding: 10px 0 0;
    white-space: nowrap;
    clear: both;
  }

  .bottom {
    position: absolute;
    width: 114px;
    top: 426px;
    left: 0;
  }
}

.load {
  width: 240px;
  height: 240px;
  float: left;
  position: relative;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -120px 0 0 -120px;
  @-webkit-keyframes loads {
    0%,
    80%,
    100% {
      box-shadow: 0 0 #efcc19;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em #efcc19;
      height: 5em;
    }
  }
  @keyframes loads {
    0%,
    80%,
    100% {
      box-shadow: 0 0 #efcc19;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em #efcc19;
      height: 5em;
    }
  }
  p {
    position: absolute;
    bottom: 0;
    left: -25%;
    width: 150%;
    white-space: nowrap;
    display: none;
  }
  .loader {
    text-indent: -9999em;
    margin: 8em auto;
    position: relative;
    font-size: 11px;
    // -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
    &,
    &:before,
    &:after {
      background: #efcc19;
      // -webkit-animation: loads 1s infinite ease-in-out;
      animation: loads 1s infinite ease-in-out;
      width: 1em;
      height: 4em;
    }
    &:before,
    &:after {
      position: absolute;
      top: 0;
      content: "";
    }
    &:before {
      left: -1.5em;
      // -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    
    &:after {
      left: 1.5em;
    }
  }
}

</style>
