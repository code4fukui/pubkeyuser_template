# pubkeyuser_template

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple Deno API server template demonstrating passwordless user identification with [PubkeyUser](https://github.com/code4fukui/PubkeyUser).

This template provides a minimal client and server to demonstrate `PubkeyUser`. The client generates a public key, sends it to the server's `/inc` endpoint, and displays the key and a persistent, per-user counter.

## Getting Started

**Prerequisites:**
- [Deno](https://deno.land) (v1.32+)
- A modern web browser with Web Crypto API support.

**Run the server:**
```sh
# With specific permissions
deno serve --allow-import --allow-read=./static/ --port 8800 server.js

# Or with all permissions
deno serve -A --port 8800 server.js
```

Then, open [http://localhost:8800](http://localhost:8800) in your browser. Each time you refresh the page, the counter associated with your browser's unique public key will increment.

## Server

The server uses `makeFetch` from `PubkeyUser` to handle incoming requests. It maintains an in-memory count for each unique public key it receives.

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

## Client

The client uses the `PubkeyUser` class to automatically manage a user's key pair in the browser. It calls the `/inc` API endpoint and displays the response.

```html
pubkey: <span id=span_pubkey></span><br>
count: <span id=span_count></span><br>

<script type="module">
import { PubkeyUser } from "https://code4fukui.github.io/PubkeyUser/PubkeyUser.js";

const u = new PubkeyUser();

const param = {};
const res = await