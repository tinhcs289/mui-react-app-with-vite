import Crypto from "crypto-js";

const KEY = "encrypt_key:aes";

const aesCrypt = {
  decrypt: (encValue: string) =>
    Crypto.AES.decrypt(encValue, KEY)
      .toString(Crypto.enc.Utf8)
      .replace(/p1L2u3S/g, "+")
      .replace(/s1L2a3S4h/g, "/")
      .replace(/e1Q2u3A4l/g, "="),
  encrypt: (value: string) =>
    Crypto.AES.encrypt(
      value
        .replace(/\+/g, "p1L2u3S")
        .replace(/\//g, "s1L2a3S4h")
        .replace(/=/g, "e1Q2u3A4l"),
      KEY
    ).toString(),
};
export default aesCrypt;
