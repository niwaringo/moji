const assert = require("assert");
let moji = require("../dist/moji");

if(typeof window !== "undefined") {
    moji = window.moji;
}

describe("moji.cores", () => {
    it("toCharCode", () => {
        assert.strictEqual(
            moji("ABC").toCharCode(),
            "65|66|67"
        );
    });

    it("全角英数から半角英数 arg2", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("ZE", "HE").toString(),
            "ABCD　01234あいうアイウABCD 01234ｱｲｳ");
    });

    it("全角英数から半角英数 arg1", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("ZEtoHE").toString(),
            "ABCD　01234あいうアイウABCD 01234ｱｲｳ");
    });

    it("全角スペースを半角スペースに arg2", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("ZS", "HS").toString(),
            "ＡＢＣＤ ０１２３４あいうアイウABCD 01234ｱｲｳ");
    });

    it("全角スペースを半角スペースに arg1", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("ZStoHS").toString(),
            "ＡＢＣＤ ０１２３４あいうアイウABCD 01234ｱｲｳ");
    });

    it("半角スペースを全角スペースに arm2", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HS", "ZS").toString(),
            "ＡＢＣＤ　０１２３４あいうアイウABCD　01234ｱｲｳ");
    });

    it("半角スペースを全角スペースに arm1", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HStoZS").toString(),
            "ＡＢＣＤ　０１２３４あいうアイウABCD　01234ｱｲｳ");
    });

    it("半角英数から全角英数 arg2", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HE", "ZE").toString(),
            "ＡＢＣＤ　０１２３４あいうアイウＡＢＣＤ ０１２３４ｱｲｳ");
    });

    it("半角英数から全角英数 arg1", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HEtoZE").toString(),
            "ＡＢＣＤ　０１２３４あいうアイウＡＢＣＤ ０１２３４ｱｲｳ");
    });

    it("ひらがなからカタカナ arg2", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HG", "KK").toString(),
            "ＡＢＣＤ　０１２３４アイウアイウABCD 01234ｱｲｳ");
    });

    it("ひらがなからカタカナ arg1", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HGtoKK").toString(),
            "ＡＢＣＤ　０１２３４アイウアイウABCD 01234ｱｲｳ");
    });

    it("カタカナからひらがな arg2", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("KK", "HG").toString(),
            "ＡＢＣＤ　０１２３４あいうあいうABCD 01234ｱｲｳ");
    });

    it("カタカナからひらがな arg1", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("KKtoHG").toString(),
            "ＡＢＣＤ　０１２３４あいうあいうABCD 01234ｱｲｳ");
    });

    it("全角カナから半角カナ arg2", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("ZK", "HK").toString(),
            "ＡＢＣＤ　０１２３４あいうｱｲｳABCD 01234ｱｲｳ");
    });

    it("全角カナから半角カナ arg1", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("ZKtoHK").toString(),
            "ＡＢＣＤ　０１２３４あいうｱｲｳABCD 01234ｱｲｳ");
    });

    it("半角カナから全角カナ arg2", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HK", "ZK").toString(),
            "ＡＢＣＤ　０１２３４あいうアイウABCD 01234アイウ");
    });

    it("半角カナから全角カナ arg1", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").convert("HKtoZK").toString(),
            "ＡＢＣＤ　０１２３４あいうアイウABCD 01234アイウ");
    });

    it("複数の文字種を置換 arg2", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ")
                .convert("HK", "ZK")
                .convert("KK", "HG")
                .toString(),
            "ＡＢＣＤ　０１２３４あいうあいうABCD 01234あいう");
    });

    it("複数の文字種を置換 arg1", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ")
                .convert("HKtoZK")
                .convert("KKtoHG")
                .toString(),
            "ＡＢＣＤ　０１２３４あいうあいうABCD 01234あいう");
    });

    it("filter range", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").filter("HG").toString(),
            "あいう");
    });

    it("filter regexp", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").filter("ZK").toString(),
            "アイウ");
    });

    it("filter pattern", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").filter("ZS").toString(),
            "　");
    });

    it("reject range", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").reject('HG').toString(),
            "ＡＢＣＤ　０１２３４アイウABCD 01234ｱｲｳ");
    });

    it("reject regexp", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").reject("ZK").toString(),
            "ＡＢＣＤ　０１２３４あいうABCD 01234ｱｲｳ");
    });

    it("filter pattern", () => {
        assert.strictEqual(
            moji("ＡＢＣＤ　０１２３４あいうアイウABCD 01234ｱｲｳ").reject("ZS").toString(),
            "ＡＢＣＤ０１２３４あいうアイウABCD 01234ｱｲｳ");
    });

    it("addMojisyu", () => {
        const o = {
            "ADD": {start:0xff01, end:0xff5e},
        };
        moji.addMojisyu(o);

        assert.deepEqual(moji()._mojisyu.ADD.name, "ADD");
    });
});
