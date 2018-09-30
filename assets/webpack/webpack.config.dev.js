const path = require('path'), resolve = path.resolve,
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: require(resolve(__dirname, '..', 'entry.js')),
    output: {
        filename: '[name].js',
        path: resolve(__dirname, '..', '..', 'public', 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/react'],
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|woff|woff2|eot|ttf|otf|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: resolve(__dirname, '..', '..', 'public')
        }),
        new MiniCssExtractPlugin('[name].css')
    ]
};
