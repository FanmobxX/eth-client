const AccountController = require('./src/account');
const ArtistContract = require('./src/artist');
const jwt = require('jsonwebtoken');
const Router = require('koa-router');

const router = new Router({
  prefix: '/api/v1',
});

/**
 * Create user account.
 *
 * POST /accounts/:id
 *
 * @param {string} id User's id on postgres server
 * @returns {string} JSON Web Token derived from account id
 */
router.post('/accounts/:id', async (ctx) => {
  const { id } = ctx.params;
  const controller = new AccountController(id);
  const account = await controller.perform();
  ctx.body = {
    accessToken: jwt.sign({ accountId: account.id }, process.env.JWT_SECRET),
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
router.post('/artists/token', async (ctx) => {
  const { tokenName, tokenSymbol } = ctx.request.body;
  const contractName = tokenName.replace(/\s/g, '');
  try {
    const artistContract = new ArtistContract(
      contractName,
      tokenName,
      tokenSymbol,
    );
    artistContract.deploy();
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
  }
});

/**
 * Create fandrop
 *
 * POST /artists/{artistId}/fandrop
 *
 * @param {Array} userIds List of usersIds to airdrop to
 * @param {Number} value Number of tokens per user to airdrop
 */
router.post('/artists/fandrop', async (ctx) => {
  ctx.status = 200;
});

module.exports = router;
