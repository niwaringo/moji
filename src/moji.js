'use strict';

/**
 * @constructor
 * @param {string} str
 */
function Moji(str) {
  this.str = str;
}

/**
 * @param {string} type
 * @return {this}
 */
Moji.prototype._convert = function convert(from, to) {
  var start = this._pattern[from].start;
  var end = this._pattern[from].end;
  var distance = this._distance[from + 'to' + to];

  this.str = this.str.split('').map(function(moji) {
    var code = moji.charCodeAt(0);
    if (code >= start && code <= end) {
      return String.fromCharCode(code + distance);
    }
    return moji;
  }).join('');

  return this;
};

/**
 * 全角英数から半角英数に変換
 * [z]enkaku [e]isuu [to] [h]annkaku [e]isuu
 */


//get filter remove
/**
 * @return {string}
 */
Moji.prototype.toString = function toString() {
  return this.str;
};

Moji.prototype._distance = {
  zetohe: -0xfee0,
  hetoze: +0xfee0,
  hgtokk: +0x0060,
  kktohg: -0x0060,
};

Moji.prototype._pattern = {
  ze: {start:0xff01, end:0xff5e}, // 全角英数
  he: {start:0x0021, end:0x007e}, // 半角英数
  hg: {start:0x3041, end:0x3096}, // ひらがな
  kk: {start:0x30a1, end:0x30f6}, // カタカナ
};

module.exports = function(str) {
  return new Moji(str);
};
