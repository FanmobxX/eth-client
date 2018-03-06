require('dotenv').config();

const Account = require('./account');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));
const FANMOB_AMOUNT = web3.utils.toWei('500000', 'ether');

class Fanmob {
  constructor(userId) {
    this.userId = userId;
  }

  /**
   * Mint artist tokens for Fanmob's allocation
   * @return {PromiEvent} Result of mint() operation
   */
  async mint(artistTokenAddress) {
    this.user = await Account.findOne({ userId: this.userId });

    // pull abi from db
    const abi = JSON.parse(this.user.tokenContractABI);

    // create web3 contract instance
    const contract = new web3.eth.Contract(abi, artistTokenAddress);

    // get accounts
    const accounts = await web3.eth.getAccounts();
    const to = accounts[1];

    // call method mint()
    return contract.methods
      .mint(to, FANMOB_AMOUNT)
      .send({
        from: accounts[0],
      })
      .on('transactionHash', (hash) => {
        console.log(hash);
      })
      .on('receipt', (receipt) => {
        console.log(receipt);
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log(confirmationNumber);
        console.log(receipt);
      })
      .on('error', console.error);
  }
}

module.exports = Fanmob;
