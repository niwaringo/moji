var spawn = require('child_process').spawn;
var browsers = Object.keys(require('./saucebrowsers.js'));

var karmaStart = function(idx) {
  if (idx >= browsers.length) return;

  process.env.sauce_browser_name = browsers[idx];

  var runner = spawn('./node_modules/karma/bin/karma', ['start']);

  console.log('Start: ' + process.env.sauce_browser_name);
  runner.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  runner.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });

  runner.on('close', function(code) {
    console.log('Close: ' + process.env.sauce_browser_name);
    karmaStart(++idx);
  });
};

karmaStart(0);
