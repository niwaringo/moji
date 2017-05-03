const assert = require("assert");
const PairMojisyu = require("../src/pairmojisyu");
const Mojisyu = require("../src/mojisyu");
const defaultMojisyu = require("../src/default_mojisyu");
const defaultPair = require("../src/default.pairmojisyu");

describe("pairMojisyu", () => {
    it("make pairMojisyu", () => {
        const p = new PairMojisyu([["ZE", defaultMojisyu.ZE], ["HS", defaultMojisyu.HS]]);
        assert.deepEqual(p.from, new Mojisyu("ZE", defaultMojisyu.ZE));
        assert.deepEqual(p.to, new Mojisyu("HS", defaultMojisyu.HS));
    });
});

describe("defaultPair", () => {
    it("init", () => {
        const p = defaultPair();
        assert.deepEqual(p.ZEtoHE.from, new Mojisyu("ZE", defaultMojisyu.ZE));
        assert.deepEqual(p.ZEtoHE.to, new Mojisyu("HE", defaultMojisyu.HE));
    });
});
