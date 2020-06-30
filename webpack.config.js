const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
   mode: 'production',
   devtool: 'source-map',
   watch: true,
   entry: [
      './src/js/ui-util.js',
      './src/js/ui-badge.js',
      './src/js/ui-button.js',
      './src/js/ui-input-group.js',
      './src/js/ui-list-group.js',
      './src/js/ui-navbar.js',
      './src/js/ui-select.js',
      './src/js/ui-tab.js',
      './src/js/ui-icon-button.js',
      './src/js/ui-upload.js',
      './src/js/ui.js',

      './node_modules/bootstrap/dist/js/bootstrap.js',
      './node_modules/popper.js/dist/popper.js',

      './node_modules/nanobar/nanobar.js',

      './node_modules/jquery-validation/dist/jquery.validate.js',
      './node_modules/jquery-validation/dist/additional-methods.js',
      './node_modules/jquery-validation/dist/localization/messages_pt_BR.js'
   ],
   module: {
      rules: [
         {
            test: require.resolve('jquery'),
            use: [
               {
                  loader: 'expose-loader',
                  options: '$'
               },
               {
                  loader: 'expose-loader',
                  options: 'jQuery'
               }
            ]
         },
         {
            test: require.resolve('nanobar'),
            use: [
               {
                  loader: 'expose-loader',
                  options: 'Nanobar'
               }
            ]
         }
      ]
   },
   optimization: {
      minimize: true,
      minimizer: [
         new TerserPlugin({
            terserOptions: { output: { ascii_only: true } }
         })
      ],
   },
   plugins: [
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery',
         'window.$': 'jquery',
         'window.jQuery': 'jquery',
      })
   ],
   output: {
      path: path.resolve(__dirname, '..', 'icelus-content/public/resource/static/_plugin/icelus-ui/js'),
      filename: 'icelus-ui.min.js'
   }
};
