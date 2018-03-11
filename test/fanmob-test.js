const assert = require('assert');
const { Account } = require('../src/models');
const Fanmob = require('../src/fanmob');

describe('Fanmob', async () => {
  const userId = Math.floor(Math.random() * 100);
  let account;

  before(async () => {
    // clear all Accounts in DB
    await Account.remove({});

    account = await Account.create({
      userId,
      keystore: { address: '0xe8e210aa8def63624b051f6a0077c699332b1ec2' },
      tokenContractAddress: '0x5BCB88B0dC47050eB58b778229D44F47b5e9a09e',
    });
    console.log(account);
  });

  // it('should mint tokens for fanmob', async () => {
  //   const fanmob = new Fanmob(userId);
  //   const success = await fanmob.mint(account.tokenContract.address);
  //   console.log(success);
  //   assert(success);
  // });
});
