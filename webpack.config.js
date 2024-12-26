const path = require('path');

module.exports = {
  entry: {
    background: './background.js',
    content_start_mellowtel: './content_start_mellowtel.js',
    content: './content.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'production',
  target: 'web',
};
