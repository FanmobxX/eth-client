require('dotenv').config();

const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

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

/**
 * Deploys contract
 * @return {string} Contract address
 */
async function deploy() {
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
  const contractIndex = 'source:TigaToken';
  const { bytecode } = output.contracts[contractIndex];
  const abi = JSON.parse(output.contracts[contractIndex].interface);

  // Connect to Ethereum
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));
  console.log(web3.version);

  // Contract object
  const contract = new web3.eth.Contract(abi);

  // Deploy contract
  const contractInstance = await contract
    .deploy({
      data: `0x${bytecode}`,
    })
    .send({
      from: process.env.FANMOB_ACCOUNT,
      gas: 1500000,
      gasPrice: '30000000000000',
    }, (error, transactionHash) => {
      console.log(transactionHash);
    });

  return contractInstance.options.address;
}

// function estimateGas() {
//   contract
//     .deploy({
//       data: '0x' + bytecode,
//     })
//     .estimateGas((err, gas) => {
//       console.log(gas);
//     });
//   // 678376
// }

module.exports = deploy;
