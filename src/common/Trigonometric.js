const deg2radFactor = Math.PI / 180
const rad2degFactor = 180 / Math.PI

export const deg2rad = degree => degree * deg2radFactor

export const rad2deg = radian => radian * rad2degFactor

const mappings = {
  sin: {},
  cos: {},
  tan: {},
}

for (let i = 0; i < 3600; i++) {
  const degree = i / 10
  const radian = deg2rad(degree)

  mappings.sin[degree] = Math.sin(radian)
  mappings.sin[-degree] = -mappings.sin[degree]

  mappings.cos[degree] = mappings.cos[-degree] = Math.cos(radian)

  mappings.tan[degree] = mappings.sin[degree] / mappings.cos[degree]
  mappings.tan[-degree] = -mappings.tan[degree]
}

export const sin = degree => mappings.sin[degree % 360]

export const cos = degree => mappings.cos[degree % 360]

export const tan = degree => mappings.tan[degree % 360]
