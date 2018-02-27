require('dotenv').config();

const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

// Connect to Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));
console.log(web3.version);

function artistContract(contractName, tokenName, tokenSymbol) {
  return `
    pragma solidity ^0.4.18;

    import './StandardToken.sol';

    contract ${contractName} is StandardToken {

      string public constant name = "${tokenName}";
      string public constant symbol = "${tokenSymbol}";
      uint8 public constant decimals = 18;

      uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

      function ${contractName}() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        Transfer(0x0, msg.sender, INITIAL_SUPPLY);
      }
    }
  `;
}

async function estimateGas(contract, bytecode) {
  let gasPrice;

  await contract
    .deploy({
      data: `0x${bytecode}`,
    })
    .estimateGas((err, gas) => {
      gasPrice = gas;
    });

  return gasPrice;
}

/**
 * Get account balance
 * @return {string} Account balance in Ether
 */
async function getBalance() {
  const accounts = await web3.eth.getAccounts();
  const balance = await web3.eth.getBalance(accounts[0]);
  return web3.utils.fromWei(balance, 'ether');
}

/**
 * Compiles contract
 * @return {[type]} Compiled contract
 */
function compile() {
  const contractName = 'TigaToken';
  const source = artistContract(contractName, 'Tiga Coin', 'TIGA');

  const input = {
    source,
    'SafeMath.sol': fs.readFileSync('./contracts/SafeMath.sol').toString(),
    'ERC20Basic.sol': fs.readFileSync('./contracts/ERC20Basic.sol').toString(),
    'ERC20.sol': fs.readFileSync('./contracts/ERC20.sol').toString(),
    'BasicToken.sol': fs.readFileSync('./contracts/BasicToken.sol').toString(),
    'StandardToken.sol': fs.readFileSync('./contracts/StandardToken.sol').toString(),
  };

  // Compile contract
  const output = solc.compile({ sources: input }, 1);
  return output.contracts['source:TigaToken'];
}

/**
 * Deploys contract
 * @param {contract} compiledContract The solc compiled contract
 * @return {string} Contract address
 */
function deploy(compiledContract) {
  const { bytecode } = compiledContract;
  const abi = JSON.parse(compiledContract.interface);

  // Contract object
  const contract = new web3.eth.Contract(abi);

  // Estimate gas
  // const gasPrice = await estimateGas(contract, bytecode);
  // console.log(`Estimated gas price: ${gasPrice}`);

  // Deploy contract
  contract
    .deploy({
      data: `0x${bytecode}`,
    })
    .send({
      from: process.env.FANMOB_ACCOUNT,
      // gas: 1500000,
      // gasPrice: '30000000000000',
      gas: 5000000,
      gasPrice: '1078376',
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

  // return contractInstance.options.address;
}

module.exports = {
  getBalance,
  compile,
  deploy,
  estimateGas,
};
