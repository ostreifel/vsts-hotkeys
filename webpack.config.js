const webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        customIcons: "./js/customIcons.js",
    },
    output: {
        libraryTarget: "var",
        filename: "[name].js"
    },
    resolve: {
        root: path.resolve("./"),
        alias: {
            "OfficeFabric": path.resolve( __dirname, "node_modules", "office-ui-fabric-react", "lib-amd"),
            "react-dom":    path.resolve( __dirname, "node_modules", "react-dom"),
            "react":    path.resolve( __dirname, "node_modules", "react"),
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