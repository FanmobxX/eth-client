const app = require('../app.js');
// const jwt = require('jsonwebtoken');
const request = require('supertest').agent(app.listen());

describe('API', async () => {
  describe('/api/v1/token', async () => {
    describe('POST', async () => {
      it('should return 200', async () => {
        const tokenName = 'Tiga Coin';
        const tokenSymbol = 'TIGA';
        const data = { tokenName, tokenSymbol };
        await request
          .post('/api/v1/artists/token')
          .send(data)
          .expect(200);
      }).timeout(20000);
    });
  });
});
