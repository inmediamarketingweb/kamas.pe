const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    clean: true,
    },

    module: {
    rules: [
    {
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: /node_modules\/react-datepicker/,
    },
    {
    test: /\.css$/,
    use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    ],
    },
    ],
    },

    plugins: [
    new MiniCssExtractPlugin({
    filename: 'css/main.css',
    chunkFilename: 'css/[name].chunk.css',
    }),
    ],

    optimization: {
    splitChunks: {
    chunks: 'all',
    },
    runtimeChunk: 'single',
    },
};