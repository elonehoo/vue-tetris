import { want } from '~/utils'
import event from '~/utils/event'
import states from '../states'

function down(store) {
  store.commit('key_rotate', true)
  if (store.state.cur !== null) {
    event.down({
      key: 'rotate',
      once: true,
      callback: () => {
        const state = store.state
        if (state.lock) {
          return
        }
        if (state.pause) {
          states.pause(false)
        }
        const cur = state.cur
        if (cur === null) {
          return
        }
        const next = cur.rotate()
        if (want(next, state.matrix)) {
          store.commit('moveBlock', next)
        }
      },
    })
  }
  else {
    event.down({
      key: 'rotate',
      begin: 200,
      interval: 100,
      callback: () => {
        if (store.state.lock) {
          return
        }
        const state = store.state
        const cur = state.cur
        if (cur) {
          return
        }
        let startLines = state.startLines
        startLines = startLines + 1 > 10 ? 0 : startLines + 1
        store.commit('startLines', startLines)
      },
    })
  }
}

function up(store) {
  store.commit('key_rotate', false)
  event.up({
    key: 'rotate',
  })
}

export default {
  down,
  up,
}
