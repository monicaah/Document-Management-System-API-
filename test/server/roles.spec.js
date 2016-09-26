const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../../server');
const mongoose = require('mongoose');

const User = mongoose.model('Users');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Roles', () => {
  let token;
  const user = {
    username: 'Mahaad',
    first: 'Walusimbi',
    last: 'Mahaad',
    email: 'mahaad@gmail.com',
    password: '1234',
    role: 'user',
  };

  const admin = {
    username: 'joy',
    first: 'Warugu',
    last: 'joy',
    email: 'joy@gmail.com',
    password: '1234',
    role: 'admin',
  };
  User.collection.drop();

  describe('Testing for user access', () => {
    beforeEach(done => {
      chai.request(api)
      .post('/users')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
    });

    it('GET /roles/: ', done => {
      chai.request(api)
      .get('/roles')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.eql('Access Denied');
        done();
      });
    });

    it('GET /users/: ', done => {
      chai.request(api)
      .get('/users')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.eql('Access Denied');
        done();
      });
    });
  });

  describe('Testing for admin access', () => {
    beforeEach(done => {
      chai.request(api)
      .post('/users')
      .send(admin)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
    });
    it('GET /roles/: Returns all roles.', done => {
      chai.request(api)
      .get('/roles')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body).to.eql(['admin', 'user']);
        done();
      });
    });
  });
});
