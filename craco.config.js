module.exports = {
  style: {
    modules: {
      // Enable CSS Modules for .module.css files
      localIdentName: '[name]__[local]__[hash:base64:5]',
    },
  },
  webpack: {
    configure: webpackConfig => {
      // Find the oneOf rule that contains the CSS rules
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);

      if (oneOfRule) {
        // Find CSS rule and enable CSS Modules for .module.css files
        const cssRule = oneOfRule.oneOf.find(
          rule =>
            rule.test &&
            rule.test.toString().includes('css') &&
            !rule.test.toString().includes('module')
        );

        const cssModuleRule = oneOfRule.oneOf.find(
          rule => rule.test && rule.test.toString().includes('module.css')
        );

        // Ensure CSS Modules work properly for .module.css files
        if (cssModuleRule) {
          const cssLoader = cssModuleRule.use.find(
            loader => loader.loader && loader.loader.includes('css-loader')
          );

          if (cssLoader && cssLoader.options) {
            cssLoader.options.modules = {
              ...cssLoader.options.modules,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            };
          }
        }
      }

      return webpackConfig;
    },
  },
};
