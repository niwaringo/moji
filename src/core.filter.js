const map = require("./core.map");

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
    return map.rangeMap(str, filterMojisyu.props.start, filterMojisyu.props.end, (match, str, code) => {
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
    const r = [];
    map.regexpMap(str, filterMojisyu.props.regexp, (s) => {
        const i = filterMojisyu.props.list.indexOf(s);
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
    const r = [];
    filterMojisyu.props.patterns.forEach((pattern) => {
        map.regexpMap(str, pattern[0], (s) => {
            r.push(s);
        });
    });
    return r.join("");
}
