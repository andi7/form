const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'form',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json']
        },
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts']
  },
  externals: {
    react: 'react',
    'react-dom': 'ReactDOM'
  }
};
