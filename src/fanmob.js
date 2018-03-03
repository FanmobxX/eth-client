require('dotenv').config();

const Account = require('./models/account');
const Web3 = require('web3');

// Connect to Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));

class Fanmob {
  /**
   * Mint artist tokens for Fanmob's allocation
   * @return {Object} Web3 keystore v3 JSON object
   */
  static mint(artistTokenAddress) {
    
  }

module.exports = Fanmob;
