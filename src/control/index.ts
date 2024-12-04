import store from '~/store'
import todo from './todo'

const keyboard = {
  37: 'left',
  38: 'rotate',
  39: 'right',
  40: 'down',
  32: 'space',
  82: 'r',
  80: 'p',
}

let keydownActive

const boardKeys = Object.keys(keyboard).map(e => Number.parseInt(e, 10))

function keyDown(e) {
  if (e.metaKey === true || !boardKeys.includes(e.keyCode)) {
    return
  }
  const type = keyboard[e.keyCode]
  if (type === keydownActive) {
    return
  }
  keydownActive = type
  todo[type].down(store)
}

function keyUp(e) {
  if (e.metaKey === true || !boardKeys.includes(e.keyCode)) {
    return
  }
  const type = keyboard[e.keyCode]
  if (type === keydownActive) {
    keydownActive = ''
  }
  todo[type].up(store)
}

document.addEventListener('keydown', keyDown, true)
document.addEventListener('keyup', keyUp, true)
