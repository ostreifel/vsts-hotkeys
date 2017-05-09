const webpack = require('webpack');

module.exports = {
    entry: {
        customIcons: "./js/customIcons.js",
    },
    output: {
        libraryTarget: "amd",
        filename: "[name].js"
    },
    externals: [{
    },
        /^TFS\//, // Ignore TFS/* since they are coming from VSTS host 
        /^VSS\//  // Ignore VSS/* since they are coming from VSTS host
    ],
    resolve: {
        alias: { "OfficeFabric": "../node_modules/office-ui-fabric-react/lib-amd" }
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