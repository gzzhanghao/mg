import { canvas } from 'global/canvas'

import Layer from 'common/Layer'

import Footprint from 'scene/game/Footprint'
import Player from 'scene/game/Player'
import Enemies from 'scene/game/Enemies'
import Background from 'scene/game/Background'

export default class Game extends Layer {

  viewport = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }

  background = new Background

  player = new Player

  enemies = new Enemies

  footprint = new Footprint

  constructor() {
    super()

    this.add(this.background)
    this.add(this.footprint)
    this.add(this.enemies)
    this.add(this.player)
  }

  update() {
    super.update()

    this.viewport.x += this.getViewportDelta(this.player.renderX + Player.HALF_CACHE_SIZE, Game.HALF_VIEWPORT_WIDTH)
    this.viewport.y += this.getViewportDelta(this.player.renderY + Player.HALF_CACHE_SIZE, Game.HALF_VIEWPORT_HEIGHT)
  }

  getViewportDelta(pos, middlePoint) {
    const delta = middlePoint - pos
    return delta * Math.min(Math.abs(delta / middlePoint) ** 2, 1)
  }

  static VIEWPORT_WIDTH = canvas.width

  static VIEWPORT_HEIGHT = canvas.height

  static HALF_VIEWPORT_WIDTH = Game.VIEWPORT_WIDTH / 2

  static HALF_VIEWPORT_HEIGHT = Game.VIEWPORT_HEIGHT / 2
}
