/* globals describe, it */
const assert = require("assert");
const Mojisyu = require("../src/mojisyu");
const defaultMojisyu = require("../src/default_mojisyu");

describe("Mojisyu", () => {
    const mZE = new Mojisyu("ZE", defaultMojisyu.ZE);
    const mHS = new Mojisyu("HS", defaultMojisyu.HS);

    it("range type", () => {
        assert.ok(mZE.types.range, "range");
        assert.ok(!mZE.types.regexp, "regexp");
    });

    it("range property", () => {
        assert.ok(mZE.props.start);
        assert.ok(mZE.props.end);
        assert.ok(!mZE.props.regexp);
    });

    it("regexp type", () => {
        assert.ok(!mHS.types.range, "range");
        assert.ok(mHS.types.patterns, "patterns");
    });
});
