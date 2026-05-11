# pubkeyuser_template

[PubkeyUser](https://github.com/code4fukui/PubkeyUser) を用いたパスワードレスなユーザー識別を実証する、シンプルな Deno API サーバーのテンプレートです。

このテンプレートは、`PubkeyUser` のデモ用に最小限のクライアントとサーバーを提供します。クライアントは公開鍵を生成してサーバーの `/inc` エンドポイントに送信し、その鍵とユーザーごとに永続化されたカウンターを表示します。

## はじめに

**前提条件:**
- [Deno](https://deno.land) (v1.32+)
- Web Crypto API をサポートするモダンなウェブブラウザ

**サーバーの実行:**
```sh
# 特定の権限を指定して実行
deno serve --allow-import --allow-read=./static/ --port 8800 server.js

# またはすべての権限を許可して実行
deno serve -A --port 8800 server.js
```

その後、ブラウザで [http://localhost:8800](http://localhost:8800) を開きます。ページを更新するたびに、ブラウザ固有の公開鍵に関連付けられたカウンターが増加します。

## サーバー

サーバーは `PubkeyUser` の `makeFetch` を使用して受信リクエストを処理します。受信した固有の公開鍵ごとに、メモリ上でカウントを保持します。

```js
import { makeFetch } from "https://code4fukui.github.io/PubkeyUser/serverutil.js";

const users = {};

const api = async (path, param, pubkey) => {
  if (path == "inc") {
    if (!pubkey) return { pubkey: "null", count: "-" };
    if (!users[pubkey]) users[pubkey] = 0;
    const cnt = ++users[pubkey];
    return { pubkey, count: cnt };
  }
};

export default { fetch: makeFetch(api) };
```
[server.js](server.js)

## クライアント

クライアントは `PubkeyUser` クラスを使用し、ブラウザ内でユーザーの鍵ペアを自動的に管理します。`/inc` API エンドポイントを呼び出し、レスポンスを表示します。

```html
pubkey: <span id=span_pubkey></span><br>
count: <span id=span_count></span><br>

<script type="module">
import { PubkeyUser } from "https://code4fukui.github.io/PubkeyUser/PubkeyUser.js";

const u = new PubkeyUser();

const param = {};
const res = await u.fetch("inc", param);
console.log(res)

span_pubkey.textContent = res.pubkey;
span_count.textContent = res.count;
</script>
```
