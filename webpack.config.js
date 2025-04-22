const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [
                                   
            MiniCssExtractPlugin.loader, 'css-loader'                     
            
    ]
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const babelOptions = preset => {
    const opts = {
            presets: [
                '@babel/preset-env',
            ]     
    }
    if(preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
      }]

      if (isDev) {
        loaders.push('eslint-loader')
      }
 
    return loaders
}

const plugins = () => {
    const base = [

        new  HTMLWebpackPlugin({
         template: './index.html',
         minify: {
             collapseWhiteSpace: isProd
         },
         inject: 'body' 
        }),

        new CleanWebpackPlugin(),
 
        new CopyWebpackPlugin({    
                 patterns: [ { from: 'favicon.png', to: '' }  ]    
             }),

         new MiniCssExtractPlugin({
             filename: filename('css'),
         })
 
     ]

     if (isProd) {
        base.push(new BundleAnalyzerPlugin())
     }
     return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
       main: ['@babel/polyfill', './index.jsx'],
       analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'], 
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },

    optimization: optimization(),

    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : false,

    plugins: plugins(),

    module: {
                rules: [
                            {
                                test: /\.css$/, 
                                use: cssLoaders()
                            },
                            {
                                test: /\.(png|jpg|svg|gif)$/i, 
                                type: 'asset/resource',
                                generator: {
                                            filename: 'images/[name][ext]',
                                        }
                            },
                            {
                                test: /\.less$/, 
                                use: cssLoaders('less-loader')
                            },
                            {
                                test: /\.s[ac]ss$/, 
                                use: cssLoaders('sass-loader')
                            },
                            {
                                test: /\.(png|jpg|svg|gif)$/i, 
                                type: 'asset/resource',
                                generator: {
                                            filename: 'images/[name][ext]',
                                        }
                            },
                            {
                                test: /\.(ttf|woff|woff2|eot)$/,
                                type: 'asset/resource', 
                                generator: {
                                    filename: 'fonts/[name][ext]',
                                },
                            },
                            {
                            test: /\.xml$/,
                            use: ['xml-loader']
                            },
                            {
                            test: /\.csv$/,
                            use: ['csv-loader']
                            },
                            {
                                test: /\.js$/,
                                exclude: /node_modules/, 
                                use: jsLoaders()
                              },
                              {
                                test: /\.ts$/,
                                exclude: /node_modules/, 
                                use: {
                                  loader: 'babel-loader',
                                  options: babelOptions('@babel/preset-typescript')
                                }
                              },
                              {
                                test: /\.jsx$/,
                                exclude: /node_modules/, 
                                use: {
                                  loader: 'babel-loader',
                                  options: babelOptions('@babel/preset-react')
                                }
                              }
    

                    ]
            }
}