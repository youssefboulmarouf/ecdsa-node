const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, hexToBytes, toHex } = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "12ab18ef5ceac1ee7c254016511dead01b103db1": 100,
  "bf310d98716609bc21cbcc7c5710e9a72e8a9a00": 50,
  "24c1ad1a769c59bd33274c1ca9a537282b44a15a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, publicKey, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const validKey = validatePublicKeyWithSenderAddress(sender, publicKey);
  if (!validKey) {
    res.status(400).send({ message:"Sender wallet address does not match with the provided public key"});
  }

  const validSignature = validateTrasactionSignature(amount, recipient, publicKey, signature);
  if (!validSignature) {
    res.status(400).send({ message:"Unable to validate transaction signature"});
  }

  const transactionAmount = parseInt(amount);

  if (balances[sender] < transactionAmount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= transactionAmount;
    balances[recipient] += transactionAmount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function validatePublicKeyWithSenderAddress(sender, publicKey) {
  const publicKeyBytes = hexToBytes(publicKey);
  const address = keccak256(publicKeyBytes.slice(1)).slice(-20);
  return toHex(address) == sender;
}

function validateTrasactionSignature(amount, recipient, publicKey, signature) {
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

  const publicKeyBytes = hexToBytes(publicKey);
  return secp.verify(hexToBytes(signature), messageHash, publicKeyBytes);
}