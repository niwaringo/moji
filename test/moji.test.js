var assert = require('assert');
var moji = require('../src/moji.js');
var mojisyu = require("../src/default_mojisyu");

describe('moji', function () {
    it("初期時に基本文字種がセット済み", function () {
        assert.deepEqual(
            moji()._mojisyu,
            mojisyu
        );
    });

    it("addMojisyuで文字種の追加が可能", function () {
        moji.addMojisyu({"add_test": {}});
        var default_mojisyu_size = Object.keys(mojisyu).length;
        var add_mojisyu_size = Object.keys(moji()._mojisyu).length;
        assert.strictEqual(default_mojisyu_size + 1, add_mojisyu_size);
    });

    it('全角英数から半角英数', function () {
        assert.strictEqual(
            moji('ＡＢＣＤ０１２３４').convert('ZE', 'HE').toString(),
            'ABCD01234');
    });

    it('全角スペースを半角スペースに', function () {
        assert.strictEqual(
            moji('　').convert('ZS', 'HS').toString(),
            ' ');
    });

    it('半角スペースを全角スペースに', function () {
        assert.strictEqual(
            moji(' ').convert('HS', 'ZS').toString(),
            '　');
    });

    it('半角英数から全角英数', function () {
        assert.strictEqual(
            moji('ABCD01234').convert('HE', 'ZE').toString(),
            'ＡＢＣＤ０１２３４');
    });

    it('ひらがなからカタカナ', function () {
        assert.strictEqual(
            moji('あいうえお').convert('HG', 'KK').toString(),
            'アイウエオ');
    });

    it('カタカナからひらがな', function () {
        assert.strictEqual(
            moji('アイウエオ').convert('KK', 'HG').toString(),
            'あいうえお');
    });

    it('全角カナから半角カナ', function () {
        var zk = moji()._mojisyu['ZK'].list.join('');
        var hk = moji()._mojisyu['HK'].list.join('');
        assert.strictEqual(
            moji(zk).convert('ZK', 'HK').toString(),
            hk);
    });

    it('半角カナから全角カナ', function () {
        var hk = moji()._mojisyu['HK'].list.join('');
        var zk = moji()._mojisyu['ZK'].list.join('');
        assert.strictEqual(
            moji(hk).convert('HK', 'ZK').toString(),
            zk);
    });

    it('複数の文字種を置換', function () {
        assert.strictEqual(
            moji('ｱｲｳｴｵ')
                .convert('HK', 'ZK')
                .convert('KK', 'HG')
                .toString(),
            'あいうえお');
    });

    it('filter range', function () {
        assert.strictEqual(
            moji('abcあいうアイウ123').filter('HG').toString(),
            'あいう');
    });

    it('filter regexp', function () {
        var hk = moji()._mojisyu['HK'].list.join('');
        var zk = moji()._mojisyu['ZK'].list.join('');
        assert.strictEqual(
            moji(hk + 'abcあいう123' + zk).filter('ZK').toString(),
            zk);
    });

    it('reject range', function () {
        assert.strictEqual(
            moji('abcあいうアイウ123').reject('HG').toString(),
            'abcアイウ123');
    });

    it('reject regexp', function () {
        var hk = moji()._mojisyu['HK'].list.join('');
        var zk = moji()._mojisyu['ZK'].list.join('');
        assert.strictEqual(
            moji(hk + zk + 'abcあいう123').reject('ZK').toString(),
            hk + 'abcあいう123');
    });
});
