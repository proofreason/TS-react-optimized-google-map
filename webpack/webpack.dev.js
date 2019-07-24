/* global __dirname */
const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { aliases } = require('./settings/aliases');
const { imageLoader, tsxLoader } = require('./settings/rules');
const { distCleaner, envInit, htmlInit } = require('./settings/plugins');
const pathToRoot = '../';

const smp = new SpeedMeasurePlugin();

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './develop/index.tsx',
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, pathToRoot, 'dist'),
    },
    devServer: {
        contentBase: path.resolve(__dirname, pathToRoot, 'dist'),
    },
    resolve: {
        alias: aliases,
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [imageLoader, tsxLoader],
    },
    plugins: [distCleaner, htmlInit, envInit],
};
