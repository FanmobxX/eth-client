const assert = require('assert');
const { Account } = require('../src/models');

describe('Account model', () => {
  before(async () => {
    await Account.remove({});
  });

  it('should not create account without private key', async () => {
    try {
      await Account.create({
        userId: Math.floor(Math.random() * 11),
      });
    } catch (err) {
      assert(err.errors.keystore);
    }
  });
});
