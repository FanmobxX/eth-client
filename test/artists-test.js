const assert = require('assert');
const { Account } = require('../src/models');
const ArtistContractController = require('../src/artists');

describe('ArtistContract', async () => {
  const userId = Math.floor(Math.random() * 100);
  let account;
  let instance;

  const user = { id: userId, iat: 'wut' };
  const controller = new ArtistContractController(user);

  before(async () => {
    await Account.remove({});

    account = await Account.create({
      userId,
      keystore: { address: 'e8e210aa8def63624b051f6a0077c699332b1ec1' },
    });
  });

  it('should deploy the contract', async () => {
    instance = await ArtistContractController.deploy();
    assert(instance.$address);
  }).timeout(100000);

  it('should create an artist contract controller', () => {
    assert(controller);
  });

  it('should save contract address in db', async () => {
    account = await controller.saveContractAddress('0x0547071577833531fd31C537fC2280AEc7a41d2b');
    assert(account.tokenContractAddress);
  });

  it('should perform operation', async () => {
    const a = await controller.perform();
    assert(a);
  }).timeout(100000);
});
