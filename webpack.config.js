const webpack = require('webpack');

module.exports = {
    entry: {
        customIcons: "./js/customIcons.js",
    },
    output: {
        libraryTarget: "umd",
        filename: "[name].js"
    },
    externals: [{
        "react": true,
        "react-dom": true
    }],
    resolve: {
        alias: {
            "OfficeFabric": "..\\node_modules\\office-ui-fabric-react\\lib-amd",
            "react-dom":    "..\\node_modules\\react-dom",
            "react":        "..\\node_modules\\react"
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
};