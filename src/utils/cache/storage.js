import { isNullOrUndef } from "../is";

class Storage {
  constructor(options) {
    this.storage = options.storage;
    this.prefixKey = options.prefixKey;
  }

  getKey(key) {
    return `${this.prefixKey}_${key}`.toUpperCase();
  }

  set(key, value, expire) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUndef(expire) ? new Date().getTime() + expire * 1000 : null,
    });
    this.storage.setItem(this.getKey(key), stringData);
  }

  get(key) {
    const { value } = this.getItem(key, {});
    return value;
  }

  getItem(key, def = null) {
    const val = this.storage.getItem(this.getKey(key));
    if (!val) return def;
    try {
      const data = JSON.parse(val);
      const { value, time, expire } = data;
      if (!isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time };
      }
      this.remove(key);
      return def;
    } catch (error) {
      this.remove(key);
      return def;
    }
  }

  remove(key) {
    this.storage.remove(this.getKey(key));
  }

  clear() {
    this.storage.clear();
  }
}

export function createStorage({ prefixKey = "", storage = sessionStorage }) {
  return new Storage({ prefixKey, storage });
}
