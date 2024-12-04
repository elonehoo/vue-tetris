import { createStore } from 'vuex'
import { getNextType, isFocus } from '~/utils'

import Block from '~/utils/block'
import { blankMatrix, blockType, lastRecord, maxPoint } from '~/utils/constant'
import mutations from './mutations'

const _lastRecord = lastRecord

function clearLinesInitState() {
  const _state = (_lastRecord && !isNaN(Number.parseInt(_lastRecord.clearLines, 10)))
    ? Number.parseInt(_lastRecord.clearLines, 10)
    : 0
  if (_state < 0) {
    _state = 0
  }
  return _state
}

function curInitState() {
  if (!_lastRecord || !_lastRecord.cur) {
    // 无记录 或 有记录 但方块为空, 返回 null
    return null
  }
  const cur = _lastRecord.cur
  const option = {
    type: cur.type,
    rotateIndex: cur.rotateIndex,
    shape: cur.shape,
    xy: cur.xy,
  }
  return new Block(option)
}

function dropInitState() {
  const _state = _lastRecord && _lastRecord.drop !== undefined
    ? !!_lastRecord.drop
    : false
  return _state
}

function lockInitState() {
  const _state = _lastRecord && _lastRecord.lock !== undefined
    ? !!_lastRecord.lock
    : false
  return _state
}

function matrixInitState() {
  const _state = _lastRecord && Array.isArray(_lastRecord.matrix)
    ? _lastRecord.matrix
    : blankMatrix

  return _state
}

function maxInitState() {
  const _state = _lastRecord && !isNaN(Number.parseInt(_lastRecord.max, 10))
    ? Number.parseInt(_lastRecord.max, 10)
    : 0
  if (_state < 0) {
    _state = 0
  }
  else if (_state > maxPoint) {
    _state = maxPoint
  }

  return _state
}

function nextInitState() {
  const _state = _lastRecord && blockType.includes(_lastRecord.next)
    ? _lastRecord.next
    : getNextType()
  return _state
}

function pauseInitState() {
  const _state = _lastRecord && _lastRecord.pause !== undefined
    ? !!_lastRecord.pause
    : false
  return _state
}

function pointsInitState() {
  const _state = _lastRecord && !isNaN(Number.parseInt(_lastRecord.points, 10))
    ? Number.parseInt(_lastRecord.points, 10)
    : 0
  if (_state < 0) {
    _state = 0
  }
  else if (_state > maxPoint) {
    _state = maxPoint
  }

  return _state
}

function speedRunInitState() {
  const _state = _lastRecord && !isNaN(Number.parseInt(_lastRecord.speedRun, 10))
    ? Number.parseInt(_lastRecord.speedRun, 10)
    : 1
  if (_state < 1 || _state > 6) {
    _state = 1
  }
  return _state
}

function speedStartInitState() {
  const _state = _lastRecord && !isNaN(Number.parseInt(_lastRecord.speedStart, 10))
    ? Number.parseInt(_lastRecord.speedStart, 10)
    : 1
  if (_state < 1 || _state > 6) {
    _state = 1
  }
  return _state
}

function startLinesInitState() {
  const _state = _lastRecord && !isNaN(Number.parseInt(_lastRecord.startLines, 10))
    ? Number.parseInt(_lastRecord.startLines, 10)
    : 0
  if (_state < 0 || _state > 10) {
    _state = 0
  }

  return _state
}

function resetInitState() {
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
    pause: false,
  },
}

const store = createStore({
  state,
  mutations,
})

export default store
