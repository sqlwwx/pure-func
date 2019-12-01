module.exports = {
  parser: 'babel-eslint',
  extends: ['standard-airbnb-base'],
  plugins: ['you-dont-need-lodash-underscore'],
  rules: {
    'import/no-extraneous-dependencies': 'off'
  }
}
