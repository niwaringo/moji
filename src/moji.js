const core = require("./core");

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
        if (!toName) {
            const m = fromName.split("to");
            return this.convert(m[0], m[1]);
        }

        const from = this._mojisyu[fromName];
        const to = this._mojisyu[toName];
        this._str = core.convert(this._str, from, to);
        return this;
    }

    /**
     * @param {string} filterMojisyuName フィルタする文字種名
     * @return {Moji}
     */
    filter(filterMojisyuName) {
        this._str = core.filter(this._str, this._mojisyu[filterMojisyuName]);
        return this;
    }

    /**
     * @param {string} rejectMojisyuName
     * @return {Moji}
     */
    reject(rejectMojisyuName) {
        this._str = core.reject(this._str, this._mojisyu[rejectMojisyuName]);
        return this;
    }

    /**
     * @return {string}
     */
    toString() {
        return this._str;
    }

    /**
     * @param {string} separateString
     * @return {string}
     */
    toCharCode(separateString) {
        const ss = separateString || "|";
        return this._str.split("").map((s) => {
            return s.charCodeAt(0);
        }).join(ss);
    }

    /**
     * 渡されたmethodをそのままString渡す
     * @param {string} method
     * @param {args} args
     * @return {Moji}
     */
    string(method, ...args) {
        this._str = String.prototype[method].call(this._str, ...args);
        return this;
    }
};
