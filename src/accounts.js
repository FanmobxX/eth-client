require('dotenv').config();

const { Account } = require('./models');
const Web3 = require('web3');

// Connect to Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));

class AccountController {
  /**
   * Create new Ethereum account
   * @return {Object} Web3 keystore v3 JSON object
   */
  static create() {
    const account = web3.eth.accounts.create();
    const { privateKey } = account;
    const keystore = web3.eth.accounts.encrypt(privateKey, process.env.KEYSTORE_PW);
    return keystore;
  }

  /**
   * Gets user
   * @return {Promise} Promise with user instance
   */
  static async find(existingUserId) {
    return Account.findOne({ userId: existingUserId });
  }

  /**
   * Deletes user
   * @return {Promise} Promise with user instance
   */
  static async delete(existingUserId) {
    return Account.remove({ userId: existingUserId });
  }

  /**
   * Setup instance with userId
   * @param {string} userId id for user in Postgres DB
   */
  constructor(userId) {
    this.userId = userId;
  }

  /**
   * Generates a keystore and saves the user in Mongo DB
   * @return {Promise} Promise with user instance
   */
  perform() {
    const keystore = AccountController.create();
    return this.save(keystore);
  }

  /**
   * Update user id
   * @return {Promise} Promise with user instance
   */
  async update(existingUserId) {
    const account = await Account.findOne({ userId: existingUserId });
    account.userId = this.userId; // new userId
    return account.save();
  }

  /**
   * Save the user's private key in Mongo DB
   * @param  {Object} keystore Web3 keystore v3 JSON object
   * @return {Promise} Promise with user instance
   */
  async save(keystore) {
    return Account.create({
      userId: this.userId,
      keystore,
    });
  }

  // static find(id) {
  //   const decrypted = web3.eth.accounts.decrypt(keystore, process.env.KEYSTORE_PW);
  //   console.log(decrypted);
  // }
}

module.exports = AccountController;
