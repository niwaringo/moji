
/**
 * @param {Object} mObj
 * @return {Object}
 */
function types(mObj) {
    let o = {};
    o.range = (mObj.start && mObj.end)? true: false;
    o.regexpList = (mObj.regexp && mObj.list)? true: false;
    o.patterns = (mObj.patterns)? true: false;
    return o;
}

/**
 * @type {Mojisyu}
 */
module.exports = class Mojisyu {
    /**
     * @param {String} name
     * @param {Object} mObj
     */
    constructor(name, mObj) {
        this.name = name;
        this.types = types(mObj);
        this.props = {};

        Object.assign(this.props, mObj);
    }
};
