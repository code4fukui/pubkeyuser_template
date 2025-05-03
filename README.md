# pubkeyuser_template

## usage

```sh
deno serve --allow-import --allow-read=./static/ --port 8800 server.js
```
or
```sh
deno serve -A --port 8800 server.js
```

## server

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

## client

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
[static/index.html](static/index.html)

## reference

- [PubkeyUser](https://github.com/code4fukui/PubkeyUser)
