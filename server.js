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
