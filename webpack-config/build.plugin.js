
let path = require('path');


module.exports = (env) => {
    let plugin = env.pluginname;
    return {
        entry: path.resolve('./', 'src/plugins/' + plugin + '/index.js'),
        output: {
            path: path.resolve('./', 'npm/' + plugin),
            filename: 'jetee.' + plugin + '.min.js',
            library: 'J' + plugin,
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
};