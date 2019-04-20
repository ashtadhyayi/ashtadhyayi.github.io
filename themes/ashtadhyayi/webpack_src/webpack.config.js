var webpack = require("webpack");
const path = require('path');
module.exports = {
    entry: {
        main: "./js/main.js",
        ui_lib: "./js/ui-lib.js"
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, '../static/dist'),
        libraryTarget: 'var',
        library: 'module_[name]'
    },
    mode: "development",
    optimization: {
        usedExports: true
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },
    
};