const assert = require('assert');
const { compile, estimateGas, getBalance } = require('../src/artist.js');
const Web3 = require('web3');

// Connect to Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_HTTP_PROVIDER));
console.log(web3.version);

describe('Artist', () => {
  let compiledContract = null;

  it('should check account balance', async () => {
    const balance = await getBalance();
    console.log(`Current balance: ${balance} ETH`);
    assert(balance > 0);
  });

  it('should compile contract', (done) => {
    compiledContract = compile();
    assert(compiledContract);
    done();
  }).timeout(20000);

  it('should estimate gas', async () => {
    const { bytecode } = compiledContract;
    const abi = JSON.parse(compiledContract.interface);

    // Contract object
    const contract = new web3.eth.Contract(abi);

    const gas = await estimateGas(contract, bytecode);
    console.log(`Estimated gas: ${gas}`);
    assert(gas > 0);
  });
  // it('should deploy artist contract', (done) => {
  //   artistDeploy(done);
  //   // const contractAddress = await artistDeploy();
  //   // console.log(contractAddress);
  //   // assert.equal(contractAddress.length, 42);
  // }).timeout(200000);
});
