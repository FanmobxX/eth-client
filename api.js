const AccountController = require('./src/account');
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
router.post('/artists/token', async (ctx) => {
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
 * Create user account.
 *
 * POST /accounts/:id
 *
 * @param {string} id User's id on postgres server
 */
router.post('/accounts/:id', async (ctx) => {
  const { id } = ctx.params;
  const account = new AccountController(id);
  await account.perform();
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
