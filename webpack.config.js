const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  devServer: {
    contentBase: './dist',
  },
  devtool: 'source-map',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: 'css',
            })],
          }),
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
};
