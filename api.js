const ArtistContract = require('./src/artist');
const Router = require('koa-router');

const router = new Router({
  prefix: '/api/v1',
});

/**
 * Create and deploy artist token contract.
 *
 * POST /artists/token
 *
 * @param {string} tokenName - The name of the token, i.e: Tiga Coin.
 * @param {string} symbol - The symbol of the token, i.e: TIGA.
 */
router.post('/artist/token', async (ctx) => {
  const { tokenName, tokenSymbol } = ctx.request.body;
  const contractName = tokenName.replace(/\s/g, '');
  try {
    const artistContract = new ArtistContract(contractName, tokenName, tokenSymbol);
    artistContract.deploy();
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
  }
});

/**
 * Create HD Wallet.
 *
 * POST /wallet
 */
router.post('/users/:id/wallet', async (ctx) => {
  ctx.status = 200;
});

/**
 * Create fandrop
 *
 * POST /artist/{artistId}/fandrop
 */
router.post('/artists/:id/fandrop', async (ctx) => {
  ctx.status = 200;
});

module.exports = router;
