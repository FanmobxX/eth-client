const assert = require('assert');
const { Account } = require('../src/models');
const ArtistContractController = require('../src/artists');

describe('ArtistContract', () => {
  const userId = Math.floor(Math.random() * 100);
  const CONTRACT_ADDRESS = '0x0547071577833531fd31C537fC2280AEc7a41d2b';
  let deployedAddress;
  let instance;

  const user = { id: userId, iat: 'wut' };
  const controller = new ArtistContractController(user);

  before(async () => {
    await Account.remove({});

    await Account.create({
      userId,
      keystore: { address: 'e8e210aa8def63624b051f6a0077c699332b1ec1' },
    });
  });

  it('should deploy the contract', async () => {
    instance = await ArtistContractController.deploy();
    assert(instance.$address);
    deployedAddress = instance.$address;
  }).timeout(100000);

  it('should create an artist contract controller', () => {
    assert(controller);
  });

  it('should save contract address in db', async () => {
    const address = await controller.saveContractAddress(CONTRACT_ADDRESS);
    assert.equal(address, CONTRACT_ADDRESS);
  });

  it('should perform operation', async () => {
    const transactionReceipt = await controller.perform();
    assert(transactionReceipt.transactionHash);
  }).timeout(100000);

  it('should mint tokens', async () => {
    const transactionReceipt = await ArtistContractController.mint(deployedAddress);
    assert(transactionReceipt.transactionHash);
  });
});
