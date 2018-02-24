export default class Layer {

  parent = null

  children = []

  add(item) {
    if (item.parent) {
      item.parent.remove(item)
    }
    item.parent = this
    this.children.push(item)
  }

  remove(item) {
    const index = this.children.indexOf(item)
    if (index < 0) {
      return
    }
    this.children[index].parent = null
    this.children.splice(index, 1)
  }

  update() {
    for (const child of this.children) {
      child.update()
    }
  }

  render() {
    for (const child of this.children) {
      child.render()
    }
  }

  get scene() {
    let scene = this
    while (scene.parent) {
      scene = scene.parent
    }
    return scene
  }

  get statics() {
    return this.constructor
  }
}
