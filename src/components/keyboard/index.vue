<template>
  <div class="keyboard" :style="{ marginTop: fillingNum + 'px'}">
    <v-button
      ref="dom_rotate_el"
      color="blue"
      size="s1"
      arrow="translate(0, 63px)"
      :top="0"
      :left="374"
      :label="rotation"
      :position="true"
      :active="keyboard['rotate']"
    />
    <v-button
      ref="dom_down_el"
      color="blue"
      size="s1"
      arrow="translate(0,-71px) rotate(180deg)"
      :top="180"
      :left="374"
      :label="labelDown"
      :active="keyboard['down']"
    />
    <v-button
      ref="dom_left_el"
      color="blue"
      size="s1"
      arrow="translate(60px, -12px) rotate(270deg)"
      :top="90"
      :left="284"
      :label="labelLeft"
      :active="keyboard['left']"
    />
    <v-button
      ref="dom_right_el"
      color="blue"
      size="s1"
      arrow="translate(-60px, -12px) rotate(90deg)"
      :top="90"
      :left="464"
      :label="labelRight"
      :active="keyboard['right']"
    />
    <v-button
      ref="dom_space_el"
      color="blue"
      size="s0"
      :top="100"
      :left="52"
      :label="labelDropSpace"
      :active="keyboard['drop']"
    />
    <v-button
      ref="dom_r_el"
      color="red"
      size="s2"
      :top="0"
      :left="140"
      :label="labelResetR"
      :active="keyboard['reset']"
    />
    <v-button
      ref="dom_p_el"
      color="green"
      size="s2"
      :top="0"
      :left="40"
      :label="(start || isPause) ? labelStartS : labelPauseP"
      :active="keyboard['pause']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import todo from '~/control/todo'
import vButton from './button/index.vue'

export default defineComponent({
  components: {
    vButton
  },
  props: ['filling', 'cur'],
  setup(props) {
    const store = useStore()
    const fillingNum = ref(0)
    const start = ref(false)
    const doms = reactive({
      dom_rotate_el: ref(null),
      dom_down_el: ref(null),
      dom_left_el: ref(null),
      dom_right_el: ref(null),
      dom_space_el: ref(null),
      dom_r_el: ref(null),
      dom_p_el: ref(null)
    })

    watch(props, (newVal, _) => {
      fillingNum.value = Number(newVal.filling) + 20
      start.value = !newVal.cur
    }, {
      deep: true
    })

    const isPause = computed(() => store.state.pause)
    const keyboard = computed(() => store.state.keyboard)
    const rotation = ref('Rotation')
    const labelLeft = ref('Left')
    const labelRight = ref('Right')
    const labelDown = ref('Down')
    const labelDropSpace = ref('Drop Space')
    const labelResetR = ref('Reset R')
    const labelPauseP = ref('Pause P')
    const labelStartS = ref('Start S')
    
    
    onMounted(() => {
      // 对于手机操作, 触发了touchstart, 将作出记录, 不再触发后面的mouse事件
      const touchEventCatch = {}

      // 在鼠标触发mousedown时, 移除元素时可以不触发mouseup, 这里做一个兼容, 以mouseout模拟mouseup
      const mouseDownEventCatch = {}
      document.addEventListener(
        'touchstart',
        e => {
          if (e.preventDefault) {
            e.preventDefault()
          }
        },
        { passive: false }
      )
      document.addEventListener('touchend', (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
      }, { passive: false });

      // 阻止双指放大
      document.addEventListener('gesturestart', (event) => {
        event.preventDefault();
      }, { passive: false });
      
      document.addEventListener(
        'mousedown',
        e => {
          if (e.preventDefault) {
            e.preventDefault()
          }
        },
        true
      )
      Object.keys(todo).forEach(key => {
        const $el = doms[`dom_${key}_el`].$el

        $el.addEventListener(
          'mousedown',
          () => {
            if (touchEventCatch[key] === true) {
              return
            }
            
            todo[key].down(store)
            mouseDownEventCatch[key] = true
          },
          true
        )
        $el.addEventListener(
          'mouseup',
          () => {
            if (touchEventCatch[key] === true) {
              touchEventCatch[key] = false
              return
            }
            todo[key].up(store)
            mouseDownEventCatch[key] = false
          },
          true
        )
        $el.addEventListener(
          'mouseout',
          () => {
            if (mouseDownEventCatch[key] === true) {
              todo[key].up(store)
            }
          },
          true
        )
        $el.addEventListener(
          'touchstart',
          () => {
            touchEventCatch[key] = true
            todo[key].down(store)
          },
          true
        )
        $el.addEventListener(
          'touchend',
          () => {
            todo[key].up(store)
          },
          true
        )
      })
    })
  

    return {
      start,
      fillingNum,
      keyboard,
      rotation,
      isPause,
      labelLeft,
      labelRight,
      labelDown,
      labelDropSpace,
      labelResetR,
      labelPauseP,
      labelStartS,
      ...toRefs(doms)
    }
  }
})
</script>

<style lang="less" scoped>
.keyboard {
  width: 580px;
  height: 330px;
  margin: 20px auto 0;
  position: relative;
}
</style>
