require('dotenv').config();

const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

// Connect to Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));
console.log(web3.version);

class ArtistContract {
  constructor(contractName, tokenName, tokenSymbol) {
    if ((contractName == null) || (tokenName == null) || (tokenSymbol == null)) {
      throw new Error('A required parameter is missing');
    }

    const source = ArtistContract.template(contractName, tokenName, tokenSymbol);
    this.compiledContract = ArtistContract.compile(source, contractName);
  }

  static template(contractName, tokenName, tokenSymbol) {
    return `
      pragma solidity ^0.4.18;

      import './StandardToken.sol';

      contract ${contractName} is StandardToken {

        string public constant name = "${tokenName}";
        string public constant symbol = "${tokenSymbol}";
        uint8 public constant decimals = 18;

        uint256 public constant INITIAL_SUPPLY = 10000000 * (10 ** uint256(decimals));

        function ${contractName}() public {
          totalSupply_ = INITIAL_SUPPLY;
          balances[msg.sender] = INITIAL_SUPPLY;
          Transfer(0x0, msg.sender, INITIAL_SUPPLY);
        }
      }
    `;
  }

  // static compile() {
  //   const input = {
  //     'Greeter.sol': fs.readFileSync('./contracts/Greeter.sol').toString(),
  //   };

  //   // Compile contract
  //   const output = solc.compile({ sources: input }, 1);
  //   const c = output.contracts['Greeter.sol:greeter'];
  //   return c;
  // }

  /**
   * Compiles contract
   * @return {solc.Contract} Compiled contract
   */
  static compile(source, contractName) {
    const input = {
      source,
      'SafeMath.sol': fs.readFileSync('./src/contracts/SafeMath.sol').toString(),
      'ERC20Basic.sol': fs.readFileSync('./src/contracts/ERC20Basic.sol').toString(),
      'ERC20.sol': fs.readFileSync('./src/contracts/ERC20.sol').toString(),
      'BasicToken.sol': fs.readFileSync('./src/contracts/BasicToken.sol').toString(),
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
  async deploy() {
    const { bytecode } = this.compiledContract;
    const abi = JSON.parse(this.compiledContract.interface);
    const contract = new web3.eth.Contract(abi);
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    // console.log(bytecode);

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
      .then((newContractInstance) => {
        console.log(newContractInstance.options.address);
      });
  }

  /**
  * Estimate gas.
  * @param  {web3.eth.Contract} contract The web3 contract
  * @return {string} The gas amount
  */
  async estimateGas() {
    let estimatedGas;
    const abi = JSON.parse(this.compiledContract.interface);
    const contract = new web3.eth.Contract(abi);

    await contract
      .deploy({
        data: `0x${this.compiledContract.bytecode}`,
        // arguments: ['hello world'],
      })
      .estimateGas((err, gas) => {
        estimatedGas = gas;
      });
    return estimatedGas;
  }
}

module.exports = ArtistContract;
