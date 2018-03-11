require('dotenv').config();

const ethTx = require('eth-tx');
const { Account } = require('./models');
const { CappedToken } = require('../build/contracts');

class Wallet {
  /**
   * Initializes a `WalletController`
   * @param  {Object} user User from access token
   */
  constructor(user = null) {
    if (user == null) {
      throw new Error('A required parameter is missing');
    }
    this.userId = user.id;
  }

  /**
   * Gets token balances for user
   * @return {Object} [{ token: 0x.., balance: 100 }, ...]
   */
  async getBalances() {
    const user = await Account.findOne({ userId: this.userId });
    const artists = await Account.findAllArtists();

    await ethTx.connect(process.env.ETHEREUM_HTTP_PROVIDER);
    const WrappedContract = ethTx.wrapContract(
      CappedToken.abi,
      CappedToken.byteCode,
    );

    try {
      const promises = artists.map(async (artist) => {
        const contractInstance = new WrappedContract(artist.tokenContractAddress);
        const balance = await contractInstance
          .balanceOf(user.address)
          .call();
        return { token: artist.tokenContractAddress, balance };
      });
      return Promise.all(promises);
    } catch (err) {
      console.error(err);
      throw new Error('Error getting coin balances.');
    }
  }
}

module.exports = Wallet;
