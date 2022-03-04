const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    helpers: ['./src/helpers.ts'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist/js'),
    globalObject: 'this',
  },
  externals: {},
};
