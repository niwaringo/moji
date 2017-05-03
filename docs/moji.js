(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["moji"] = factory();
	else
		root["moji"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    /**
     * @param {string} str
     * @param {number} startCode
     * @param {number} endCode
     * @param {Function} cb
     * @return {Array}
     * @private
     */
    rangeMap: function rangeMap(str, startCode, endCode, cb) {
        return str.split("").map(function (s) {
            var c = s.charCodeAt(0);
            return cb(c > startCode && c < endCode, s, c);
        });
    },


    /**
     * @param {string} str
     * @param {Regexp} regexp
     * @param {Function} cb
     * @return {String}
     * @private
     */
    regexpMap: function regexpMap(str, regexp, cb) {
        return str.replace(regexp, function (s) {
            return cb(s);
        });
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    'ZE': { start: 0xff01, end: 0xff5e }, // 全角英数
    'HE': { start: 0x0021, end: 0x007e }, // 半角英数
    'HG': { start: 0x3041, end: 0x3096 }, // ひらがな
    'KK': { start: 0x30a1, end: 0x30f6 }, // カタカナ

    'HS': { patterns: [[/(\s|\u00A0)/g, { "ZS": "　" }]] }, // 半角スペース
    'ZS': { patterns: [[/(\u3000)/g, { "HS": " " }]] }, //全角スペース

    'HK': { regexp: /([\uff66-\uff9c]\uff9e)|([\uff8a-\uff8e]\uff9f)|([\uff61-\uff9f])/g, // 半角カナ
        list: ['｡', '｢', '｣', '､', '･', 'ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｰ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ', 'ﾞ', 'ﾟ', 'ｦﾞ', 'ｳﾞ', 'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ', 'ﾊﾞ', 'ﾊﾟ', 'ﾋﾞ', 'ﾋﾟ', 'ﾌﾞ', 'ﾌﾟ', 'ﾍﾞ', 'ﾍﾟ', 'ﾎﾞ', 'ﾎﾟ', 'ﾜﾞ'] },
    'ZK': { regexp: /([\u30a1-\u30f6])/g, //全角カナ (半角カナ変換用)
        list: ['。', '「', '」', '、', '・', 'ヲ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ッ', 'ー', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ン', '゛', '゜', 'ヺ', 'ヴ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'パ', 'ビ', 'ピ', 'ブ', 'プ', 'ベ', 'ペ', 'ボ', 'ポ', 'ヷ'] }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var core = __webpack_require__(6);

/**
 * @type {Moji}
 */
module.exports = function () {
    /**
     * @param {String} str
     * @param {Object} mojisyu
     */
    function Moji(str, mojisyu) {
        _classCallCheck(this, Moji);

        this._str = str;
        this._mojisyu = _extends({}, mojisyu);
    }

    /**
     * 変換
     * @param {String} fromName 変換前の文字種名
     * @param {String} toName 変換後の文字種名
     * @return {Moji}
     */


    _createClass(Moji, [{
        key: "convert",
        value: function convert(fromName, toName) {
            if (!toName) {
                var m = fromName.split("to");
                return this.convert(m[0], m[1]);
            }

            var from = this._mojisyu[fromName];
            var to = this._mojisyu[toName];
            this._str = core.convert(this._str, from, to);
            return this;
        }

        /**
         * @param {string} filterMojisyuName フィルタする文字種名
         * @return {Moji}
         */

    }, {
        key: "filter",
        value: function filter(filterMojisyuName) {
            this._str = core.filter(this._str, this._mojisyu[filterMojisyuName]);
            return this;
        }

        /**
         * @param {string} rejectMojisyuName
         * @return {Moji}
         */

    }, {
        key: "reject",
        value: function reject(rejectMojisyuName) {
            this._str = core.reject(this._str, this._mojisyu[rejectMojisyuName]);
            return this;
        }

        /**
         * @return {string}
         */

    }, {
        key: "toString",
        value: function toString() {
            return this._str;
        }

        /**
         * @param {string} separateString
         * @return {string}
         */

    }, {
        key: "toCharCode",
        value: function toCharCode(separateString) {
            var ss = separateString || "|";
            return this._str.split("").map(function (s) {
                return s.charCodeAt(0);
            }).join(ss);
        }

        /**
         * 渡されたmethodをそのままString渡す
         * @param {string} method
         * @param {args} args
         * @return {Moji}
         */

    }, {
        key: "string",
        value: function string(method) {
            var _String$prototype$met;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            this._str = (_String$prototype$met = String.prototype[method]).call.apply(_String$prototype$met, [this._str].concat(args));
            return this;
        }
    }]);

    return Moji;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param {Object} mObj
 * @return {Object}
 */
function types(mObj) {
    var o = {};
    o.range = mObj.start && mObj.end ? true : false;
    o.regexpList = mObj.regexp && mObj.list ? true : false;
    o.patterns = mObj.patterns ? true : false;
    return o;
}

/**
 * @type {Mojisyu}
 */
module.exports =
/**
 * @param {String} name
 * @param {Object} mObj
 */
function Mojisyu(name, mObj) {
    _classCallCheck(this, Mojisyu);

    this.name = name;
    this.types = types(mObj);
    this.props = {};

    _extends(this.props, mObj);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = __webpack_require__(0);

module.exports = function convert(str, fromMojisyu, toMojisyu) {
    if (fromMojisyu.types.range && toMojisyu.types.range) {
        str = rangeConvert(str, fromMojisyu, toMojisyu);
    }
    if (fromMojisyu.types.regexpList && toMojisyu.types.regexpList) {
        str = regexpListConvert(str, fromMojisyu, toMojisyu);
    }
    if (fromMojisyu.types.patterns) {
        str = patternConvert(str, fromMojisyu, toMojisyu);
    }
    return str;
};

/**
 * @param {string} str
 * @param {Mojisyu} from
 * @param {Mojisyu} to
 * @return {string}
 * @private
 */
function rangeConvert(str, from, to) {
    var d = to.props.start - from.props.start;
    return map.rangeMap(str, from.props.start, from.props.end, function (match, s, c) {
        if (!match) {
            return s;
        }
        return String.fromCharCode(c + d);
    }).join("");
}

/**
 * @param {string} str
 * @param {Mojisyu} from
 * @param {Mojisyu} to
 * @return {string}
 * @private
 */
function regexpListConvert(str, from, to) {
    return map.regexpMap(str, from.props.regexp, function (s) {
        var i = from.props.list.indexOf(s);
        if (i === -1) return s;
        return to.props.list[i];
    });
}

/**
 * @param {string} str
 * @param {Mojisyu} from
 * @param {Mojisyu} to
 * @return {string}
 * @private
 */
function patternConvert(str, from, to) {
    return from.props.patterns.map(function (pattern) {
        return map.regexpMap(str, pattern[0], function (s) {
            return pattern[1][to.name];
        });
    }).join("");
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = __webpack_require__(0);

/**
 * @param {string} str
 * @param {Mojisyu} filterMojisyu フィルタする文字種名
 * @return {Moji}
 */
module.exports = function filter(str, filterMojisyu) {
    if (filterMojisyu.types.range) {
        str = rangeFilter(str, filterMojisyu);
    }
    if (filterMojisyu.types.regexpList) {
        str = regexpListFilter(str, filterMojisyu);
    }
    if (filterMojisyu.types.patterns) {
        str = patternFilter(str, filterMojisyu);
    }
    return str;
};

/**
 * @param {string} str
 * @param {Mojisyu} filterMojisyu
 * @return {string}
 * @private
 */
function rangeFilter(str, filterMojisyu) {
    return map.rangeMap(str, filterMojisyu.props.start, filterMojisyu.props.end, function (match, str, code) {
        if (!match) {
            return "";
        }
        return str;
    }).join("");
}

/**
 * @param {string} str
 * @param {Mojisyu} filterMojisyu
 * @return {string}
 * @private
 */
function regexpListFilter(str, filterMojisyu) {
    var r = [];
    map.regexpMap(str, filterMojisyu.props.regexp, function (s) {
        var i = filterMojisyu.props.list.indexOf(s);
        if (i !== -1) {
            r.push(s);
        }
    });
    return r.join("");
}

/**
 * @param {string} str
 * @param {Mojisyu} filterMojisyu
 * @return {string}
 * @private
 */
function patternFilter(str, filterMojisyu) {
    var r = [];
    filterMojisyu.props.patterns.forEach(function (pattern) {
        map.regexpMap(str, pattern[0], function (s) {
            r.push(s);
        });
    });
    return r.join("");
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var convert = __webpack_require__(4);
var filter = __webpack_require__(5);
var reject = __webpack_require__(7);

module.exports = {
    convert: convert,
    filter: filter,
    reject: reject
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = __webpack_require__(0);

/**
 * @param {string} str
 * @param {Mojisyu} rejectMojisyu
 * @return {string}
 */
module.exports = function reject(str, rejectMojisyu) {
    if (rejectMojisyu.types.range) {
        str = rangeReject(str, rejectMojisyu);
    }
    if (rejectMojisyu.types.regexpList) {
        str = regexpListReject(str, rejectMojisyu);
    }
    if (rejectMojisyu.types.patterns) {
        str = patternReject(str, rejectMojisyu);
    }
    return str;
};

/**
 * @param {string} str
 * @param {Mojisyu} rejectMojisyu
 * @return {string}
 * @private
 */
function rangeReject(str, rejectMojisyu) {
    return map.rangeMap(str, rejectMojisyu.props.start, rejectMojisyu.props.end, function (match, str, code) {
        if (!match) {
            return str;
        }
        return "";
    }).join("");
}

/**
 * @param {string} str
 * @param {Mojisyu} rejectMojisyu
 * @return {string}
 * @private
 */
function regexpListReject(str, rejectMojisyu) {
    map.regexpMap(str, rejectMojisyu.props.regexp, function (s) {
        var i = rejectMojisyu.props.list.indexOf(s);
        if (i !== -1) {
            str = str.replace(s, "");
        }
    });
    return str;
}

/**
 * @param {string} str
 * @param {Mojisyu} rejectMojisyu
 * @return {string}
 * @private
 */
function patternReject(str, rejectMojisyu) {
    rejectMojisyu.props.patterns.forEach(function (pattern) {
        map.regexpMap(str, pattern[0], function (s) {
            str = str.replace(s, "");
        });
    });
    return str;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Moji = __webpack_require__(2);
var defaultMojisyu = __webpack_require__(1);
var Mojisyu = __webpack_require__(3);
var mojisyu = {};

/**
 * @param {string} str
 * @return {Moji}
 */
function moji(str) {
    return new Moji(str, mojisyu);
}

moji.addMojisyu = function (obj) {
    Object.keys(obj).forEach(function (m) {
        mojisyu[m] = new Mojisyu(m, obj[m]);
    });
};

moji.addMojisyu(defaultMojisyu);

/**
 * @param {String} str
 * @return {Moji}
 */
module.exports = moji;

/***/ })
/******/ ]);
});