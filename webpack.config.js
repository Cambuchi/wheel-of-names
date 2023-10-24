const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wheel of Names',
      favicon: './src/assets/images/favicon.ico',
      meta: {
        description: {
          name: 'description',
          content: 'A little NAVEX project',
        },
        keyword: {
          name: 'keywords',
          content: 'Wheel of names, NAVEX',
        },
        'og:title': {
          property: 'og:title',
          content: 'Wheel of Names',
        },
        'og:description': {
          property: 'og:description',
          content: 'A little NAVEX project',
        },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': {
          property: 'og:url',
          content: 'https://cambuchi.github.io/wheel-of-names/',
        },
        'og:image': {
          property: 'og:image',
          content: './src/assets/images/og-image.png',
        },
        'twitter:card': {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        'twitter:title': {
          name: 'twitter:title',
          content: 'Wheel of Names',
        },
        'twitter:description': {
          name: 'twitter:description',
          content: 'A little NAVEX project',
        },
        'twitter:image': {
          name: 'twitter:image',
          content: './src/assets/images/og-image.png',
        },
      },
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        //for importing css
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        //for importing images
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        //for importing fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
