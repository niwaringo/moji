var version = require('./package.json').version;
var build = 'build:' + version + ' - 0';
var chrome_version = '43';
var firefox_version = '39';

module.exports = {
  //Chrome
  chrome_win7: {
    testName: 'chrome_win7',
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7',
    version: chrome_version,
    build: build,
    passed: true,
    public: 'public'

  },
  chrome_mac: {
    testName: 'chrome_mac',
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'OS X 10.10',
    version: chrome_version,
    build: build,
    passed: true,
    public: 'public'

  },

  //Firefox
  firefox_win7: {
    testName: 'firefox_win7',
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 7',
    version: firefox_version,
    build: build,
    passed: true,
    public: 'public'
  },
  firefox_mac: {
    testName: 'firefox_mac',
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'OS X 10.10',
    version: firefox_version,
    build: build,
    passed: true,
    public: 'public'
  },

  //safari mac
  safari_mac: {
    testName: 'safari_mac',
    base: 'SauceLabs',
    name: 'OS X 10.10 safari',
    browserName: 'safari',
    platform: 'OS X 10.10',
    build: build,
    passed: true,
    public: 'public'
  },

  //IE
  ie_9_win7: {
    testName: 'ie_9_win7',
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9',
    build: build,
    passed: true,
    public: 'public'
  },
  ie_10_win7: {
    testName: 'ie_10_win7',
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10',
    build: build,
    passed: true,
    public: 'public'
  },
  ie_11_win81: {
    testName: 'ie_11_win81',
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11',
    build: build,
    passed: true,
    public: 'public'
  },

  //iphone
  iphone: {
    testName: 'iphone-8.2',
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '8.2',
    build: build,
    passed: true,
    public: 'public'
  }
};
