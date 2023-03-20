import { getElementWidth } from '../util/getElementWidth'
import { debounce } from '../util/debounce'

export class Switcher {
  constructor(root) {
    this.root = root
    this.items = root.querySelectorAll('.js-switcher_item')
    this.size = this.getSizes()
    this._active = 0

    this.init()
  }

  init() {
    this.setMargin()

    this.items.forEach((e, key) => {
      e.addEventListener('click', () => (this.active = key))
    })

    const onResize = () => {
      this.size = this.getSizes()
      this.setMargin()
      this.setActive()
    }

    window.addEventListener('resize', onResize)
  }

  get active() {
    return this._active
  }

  set active(v) {
    this._active = v
    this.setActive()
  }

  get step() {
    return (this.size.root - this.size.item) / (this.items.length - 1)
  }

  getSizes() {
    return {
      root: getElementWidth(this.root),
      item: getElementWidth(this.items[0]),
    }
  }

  setActive() {
    this.items.forEach((e, key) => {
      const action = key === this.active ? 'add' : 'remove'
      e.classList[action]('is-active')

      e.style.left =
        key >= this.active
          ? 0
          : '-' + (getElementWidth(this.items[0]) - this.step) + 'px'
    })
  }

  setMargin() {
    this.items.forEach((e, key) => {
      e.style.marginLeft = this.step * key + 'px'
      e.style.zIndex = 50 - key
    })
  }
}
