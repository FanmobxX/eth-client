const fs = require('fs');
const path = require('path');
const solc = require('solc');

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

const contractName = 'TigaToken';
const contract = artistContract(contractName, 'Tiga Coin', 'TIGA');

const input = {
  'ArtistToken.sol': contract,
  'SafeMath.sol': fs.readFileSync('./contracts/SafeMath.sol').toString(),
  'ERC20Basic.sol': fs.readFileSync('./contracts/ERC20Basic.sol').toString(),
  'ERC20.sol': fs.readFileSync('./contracts/ERC20.sol').toString(),
  'BasicToken.sol': fs.readFileSync('./contracts/BasicToken.sol').toString(),
  'StandardToken.sol': fs.readFileSync('./contracts/StandardToken.sol').toString(),
};

const output = solc.compile({ sources: input }, 1);
// for (var n in output.contracts) {
//   console.log(n + ': ' + output.contracts[n].bytecode);
// }

const contractIndex = 'ArtistToken.sol:TigaToken';

const { bytecode } = output.contracts[contractIndex];
console.log(bytecode);

const abi = JSON.parse(output.contracts[contractIndex].interface);
console.log(abi);
