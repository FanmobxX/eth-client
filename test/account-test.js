const assert = require('assert');
const Account = require('../src/account');

describe('Account model', () => {
  Account.collection.drop();
  describe('address', () => {
    it('should be 40 chars long', (done) => {
      const account = new Account({
        userId: Math.floor(Math.random() * 11),
        address: 'adsf',
        keystore: { empty: 'easdfads' },
      });
      account.validate((err) => {
        assert(err.errors.address);
        done();
      });
    });
  });
});
