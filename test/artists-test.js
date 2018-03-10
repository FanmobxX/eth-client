const assert = require('assert');
const { Account } = require('../src/models');
const ArtistContractDeployer = require('../src/artists');

describe('ArtistContract', async () => {
  const userId = Math.floor(Math.random() * 100);
  let account;
  let instance;

  const user = { id: userId, iat: 'wut' };
  const artistContractDeployer = new ArtistContractDeployer(user);

  before(async () => {
    account = await Account.create({
      userId,
      address: 'e8e210aa8def63624b051f6a0077c699332b1ec1',
      keystore: { empty: 'easdfads' },
    });
  });

  // it('should save the ABI', async () => {
  //   account = await artistContract.saveABI(compiledContract);
  //   assert(account.tokenContractABI);
  // }).timeout(10000);

  it('should deploy the contract', async () => {
    instance = await ArtistContractDeployer.deploy();
    assert(instance.$address);
    console.log(instance.$address);
  }).timeout(100000);

  it('should create an artist contract deployer', () => {
    assert(artistContractDeployer);
  });

  // it('should save contract address in db', async () => {
  //   account = await artistContractDeployer.saveContractAddress('0547071577833531fd31C537fC2280AEc7a41d2b');
  //   assert(account.tokenContract.address);
  // });

  it('should perform operation', async () => {
    const a = await artistContractDeployer.perform();
    console.log(a);
    assert(a);
  }).timeout(100000);
});
