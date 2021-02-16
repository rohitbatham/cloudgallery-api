import CryptoJS from "crypto-js";

export function Encrypt(key, value){
    const encrptedText =  CryptoJS.AES.encrypt(value, key);
    const transformedKey = encrptedText.toString().replace(/\+/g,'xMl3Jk').replace(/\//g,'Por21Ld').replace(/\=/g,'Ml32'); 
    return transformedKey;
}
export function Decrypt(key, encrptedText){
    const decryptedText = CryptoJS.AES.decrypt(encrptedText.replace(/\xMl3Jk/g, '+' ).replace(/\Por21Ld/g, '/').replace(/\Ml32/g, '='), key);
    return decryptedText.toString(CryptoJS.enc.Utf8);
}



