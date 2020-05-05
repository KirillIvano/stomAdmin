const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const dev = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: '8080',
        hotOnly: true,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanObsoleteChunks(),
        new webpack.DefinePlugin({
            SERVER_ORIGIN: '"http://localhost:5000"',
            IMAGE_HOST: '"http://localhost:5000/images"',
        }),
    ],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    'url-loader',
                ],
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
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
    dev,
);


