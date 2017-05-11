var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    context: __dirname,
    entry: {
        menus:'./assets/js/pages/menus/menus',
        events:'./assets/js/pages/events/events',
        dashboard:'./assets/js/pages/members/dashboard',
        announcements:'./assets/js/pages/announcements/announcements'
    },
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name]-[hash].js'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
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

