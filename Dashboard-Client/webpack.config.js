var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('styles.css')

module.exports = {
  
  entry: path.join(__dirname,'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath:'/',
    filename: 'js/bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject:true,
      template: path.join(__dirname,'public/index.html')
    }),
    CSSExtract
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react','stage-0','es2015']
      }
    },
    { test: /\.html$/, loader: 'html' },
    { 
      test: /\.s?css$/,
      use: CSSExtract.extract({
          use: [
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: true
                  }
              },
              {
                  loader: 'sass-loader',
                  options: {
                      sourceMap: true
                  }
              }
          ]
      })
  },
    {
      test: /\.json?$/,
      loader: 'json'
    }]
  }
};
