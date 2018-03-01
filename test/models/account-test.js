const assert = require('assert');
const Account = require('../../src/models/account');

    // const account = new Account({
    //   userId: this.userId,
    //   address: keystore.address,
    //   keystore,
    // });

describe('User model', () => {
  describe('validations', () => {
    describe('account', () => {
      it('should be 40 chars long', (done) => {
        const account = new Account({
          userId: 'br0wnpunk',
        });
        u.validate((err) => {
          assert(err.errors.phone);
          done();
        });
      });

      it('should be valid if phone is valid', (done) => {
        const u = new User({ phone: '+18478338353', username: 'br0wnpunk' });
        u.validate((err) => {
          assert.equal(err, null);
          done();
        });
      });
    });
  });
});
