const assert = require('assert');
const AccountController = require('../src/accounts');

describe('AccountController', () => {
  const userId = Math.floor(Math.random() * 100);
  const account = new AccountController(userId);

  describe('perform', () => {
    it('should create account and save keystore', () => {
      account.perform().then(assert(true));
    });
  });

  describe('update', () => {
    it('should update user', () => {
      account.update(userId).then(assert(true));
    });
  });

  describe('delete', () => {
    it('should delete user', () => {
      AccountController.delete(userId).then(assert(true));
    });
  });

  describe('find', () => {
    it('should find user', () => {
      AccountController.find(userId).then(assert(true));
    });
  });
});
