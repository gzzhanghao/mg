import { canvas, context } from 'global/canvas'
import { wx } from 'global/wx'

import Layer from 'common/Layer'

export default class Background extends Layer {

  render() {
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(Background.CACHE_CANVAS, this.scene.viewport.x - this.scene.statics.HALF_VIEWPORT_WIDTH, this.scene.viewport.y - this.scene.statics.HALF_VIEWPORT_HEIGHT)
  }

  static CACHE_CANVAS = wx.createCanvas()
}

{
  Background.CACHE_CANVAS.width = canvas.width
  Background.CACHE_CANVAS.height = canvas.height

  const cacheContext = Background.CACHE_CANVAS.getContext('2d')
  const gradient = cacheContext.createLinearGradient(0, 0, canvas.width, canvas.height)

  gradient.addColorStop(0, 'red')
  gradient.addColorStop(1, 'white')

  cacheContext.fillStyle = gradient
  cacheContext.fillRect(0, 0, canvas.width, canvas.height)
}
