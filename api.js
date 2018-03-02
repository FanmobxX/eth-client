const AccountController = require('./src/account');
const ArtistContract = require('./src/artist');
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
 * Create and deploy artist token contract.
 *
 * POST /artists/token
 *
 * @param {string} tokenName - The name of the token, i.e: Tiga Coin.
 * @param {string} symbol - The symbol of the token, i.e: TIGA.
 */
router.post('/artists/token', auth, async (ctx) => {
  const { user } = ctx.state;
  const { tokenName, tokenSymbol } = ctx.request.body;
  const contractName = tokenName.replace(/\s/g, '');
  const artistContract = new ArtistContract(
    contractName,
    tokenName,
    tokenSymbol,
    user,
  );
  artistContract.deploy();
  ctx.status = 200;
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
