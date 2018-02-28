const assert = require('assert');
const ArtistContract = require('../src/artist.js');
const Web3 = require('web3');

// Connect to Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));
console.log(web3.version);

describe('ArtistContract', () => {
  const contractName = 'TigaToken';
  const tokenName = 'Tiga Coin';
  const tokenSymbol = 'TIGA';
  const artistContract = new ArtistContract(contractName, tokenName, tokenSymbol);

  it('should check account balance', async () => {
    const balance = await ArtistContract.getBalance();
    console.log(`Current balance: ${balance} ETH`);
    assert(balance > 0);
  });

  it('should compile contract', (done) => {
    assert(artistContract.compiledContract);
    done();
  }).timeout(20000);

  it('should estimate gas', async () => {
    const gas = await artistContract.estimateGas();
    console.log(`Estimated gas: ${gas}`);
    assert(gas > 0);
  });

  it('should deploy artist contract', async () => {
    await artistContract.deploy();
  }).timeout(20000);
});
