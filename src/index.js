import Game from 'scene/Game'

const game = new Game
const MSPF = 1000 / 60

let startTime = Date.now()
let lastFrame = 0

onFrame()

function onFrame() {
  requestAnimationFrame(onFrame)

  for (; lastFrame < Math.floor((Date.now() - startTime) / MSPF); lastFrame++) {
    game.update()
  }

  game.render()
}
