const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const webpack = require('webpack');

const prod = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '..', 'simros', 'static', 'admin'),
        publicPath: '/admin/',
        filename: 'bundle.js',
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
        ],
    },
    plugins: [
        new CleanObsoleteChunks(),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            SERVER_ORIGIN: '"http://194.67.113.29:5000"',
            IMAGE_HOST: '"http://194.67.113.29:5000/images"',
        }),
    ],
    mode: 'production',
    watch: true,
    module: {

        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    'url-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer(),
                            ],
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            paths: [path.resolve(__dirname, 'src/common/')],
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = merge(
    require('./webpack.common'),
    prod,
);
