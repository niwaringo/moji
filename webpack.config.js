const path = require("path");

module.exports = [{
    entry: "./src/index.js",
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
}, {
    entry: "./src/index.js",
    output: {
        filename: "./docs/moji.js",
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
}, {
    entry: [
        "./test/moji.core.test.js",
        "./test/moji.str.test.js",
        "./test/mojisyu.test.js",
    ],
    output: {
        filename: "./docs/moji.test.js",
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
}];
