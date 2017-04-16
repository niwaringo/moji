const Moji = require("./core");
const defaultMojisyu = require("./default_mojisyu");
const Mojisyu = require("./mojisyu");

let mojisyu = {};
Object.keys(defaultMojisyu).forEach((m) => {
    mojisyu[m] = new Mojisyu(m, defaultMojisyu[m]);
});

/**
 * @param {String} str
 * @return {Moji}
 */
module.exports = (str) => {
    return new Moji(str, mojisyu);
};
