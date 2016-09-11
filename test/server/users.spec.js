const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../../server');
const mongoose = require('mongoose');

const User = mongoose.model('Users');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', () => {
  let token;
  let userDetails;
  const user = {
    username: 'Mona',
    first: 'Monicah',
    last: 'Kwamboka',
    email: 'mona@gmail.com',
    password: '1234',
  };

  User.collection.drop();

  beforeEach(done => {
    chai.request(api)
    .post('/users/login')
    .send({
      username: 'Mona',
      password: '1234',
    })
    .end((err, res) => {
      userDetails = res.body;
      token = res.body.token;
      done();
    });
  });

  describe('POST', () => {
    it('/users/: Creates a new user.', done => {
      chai.request(api)
        .post('/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.be.a('object');
          expect(res.status).to.equal(200);
          expect(res.body).to.have.all.keys('message', 'token');
          done();
        });
    });

    it('/users/login: Logs a user in through authentication and returns token.', done => {
      chai.request(api)
      .post('/users/login')
      .send({
        username: 'Mona',
        password: '1234',
      })
      .end((err, res) => {
        expect(token).to.exist;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message', 'token', 'user');
        done();
      });
    });

    it('/users/logout: Logs a user out.', done => {
      chai.request(api)
      .post('/users/logout')
      .end((err, res) => {
        expect(res.header).not.to.have.ownPropertyDescriptor('Authorization');
        done();
      });
    });
  });

  describe('GET', () => {
    it('/users/: Should get all users.', done => {
      chai.request(api)
      .get('/users')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.be.a('object');
        done();
      });
    });

    it('/users/<id>: Find user.', done => {
      const userID = userDetails.user._id;
      chai.request(api)
      .get('/users/' + userID)
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('_id');
        expect(res.body._id).to.equal(userID);
        done();
      });
    });
  })

  describe('UPDATE', () => {
    it('/users/<id>: Update user attributes.', done => {
      const userID = userDetails.user._id;
      chai.request(api)
        .put('/users/' + userID)
        .set({ Authorization: 'Bearer ' + token })
        .send({
          name: {
            first: 'first name',
            last: 'last name',
          }
        })
        .end((err, res) => {
          expect(res).to.be.a('object');
          expect(res.status).to.equal(200);
          expect(res.body.name.first).to.equal('first name');
          expect(res.body.name.last).to.equal('last name');
          expect(res.body._id).to.equal(userID);
          done();
        });
    });
  });

  describe('VALIDATIONS', () => {
    it('Validates that the password is hashed', done => {
      expect(userDetails.password).to.not.equal('1234');
      done();
    });

    it('User has roles', done => {
      chai.request(api)
      .get('/users')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.body[0].role[0]).to.have.all.keys('title', '_id');
        done();
      });
    });

    it('User has both first and last names', done => {
      chai.request(api)
      .get('/users')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.body[0].name).to.have.all.keys('first', 'last');
        done();
      });
    });

    it('Validates that the user created is unique', done => {
      chai.request(api)
        .post('/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.be.a('object');
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('A user with that username already exists.');
          done();
        });
    });

    it('All users are returned', done => {
      chai.request(api)
      .get('/users')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(2);
        done();
      });
    });
  });

  describe('DELETE', () => {
    it('/users/<id>: Delete user.', done => {
      const userID = userDetails.user._id;
      chai.request(api)
        .delete('/users/' + userID)
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Successfully deleted');
          done();
        });
    });
  });
});
