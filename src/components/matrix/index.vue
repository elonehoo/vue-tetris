<script lang="ts">
import { ref, watch } from 'vue'
import states from '~/control/states'
import { isClear } from '~/utils'
import { blankLine, fillLine } from '~/utils/constant'

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export default {
  props: {
    cur: {
      default: () => {
        return null
      },
      type: Object,
    },
    reset: {
      default: false,
      type: Boolean,
    },
    propMatrix: {
      default: () => [],
      type: Array,
    },
  },
  setup(props) {
    const clearLines = ref([])
    const animateColor = ref(2)
    const isOver = ref(false)
    const overState = ref(null)
    const matrix = ref([])

    const propsChange = async (nextProps) => {
      const clears = isClear(nextProps.propMatrix)
      const overs = nextProps.reset
      setTimeout(() => {
        clearLines.value = clears
        isOver.value = overs
      }, 0)

      if (clears && !clearLines.value) {
        clearAnimate()
      }
      else if (!clears && overs && !isOver.value) {
        over(nextProps)
      }
      else {
        clearLines.value = false
        render()
      }
    }

    const clearAnimate = async () => {
      const anima = (callback) => {
        return new Promise((resolve) => {
          sleep(100).then(() => {
            animateColor.value = 0
            render()
            return sleep(100)
          }).then(() => {
            animateColor.value = 2
            render()
            if (typeof callback === 'function') {
              callback()
            }
            return resolve()
          })
        })
      }

      await anima()
      await anima()
      await anima(() => {
        sleep(100).then(() => {
          states.clearLines(props.propMatrix, clearLines.value)
        })
      })
    }

    const over = async (nextProps) => {
      const _overState = getResult(nextProps)
      overState.value = [..._overState]
      const exLine = (index) => {
        if (index <= 19) {
          _overState[19 - index] = fillLine
        }
        else if (index >= 20 && index <= 39) {
          _overState[index - 20] = blankLine
        }
        else {
          states.overEnd()
          return
        }
        overState.value = [..._overState]
        render()
      }

      for (let i = 0; i <= 40; i++) {
        setTimeout(exLine.bind(null, i), 40 * (i + 1))
      }
    }

    const getResult = (_props) => {
      if (!_props) {
        _props = props
      }
      const cur = _props.cur
      const shape = cur && cur.shape
      const xy = cur && cur.xy
      const matrix = JSON.parse(JSON.stringify(_props.propMatrix))
      const _clearLines = clearLines.value
      if (_clearLines) {
        const _animateColor = animateColor.value
        _clearLines.forEach((index) => {
          matrix[index] = Array.from({ length: 10 }).fill(_animateColor)
        })
      }
      else if (shape) {
        shape.forEach((m, k1) =>
          m.forEach((n, k2) => {
            if (n && xy[0] + k1 >= 0) {
              // 竖坐标可以为负
              const line = matrix[xy[0] + k1]
              let color
              if (line[xy[1] + k2] === 1 && !_clearLines) {
                // 矩阵与方块重合
                color = 2
              }
              else {
                color = 1
              }
              line[xy[1] + k2] = color
              matrix[xy[0] + k1] = line
            }
          }),
        )
      }
      return matrix
    }

    const render = () => {
      matrix.value = isOver.value ? overState.value : getResult(props)
    }

    watch(props, (newVal = {}, _) => {
      propsChange(newVal)
    }, {
      deep: true,
      immediate: true,
    })

    return {
      matrix,
    }
  },
}
</script>

<template>
  <div class="matrix">
    <p v-for="(p, $pIndex) in matrix" :key="$pIndex">
      <b
        v-for="(e, $eIndex) in p" :key="$eIndex"
        :class="(e === 1 ? 'c' : '') + (e === 2 ? 'd' : '')"
      />
    </p>
  </div>
</template>

<style lang="less">
.matrix {
  border: 2px solid #000;
  padding: 3px 1px 1px 3px;
  width: 228px;
  p {
    width: 220px;
    height: 22px;
  }
}
</style>
