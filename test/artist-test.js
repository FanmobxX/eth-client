const artistDeploy = require('../src/artist.js');

describe('Artist', async () => {
  it('should deploy artist contract', async () => {
    artistDeploy();
  }).timeout(5000);
});
