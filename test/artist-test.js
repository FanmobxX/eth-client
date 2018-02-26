const assert = require('assert');
const artistDeploy = require('../src/artist.js').deploy;
const { balance } = require('../src/artist.js');

describe('Artist', () => {
  it('should check account balance', (done) => {
    balance(done);
  });

  // it('should deploy artist contract', (done) => {
  //   artistDeploy(done);
  //   // const contractAddress = await artistDeploy();
  //   // console.log(contractAddress);
  //   // assert.equal(contractAddress.length, 42);
  // }).timeout(200000);
});
