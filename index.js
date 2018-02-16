const bip39 = require('bip39');
const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/6hHxPMt2sgN2OT6k0gLG');

var mnemonic = bip39.generateMnemonic();
console.log(mnemonic);
// arrange wide lock ceiling famous dose bottom hawk carbon neither drift stone

var key = bip39.mnemonicToSeedHex(mnemonic);
console.log(key);
// d260e8623851f9ef42bae65f1014474a630f39d14ce1852103ae40f31077afea40c68e62ba9e3d8eda9ff2ada6f0a062a2f9cba802f8201ef4d25c216a7f9981

var account = web3.eth.accounts.privateKeyToAccount(key);
console.log(account);

// { address: '0x0923e515b61Ee00FAb715624F0646e48A63a01Ec',
//   privateKey: 'd260e8623851f9ef42bae65f1014474a630f39d14ce1852103ae40f31077afea40c68e62ba9e3d8eda9ff2ada6f0a062a2f9cba802f8201ef4d25c216a7f9981',
//   signTransaction: [Function: signTransaction],
//   sign: [Function: sign],
//   encrypt: [Function: encrypt] }
