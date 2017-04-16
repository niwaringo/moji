const convert = require("./core.convert");
const filter = require("./core.filter");
const reject = require("./core.reject");

/**
 * @type {Moji}
 */
module.exports = class Moji {
    /**
     * @param {String} str
     * @param {Object} mojisyu
     */
    constructor(str, mojisyu) {
        this._str = str;
        this._mojisyu = Object.assign({}, mojisyu);
    }

    /**
     * 変換
     * @param {String} fromName 変換前の文字種名
     * @param {String} toName 変換後の文字種名
     * @return {Moji}
     */
    convert(fromName, toName) {
        const from = this._mojisyu[fromName];
        const to = this._mojisyu[toName];
        this._str = convert(this._str, from, to);
        return this;
    }

    /**
     * @param {string} filterMojisyuName フィルタする文字種名
     * @return {Moji}
     */
    filter(filterMojisyuName) {
        this._str = filter(this._str, this._mojisyu[filterMojisyuName]);
        return this;
    }

    /**
     * @param {string} rejectMojisyuName
     * @return {Moji}
     */
    reject(rejectMojisyuName) {
        this._str = reject(this._str, this._mojisyu[rejectMojisyuName]);
        return this;
    }

    /**
     * @return {string|*|String}
     */
    toString() {
        return this._str;
    }

    /**
     * @param {String} separateString
     * @return {string}
     */
    toCharCode(separateString) {
        const ss = separateString || "|";
        return this._str.split("").map((s) => {
            return s.charCodeAt(0);
        }).join(ss);
    }
};
