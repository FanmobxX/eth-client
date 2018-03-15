const assert = require('assert');

const ArtistController = require('../src/artists');
const { Account } = require('../src/models');
const Wallet = require('../src/wallets');

describe('WalletController', () => {
  let wallet = null;
  const userId = Math.floor(Math.random() * 100);
  const user = { id: userId, iat: 'wut' };

  // before(async () => {
  //   await Account.remove({});
  //   await Account.create({
  //     userId: user.id,
  //     keystore: { address: 'e8e210aa8def63624b051f6a0077c699332b1ec1' },
  //   });

  //   // deploy artist contract
  //   const artistController = new ArtistController(user);
  //   await artistController.perform();

  //   // new wallet
  //   wallet = new Wallet(user);
  // });

  // it('should create a wallet instance', () => {
  //   assert(wallet);
  // });

  // it('should have 0 balance', async () => {
  //   const balances = await wallet.getBalances();
  //   assert(balances[0].userId);
  //   assert.equal(balances[0].balance, 0);
  // }).timeout(10000);

  // it('should have a balance', () => {
  //   // do a fandrop
  //   // balance should be non-zero
  // });
});
