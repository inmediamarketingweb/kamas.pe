const { override, adjustStyleLoaders } = require('customize-cra');

module.exports = override(
  adjustStyleLoaders(rule => {
    if (rule.use && rule.use[1] && rule.use[1].loader === 'css-loader') {}
  })
);