const assert = require('assert');
const artistDeploy = require('../src/artist.js');

describe('Artist', () => {
  it('should deploy artist contract', async () => {
    const contractAddress = await artistDeploy();
    console.log(contractAddress);
    assert.equal(contractAddress.length, 42);
  }).timeout(10000);
});
