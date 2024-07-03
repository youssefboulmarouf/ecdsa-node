## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.


### Notes:

#### Wallet Address Generator:
This project includes a script to generate Ethereum wallet addresses using the keccak hash of the public key generated from random private keys. The script is named `generate.js` and is located in the `server/scripts` folder.

The script generates wallet addresses by following these steps:

1. Generate a random private key.
1. Derive the public key from the private key.
1. Compute the keccak hash of the public key.
1. Use the last 20 bytes of the keccak hash as the wallet address.

The script doesn't require any parameters. Simply run the script using Node.js to generate a new wallet address. The output of the script is as follow:

```shell
$ node ./server/scripts/generate.js 
Private Key:  .......
Public Key:  ........
Wallet Address:  ..........
```

Below is the list of the wallet address being used in the app with their respective private and public keys.

* Wallet Address #1:
    - Private Key:  9f860bf532265a3f63e5d083fd49e572d7bdb0633527488803c21315975c3e73
    - Public Key:  0478e33f4254a1ec4fc01c503589a2fbe80260d65db7ae622c859e386660b61f54e53e4791e99c1392647297a4004f1a94651a4ba16574a85757b3174aa4c58ded
    - Wallet Address:  12ab18ef5ceac1ee7c254016511dead01b103db1

* Wallet Address #2:
    - Private Key:  e7b250ef0816238e445e4973e5623d0f2db35d1fae792d7809cae7b49b614f5e
    - Public Key:  041d77e9192db55ad4b7e3a582fcff5b7e49da353c230d5f52658061c63539c1887647154ff049acbf013e44b7dd6806fff3467a0ca01337b7e426c5b5274839f9
    - Wallet Address:  bf310d98716609bc21cbcc7c5710e9a72e8a9a00

* Wallet Address #3:
    - Private Key:  132219b868b58818970219278d124a6953bda1f7150edc6bf3c4b08cd2e50fee
    - Public Key:  044e9917739cdf916f062f27f9c62906bc3fc3c2802114dfe206a2f3646968e071592b28830923f6340c15766b3aaf08e08ede8d8f4e2121f88904db86c676e4cd
    - Wallet Address:  24c1ad1a769c59bd33274c1ca9a537282b44a15a

#### Transfer Signing Script:
This project includes a script to sign a transfer using the `secp256k1` algorithm. The script is named sign.js and is located in the `server/scripts` folder. The signature is created using the provided amount, recipient address, public key, and private key. It requires four mandatory parameters: `--amount`, `--recipient`, `--publicKey`, and `--privateKey`. Run the script using Node.js to generate the transaction signature. The output of the script is as follow:

```shell
$ node ./scripts/sign.js --amount "...." --recipient "...." --publicKey "...." --privateKey "...."
signature:  .....
```

#### How To Use The App:
This guide will walk you through the steps to perform a transfer using the app. Ensure you have the necessary information and scripts ready before proceeding.

#### Steps to Perform a Transfer:
1. Enter the wallet address to transfer from:
Fill in the Wallet Address field with the address you are transferring from.
1. Enter the amount to transfer:
Fill in the Send Amount field with the amount you wish to transfer.
1. Enter the recipient's wallet address:
Fill in the Recipient Wallet Address field with the address of the recipient.
1. Enter the sender's public key:
Fill in the Sender Public Key field with your public key. This key should be the one used to compute the keccak hash for your wallet address.
1. Enter the transaction signature:
Use the sign.js script to generate the signature. The signature should be the output of the sign.js script, generated using the `--amount`, `--recipient`, `--publicKey`, and `--privateKey` parameters.
Fill in the Transaction Signature field with the generated signature.

#### Server-side Validations:

1. Wallet Address Validation:
The server will validate that the wallet address is actually generated from the provided public key.
If the wallet address is not valid, a response with code 400 will be returned with the message: `Sender wallet address does not match with the provided public key.`
1. Signature Validation:
The server will validate that the signature is signed using the provided public key and the transaction hash.
If the signature is not valid, a response with code 400 will be returned with the message: `Unable to validate transaction signature.`

By following these steps and ensuring all fields are correctly filled, you can successfully perform a transfer using the app.
