var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    context: __dirname,
    entry: './assets/js/pages/events',
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: 'events.js',
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery':'jquery'
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],

    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader:'babel',
            query: {
                presets:['es2015', 'react']
            }
        }]
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    }
}

