const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const lessModifyVars = require('./less-modify-vars');

module.exports = env => ({
  devServer: {
    contentBase: './dist',
  },
  devtool: 'source-map',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
      },
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true,
            })],
          }),
        },
      },
      {
        test: /node_modules\/.*\.(css|less)$/,
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
              modifyVars: lessModifyVars,
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              importLoaders: 2,
              localIdentName: env.NODE_ENV === 'production'
                ? '[hash:base64]'
                : '[name]__[local]__[hash:base64:5]',
              modules: true,
              namedExport: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modifyVars: lessModifyVars,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
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
    alias: {
      APIS: path.resolve(__dirname, 'src/apis/'),
      DUCKS: path.resolve(__dirname, 'src/ducks/'),
      STORE: path.resolve(__dirname, 'src/store/'),
    },
  },
});
