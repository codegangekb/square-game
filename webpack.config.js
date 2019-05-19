const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /tests/]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLPlugin(),
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, "node_modules")
        ])
    ],
    devServer: {
        // publicPath: 'public/',
        watchOptions: {
            ignored: [
                path.resolve(__dirname, 'dist'),
                path.resolve(__dirname, 'tests'),
                path.resolve(__dirname, 'node_modules')
            ]
        }
    },
    mode: "development"
};
