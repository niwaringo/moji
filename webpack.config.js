const path = require("path");

module.exports = {
    entry: "./src/moji.js",
    output: {
        filename: "./dist/moji.js",
        library: "moji",
        libraryTarget: "umd",
        path: path.resolve(__dirname),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
        }],
    },
};
