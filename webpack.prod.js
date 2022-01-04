const HtmlWebpack           = require('html-webpack-plugin');
const MiniCssExtract        = require("mini-css-extract-plugin");
const CopyPlugin            = require("copy-webpack-plugin");
const CssMinimizer          = require('css-minimizer-webpack-plugin');
const Terser                = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    
    output: {
        //Al momento de ejecutar el npm run build esto hace que borre lo que ya esta y genere los nuevos archivos, asi no se mantienen los viejos      
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {

        rules: [
            {
                //Esto es una expresion regular, lo que hara es barrer todos los archivos del build y buscara donde encontrara uno con extension html

                test: /\.html$/,
                //Al encontrar el archivo html hara:
                loader: 'html-loader',
    
                options: {
                    sources: false
                }
            },
    
            {
            test: /\.css$/,
            exclude: /styles.css$/,
            use : ['style-loader', 'css-loader']
        },
        {
            test: /styles.css$/,
            use: [MiniCssExtract.loader, 'css-loader']
        },
        {
            test: /\.(png|jpe|g|gif)$/,
            loader: 'file-loader'
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
    ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        new HtmlWebpack(
            {
                //Me permite cambiarle el nombre a la app
                title: 'Mi Webpack App',
                //Me permite cambiar el nombre del archivo de salida
                //Por defecto siempre se llama index.html, se podria dejar vacio y se llamaria asi de todas formas
                //filename: 'index.html'
                //Es el archivo en el que quiero se base el html a cargar
                template: './src/index.html'
            }
        ),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin(
            {
                patterns:[
                {from: 'src/assets/', to: 'assets/'}
            ]
            }
        )
    ]
}

    