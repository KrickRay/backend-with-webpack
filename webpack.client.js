var webpack = require('webpack');
var path = require('path');

var isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',
    debug: isDevelopment,
    entry: [
        'webpack-dev-server/client?http://localhost:5001',
        'webpack/hot/only-dev-server',
        './src/client.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: 'http://localhost:5001/',
        filename: 'client.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({quiet: true})
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['monkey-hot', 'babel']}
        ]
    }
};