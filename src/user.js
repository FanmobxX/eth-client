require('dotenv').config();

// const fs = require('fs');
// const solc = require('solc');
const Web3 = require('web3');

// Connect to Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));
console.log(web3.version);

const account = web3.eth.accounts.create();
// console.log(account);
const { privateKey } = account;
// const recreatedAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
// console.log(recreatedAccount);

const password = 'password';

const keystore = web3.eth.accounts.encrypt(privateKey, password);
console.log(keystore);

const decrypted = web3.eth.accounts.decrypt(keystore, password);
console.log(decrypted);
