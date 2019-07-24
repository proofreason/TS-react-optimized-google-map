const path = require('path');
const pathToRoot = '../../';

const aliases = {
    '@components': path.resolve(__dirname, pathToRoot, 'src/components'),
    '@context': path.resolve(__dirname, pathToRoot, 'src/context'),
    '@lib': path.resolve(__dirname, pathToRoot, 'src/lib'),
    '@typings': path.resolve(__dirname, pathToRoot, 'src/typings'),
    '@develop_components': path.resolve(__dirname, pathToRoot, 'develop/components'),
    '@develop_lib': path.resolve(__dirname, pathToRoot, 'develop/lib'),
};

module.exports = { aliases };
