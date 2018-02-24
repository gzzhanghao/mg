import { context } from 'global/canvas'
import { emit } from 'global/eventbus'
import { wx } from 'global/wx'

import Layer from 'common/Layer'
import { sin, cos, deg2rad } from 'common/Trigonometric'

export default class Player extends Layer {

  ori = 0

  x = 0

  y = 0

  speed = Player.ROTATE_SPEED

  constructor() {
    super()

    wx.onTouchStart(this.onTouchStart)
    wx.onTouchEnd(this.onTouchEnd)
  }

  render() {
    const { row, col } = Player.cacheCoordForOri(this.ori)

    context.drawImage(
      Player.CACHE_CANVAS,

      // sx, sy, dw, dh
      col * Player.CACHE_SIZE, row * Player.CACHE_SIZE,
      Player.CACHE_SIZE, Player.CACHE_SIZE,

      // dx, dy, dw, dh
      this.renderX, this.renderY,
      Player.CACHE_SIZE, Player.CACHE_SIZE
    )
  }

  update() {
    this.ori = (this.ori + this.speed) % 360
    emit('player:update')
  }

  onTouchStart = () => {
    this.turn(-Player.ROTATE_SPEED)
  }

  onTouchEnd = () => {
    this.turn(Player.ROTATE_SPEED)
  }

  turn(speed) {
    this.speed = speed

    this.x += 2 * Player.ROTATE_RADIUS * cos(this.ori)
    this.y += 2 * Player.ROTATE_RADIUS * sin(this.ori)

    this.ori = (this.ori + 180) % 360

    emit('player:turn')
  }

  get renderX() {
    return Math.round(this.scene.viewport.x + this.x + Player.ROTATE_RADIUS * cos(this.ori) - Player.HALF_CACHE_SIZE)
  }

  get renderY() {
    return Math.round(this.scene.viewport.y + this.y + Player.ROTATE_RADIUS * sin(this.ori) - Player.HALF_CACHE_SIZE)
  }

  static ROTATE_SPEED = 10

  static ROTATE_RADIUS = 50

  static RENDER_WIDTH = 10

  static RENDER_HEIGHT = 20

  static HALF_RENDER_WIDTH = Math.round(Player.RENDER_WIDTH / 2)

  static HALF_RENDER_HEIGHT = Math.round(Player.RENDER_HEIGHT / 2)

  static CACHE_SIZE = Math.ceil(Math.sqrt(Player.RENDER_WIDTH ** 2 + Player.RENDER_HEIGHT ** 2))

  static HALF_CACHE_SIZE = Math.round(Player.CACHE_SIZE / 2)

  static CACHE_CANVAS = wx.createCanvas()

  static cacheCoordForOri(ori) {
    let deg = ori % 360
    if (deg < 0) {
      deg += 360
    }
    return { row: Math.floor(deg / 24), col: deg % 24 }
  }
}

{
  Player.CACHE_CANVAS.width = Player.CACHE_SIZE * 24
  Player.CACHE_CANVAS.height = Player.CACHE_SIZE * 15

  const cacheContext = Player.CACHE_CANVAS.getContext('2d')

  for (let i = 0; i < 360; i++) {
    const { row, col } = Player.cacheCoordForOri(i)

    cacheContext.translate(col * Player.CACHE_SIZE + Player.HALF_CACHE_SIZE, row * Player.CACHE_SIZE + Player.HALF_CACHE_SIZE)
    cacheContext.rotate(deg2rad(i))
    cacheContext.fillRect(-Player.HALF_RENDER_WIDTH, -Player.HALF_RENDER_HEIGHT, Player.RENDER_WIDTH, Player.RENDER_HEIGHT)
    cacheContext.setTransform(1, 0, 0, 1, 0, 0)
  }
}
