/* config-overrides.js */

const rewireMobX = require("react-app-rewire-mobx")

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewireMobX(config, env)

  // // Custom Webpack Resolve modules
  // config.resolve = {
  //   modules: ["node_modules", process.cwd()]
  // }

  return config
}
