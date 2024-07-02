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

#### Keys & Addresses:
The new default wallet addresses used are the last 20 bytes of keccak hash of the public key generated from random private keys. 
For more wallet addresses please use the script `server/scripts/generate.js`. The output of the script is as follow:

```shell
$ node ./server/scripts/generate.js 
Private Key:  .......
Public Key:  ........
Wallet Address:  ..........
```
For testing purposes, please consider the following keys and wallet addresses:

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

#### Signature:
The app is enhanced to consider the transaction signature wich is generated using `secp256k1` algorithm.
The script `server/scripts/sign.js` generates the transaction signature, it takes the following parameters `--amount` `--recipient` `--publicKey` `--privateKey`, all the parameters are required. The output of the script is as follow:

```shell
$ node ./scripts/sign.js --amount "...." --recipient "...." --publicKey "...." --privateKey "...."
signature:  .....
```

