const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../../server');
const mongoose = require('mongoose');

const User = mongoose.model('Users');
const expect = chai.expect;

chai.use(chaiHttp);


describe('ROLES', () => {
  let token;
  let userDetails;
  const user = {
    username: 'Mahaad',
    first: 'Walusimbi',
    last: 'Mahaad',
    email: 'mahaad@gmail.com',
    password: '1234',
    role: 'admin',
  };

  User.collection.drop();

  beforeEach(done => {
    chai.request(api)
    .post('/users')
    .send(user)
    .end((err, res) => {
      userDetails = res.body;
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
      expect(res.body).not.to.be.empty;
      expect(res.body).to.eql(['admin']);
      done();
    });
  });

  it('UPDATE /roles/<id>: Update document attributes.', done => {
    done();
  });

  it('validates that a new role created has a unique title.', done => {
    done();
  });

  it('DELETE /roles/<id>: Delete roles.', done => {
    done();
  });
});
