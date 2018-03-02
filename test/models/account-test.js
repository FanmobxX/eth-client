const assert = require('assert');
const Account = require('../../src/models/account');

describe('Account model', () => {
  describe('address', () => {
    it('should be 40 chars long', (done) => {
      const account = new Account({
        userId: 5,
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
