/* global __dirname */
const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { aliases } = require('./settings/aliases');
const { imageLoader, tsxLoader } = require('./settings/rules');
const { distCleaner, envInit, htmlInit } = require('./settings/plugins');
const pathToRoot = '../';

const smp = new SpeedMeasurePlugin();

module.exports = {
    entry: { 'OptimizedReactGoogleMaps' : './src/index.tsx'},
    mode: "production",
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, pathToRoot, 'dist'),
        library: 'OptimizedReactGoogleMaps',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        alias: aliases,
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [imageLoader, tsxLoader],
    },
    plugins: [distCleaner, envInit],
};


