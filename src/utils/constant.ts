
// 每种形状的数据
export const blockShape = {
  I: [[1, 1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  Z: [[1, 1, 0], [0, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]]
}

export const origin = {
  I: [[-1, 1], [1, -1]],
  L: [[0, 0]],
  J: [[0, 0]],
  Z: [[0, 0]],
  S: [[0, 0]],
  O: [[0, 0]],
  T: [[0, 0], [1, 0], [-1, 1], [0, -1]]
}

// 每个形状的名称
export const blockType = Object.keys(blockShape)

// 速度
export const speeds = [800, 650, 500, 370, 250, 160]

// 每消除eachLines行, 增加速度
export const eachLines = 20

// 延迟
export const delays = [50, 60, 70, 80, 90, 100]

// 一行填满的状态
export const fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

// 一行空的状态
export const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// 全空
export const blankMatrix = (() => {
  const matrix = []
  for (let i = 0; i < 20; i++) {
    matrix.push(blankLine)
  }
  return matrix
})()

// 消除行后的分数
export const clearPoints = [100, 300, 700, 1500]

// 缓存key值
export const StorageKey = 'VUE3_TETRIS'

// 上一把的状态
export const lastRecord = (() => {
  let data = window.localStorage.getItem(StorageKey)
  if (!data) {
    return null
  }
  try {
    if (window.btoa) {
      data = atob(data)
    }
    data = decodeURIComponent(data)
    data = JSON.parse(data)
  } catch (e) {
    if (window.console || window.console.error) {
      window.console.error('读取记录错误:', e)
    }
    return null
  }
  return data
})()

// 最高分
export const maxPoint = 999999

export const transform = (function() {
  const trans = [
    'transform',
    'webkitTransform',
    'msTransform',
    'mozTransform',
    'oTransform'
  ]
  const body = document.body
  return trans.filter((e:any) => body.style[e] !== undefined)[0]
})()

// 获取浏览器 ?后面的参数 如key=value
export const getParam = (param:any) => {
  const r = new RegExp(`\\?(?:.+&)?${param}=(.*?)(?:&.*)?$`)
  const m = window.location.toString().match(r)
  return m ? decodeURI(m[1]) : ''
}

