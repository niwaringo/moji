module.exports = {
    /**
     * @param {string} str
     * @param {number} startCode
     * @param {number} endCode
     * @param {Function} cb
     * @return {Array}
     * @private
     */
    rangeMap(str, startCode, endCode, cb) {
        return str.split("").map((s) => {
            const c = s.charCodeAt(0);
            return cb((c > startCode && c < endCode ), s, c);
        });
    },

    /**
     * @param {string} str
     * @param {Regexp} regexp
     * @param {Function} cb
     * @return {String}
     * @private
     */
    regexpMap(str, regexp, cb) {
        return str.replace(regexp, (s) => {
            return cb(s);
        });
    },
};
