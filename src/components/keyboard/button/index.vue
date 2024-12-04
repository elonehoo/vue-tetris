<script lang="ts">
export default {
  name: 'VButton',
  props: [
    'active',
    'color',
    'size',
    'top',
    'left',
    'label',
    'position',
    'arrow',
  ],
}
</script>

<template>
  <div class="button" :class="`${color} ${size}`" :style="{ top: `${top}px`, left: `${left}px` }">
    <i :class="{ active }" />
    <em v-show="size === 's1'" :style="{ transform: `${arrow} scale(1,2)` }" />
    <span :class="position ? 'position' : ''">
      {{ label }}
    </span>
  </div>
</template>

<style lang="less" scoped>
.button {
  position: absolute;
  text-align: center;
  color: #111;
  position: absolute;
  white-space: nowrap;
  line-height: 1.6;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &.s2 {
    font-size: 16px;
  }

  span.position {
    position: absolute;
    top: 5px;
    left: 102px;
  }

  i {
    display: block;
    position: relative;
    border: 1px solid #000;
    border-radius: 50%;

    &:before,
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      box-shadow: 0 5px 10px rgba(255, 255, 255, .8) inset;
    }

    &:after {
      box-shadow: 0 -5px 10px rgba(0, 0, 0, .8) inset;
    }

    &.active {
      &:before {
        box-shadow: 0 -3px 6px rgba(255, 255, 255, .6) inset;
      }

      &:after {
        box-shadow: 0 5px 5px rgba(0, 0, 0, .6) inset;
      }
    }

    box-shadow: 0 3px 3px rgba(0, 0, 0, .2);
  }

  &.blue i {
    background: #5a65f1;
  }

  &.green i {
    background: #2dc421;
  }

  &.red i {
    background: #dd1a1a;
  }

  &.s0 i {
    width: 160px;
    height: 160px;
  }

  &.s1 i {
    width: 100px;
    height: 100px;
  }

  &.s2 i {
    width: 52px;
    height: 52px;

    &:before,
    &:after {
      box-shadow: 0px 3px 6px rgba(255, 255, 255, .8) inset;
    }

    &:after {
      box-shadow: 0px -3px 6px rgba(0, 0, 0, .8) inset;
    }

    &.active {
      &:before {
        box-shadow: 0px -1px 2px rgba(255, 255, 255, .6) inset;
      }

      &:after {
        box-shadow: 0px 3px 3px rgba(0, 0, 0, .7) inset;
      }
    }

    box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
  }

  &.s1 {
    em {
      display: block;
      width: 0;
      height: 0;
      border: 8px solid;
      border-color: transparent transparent #111;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -12px 0 0 -8px;
    }
  }
}
</style>
