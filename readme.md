Moji.js [![npm version](https://badge.fury.io/js/moji.svg)](http://badge.fury.io/js/moji)
=========================================================================================

JavaScriptで、半角英数↔全角英数、半角カナ↔全角カナ、ひらがな↔カタカナ変換等をあつかうライブラリ

## 注意
githubはversion1になっていますが、npmはver0.5系のままですので、ご注意ください。
最終確認後、npmもversion1にあげます。

インストール
------------

### ブラウザ

[ダウンロード](https://github.com/niwaringo/moji/releases/download/V1.2.0/moji.js)

```javascript
<script src="/path/to/script/moji.js"></script>
<script>
$("hoge input")
  .val(new Moji($("hoge input").val()).convert("ZE", "HE").toString());
</script>
```

### npm & require

```bash
//npm
npm i moji

// yarn
yarn add moji
```

```javascript
const moji = require("moji");
```

使い方
------

###convert()

`convert("変換種別)`

* "ZEtoHE": 全角英数 => 半角英数
* "ZStoHS": 全角スペース => 半角スペース
* "HStoZS": 半角スペース => 全角スペースに
* "HEtoZE": 半角英数 => 全角英数
* "HGtoKK": ひらがな => カタカナ
* "KKtoHG": カタカナ => ひらがな
* "ZKtoHK": 全角カナ => 半角カナ
* "HKtoZK": 半角カナ => 全角カナ

```javascript
/** 全角英数 => 半角英数 **/
moji("ＡＢＣＤ０１２３４").convert("ZEtoHE").toString();
// => ABCD01234

/** 半角英数 => 全角英数 **/
moji("ABCD01234").convert("HEtoZE").toString();
// => ＡＢＣＤ０１２３４

/** 全角スペース => 全角スペース **/
moji("　").convert("ZStoHS").toString();
// => " "

/** ひらがな => カタカナ **/
moji("あいうえお").convert("HGtoKK").toString();
// => アイウエオ

/** カタカナ => ひらがな **/
moji("アイウエオ").convert("KKtoHG").toString();
// => あいうえお

/** 全角カナ => 半角カナ **/
moji("アイウエオ").convert("ZKtoHK").toString();
// => ｱｲｳｴｵ

/** 半角カナ => 全角カナ **/
moji("ｱｲｳｴｵ").convert("HKtoZK").toString(),
// => アイウエオ
```

メソッドチェーンでつないで変換

```javascript
/** [半角カナ] => [全角カナ] => [ひらがな] **/
moji("ｱｲｳｴｵ").convert("HKtoZK").convert("KKtoHG").toString();
// => あいうえお
```

---

### 標準のStringメソッド

`string("標準メソッド名", [標準メソッド引数)`

```javascript
moji("　あ　あ　あ　").string("trim").convert("HG", "KK").toString(),
// => "ア　ア　ア"

moji("あああ").string("replace", "あああ", "いいい").convert("HG", "KK").toString(),
// => イイイ

moji("abcdefghij").string("substr", 1, 2).toString(),
// => bc
```

---

### toString()

`toString()`

基本的にメソッドはメソッドチェーンでつなぐ事を想定しているため、最後に`toString`で文字列を取得してください。

---

### filter()

指定した文字種で絞込ます。

`filter("絞り込みたい文字種")`

```javascript
/** ひらがなを絞込 **/
moji("abcあいうアイウ123").filter("HG").toString();
// => あいう
```

### reject()

指定した文字種を排除します。

`reject("排除したい文字種")`

```javascript
/** ひらがなを排除 **/
moji("abcあいうアイウ123").reject("HG").toString();
// => abcアイウ123
```

---

文字種
------

変換などに使う文字種です。 標準では以下の文字種が登録されています。

`ZE`: 全角英数 // スペース含まず
`HE`: 半角英数 // スペース含まず
`HG`: ひらがな
`KK`: カタカナ

`ZS`: 全角スペース
`HS`: 半角スペース

`HK`: 半角カタカナ
`ZK`: 全角カタカナ(半角カタカナとの変換用)
※ 半角カナは`ｶﾞｷﾞｸﾞｹﾞｺﾞ`の用に`ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ`のように、濁点、半濁点が別文字列になるなどの特殊性があるため、半角カナ、全角カナ変換は特別に文字種を設定しています。

文字種の追加
------------

文字種は後から独自に追加する事が可能です。

追加例)

```javascript
moji.addMojisyu("文字種名", {start: 開始文字コード, end: 終了文字コード});
moji.addMojisyu("文字種名", {regxp: 正規表現, list: 文字列の配列});
```

例)
```javascript
moji = require("Moji");
moji.addMojisyu({"ZE", {start:0xff01, end:0xff5e}}); // 全角英数
moji.addMojisyu({"HK", {
  regexp: /([\uff66-\uff9c]\uff9e)|([\uff8a-\uff8e]\uff9f)|([\uff61-\uff9f])/g,
  list: ["｡", "｢", "｣"]
}});
```

### 文字種のパターンについて

文字種は二つのパターンがあります。これは、文字列の中から該当文字種を検索して置換する方法に依存します。

#### 範囲で指定する文字種

全角英数や半角英数のように、文字コードが連続している場合に仕様します。

#### 正規表現で指定する文字種

半角カナのように連続する文字列では変換できない場合などに利用します。
正規表現(rebexp)で範囲を指定して、その範囲内の文字列がlistにあるかチェックします。

これは、listだけで検索すると文字数に応じてパフォーマンスの劣化が予想されるためです。

この辺りはFHconvertを参考にさせて頂いています。

感謝
----

[FHconverter.js](http://distraid.co.jp/demo/js_codeconv.html)を多く参考させて頂いています。

ライセンス
----------

MIT
