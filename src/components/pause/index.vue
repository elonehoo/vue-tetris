<template>
   <div class="bg pause" :class="{'c': showPause}" />
</template>

<script lang="ts">

import { onMounted, ref, watch } from 'vue';
let Pause = {
  timeout: null
}
export default {
  props: {
    data: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const showPause = ref(false)
    watch(props, (newVal, _) => {
      setShake(newVal.data)
    })

    onMounted(() => {
      setShake(props.data)
    })

    const setShake = (bool) => {
      if (bool && !Pause.timeout) {
        Pause.timeout = setInterval(() => {
          showPause.value = !showPause.value
        }, 250)
      }
      if (!bool && Pause.timeout) {
        clearInterval(Pause.timeout)
        showPause.value = false
        Pause.timeout = null
      }
    }
    return {
      showPause
    }
  }
}
</script>

<style lang="less">
.pause {
  width: 20px;
  height: 18px;
  background-position: -100px -75px;
  position: absolute;
  top: 3px;
  left: 18px;

  &.c {
    background-position: -75px -75px;
  }
}
</style>
