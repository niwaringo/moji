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
  if (isArray(arguments[0])) {
    Array.prototype.slice.call(arguments).forEach(function(arg) {
      this.convert(arg[0], arg[1]);
    }, this);

    return this;
  }

  var from = this.MOJISYU[from_name];
  var to = this.MOJISYU[to_name];

  if (this._mojisyuType(from) === 'range' && this._mojisyuType(to) === 'range') {
    this.result = this._rangeConvert(from, to);
  }

  if (this._mojisyuType(from) === 'regexp' && this._mojisyuType(to) === 'regexp') {
    this.result = this._regexpConvert(from, to);
  }
  return this;
};

/**
 *  filter
 *  文字種のみに絞込
 *  @param {string || array<string>} mojisyu_name 絞り込まれる文字種
 *  @returns {string}
 */
Moji.prototype.filter = function filter(mojisyu_name) {
  var mojisyu = this.MOJISYU[mojisyu_name];

  if(this._mojisyuType(mojisyu) === 'range') {
    return this._rangeFilter(mojisyu);
  }

  if(this._mojisyuType(mojisyu) === 'regexp') {
    return this._regexpFilter(mojisyu);
  }
};

/**
 * reject
 * 文字種は排除
 * @param {string} mojisyu 排除される文字種
 * @returns {string}
 */
Moji.prototype.reject = function reject(mojisyu_name) {
  var mojisyu = this.MOJISYU[mojisyu_name];

  if (this._mojisyuType(mojisyu) === 'range') {
    return this._rangeReject(mojisyu);
  }

  if (this._mojisyuType(mojisyu) === 'regexp') {
    return this._regexpReject(mojisyu);
  }
};

/**
 * _mojisyuType
 * 文字種のタイプを判別
 * range || regexp
 * @param {MOJISYU} mojisyu 文字種
 * @return {string} range || regxp || ''
 */
Moji.prototype._mojisyuType = function _mojisyuType(mojisyu) {
  if (mojisyu.start && mojisyu.end) {
    return 'range';
  }
  if (mojisyu.regexp && mojisyu.list) {
    return 'regexp';
  }

  return '';
};

Moji.prototype._rangeMap = function _rangeMap(mojisyu, callback) {
  return this.result.split('').map(function(moji) {
    var code = moji.charCodeAt(0);
    var is_match = (code >= mojisyu.start && code <= mojisyu.end);
    return callback.call(this, moji, is_match, code);
  });
};

Moji.prototype._rangeConvert = function _rangeConvert(from, to) {
  var distance = to.start - from.start;
  return this._rangeMap(from, function(moji, is_match, code) {
    if (is_match) {
      return String.fromCharCode(code + distance);
    }
    return moji;
  }).join('');
};

Moji.prototype._rangeFilter = function _rangeFilter(mojisyu) {
  return this._rangeMap(mojisyu, function(moji, is_range) {
    if (is_range) {
      return moji;
    }
    return '';
  }).join('');
};

Moji.prototype._rangeReject = function _rangeReject(mojisyu) {
  return this._rangeMap(mojisyu, function(moji, is_range) {
    if(!is_range) {
      return moji;
    }
    return '';
  }).join('');
};

Moji.prototype._regexpMap = function _regexpMap(mojisyu, callback) {
  return this.result.replace(mojisyu.regexp, function(moji) {
    var index = mojisyu.list.indexOf(moji);
    var is_match = index >= 0;
    return callback.call(this, moji, is_match, index);
  });
};

Moji.prototype._regexpConvert = function _regexpConvert(from, to) {
  return this._regexpMap(from, function(moji, is_match, index) {
    if (!is_match) {
      return moji;
    }
    return to.list[index];
  });
};

Moji.prototype._regexpFilter = function _regexpFilter(mojisyu) {
  var match_mojis = [];
  this._regexpMap(mojisyu, function(moji, is_match) {
    if (is_match) {
      match_mojis.push(moji);
    }
  });
  return match_mojis.join('');
};

Moji.prototype._regexpReject = function _regexpReject(mojisyu) {
  var match_mojis = [];
  var reject_moji = this._regexpFilter(mojisyu);
  return this.result.replace(reject_moji, '');
};

/**
 * trim
 * 行頭、行末の空白を削除
 */
Moji.prototype.trim = function trim() {
  this.result = this.result.trim();
  return this;
};

//reject
/**
 * @returns {string}
 */
Moji.prototype.toString = function toString() {
  return this.result;
};

module.exports = Moji;

function isArray(target) {
  return Object.prototype.toString.call(target) === '[object Array]';
}
