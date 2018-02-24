let events = Object.create(null)

export const on = addListener

export const once = addOnceListener

export function addListener(type, fn) {
  getEvents(type).push({ fn })
}

export function addOnceListener(type, fn) {
  getEvents(type).push({ fn, once: true, emitted: false })
}

export function prependListener(type, fn) {
  getEvents(type).unshift({ fn })
}

export function prependOnceListener(type, fn) {
  getEvents(type).unshift({ fn, once: true, emitted: false })
}

export function removeListener(type, fn) {
  events[type] = getEvents(type).filter(handler => handler.fn !== fn)
}

export function removeAllListeners(type) {
  if (type == null) {
    events = Object.create(null)
  }
  events[type] = []
}

export function listeners(type) {
  return getEvents(type).map(handler => handler.fn)
}

export function emit(type, ...args) {
  const handlers = getEvents(type)

  events[type] = handlers.filter(handler => !handler.once)

  for (let i = 0, ii = handlers.length; i < ii; i++) {
    handlers[i].fn.apply(null, args)
  }
}

function getEvents(type) {
  if (!events[type]) {
    events[type] = []
  }
  return events[type]
}
