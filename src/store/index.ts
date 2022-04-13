import { createStore } from 'vuex';
import mutations from './mutations'

import { getNextType } from '~/utils'
import { isFocus } from '~/utils'
import { blankMatrix, lastRecord, maxPoint, blockType } from '~/utils/constant'
import Block from '~/utils/block'

const _lastRecord = lastRecord

const clearLinesInitState = () => {
  const _state = (_lastRecord && !isNaN(parseInt(_lastRecord.clearLines, 10)))
        ? parseInt(_lastRecord.clearLines, 10)
        : 0
  if (_state < 0) {
    _state = 0
  }
  return _state  
}

const curInitState = () => {
  if (!_lastRecord || !_lastRecord.cur) {
    // 无记录 或 有记录 但方块为空, 返回 null
    return null
  }
  const cur = _lastRecord.cur
  const option = {
    type: cur.type,
    rotateIndex: cur.rotateIndex,
    shape: cur.shape,
    xy: cur.xy
  }
  return new Block(option)
}

const dropInitState = () => {
  const _state = _lastRecord && _lastRecord.drop !== undefined
    ? !!_lastRecord.drop
    : false
  return _state
}

const lockInitState = () => {
  const _state = _lastRecord && _lastRecord.lock !== undefined
    ? !!_lastRecord.lock
    : false
  return _state;
}


const matrixInitState = () => {
  const _state = _lastRecord && Array.isArray(_lastRecord.matrix)
    ? _lastRecord.matrix
    : blankMatrix

  return _state
}

const maxInitState = () => {
  const _state = _lastRecord && !isNaN(parseInt(_lastRecord.max, 10))
    ? parseInt(_lastRecord.max, 10)
    : 0
  if (_state < 0) {
    _state = 0
  } else if (_state > maxPoint) {
    _state = maxPoint
  }

  return _state
}

const nextInitState = () => {
  const _state = _lastRecord && blockType.indexOf(_lastRecord.next) !== -1
    ? _lastRecord.next
    : getNextType()
  return _state
}

const pauseInitState = () => {
  const _state = _lastRecord && _lastRecord.pause !== undefined
    ? !!_lastRecord.pause
    : false
  return _state
} 

const pointsInitState = () => {
  const _state = _lastRecord && !isNaN(parseInt(_lastRecord.points, 10))
    ? parseInt(_lastRecord.points, 10)
    : 0
  if (_state < 0) {
    _state = 0
  } else if (_state > maxPoint) {
    _state = maxPoint
  }

  return _state
}

const speedRunInitState = () => {
  const _state = _lastRecord && !isNaN(parseInt(_lastRecord.speedRun, 10))
    ? parseInt(_lastRecord.speedRun, 10)
    : 1
  if (_state < 1 || _state > 6) {
    _state = 1
  }
  return _state
}

const speedStartInitState = () => {
  const _state = _lastRecord && !isNaN(parseInt(_lastRecord.speedStart, 10))
    ? parseInt(_lastRecord.speedStart, 10)
    : 1
  if (_state < 1 || _state > 6) {
    _state = 1
  }
  return _state
}

const startLinesInitState = () => {
  const _state = _lastRecord && !isNaN(parseInt(_lastRecord.startLines, 10))
    ? parseInt(_lastRecord.startLines, 10)
    : 0
  if (_state < 0 || _state > 10) {
    _state = 0
  }

  return _state
}

const resetInitState = () => {
  const _state = _lastRecord && _lastRecord.reset
    ? !!_lastRecord.reset
    : false
  return _state
}

const state = {

  matrix: matrixInitState(),
  pause: pauseInitState(),
  next: nextInitState(),
  cur: curInitState(),
  speedStart: speedStartInitState(),
  speedRun: speedRunInitState(),
  startLines: startLinesInitState(),
  clearLines: clearLinesInitState(),
  points: pointsInitState(),
  max: maxInitState(),
  reset: resetInitState(),
  drop: dropInitState(),
  lock: lockInitState(),
  focus: isFocus(),
  keyboard: {
    drop: false,
    down: false,
    left: false,
    right: false,
    rotate: false,
    reset: false,
    pause: false
  }
}

const store = createStore({
  state,
  mutations
})

export default store
