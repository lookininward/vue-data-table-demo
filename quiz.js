//-- Step 1 -- decrypt msg to get link to step 2 ------------------------------
let encryptedMsg = [104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 115, 97, 97, 115, 100, 97, 115, 100, 108, 102, 108, 102, 108, 115];

encryptedMsg = encryptedMsg.map(item => {
   return String.fromCharCode(item);
});

let msg = '';

encryptedMsg.forEach(char => {
  msg += char;
});

console.log(msg);


//-- Step 2 -- decrypt token to get link to step 3 ----------------------------
let fernet = require('fernet');
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=');
let message = 'gAAAAABcrpzOvo7hcmTm60QOyjSWVVlbhlr9a12MCCgMX6mUX8H9ksXVZqi9Y1-hASrB2VYvp8B8_t546nDTjdlJHlc6PulaE19B2Yw5MF03ijRSOY6h-A1shMoYZB1RN2JCWgiQCv6zLOtQ0E9rQYlQIMFTZPA4rulL_IwPJ9tD_e9WCe5iqxnHiwymLYvwhsU5mKG0mLXf'
let token = new fernet.Token({secret, token: message, ttl:0});
token.decode();
console.log(token);


//-- Step 3 -- VueJS ----------------------------------------------------------
// Data Table Component
