'use strict';

var MOJISYU = {};

/**
 * @constructor
 * @param {string} str
 */
function Moji(str) {
  this.origin = str;
  this.result = this.origin;
  this.MOJISYU = MOJISYU;
}

/**
 * mojisyu
 * 文字種の設定
 *
 * 例)
 * 文字種を設定
 * Moji.mojisyu('ZE', {start:0xff01, end:0xff5e});
 * // => {start:0xff01, end:0xff5e}
 *
 * 特定の文字種を取得
 * Moji.mojisyu('ZE', {start:0xff01, end:0xff5e});
 * Moji.mojisyu('ZE');
 * // => {start:0xff01, end:0xff5e}
 *
 * 全ての文字種を取得
 * var ze = {start:0xff01, end:0xff5e};
 * var he = {start:0x0021, end:0x007e};
 * Moji.mojisyu('ZE', ze);
 * Moji.mojisyu('HE', he);
 *
 * Moji.mojisyu();
 * // => { ZE: { start: 65281, end: 65374 }, HE: { start: 33, end: 126 } }
 *
 * @param {string} name
 * @param {object} definition
 */
Moji.mojisyu = function mojisyu(name, definition) {
  // set
  if (definition) {
    MOJISYU[name] = definition;
    return MOJISYU[name];
  }

  // read
  if (arguments.length > 0 && !definition) {
    return MOJISYU[name];
  }

  // read all
  if (arguments.length === 0) {
    return MOJISYU;
  }

  return false;
};

/**
 * convert
 * 変換の実行
 * 文字種によって変換方法を変える
 *
 * @param {string} from_name 変換前の文字種の名前を指定
 * @param {string} to_name 変化後の文字種の名前を指定
 */
Moji.prototype.convert = function convert(from_name, to_name) {
  // 複数一括指定の場合
  if (Object.prototype.toString.call(arguments[0]) === '[object Array]') {
    Array.prototype.slice.call(arguments).forEach(function(arg) {
      this.convert(arg[0], arg[1]);
    }, this);

    return this;
  }

  var from = this.MOJISYU[from_name];
  var to = this.MOJISYU[to_name];

  if (from.start && from.end && to.start && to.end) {
    this.result = this._rangeConvert(from, to);
  }

  if(from.regexp && from.list && to.regexp && to.regexp) {
    this.result = this._regexpConvert(from, to);
  }
  return this;
};

Moji.prototype._rangeMap = function _rangeEach(callback) {
  return this.result.split('').map(function(moji) {
    return callback.call(this, moji);
  });
};

Moji.prototype._rangeConvert = function _rangeConvert(from, to) {
  var distance = to.start - from.start;
  return this._rangeMap(function(moji) {
    var code = moji.charCodeAt(0);
    if (code >= from.start && code <= from.end) {
      return String.fromCharCode(code + distance);
    }
    return moji;
  }).join('');
};

Moji.prototype._regexpConvert = function _regexpConvert(from, to) {
  return this.result.replace(from.regexp, function(moji) {
    var index = from.list.indexOf(moji);
    if (index < 0) {
      return moji;
    }
    return to.list[index];
  });
};

// Moji.prototype.filter = function filter(mojisyu) {
//   
// }

/**
 * trim
 * 行頭、行末の空白を削除
 */
Moji.prototype.trim = function trim() {
  this.result = this.result.trim();
  return this;
};

//get filter remove
/**
 * @returns {string}
 */
Moji.prototype.toString = function toString() {
  return this.result;
};

module.exports = Moji;
