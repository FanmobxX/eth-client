const assert = require('assert');
const ethTx = require('eth-tx');

const AirdropController = require('../src/fandrops');
const ArtistController = require('../src/artists');

describe('AirdropController', () => {
  let accounts;
  let deployedTokenAddress;
  let deployedAddress;

  // before(async () => {
  //   await ethTx.connect(process.env.ETHEREUM_HTTP_PROVIDER);
  //   accounts = await ethTx.getAccounts();
  //   const instance = await ArtistController.deploy();
  //   deployedTokenAddress = instance.$address;
  // });

  // it('should compile the contract', async () => {
  //   const compiledContract = await AirdropController.compile();
  //   assert(compiledContract);
  // }).timeout(200000);

  // it('should deploy the contract', async () => {
  //   const instance = await AirdropController.deploy();
  //   deployedAddress = instance.$address;
  //   assert(deployedAddress);
  //   console.log(`Deployed airdrop contract to: ${deployedAddress}`);
  // }).timeout(100000);

  // it('should do airdrop', async () => {
  //   const destAddresses = [accounts[1], accounts[2]];
  //   const tx = await AirdropController
  //     .airdrop(
  //       deployedAddress,
  //       deployedTokenAddress,
  //       destAddresses,
  //     );
  //   assert(tx.transactionHash);
  // });

  
});
