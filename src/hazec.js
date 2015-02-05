'use strict';

/**
 * @constructor
 * @param {string} str
 */
function Mojic(str) {
  this.str = str;
}

/**
 * @param {string} type
 * @return {string}
 */
Mojic.prototype.convert = function convert(type) {
  var pattern = this._pattern.ftoh;
  var start = pattern.start;
  var end = pattern.end;
  var mod = pattern.mod;

  this.str = this.str.split('').map(function(moji) {
    var code = moji.charCodeAt(0);
    if (code >= start && code <= end) {
      return String.fromCharCode(code + mod);
    }

    return moji;
  }).join('');

  return this;
};

Mojic.prototype._pattern = {
  ftoh: {start:0xff01, end:0xff5e, mod:-0xfee0}
};

module.exports = function(str) {
  return new Mojic(str);
};
