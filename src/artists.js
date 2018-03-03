require('dotenv').config();

const Account = require('./account');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

// Connect to Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));

class ArtistContract {
  constructor(contractName, tokenName, tokenSymbol, user) {
    if ((contractName == null) || (tokenName == null) || (tokenSymbol == null)) {
      throw new Error('A required parameter is missing');
    }

    this.contractName = contractName;
    this.tokenName = tokenName;
    this.tokenSymbol = tokenSymbol;
    this.userId = user.id;
  }

  static template(contractName, tokenName, tokenSymbol) {
    return `
      pragma solidity ^0.4.18;

      import "./CappedToken.sol";

      contract ${contractName} is CappedToken {

        string public constant name = "${tokenName}";
        string public constant symbol = "${tokenSymbol}";
        uint8 public constant decimals = 18;

        uint256 public cap = 10000000 * (10 ** uint256(decimals));

        function ${contractName}() CappedToken(cap) public { }
      }
    `;
  }

  /**
   * Save ABI in DB
   * @param  {contract} compiledContract The solc compiled contract
   * @return {Account} Account with ABI saved
   */
  async saveABI(compiledContract) {
    const account = await Account.findOne({ userId: this.userId });
    account.tokenContractABI = compiledContract.interface;
    return account.save();
  }

  async perform() {
    const source = ArtistContract.template(
      this.contractName,
      this.tokenName,
      this.tokenSymbol,
    );
    const compiledContract = ArtistContract.compile(source, this.contractName);
    await saveABI(compiledContract);
    await deploy(compiledContract);
  }

  /**
   * Compiles contract
   * @return {solc.Contract} Compiled contract
   */
  static compile(source, contractName) {
    const input = {
      source,
      'BasicToken.sol': fs.readFileSync('./src/contracts/BasicToken.sol').toString(),
      'CappedToken.sol': fs.readFileSync('./src/contracts/CappedToken.sol').toString(),
      'ERC20.sol': fs.readFileSync('./src/contracts/ERC20.sol').toString(),
      'ERC20Basic.sol': fs.readFileSync('./src/contracts/ERC20Basic.sol').toString(),
      'MintableToken.sol': fs.readFileSync('./src/contracts/MintableToken.sol').toString(),
      'Ownable.sol': fs.readFileSync('./src/contracts/Ownable.sol').toString(),
      'SafeMath.sol': fs.readFileSync('./src/contracts/SafeMath.sol').toString(),
      'StandardToken.sol': fs.readFileSync('./src/contracts/StandardToken.sol').toString(),
    };

    // Compile contract
    const output = solc.compile({ sources: input }, 1);
    return output.contracts[`source:${contractName}`];
  }

  /**
   * Get account balance
   * @return {string} Account balance in Ether
   */
  static async getBalance() {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    return web3.utils.fromWei(balance, 'ether');
  }

  /**
   * Deploys contract
   * @param {contract} compiledContract The solc compiled contract
   */
  async deploy(compiledContract) {
    const { bytecode } = compiledContract;
    const abi = JSON.parse(compiledContract.interface);
    const contract = new web3.eth.Contract(abi);
    const accounts = await web3.eth.getAccounts();

    // Deploy contract
    contract
      .deploy({
        data: web3.utils.toHex(bytecode),
        // arguments: ['hello world'],
      })
      .send({
        from: accounts[0],
        gas: web3.utils.toHex(1500000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      }, (error, transactionHash) => {
        if (error) {
          console.log(error);
          console.error(error);
        }
        console.log(transactionHash);
      })
      .on('error', (error) => {
        console.log(error);
      })
      .on('transactionHash', (transactionHash) => {
        console.log(transactionHash);
      })
      .on('receipt', (receipt) => {
        // contains the new contract address
        console.log(receipt.contractAddress);
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log(receipt);
      })
      .then(async (newContractInstance) => {
        console.log(newContractInstance.options.address);
        await saveContractAddress(newContractInstance.options.address);
      });
  }

  /**
   * Save artist contract address in DB
   * @param  {contract} newContractInstance Address of the new contract
   * @return {account} Account instance
   */
  async saveContractAddress(newContractInstance) {
    const account = await Account.findOne({ userId: this.userId });
    account.tokenContractAddress = newContractInstance;
    return account.save();
  }

  /**
  * Estimate gas.
  * @param  {web3.eth.Contract} contract The web3 contract
  * @return {string} The gas amount
  */
  static async estimateGas(compiledContract) {
    let estimatedGas;
    const abi = JSON.parse(compiledContract.interface);
    const contract = new web3.eth.Contract(abi);

    await contract
      .deploy({
        data: `0x${compiledContract.bytecode}`,
        // arguments: ['hello world'],
      })
      .estimateGas((err, gas) => {
        estimatedGas = gas;
      });
    return estimatedGas;
  }
}

module.exports = ArtistContract;
