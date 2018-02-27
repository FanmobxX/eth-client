const assert = require('assert');
const { compile, getBalance, deploy } = require('../src/artist.js');

describe('Artist', () => {
  it('should check account balance', async () => {
    const balance = await getBalance();
    console.log(`Current balance: ${balance} ETH`);
    assert(balance > 0);
  });

  it('should compile contract', (done) => {
    const compiledContract = compile();
    assert(compiledContract);
    done();
  }).timeout(20000);

  // it('should deploy artist contract', (done) => {
  //   artistDeploy(done);
  //   // const contractAddress = await artistDeploy();
  //   // console.log(contractAddress);
  //   // assert.equal(contractAddress.length, 42);
  // }).timeout(200000);
});
