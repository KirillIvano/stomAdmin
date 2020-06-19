const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@styles': path.resolve(__dirname, 'src/common')
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            exclude: [
                                /node_modules/,
                            ],
                            'presets': ['@babel/env', '@babel/react'],
                            'plugins': ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-object-assign'],
                        },
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
            },
        ],
    },
};
