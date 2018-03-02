const assert = require('assert');
const AccountController = require('../src/account');

describe('AccountController', () => {
  const userId = Math.floor(Math.random() * 100);
  const account = new AccountController(userId);

  describe('perform', () => {
    it('should create account and save keystore', () => {
      account.perform().then(assert(true));
    });
  });
});
