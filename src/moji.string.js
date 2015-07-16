function mojiStr() {
    /**
     * trim
     * 行頭、行末の空白を削除
     */
    this.trim = function () {
        this._result = this._result.trim();
        return this;
    };

    return this;
}

module.exports = mojiStr;

//match
//encode
//decode
//replace
// slice
//substr
//toLocaleLowerCase
//toLocaleUpperCase
//toLowerCase
//toUpperCase
//trim
//trimLeft
//trimRight
//encodeURIComponent
//decodeURIComponent