var path = require('path');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

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
    },
    devServer: {
        contentBase: __dirname,
        port: 5478,
        open: true
    }
};