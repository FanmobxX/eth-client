require('dotenv').config();

const ethTx = require('eth-tx');
const fs = require('fs');
const path = require('path');

const FANMOB_AMOUNT = '500000'; // 500,000 tokens

async function deploy() {
  const source = path.join(__dirname, '..', 'src', 'contracts', 'CappedToken.sol');
  const destination = path.join(__dirname, '..', 'build', 'contracts.js');

  if (!fs.existsSync(path.dirname(destination))) {
    fs.mkdirSync(path.dirname(destination));
  }

  try {
    await ethTx.compileTo(source, destination, {});
    await ethTx.connect(process.env.ETHEREUM_HTTP_PROVIDER);

    // eslint-disable-next-line global-require
    const { CappedToken } = require('../build/contracts');
    const TokenContract = ethTx.wrapContract(
      CappedToken.abi,
      CappedToken.byteCode,
    );

    const amount = ethTx.getCurrentWeb3().utils.toWei(FANMOB_AMOUNT, 'ether');
    const instance = await TokenContract.new(amount);
    console.log(instance.$address);
  } catch (err) {
    console.log(err);
  }
}

deploy();
