<script lang="ts">
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'

const formate = num => (num < 10 ? `0${num}`.split('') : `${num}`.split(''))
const NumberObj = {
  timeInterval: null,
  time_count: null,
}
export default {
  props: {
    propTime: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      default: 0,
    },
    length: {
      type: Number,
      default: 6,
    },
  },
  setup(props) {
    const data = ref([])
    const time_count = ref('')
    const time = reactive({
      value: new Date(),
    })

    watch(props, (newVal, _) => {
      render()
    })

    const render = () => {
      if (props.propTime) {
        // 右下角时钟
        const now = time.value
        const hour = formate(now.getHours())
        const min = formate(now.getMinutes())
        const sec = now.getSeconds() % 2
        const t = hour.concat(sec ? 'd' : 'd_c', min)
        data.value = t
        return
      }
      const num = `${props.number}`.split('')
      for (let i = 0, len = props.length - num.length; i < len; i++) {
        num.unshift('n')
      }
      data.value = num
    }

    onBeforeMount(() => {
      if (!props.length) {
        props.length = 6
      }
      if (!props.propTime) {
        return
      }
      const clock = () => {
        const count = +NumberObj.timeInterval
        NumberObj.timeInterval = setTimeout(() => {
          time.value = new Date()
          time_count.value = count
          render()
          clock()
        }, 1000)
      }
      clock()
    })

    onMounted(() => {
      render()
    })

    return {
      data,
    }
  },
}
</script>

<template>
  <div class="number">
    <span v-for="(item, index) in data" :key="index" :class="`bg s_${item}`" />
  </div>
</template>

<style lang="less">
.number {
  height: 24px;
  font-size: 14px;
  float: right;

  span {
    float: left;
    width: 14px;
    height: 24px;
  }

  .s_0 {
    background-position: -75px -25px;
  }

  .s_1 {
    background-position: -89px -25px;
  }

  .s_2 {
    background-position: -103px -25px;
  }

  .s_3 {
    background-position: -117px -25px;
  }

  .s_4 {
    background-position: -131px -25px;
  }

  .s_5 {
    background-position: -145px -25px;
  }

  .s_6 {
    background-position: -159px -25px;
  }

  .s_7 {
    background-position: -173px -25px;
  }

  .s_8 {
    background-position: -187px -25px;
  }

  .s_9 {
    background-position: -201px -25px;
  }

  .s_n {
    background-position: -215px -25px;
  }

  .s_d {
    background-position: -243px -25px;
  }

  .s_d_c {
    background-position: -229px -25px;
  }
}
</style>
