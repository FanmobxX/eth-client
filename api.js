const Router = require('koa-router');

const router = new Router({
  prefix: '/api/v1',
});

/**
 * Create and deploy artist token contract.
 *
 * POST /artists/{artistId}/tokens/create
 *
 * @param {string} artistId - The id of the artist in the db.
 * @param {string} tokenName - The name of the token, i.e: Tiga Coin.
 * @param {string} symbol - The symbol of the token, i.e: TIGA.
 */
router.post('/artists/:id/token/create', async (ctx) => {
  // const artistId = ctx.params.id;
  ctx.status = 200;
});

/**
 * Create HD Wallet.
 *
 * POST /wallet/create
 */
router.post('/users/:id/wallet/create', async (ctx) => {
  ctx.status = 200;
});

/**
 * Create fandrop
 *
 * POST /artist/{artistId}/fandrop/create
 */
router.post('/artists/:id/fandrop/create', async (ctx) => {
  ctx.status = 200;
});
