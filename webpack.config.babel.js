import  webpack  from "webpack";
import path from 'path'
import { IgnorePlugin } from "webpack";

export default (env, args) => {
    const isProduction = args.mode === 'production';
    const devtool = !isProduction && 'inline-source-map'
    const rules = [
        {
            test: /\.jsx?$/,
            use: ['babel-loader']
        }
    ]

    return {
        devtool,
        entry: './src/entries/app.jsx',
        output: {
            path: path.join(__dirname, './public/js/'),
            filename: 'app.js',
        },
        module: { rules },
        resolve: {
            modules: ['node_modules'],
            alias: {
                '~': path.join(__dirname, './src/'),
            },
            extensions: ['.js', '.jsx'],
        },
        //momentの中のlocales以下のもぢゅーるをビルド時含めない。
        plugins: [
            new IgnorePlugin(/^\.\/locale$/, /moment$/),
        ]
    }
}