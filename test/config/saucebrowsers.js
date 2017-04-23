// https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
const version = require("../../package.json").version;
const build = "build:" + version + "-" + Date.parse(new Date());

module.exports = {
    // Chrome
    chrome_win10: {
        testName: "'Chrome Windows10",
        base: "SauceLabs",
        browserName: "chrome",
        platform: "Windows 10",
        version: "latest",
        build: build,
        passed: true,
        public: "public",
    },

    iphone: {
        testName: "iphone-10.2",
        base: "SauceLabs",
        browserName: "Safari",
        appiumVersion: "1.6.4",
        deviceName: "iPhone Simulator",
        deviceOrientation: "portrait",
        platformVersion: "10.2",
        platformName: "iOS",
        build: build,
        passed: true,
        public: "public",
    },
};

// chrome_mac: {
//     testName: "Chrome mac",
//         base: "SauceLabs",
//         browserName: "chrome",
//         platform: "OS X 10.12",
//         version: "latest",
//         build: build,
//         passed: true,
//         public: "public",
// },
//
// // Firefox
// firefox_win10: {
//     testName: "Firefox win10",
//         base: "SauceLabs",
//         browserName: "firefox",
//         platform: "Windows 10",
//         version: "latest",
//         build: build,
//         passed: true,
//         public: "public",
// },
//
// firefox_mac: {
//     testName: "Firefox mac",
//         base: "SauceLabs",
//         browserName: "firefox",
//         platform: "OS X 10.12",
//         version: "latest",
//         build: build,
//         passed: true,
//         public: "public",
// },
//
// // safari mac
// safari_mac: {
//     testName: "safari mac",
//         base: "SauceLabs",
//         browserName: "safari",
//         platform: "OS X 10.12",
//         version: "10.0",
//         build: build,
//         passed: true,
//         public: "public",
// },
//
// // IE
// ie_11_win10: {
//     testName: "ie11 win10",
//         base: "SauceLabs",
//         browserName: "internet explorer",
//         platform: "Windows 10",
//         version: "11",
//         build: build,
//         passed: true,
//         public: "public",
// },
//
// // iphone
// iphone: {
//     testName: "iphone-8.2",
//         base: "SauceLabs",
//         browserName: "iphone",
//         platform: "OS X 10.10",
//         version: "8.2",
//         build: build,
//         passed: true,
//         public: "public",
// },
