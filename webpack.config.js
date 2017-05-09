const webpack = require('webpack');

module.exports = {
    entry: {
        customIcons: "./js/customIcons.js",
    },
    output: {
        libraryTarget: "umd",
        filename: "[name].js"
    },
    externals: [{}],
    resolve: {
        alias: {
            "OfficeFabric": "../node_modules/office-ui-fabric-react/lib-amd",
            "react": "../node_modules/react/dist",
            "react-dom": "../node_modules/react-dom/dist"
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