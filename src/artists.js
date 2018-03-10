require('dotenv').config();

const ethTx = require('eth-tx');
const fs = require('fs');
const path = require('path');

const { Account, TokenContract } = require('./models');

class ArtistContractDeployer {
  /**
   * Deploys contract
   * @param {Contract} New Contract instance
   */
  static async deploy() {
    const source = path.join(__dirname, '..', 'contracts', 'CappedToken.sol');
    const destination = path.join(__dirname, '..', 'build', 'contracts.js');

    if (!fs.existsSync(path.dirname(destination))) {
      fs.mkdirSync(path.dirname(destination));
    }

    await ethTx.compileTo(source, destination, {});
    await ethTx.connect(process.env.ETHEREUM_HTTP_PROVIDER);

    // eslint-disable-next-line global-require
    const { CappedToken } = require('../build/contracts');
    const TokenContract = ethTx.wrapContract(
      CappedToken.abi,
      CappedToken.byteCode,
    );

    const amount = ethTx.getCurrentWeb3().utils.toWei('500000', 'ether');
    return TokenContract.new(amount);
  }

  constructor(user) {
    if (user == null) {
      throw new Error('A required parameter is missing');
    }
    this.userId = user.id;
  }

  async perform() {
    try {
      const instance = await ArtistContractDeployer.deploy();
      return this.saveContractAddress(instance.$address);
    } catch (err) {
      console.error(err);
      throw new Error('Error deploying artist contract.');
    }
  }

  /**
   * Save ABI in DB
   * @param  {contract} compiledContract The solc compiled contract
   * @return {Account} Account with ABI saved
   */
  // async saveABI(compiledContract) {
  //   const account = await Account.findOne({ userId: this.userId });
  //   account.tokenContractABI = compiledContract.interface;
  //   return account.save();
  // }

  /**
   * Save artist contract address in DB
   * @param  {string} address Address of the new contract
   * @return {account} Account instance
   */
  async saveContractAddress(address) {
    const account = await Account.findOne({ userId: this.userId });
    const tokenContract = await TokenContract.create({ address });
    account.tokenContract = tokenContract;
    return account.save();
  }
}

module.exports = ArtistContractDeployer;
