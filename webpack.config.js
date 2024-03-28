const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const packageJson = require('./package.json'); // Import package.json

module.exports = {
   entry: './src/main.ts',
   mode: 'production',
   devtool: 'hidden-source-map',
   watch: true,
   output: {
      library: 'kh',
      filename: 'khmerformat.min.js',
      path: path.resolve(__dirname, 'js'),
   },
   optimization: {
      minimize: true,
      minimizer: [
         new TerserPlugin({
            terserOptions: {
               format: {
                  comments: false, // Remove comments
               },
            },
            extractComments: false, // Do not extract comments to a separate file
         }),
      ],
   },
   plugins: [
      new webpack.BannerPlugin({
         banner: `
         /*!
         * ${packageJson.name}
         * Version ${packageJson.version}
         * Author: ${packageJson.author}
         * Date: ${new Date().toLocaleDateString()}
         */
         `,
         raw: true, // Allows for multi-line strings and embedded expressions
      }),
   ],
   resolve: {
      extensions: ['.ts', '.js'],
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
      ],
   },
};