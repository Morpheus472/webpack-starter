const HtmlWebpack           = require('html-webpack-plugin');
const MiniCssExtract        = require("mini-css-extract-plugin");
const CopyPlugin            = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',
    
    output: {
        //Al momento de ejecutar el npm run build esto hace que borre lo que ya esta y genere los nuevos archivos, asi no se mantienen los viejos      
        clean: true
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
    ]
    },
    optimization: {},

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
            filename: '[name].css',
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

    