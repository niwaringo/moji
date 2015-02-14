!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Moji=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var Moji = require('./moji.core.js');

Moji.mojisyu('ZE', {start:0xff01, end:0xff5e}); // 全角英数
Moji.mojisyu('HE', {start:0x0021, end:0x007e}); // 半角英数
Moji.mojisyu('HG', {start:0x3041, end:0x3096}); // ひらがな
Moji.mojisyu('KK', {start:0x30a1, end:0x30f6}); // カタカナ

// スペース
Moji.mojisyu('HS', {
  regexp: /(\s|\u00A0)/g,
  list:['\u0020', '\u00A0']
});

Moji.mojisyu('ZS', {
  regexp: /(\u3000)/g,
  list:['　', '　']
});

// 半角カナ
Moji.mojisyu('HK', {
  regexp: /([\uff66-\uff9c]\uff9e)|([\uff8a-\uff8e]\uff9f)|([\uff61-\uff9f])/g,
  list: ['｡', '｢', '｣', '､', '･', 'ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｰ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ', 'ﾞ', 'ﾟ', 'ｦﾞ', 'ｳﾞ', 'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ', 'ﾊﾞ', 'ﾊﾟ', 'ﾋﾞ', 'ﾋﾟ', 'ﾌﾞ', 'ﾌﾟ', 'ﾍﾞ', 'ﾍﾟ', 'ﾎﾞ', 'ﾎﾟ', 'ﾜﾞ']});

// 全角カナ (半角カナ変換用)
Moji.mojisyu('ZK', {
  regexp: /([\u3001-\u30fc])/g,
  list: ['。', '「', '」', '、', '・', 'ヲ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ッ', 'ー', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ン', '゛', '゜', 'ヺ', 'ヴ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'パ', 'ビ', 'ピ', 'ブ', 'プ', 'ベ', 'ペ', 'ボ', 'ポ', 'ヷ']});

module.exports = Moji;

},{"./moji.core.js":1}]},{},[2])(2)
});