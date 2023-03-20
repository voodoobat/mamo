export const debounce = (fn, ms) => {
  let isCooldown = false

  return function () {
    if (isCooldown) return

    fn.apply(this, arguments)
    isCooldown = true
    setTimeout(() => (isCooldown = false), ms)
  }
}
