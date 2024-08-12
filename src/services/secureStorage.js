import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";

export default class AppSecureStorage extends SecureStorage {
  constructor() {
    let doc = {
      localStorage: {},
    };
    if (typeof window !== "undefined") {
      doc = window;
    }
    super(doc.localStorage, {
      hash: function hash(key) {
        key = CryptoJS.SHA256(
          key,
          process.env.REACT_APP_STORAGE_ENCRYPTION_KEY
        );
        return key.toString();
      },
      encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(
          data,
          process.env.REACT_APP_STORAGE_ENCRYPTION_KEY
        );
        data = data.toString();
        return data;
      },
      decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(
          data,
          process.env.REACT_APP_STORAGE_ENCRYPTION_KEY
        );
        data = data.toString(CryptoJS.enc.Utf8);
        return data;
      },
    });
  }

  set(key, value) {
    this.setItem(key, value);
  }

  get(key) {
    if (typeof window !== "undefined") {
      return this.getItem(key);
    }
  }

  remove(key) {
    this.removeItem(key);
  }

  clearStorage() {
    this.clear();
  }
}
