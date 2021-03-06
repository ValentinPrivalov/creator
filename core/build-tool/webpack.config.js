const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

function exportConfig() {
    const manifest = require(path.resolve(arguments['1']['env']['manifest']));
    const rootPath = './../../';
    const buildToolDir = path.resolve(rootPath, 'creator/core/build-tool/');

    return {
        entry: './modules/' + manifest.name + '-entry.ts',
        output: {
            filename: 'src/main.js',
            path: path.resolve(rootPath, 'games', manifest.name, 'build')
        },
        devtool: 'eval-cheap-source-map',
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/}
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {from: path.resolve(buildToolDir, 'template/styles.css'), to: 'src/css/styles.css'},
                    {from: path.resolve(rootPath, 'games', manifest.name, 'assets'), to: 'assets/'}
                ]
            }),
            new HtmlWebpackPlugin({
                title: manifest.name,
                template: path.resolve(buildToolDir, 'template/index.html')
            })
        ]
    };
}

module.exports = exportConfig;
