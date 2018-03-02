const app = require('../app.js');
const jwt = require('jsonwebtoken');
const request = require('supertest').agent(app.listen());

describe('API', async () => {
  const accessToken = jwt.sign({ id: 5 }, process.env.JWT_SECRET);
  describe('/accounts/:id', async () => {
    describe('POST', async () => {
      it('should return 200', async () => {
        const id = Math.floor(Math.random() * 100);
        await request
          .post(`/api/v1/accounts/${id}`)
          .expect(200);
      }).timeout(20000);
    });
  });

  describe('/artists/token', async () => {
    describe('POST', async () => {
      it('should return 200', async () => {
        const tokenName = 'Tiga Coin';
        const tokenSymbol = 'TIGA';
        const data = { tokenName, tokenSymbol };
        await request
          .post('/api/v1/artists/token')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(data)
          .expect(200);
      }).timeout(20000);
    });
  });
});
