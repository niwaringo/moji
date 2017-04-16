const map = require("./core.map");

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
    return map.rangeMap(str, rejectMojisyu.props.start, rejectMojisyu.props.end, (match, str, code) => {
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
    map.regexpMap(str, rejectMojisyu.props.regexp, (s) => {
        const i = rejectMojisyu.props.list.indexOf(s);
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
    rejectMojisyu.props.patterns.forEach((pattern) => {
        map.regexpMap(str, pattern[0], (s) => {
            str = str.replace(s, "");
        });
    });
    return str;
}
