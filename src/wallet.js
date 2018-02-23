const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
// const Web3 = require('web3');

// const web3 = new Web3(process.env.ETHEREUM_HTTP_PROVIDER);
// console.log(web3.version);

function generateWallet(mnemonic) {
  const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
  const privateKeyString = hdwallet.getWallet().getPrivateKeyString();
  const addr = hdwallet.getWallet().getAddressString();
  console.log(privateKeyString);
  console.log(addr);
}

const mnemonic = bip39.generateMnemonic();
console.log(mnemonic);
// arrange wide lock ceiling famous dose bottom hawk carbon neither drift stone
generateWallet(mnemonic);

// var account = web3.eth.accounts.privateKeyToAccount(key);
// console.log(account);

// { address: '0x0923e515b61Ee00FAb715624F0646e48A63a01Ec',
//   privateKey: 'd260e8623851f9ef42bae65f1014474a630f39d14ce1852103ae40f31077afea40c68e62ba9e3d8eda9ff2ada6f0a062a2f9cba802f8201ef4d25c216a7f9981',
//   signTransaction: [Function: signTransaction],
//   sign: [Function: sign],
//   encrypt: [Function: encrypt] }

// web3.eth.getAccounts()
// .then(console.log);
// // []

// web3.eth.getBlockNumber()
// .then(console.log);
// // 2666403

// web3.eth.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1")
// .then(console.log);

// web3.eth.getBalance(account.address)
// .then(console.log);

// web3.eth.accounts.wallet.create(2);

// const wallet = web3.eth.accounts.wallet;
// console.log(wallet);
