var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  url: '"https://mp-t.threetun.cn"',
  CDN_IMG: '"http://image-threetun.test.upcdn.net"'
})
