const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const pathToRoot = '../../';

const distCleaner = new CleanWebpackPlugin();
const htmlInit = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, pathToRoot, 'develop/html-template.html'),
    // dev server will not work out of the box if you change the name of html file
    filename: 'index.html',
});
const envInit = new Dotenv({
    path: './src/.env',
    safe: true,
    systemvars: true,
});

module.exports = { distCleaner, htmlInit, envInit };
