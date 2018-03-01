require('dotenv').config();

const Web3 = require('web3');

// Connect to Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));

class Account {
  static create() { // id
    const account = web3.eth.accounts.create();
    const { privateKey } = account;
    const keystore = web3.eth.accounts.encrypt(privateKey, process.env.KEYSTORE_PW);
    console.log(keystore); // save in mongodb
  }

  // static find(id) {
  //   const decrypted = web3.eth.accounts.decrypt(keystore, process.env.KEYSTORE_PW);
  //   console.log(decrypted);
  // }
}

module.exports = Account;
