require('dotenv').config();

const ethTx = require('eth-tx');
const fs = require('fs');
const path = require('path');

// const { Account } = require('./models');
const { Airdrop } = require('../build/airdrop-contracts');

class AirdropController {
  /**
   * Compiles airdrop contract to ./build folder.
   * @return {Object} abi and byteCode
   */
  static async compile() {
    const source = path.join(__dirname, '..', 'contracts', 'Airdrop.sol');
    const destination = path.join(__dirname, '..', 'build', 'airdrop-contracts.js');

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
      Airdrop.abi,
      Airdrop.byteCode,
    );

    return WrappedContract.new();
  }

  /**
   * Airdrop tokens
   * @param {string} contractAddress Location of contract
   * @param {string} tokenAddress Location of token contract
   * @param {array} destAddresses Destination addresses
   * @param {string} value Value of tokens to transfer
   * @return {Promise} The transaction receipt
   */
  static async airdrop(
    contractAddress = process.env.AIRDROP_CONTRACT_ADDRESS,
    tokenAddress,
    destAddresses = [],
    value = '100',
  ) {
    await ethTx.connect(process.env.ETHEREUM_HTTP_PROVIDER);

    const WrappedContract = ethTx.wrapContract(
      Airdrop.abi,
      Airdrop.byteCode,
    );

    const amount = ethTx.getCurrentWeb3().utils.toWei(value, 'ether');

    try {
      const contractInstance = new WrappedContract(contractAddress);
      console.log(`Airdrop contract address: ${contractAddress}`);
      console.log(`Token address: ${tokenAddress}`);
      console.log(`Dest addresses: ${destAddresses}`);
      console.log(`Amount/value: ${amount}`);
      return contractInstance
        .multisend(tokenAddress, destAddresses, amount)
        .send();
    } catch (err) {
      console.error(err);
      throw new Error('Error calling multisend() on airdrop contract instance.');
    }
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
  // async perform() {
  //   try {
  //     const instance = await ArtistContractController.deploy();
  //     const address = await this.saveContractAddress(instance.$address);
  //     return ArtistContractController.mint(address);
  //   } catch (err) {
  //     console.error(err);
  //     throw new Error('Error deploying artist contract.');
  //   }
  // }
}

module.exports = AirdropController;
