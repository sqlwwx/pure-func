module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ['standard-airbnb-base'],
  plugins: ['you-dont-need-lodash-underscore'],
  rules: {
    'import/no-extraneous-dependencies': 'off'
  },
  env: {
    node: true
  }
}
