import { context } from 'global/canvas'
import Layer from 'common/Layer'
import { on } from 'global/eventbus'

export default class Footprint extends Layer {

  canvas = wx.createCanvas()

  context = this.canvas.getContext('2d')

  constructor() {
    super()

    on('player:update', this.onPlayerUpdate)
    on('player:turn', this.onPlayerTurn)
  }

  onPlayerUpdate = () => {
    this.context.drawImage(Footprint.DOT_CACHE, this.scene.player.renderX, this.scene.player.renderY)
  }

  onPlayerTurn = () => {
  }

  render() {
    context.drawImage(this.canvas, this.scene.viewport.x, this.scene.viewport.y)
  }

  static DOT_CACHE = wx.createCanvas()
}

{
  Footprint.DOT_CACHE.width = Footprint.DOT_CACHE.height = 2

  const cacheContext = Footprint.DOT_CACHE.getContext('2d')

  cacheContext.fillRect(0, 0, 2, 2)
}
