import { context } from 'global/canvas'
import Layer from 'common/Layer'
import { on } from 'global/eventbus'

export default class Footprint extends Layer {

  dots = []

  constructor() {
    super()

    on('player:update', this.onPlayerUpdate)
    on('player:turn', this.onPlayerTurn)
  }

  onPlayerUpdate = () => {
    const { player } = this.scene
    this.dots.push([
      player.renderX - Footprint.HALF_DOT_SIZE,
      player.renderY - Footprint.HALF_DOT_SIZE,
    ])
    if (this.dots.length > 100) {
      this.dots.shift()
    }
  }

  onPlayerTurn = () => {
  }

  render() {
    const { x, y } = this.scene.viewport

    const width = this.scene.statics.VIEWPORT_WIDTH
    const height = this.scene.statics.VIEWPORT_HEIGHT

    for (const dot of this.dots) {

      if (x + dot[0] + Footprint.DOT_SIZE < 0 || x + dot[0] > width) {
        continue
      }

      if (y + dot[1] + Footprint.DOT_SIZE < 0 || y + dot[1] > height) {
        continue
      }

      context.drawImage(
        Footprint.DOT_CACHE,
        this.scene.viewport.x + dot[0],
        this.scene.viewport.y + dot[1]
      )
    }
  }

  static DOT_SIZE = 2

  static HALF_DOT_SIZE = Footprint.DOT_SIZE / 2

  static DOT_CACHE = wx.createCanvas()
}

{
  Footprint.DOT_CACHE.width = Footprint.DOT_CACHE.height = Footprint.DOT_SIZE

  const cacheContext = Footprint.DOT_CACHE.getContext('2d')

  cacheContext.fillRect(0, 0, Footprint.DOT_SIZE, Footprint.DOT_SIZE)
}
