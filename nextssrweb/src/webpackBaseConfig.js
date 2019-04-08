const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    modules: [path.join(__dirname, '../'), 'node_modules'],
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};
