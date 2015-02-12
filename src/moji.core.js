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
 *
 * @param {string} from_name 変換前の文字種の名前を指定
 * @param {string} to_name 変化後の文字種の名前を指定
 * @returns {this}
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

/**
 *  filter
 *  文字種のみに絞込
 *  @param {string} mojisyu 絞り込まれる文字種
 *  @returns {string}
 */
Moji.prototype.filter = function filter(mojisyu) {
  return this._rangeFilter(mojisyu);
};


Moji.prototype._rangeMap = function _rangeEach(from, to, callback) {
  return this.result.split('').map(function(moji) {
    var code = moji.charCodeAt(0);
    var is_range = (code >= from.start && code <= from.end);
    return callback.call(this, moji, code, is_range);
  });
};

Moji.prototype._rangeConvert = function _rangeConvert(from, to) {
  var distance = to.start - from.start;
  return this._rangeMap(from, to, function(moji, code, is_range) {
    if (is_range) {
      return String.fromCharCode(code + distance);
    }
    return moji;
  }).join('');
};

// Moji.prototype._rangeFilter = function _rangeFilter(mojisyu) {
//   return this._rangeMap(function(moji) {
//   });
// }

Moji.prototype._regexpMap = function _regexpMap(regexp, callback) {
  return this.result.replace(regexp, function(moji) {
    return callback.call(this, moji);
  });
};

Moji.prototype._regexpConvert = function _regexpConvert(from, to) {
  return this._regexpMap(from.regexp, function(moji) {
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
