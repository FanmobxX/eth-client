require('dotenv').config();

const ethTx = require('eth-tx');
const fs = require('fs');
const path = require('path');

const { Account } = require('./models');
const { CappedToken } = require('../build/contracts');

class ArtistContractController {
  /**
   * Compiles artist contract to ./build folder.
   * @return {Object} abi and byteCode
   */
  static async compile() {
    const source = path.join(__dirname, '..', 'contracts', 'CappedToken.sol');
    const destination = path.join(__dirname, '..', 'build', 'contracts.js');

    if (!fs.existsSync(path.dirname(destination))) {
      fs.mkdirSync(path.dirname(destination));
    }

    return ethTx.compileTo(source, destination, {});
  }

  /**
   * Deploys contract
   * @param {Contract} New Contract instance
   */
  static async deploy() {
    await ethTx.connect(process.env.ETHEREUM_HTTP_PROVIDER);

    const WrappedContract = ethTx.wrapContract(
      CappedToken.abi,
      CappedToken.byteCode,
    );

    const amount = ethTx.getCurrentWeb3().utils.toWei('500000', 'ether');
    return WrappedContract.new(amount);
  }

  /**
   * Initializes an `ArtistContractController`
   * @param  {Object} user User from access token
   */
  constructor(user = null) {
    if (user == null) {
      throw new Error('A required parameter is missing');
    }
    this.userId = user.id;
  }

  /**
   * Deploys a contract and saves the address in the DB
   * @return {Account} Account instance of updated user
   */
  async perform() {
    try {
      const instance = await ArtistContractController.deploy();
      return this.saveContractAddress(instance.$address);
    } catch (err) {
      console.error(err);
      throw new Error('Error deploying artist contract.');
    }
  }

  /**
   * Save artist contract address in DB
   * @param  {string} address Address of the new contract
   * @return {account} Account instance
   */
  async saveContractAddress(address) {
    try {
      const account = await Account.findOne({ userId: this.userId });
      account.tokenContractAddress = address;
      return account.save();
    } catch (err) {
      throw new Error('Error saving contract address');
    }
  }
}

module.exports = ArtistContractController;
