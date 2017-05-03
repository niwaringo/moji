const Mojisyu = require("./mojisyu");
const defaultMojisyu = require("./default_mojisyu");
const defaultPairKeys = [
        ["ZE", "HE"],
        ["HG", "KK"],
        ["HS", "ZS"],
        ["HK", "ZK"],
];

module.exports = () => {
    const p = {};
    defaultPairKeys.forEach((keys) => {
        p[`${keys[0]}to${keys[1]}`] = {
            from: new Mojisyu(keys[0], defaultMojisyu[keys[0]]),
            to: new Mojisyu(keys[1], defaultMojisyu[keys[1]]),
        };
    });
    return p;
};
