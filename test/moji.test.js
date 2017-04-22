const assert = require("assert");
let moji = require("../src/moji");

if(typeof window !== "undefined") {
    moji = window.moji;
}

describe("moji", () => {
    it("toCharCode", () => {
        assert.strictEqual(
            moji("ABC").toCharCode(),
            "65|66|67"
        );
    });

    it("全角英数から半角英数", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("ZE", "HE").toString(),
            "ABCD　01234あいうアイウABCD 01234ｱｲｳ");
    });

    it("全角スペースを半角スペースに", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("ZS", "HS").toString(),
            "ＡＢＣＤ ０１２３４あいうアイウABCD 01234ｱｲｳ");
    });

    it("半角スペースを全角スペースに", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HS", "ZS").toString(),
            "ＡＢＣＤ　０１２３４あいうアイウABCD　01234ｱｲｳ");
    });

    it("半角英数から全角英数", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HE", "ZE").toString(),
            "ＡＢＣＤ　０１２３４あいうアイウＡＢＣＤ ０１２３４ｱｲｳ");
    });

    it("ひらがなからカタカナ", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HG", "KK").toString(),
            "ＡＢＣＤ　０１２３４アイウアイウABCD 01234ｱｲｳ");
    });

    it("カタカナからひらがな", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("KK", "HG").toString(),
            "ＡＢＣＤ　０１２３４あいうあいうABCD 01234ｱｲｳ");
    });

    it("全角カナから半角カナ", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("ZK", "HK").toString(),
            "ＡＢＣＤ　０１２３４あいうｱｲｳABCD 01234ｱｲｳ");
    });

    it("半角カナから全角カナ", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HK", "ZK").toString(),
            "ＡＢＣＤ　０１２３４あいうアイウABCD 01234アイウ");
    });

    it("複数の文字種を置換", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ")
                .convert("HK", "ZK")
                .convert("KK", "HG")
                .toString(),
            "ＡＢＣＤ　０１２３４あいうあいうABCD 01234あいう");
    });

    it("filter range", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").filter("HG").toString(),
            "あいう");
    });

    it('filter regexp', function () {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").filter("ZK").toString(),
            "アイウ");
    });

    it('filter pattern', function () {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").filter("ZS").toString(),
            "　");
    });

    it('reject range', function () {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").reject('HG').toString(),
            "ＡＢＣＤ　０１２３４アイウABCD 01234ｱｲｳ");
    });

    it('reject regexp', function () {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").reject("ZK").toString(),
            "ＡＢＣＤ　０１２３４あいうABCD 01234ｱｲｳ");
    });

    it('filter pattern', function () {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").reject("ZS").toString(),
            "ＡＢＣＤ０１２３４あいうアイウABCD 01234ｱｲｳ");
    });
});
