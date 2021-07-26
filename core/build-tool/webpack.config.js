const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

function exportConfig() {
    const gameName = require(path.resolve(arguments['1']['env']['manifest'])).name;
    const rootPath = './../../';
    const buildToolDir = path.resolve(rootPath, 'core/build-tool/');

    return {
        entry: './index.ts',
        output: {
            filename: 'js/main.js',
            path: path.resolve(rootPath, 'games-build', gameName)
        },
        devtool: 'eval-cheap-source-map',
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {from: path.resolve(buildToolDir, 'template/styles.css'), to: 'css/styles.css'}
                ]
            }),
            new HtmlWebpackPlugin({
                title: gameName,
                template: path.resolve(buildToolDir, 'template/index.html')
            })
        ]
    };
}

module.exports = exportConfig;
