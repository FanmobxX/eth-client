const app = require('../app.js');
const jwt = require('jsonwebtoken');
const request = require('supertest').agent(app.listen());

const { Account } = require('../src/models');

describe('API', async () => {
  const userId = Math.floor(Math.random() * 100);
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET);

  before(async () => {
    await Account.remove({});
  });

  describe('/accounts', async () => {
    describe('POST', async () => {
      it('should return 200', async () => {
        const data = { userId };
        await request
          .post('/api/v1/accounts')
          .send(data)
          .expect(200);
      });
    });

    describe('PUT', async () => {
      it('should return 200', async () => {
        const data = { userId };
        await request
          .put('/api/v1/accounts')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(data)
          .expect(200);
      });
    });

    describe('GET', async () => {
      it('should return 200', async () => {
        await request
          .get('/api/v1/accounts')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      });
    });

    describe('DELETE', async () => {
      it('should return 200', async () => {
        const data = { userId };
        await request
          .delete('/api/v1/accounts')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(data)
          .expect(200);
      });
    });
  });

  describe('/artists/token', async () => {
    describe('POST', async () => {
      it('should return 500', async () => {
        await request
          .post('/api/v1/artists/token')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(500);
      }).timeout(20000);
    });
  });

  describe('/wallets', async () => {
    describe('GET', async () => {
      it('should return 200', async () => {
        await request
          .get('/api/v1/wallets')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      }).timeout(20000);
    });
  });
});
