import Layer from 'common/Layer'
import { on } from 'global/eventbus'

export default class Footprint extends Layer {

  constructor() {
    super()

    on('player:update', this.onPlayerUpdate)
    on('player:turn', this.onPlayerTurn)
  }

  onPlayerUpdate = () => {
    // @todo
  }

  onPlayerTurn = () => {
    // @todo
  }
}
