import Game from 'scene/Game'

const game = new Game
const MSPF = 1000 / 60

let startTime = Date.now()
let lastFrame = 0

onFrame()

function onFrame() {
  requestAnimationFrame(onFrame)

  const targetFrame = (Date.now() - startTime) / MSPF

  for (; lastFrame < targetFrame; lastFrame++) {
    game.update()
  }

  game.render()
}
