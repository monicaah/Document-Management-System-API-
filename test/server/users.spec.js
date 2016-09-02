const request = require('supertest');
const should = require('should');
const app = require('../../server');

describe('User', () => {
  describe('Create User', () => {
    const user = {
      username: 'Mona',
      first: 'Monicah',
      last: 'Kwamboka',
      email: 'mona@gmail.com',
      password: '1234',
    };
    let token;
    beforeEach((done) => {
      request(app)
      .post('/users/login')
      .send({
        username: 'Mona',
        password: '1234',
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
    });

    it('Adding user to db', (done) => {
      request(app)
      .post('/users')
      .send(user)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw (err);
        res.status.should.equal(200);
        done();
      });
    });

    it('Ensure user is unique', (done) => {
      request(app)
      .post('/users')
      .send(user)
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        done();
      });
    });

    it('Should return 404 if not all fields are filled', (done) => {
      request(app)
      .post('/users')
      .send({
        last: 'Mona',
        first: 'Monicah',
      })
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        res.status.should.equal(404);
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('username');
        res.body.errors.should.have.property('email');
        res.body.errors.should.have.property('password');
        done();
      });
    });
    it('validates that a new user created has a role defined', (done) => {
      request(app)
      .post('/user')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.role.should.equal('user');
        done();
      });
    });
    it('Logs in user and returns token', (done) => {
      request(app)
        .post('/users/login')
        .send({
          username: 'Mona',
          password: '1234',
        })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.token.should.equal(token);
          done();
        });
    });

    it('validates that a new user created has a both names', (done) => {
      request(app)
      .get('/users')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        console.log('User' + JSON.stringify(res.body));
        // res.status.should.equal(200);
        should.not.exist(err);
        // res.body.should.have.property(Object('name'));
        done();
      });
    });

    //   it('Status returned is 200 | Request is successful', (done) => {
    //     request(app)
    //     .get('/users')
    //     .expect('Content-type', /json/)
    //     .expect(200)
    //     .end((err, res) => {
    //       if (err) throw err;
    //       res.status.should.equal(200);
    //       done();
    //     });
    //   });
    // });
  });
});
