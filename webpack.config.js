const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
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
  plugins: [
    new Dotenv()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "path": false,
      "os": false,
      "crypto": false
    }
  },
  output: {
    filename: 'bundle.js', // the output bundle filename
    path: path.resolve(__dirname, 'dist'), // the output path
  },
};
