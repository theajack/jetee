let version = require('../package.json').version;

let path = require('path');
let tool = require('../helper/tool');
tool.write('./src/jetee/version.js', 'export default \'' + version + '\';');

module.exports = {
    entry: path.resolve('./', 'src/jetee/index.js'),
    output: {
        path: path.resolve('./', 'npm/jetee'),
        filename: 'jetee.min.js',
        library: 'Jet',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    module: {
        rules: [{
            test: /(.js)$/,
            use: [{
                loader: 'babel-loader',
            }]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
        }]
    }
};