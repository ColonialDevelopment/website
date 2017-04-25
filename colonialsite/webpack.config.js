var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    context: __dirname,
    watch: true,
    entry: {
        menus:'./assets/js/pages/menus/menus',
        events:'./assets/js/pages/events/events'
    },

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name]-[hash].js',
        publicPath: 'http://localhost:3000/assets/bundles/',
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
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
            loaders:['react-hot-loader', 'babel-loader'],
        }]
    },

    resolve: {
        modules: ['node_modules', 'bower_components'],
        extensions: ['.js', '.jsx']
    }
}

