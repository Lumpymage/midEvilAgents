const path = require('path');

module.exports = {
  entry: './src/index.ts', // path to your main TypeScript file
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js', // the output bundle filename
    path: path.resolve(__dirname, 'dist'), // the output path
  },
};
