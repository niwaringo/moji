const Moji = require("./moji");
const defaultMojisyu = require("./default_mojisyu");
const Mojisyu = require("./mojisyu");
let mojisyu = {};


/**
 * @param {string} str
 * @return {Moji}
 */
function moji(str) {
    return new Moji(str, mojisyu);
}


moji.addMojisyu = (obj) => {
    Object.keys(obj).forEach((m) => {
        mojisyu[m] = new Mojisyu(m, obj[m]);
    });
};

moji.addMojisyu(defaultMojisyu);

/**
 * @param {String} str
 * @return {Moji}
 */
module.exports = moji;
