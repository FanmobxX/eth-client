const assert = require('assert');
const { Account } = require('../src/models');
const ArtistContract = require('../src/artists');

describe('ArtistContract', async () => {
  const userId = Math.floor(Math.random() * 100);
  let account;

  const contractName = 'TigaToken';
  const tokenName = 'Tiga Coin';
  const tokenSymbol = 'TIGA';
  const user = { id: userId, iat: 'wut' };
  const artistContract = new ArtistContract(
    contractName,
    tokenName,
    tokenSymbol,
    user,
  );
  const source = ArtistContract.template(
    contractName,
    tokenName,
    tokenSymbol,
    user,
  );
  const compiledContract = ArtistContract.compile(source, contractName);

  before(async () => {
    account = await Account.create({
      userId,
      address: 'e8e210aa8def63624b051f6a0077c699332b1ec1',
      keystore: { empty: 'easdfads' },
    });
  });

  it('should check account balance', async () => {
    const balance = await ArtistContract.getBalance();
    console.log(`Current balance: ${balance} ETH`);
    assert(balance > 0);
  });

  it('should compile contract', () => {
    assert(compiledContract.bytecode);
  }).timeout(10000);

  it('should save the ABI', async () => {
    account = await artistContract.saveABI(compiledContract);
    assert(account.tokenContractABI);
  }).timeout(10000);

  it('should estimate gas', async () => {
    const gas = await ArtistContract.estimateGas(compiledContract);
    console.log(`Estimated gas: ${gas}`);
    assert(gas > 0);
  });

  it('should deploy the contract', async () => {
    const contract = await ArtistContract.deploy(compiledContract);
    console.log(contract);
    assert(contract.options.address);
  }).timeout(10000);
});
