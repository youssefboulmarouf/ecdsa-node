const minimist = require('minimist');
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, hexToBytes, toHex } = require("ethereum-cryptography/utils");

const args = minimist(process.argv.slice(2), {
    string: ['amount', 'recipient', 'publicKey', 'privateKey']
});

const amount = args.amount;
const recipient = args.recipient;
const publicKey = args.publicKey;
const privateKey = args.privateKey;

if (!amount || !recipient || !privateKey || !publicKey) {
    throw Error('Missing parameter, please provide all of the following parameters: --amount, --recipient, --publicKey and --privateKey values');
}

// Convert JSON object to string and then to bytes then hash it using Keccak-256
const messageHash = keccak256(
    utf8ToBytes(
        JSON.stringify(
            {
                amount: amount,
                recipient: recipient
            }
        )
    )
);
const privateKeyBytes = hexToBytes(privateKey)
const [signature, recoveryBit] = secp.signSync(messageHash, privateKeyBytes, { recovered: true });

// // Verify the signature using the public key
const publicKeyBytes = hexToBytes(publicKey);
const isValid = secp.verify(signature, messageHash, publicKeyBytes);

console.log("signature: ", toHex(signature));
