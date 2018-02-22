const app = require('../app.js');
// const jwt = require('jsonwebtoken');
const request = require('supertest').agent(app.listen());

describe('API', () => {
  describe('/api/v1/token', () => {
    describe('POST', () => {
      it('should return 200', (done) => {
        request
          .post('/api/v1/token')
          .expect(200, done);
      });
    });
  });
});
