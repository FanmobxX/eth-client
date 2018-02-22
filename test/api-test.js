const app = require('../app.js');
// const jwt = require('jsonwebtoken');
const request = require('supertest').agent(app.listen());

describe('API', async () => {
  describe('/api/v1/token', async () => {
    describe('POST', async () => {
      it('should return 200', async () => {
        await request
          .post('/api/v1/token')
          .expect(200);
      });
    });
  });
});
