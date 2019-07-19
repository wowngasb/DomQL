var path = require('path');

module.exports = {
    entry: './index.js',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/
        }, ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'domQL.js',
    }
};