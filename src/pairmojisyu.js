const Mojisyu = require("./mojisyu");

module.exports = class PairMojisyu {
    constructor(mojisyus) {
        this.from = new Mojisyu(mojisyus[0][0], mojisyus[0][1]);
        this.to = new Mojisyu(mojisyus[1][0], mojisyus[1][1]);
    }
};
