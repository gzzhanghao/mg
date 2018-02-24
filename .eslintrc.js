module.exports = {

  parser: 'babel-eslint',

  parserOptions: {
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
  ],

  env: {
    commonjs: true,
    es6: true,
  },

  globals: {
    wx: false,
    console: false,
    requestAnimationFrame: true,
    cancelAnimationFrame: true,
  },

  rules: {
    'indent': [2, 2],
  },
}
