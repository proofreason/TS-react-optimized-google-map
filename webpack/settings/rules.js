const path = require('path');
const pathToRoot = '../../';

const tsxLoader = {
    test: /\.(ts|tsx)$/,
    enforce: 'pre',
    use: [
        {
            loader: 'tslint-loader',
            options: {
                typeCheck: true,
            },
        },
        {
            options: {
                transpileOnly: true,
                declaration: false,
            },
            loader: 'awesome-typescript-loader',
        },
    ],
    include: [
        path.resolve(__dirname, pathToRoot, 'develop'),
        path.resolve(__dirname, pathToRoot, 'src'),
    ],
    exclude: path.resolve(__dirname, pathToRoot, 'node_modules'),
};
const imageLoader = {
    test: /\.(svg|png)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'img/',
            },
        },
    ],
    include: [
        path.resolve(__dirname, pathToRoot, 'develop'), 
        path.resolve(__dirname, pathToRoot, 'src')
    ],
};

module.exports = {
    tsxLoader,
    imageLoader,
};
