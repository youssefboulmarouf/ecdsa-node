const secp = require('ethereum-cryptography/secp256k1');
const utils = require('ethereum-cryptography/utils');
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
console.log("Private Key: ", utils.toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log("Public Key: ", utils.toHex(publicKey));

const address = keccak256(publicKey.slice(1)).slice(-20);
console.log("Wallet Address: ", utils.toHex(address));

