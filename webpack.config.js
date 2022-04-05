// webpack.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const LwcWebpackPlugin = require('lwc-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'production';

const fs = require('fs');
const defaultBuilder = require('@vlocity-cme/resources/src/javascript/utils/webpackBuilder');

let alias = {
    'vlocityoverride/redirects': path.resolve(
        __dirname,
        './src/modules/vlocityoverride/redirects.js'
    ),
    'vlocitytranslations/translations': path.resolve(
        __dirname,
        './src/modules/vlocitytranslations/translations.js'
    )
};

// Get the installed packages
const npmBasePath = path.resolve(__dirname, './node_modules/@vlocity-cme');

if (fs.existsSync(npmBasePath)) {
    const list = fs.readdirSync(npmBasePath);
    list.forEach((path) => {
        const fullPath = npmBasePath + '/' + path,
            info = fs.statSync(fullPath);

        if (info.isDirectory()) {
            const packageAlias = defaultBuilder(
                fullPath + '/src/javascript/salesforce/'
            );
            alias = {
                ...alias,
                ...packageAlias.resolve.alias
            };
        }
    });
}

module.exports = {
    context: __dirname,
    entry: {
        fallback: './src/index.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: './[name].js'
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        symlinks: false,
        alias: alias
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'src/modules')],
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, 'src/modules'),
                    path.resolve(__dirname, 'node_modules')
                ],
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            //'process.env.NODE_ENV': JSON.stringify(mode),
            VLOCITY_SPA_NAVIGATION: false
        }),
        new LwcWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html')
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(
                        __dirname,
                        'node_modules/@salesforce-ux/design-system/assets/styles'
                    ),
                    to: path.join(__dirname, 'dist/slds/assets/styles')
                },
                {
                    from: path.join(
                        __dirname,
                        'node_modules/@salesforce-ux/design-system/assets/icons'
                    ),
                    to: path.join(__dirname, 'dist/slds/assets/icons')
                },
                {
                    from: path.join(__dirname, '/assets/fonts'),
                    to: path.join(__dirname, 'dist/slds/assets/fonts')
                }
            ]
        })
    ]
};
