const map = require("./core.map");

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
    const d = to.props.start - from.props.start;
    return map.rangeMap(str, from.props.start, from.props.end, (match, s, c) => {
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
    return map.regexpMap(str, from.props.regexp, (s) => {
        const i = from.props.list.indexOf(s);
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
    return from.props.patterns.map((pattern) => {
        return map.regexpMap(str, pattern[0], (s) => {
            return pattern[1][to.name];
        });
    }).join("");
}
