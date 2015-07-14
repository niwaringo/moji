(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Moji = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable.call(obj, key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],2:[function(require,module,exports){
"use strict";
module.exports = {
    'ZE': {start:0xff01, end:0xff5e}, // 全角英数
    'HE': {start:0x0021, end:0x007e}, // 半角英数
    'HG': {start:0x3041, end:0x3096}, // ひらがな
    'KK': {start:0x30a1, end:0x30f6}, // カタカナ

    'HS': {regexp: /(\s|\u00A0)/g, list:['\u0020', '\u00A0']}, // 半角スペース
    'ZS': {regexp: /(\u3000)/g, list:['　', '　']}, //全角スペース

    'HK': {regexp: /([\uff66-\uff9c]\uff9e)|([\uff8a-\uff8e]\uff9f)|([\uff61-\uff9f])/g, // 半角カナ
        list: ['｡', '｢', '｣', '､', '･', 'ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｰ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ', 'ﾞ', 'ﾟ', 'ｦﾞ', 'ｳﾞ', 'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ', 'ﾊﾞ', 'ﾊﾟ', 'ﾋﾞ', 'ﾋﾟ', 'ﾌﾞ', 'ﾌﾟ', 'ﾍﾞ', 'ﾍﾟ', 'ﾎﾞ', 'ﾎﾟ', 'ﾜﾞ']},
    'ZK': {regexp: /([\u3001-\u30fc])/g,  //全角カナ (半角カナ変換用)
        list: ['。', '「', '」', '、', '・', 'ヲ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ッ', 'ー', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ン', '゛', '゜', 'ヺ', 'ヴ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'パ', 'ビ', 'ピ', 'ブ', 'プ', 'ベ', 'ペ', 'ボ', 'ポ', 'ヷ']}
};
},{}],3:[function(require,module,exports){
'use strict';


/**
 * @constructor
 * @param {object} mojisyu
 * @param {string} str
 */
function Moji(mojisyu, str) {
    this.origin = str;
    this._result = this.origin;
    this._mojisyu = mojisyu;
}

Moji.prototype.toString = function () {
    return this._result;
};


/**
 * convert
 * 変換の実行
 *
 * @param {string} from_syumei 変換前の文字種名
 * @param {string} to_syumei 変化後の文字種名
 * @returns {Moji}
 */
Moji.prototype.convert = function convert(from_syumei, to_syumei) {
    var from_mojisyu_body = this._mojisyu[from_syumei];
    var to_mojisyu_body = this._mojisyu[to_syumei];

    if (this._mojisyuType(from_mojisyu_body) === 'range' && this._mojisyuType(to_mojisyu_body) === 'range') {
        return this._rangeConvert(from_mojisyu_body, to_mojisyu_body);
    }

    if (this._mojisyuType(from_mojisyu_body) === 'regexp' && this._mojisyuType(to_mojisyu_body) === 'regexp') {
        return this._regexpConvert(from_mojisyu_body, to_mojisyu_body);
    }
};

/**
 * _rangeConvert
 * @param {object} from_syu
 * @param {object} to_syu
 * @return {Moji}
 * @private
 */
Moji.prototype._rangeConvert = function _rangeConvert(from_syu, to_syu) {
    var distance = to_syu.start - from_syu.start;
    this._result = this._rangeMap(from_syu, function (moji, is_match, code) {
        if (is_match) {
            return String.fromCharCode(code + distance);
        }
        return moji;
    }).join('');

    return this;
};

/**
 * _regexpConvert
 * @param from_syu
 * @param to_syu
 * @return {Moji}
 * @private
 */
Moji.prototype._regexpConvert = function _regexpConvert(from_syu, to_syu) {
    this._result = this._regexpMap(from_syu, function (moji, is_match, index) {
        if (!is_match) {
            return moji;
        }
        return to_syu.list[index];
    });

    return this;
};


/**
 *  filter
 *  文字種のみに絞込
 *  @param {string} mojisyu_name 絞り込まれる文字種
 *  @returns {Moji}
 */
Moji.prototype.filter = function filter(mojisyu_name) {
    var mojisyu_body = this._mojisyu[mojisyu_name];

    if (this._mojisyuType(mojisyu_body) === 'range') {
        this._result = this._rangeFilter(mojisyu_body);
        return this;
    }

    if (this._mojisyuType(mojisyu_body) === 'regexp') {
        this._result = this._regexpFilter(mojisyu_body);
        return this;
    }
};

/**
 * _rangeFilter
 * @param mojisyu
 * @return {string}
 * @private
 */
Moji.prototype._rangeFilter = function _rangeFilter(mojisyu) {
    return this._rangeMap(mojisyu, function (moji, is_range) {
        if (is_range) {
            return moji;
        }
        return '';
    }).join('');
};

/**
 * _regexpFilter
 * @param mojisyu
 * @return {string}
 * @private
 */
Moji.prototype._regexpFilter = function _regexpFilter(mojisyu) {
    var match_mojis = [];
    this._regexpMap(mojisyu, function (moji, is_match) {
        if (is_match) {
            match_mojis.push(moji);
        }
    });
    return match_mojis.join('');
};


/**
 * reject
 * 文字種は排除
 * @param {string} mojisyu 排除される文字種
 * @returns {Moji}
 */
Moji.prototype.reject = function reject(mojisyu_name) {
    var mojisyu_body = this._mojisyu[mojisyu_name];

    if (this._mojisyuType(mojisyu_body) === 'range') {
        this._result = this._rangeReject(mojisyu_body);
        return this;
    }

    if (this._mojisyuType(mojisyu_body) === 'regexp') {
        this._result = this._regexpReject(mojisyu_body);
        return this;
    }
};

/**
 * _rangeReject
 * @param mojisyu
 * @return {string}
 * @private
 */
Moji.prototype._rangeReject = function _rangeReject(mojisyu) {
    return this._rangeMap(mojisyu, function (moji, is_range) {
        if (!is_range) {
            return moji;
        }
        return '';
    }).join('');
};

/**
 * _regexpReject
 * @param mojisyu
 * @return {string}
 * @private
 */
Moji.prototype._regexpReject = function _regexpReject(mojisyu) {
    var match_mojis = [];
    var reject_moji = this._regexpFilter(mojisyu);
    return this._result.replace(reject_moji, '');
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

/**
 * _rangeMap
 * @param {object} mojisyu - 文字種オブジェクト
 * @param {function} callback
 * @return {Array}
 * @private
 */
Moji.prototype._rangeMap = function _rangeMap(mojisyu, callback) {
    return this._result.split('').map(function (moji) {
        var code = moji.charCodeAt(0);
        var is_match = (code >= mojisyu.start && code <= mojisyu.end);
        return callback.call(this, moji, is_match, code);
    });
};

/**
 * _regexpMap
 * @param {object} mojisyu - 文字種オブジェクト
 * @param callback
 * @return {string}
 * @private
 */
Moji.prototype._regexpMap = function _regexpMap(mojisyu, callback) {
    return this._result.replace(mojisyu.regexp, function (moji) {
        var index = mojisyu.list.indexOf(moji);
        var is_match = index >= 0;
        return callback.call(this, moji, is_match, index);
    });
};
//
///**
// * trim
// * 行頭、行末の空白を削除
// */
//Moji.prototype.trim = function trim() {
//  this.result = this.result.trim();
//  return this;
//};
//

module.exports = Moji;
},{}],4:[function(require,module,exports){
"use strict";
var Moji = require("./moji.core");
var _mojisyu = require("./default_mojisyu");
var assign = require("object-assign");
var mojisyu = assign({}, _mojisyu);


var moji = function (str) {
    return new Moji(mojisyu, str);
};

moji.addMojisyu = function (syu) {
    mojisyu = assign(mojisyu, syu);
};

module.exports = moji;

},{"./default_mojisyu":2,"./moji.core":3,"object-assign":1}]},{},[4])(4)
});