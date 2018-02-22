const Router = require('koa-router');

const router = new Router({
  prefix: '/api/v1',
});

/**
 * Create and deploy artist token contract.
 *
 * POST /artists/{artistId}/token
 *
 * @param {string} artistId - The id of the artist in the db.
 * @param {string} tokenName - The name of the token, i.e: Tiga Coin.
 * @param {string} symbol - The symbol of the token, i.e: TIGA.
 */
router.post('/token', async (ctx) => {
  // const artistId = ctx.params.id;
  ctx.status = 200;
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
