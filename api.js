const AccountController = require('./src/accounts');
const ArtistContractController = require('./src/artists');
const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
const Router = require('koa-router');

// middleware to validate JWT token
const auth = koaJwt({ secret: process.env.JWT_SECRET });

const router = new Router({ prefix: '/api/v1' });

/**
 * Create user account.
 *
 * POST /accounts
 *
 * @param {string} userId User's id on postgres server
 * @returns {string} JSON Web Token derived from account id
 */
router.post('/accounts', async (ctx) => {
  const { userId } = ctx.request.body;
  const controller = new AccountController(userId);
  const account = await controller.perform();
  ctx.body = {
    accessToken: jwt.sign({ id: account.id }, process.env.JWT_SECRET),
  };
});

/**
 * Get user account.
 *
 * GET /accounts
 */
router.get('/accounts', auth, async (ctx) => {
  const { user } = ctx.state;
  ctx.body = await AccountController.find(user.id);
});

/**
 * Update user account.
 *
 * PUT /accounts
 *
 * @param {string} userId User's id on postgres server
 */
router.put('/accounts', auth, async (ctx) => {
  const { user } = ctx.state;
  const { userId } = ctx.request.body;
  const controller = new AccountController(userId);
  ctx.body = await controller.update(user.id);
});

/**
 * Create user account.
 *
 * DELETE /accounts
 */
router.delete('/accounts', auth, async (ctx) => {
  const { user } = ctx.state;
  ctx.body = await AccountController.delete(user.id);
});

/**
 * Create and deploy artist token contract. Saves the contract
 * address in the DB.
 *
 * WARNING: This is a long-running task.
 * Clients shouldn't wait for a response.
 *
 * POST /artists/token
 */
router.post('/artists/token', auth, async (ctx) => {
  const { user } = ctx.state;
  const artistContract = new ArtistContractController(user);
  ctx.body = await artistContract.perform();
});

/**
 * Create fandrop
 *
 * POST /artists/fandrop
 *
 * @param {Array} userIds List of usersIds to airdrop to
 * @param {Number} value Number of tokens per user to airdrop
 */
router.post('/artists/fandrop', auth, async (ctx) => {
  // const { user } = ctx.state;
  ctx.status = 200;
});

module.exports = router;
