const { token } = require('../config/config.json');
const CryptoJS = require('crypto-js');
/*
const encrypt = (text) => {
	return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};
*/

const decrypt = (data) => {
	return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
}; 



/* const a = encrypt(token)
const b = encrypt(a)
const c = encrypt(b)
const d = encrypt(c)*/

const e = decrypt(token)
const f = decrypt(e)
const g = decrypt(f)
module.exports = {
	h: decrypt(g)
}

/* console.log(d)
console.log(h); */

/* console.log();
console.log(decrypt('')); */