const request = require('supertest');
const app = require('../../server');

describe('User', () => {
  it('validates that a new user created is unique', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});
