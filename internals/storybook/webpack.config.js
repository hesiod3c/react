const storybookWebpackConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const webpackConfig = require('../webpack/webpack.dev.config.js');

module.exports = function (config, env) {
  const newConfig = storybookWebpackConfig(config, env);
  newConfig.module.rules = (newConfig.module.rules || []).concat(webpackConfig.module.rules);

  return newConfig;
};
