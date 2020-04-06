module.exports = api => {
  if (api.env('development')) {
    api.cache(true)
  }
  return {
    env: {
      test: {
        presets: [
          'power-assert'
        ]
      }
    },
    presets: [
      ['@babel/preset-env', {
        targets: { node: '12' },
        corejs: '3',
        useBuiltIns: 'usage'
      }]
    ],
    plugins: [
      ['import', {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false
      }],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-syntax-object-rest-spread',
      ['@babel/plugin-proposal-decorators', {
        legacy: true
      }],
      '@babel/plugin-proposal-class-properties'
    ]
  }
}
