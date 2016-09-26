const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../../server');
const mongoose = require('mongoose');

const User = mongoose.model('Users');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Documents', () => {
  let token;
  let userDetails;
  const user = {
    username: 'DamDam',
    first: 'Saddam',
    last: 'Hussein',
    email: 'saddam@gmail.com',
    password: '1234',
    role: 'admin',
  };
  const document = {
    title: 'This is a title',
    content: 'This is a content',
  };

  User.collection.drop();

  beforeEach(done => {
    chai.request(api)
      .post('/users')
      .send(user)
      .end((err, res) => {
        chai.request(api)
        .post('/users/login')
        .send({
          username: 'DamDam',
          password: '1234',
        })
        .end((err, res) => {
          userDetails = res.body;
          token = res.body.token;
          done();
        });
      });
  });
  describe('POST', () => {
    it('/documents/: Creates a new document instance.', done => {
      const ownerId = userDetails.user._id;
      chai.request(api)
        .post('/documents')
        .set({ Authorization: 'Bearer ' + token })
        .send(document)
        .end((err, res) => {
          expect(res).to.be.a('object');
          expect(res.status).to.equal(201);
          expect(res.body).to.have.all.keys('title', 'content', 'ownerId', 'updatedAt', '_id', 'createdAt');
          done();
        });
    });
  });

  describe('GET', () => {
    it('/documents/: Returns all documents.', done => {
      chai.request(api)
        .get('/documents')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.docs).to.be.a('Array');
          expect(res.body.docs.length).to.equal(1);
          expect(res.body.docs[0]).to.have.all.keys('title', 'content', 'ownerId', 'updatedAt', '_id', 'createdAt');
          done();
        });
    });

    it('/documents/<id>: Find document.', done => {
      const documentID = userDetails.user.docs[0]._id;
      chai.request(api)
        .get('/documents/' + documentID)
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.all.keys('title', 'content', 'ownerId', 'updatedAt', '_id', 'createdAt');
          done();
        });
    });

    it('/users/<id>/documents: Find all documents belonging to the user.', done => {
      const ownerId = userDetails.user._id;
      chai.request(api)
        .get('/users/' + ownerId + '/documents')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.docs[0]).to.have.all.keys('title', 'content');
          done();
        });
    });
  });

  describe('UPDATE', () => {
    it('/documents/<id>: Update document attributes.', done => {
      const documentID = userDetails.user.docs[0]._id;
      chai.request(api)
        .put('/documents/' + documentID)
        .set({ Authorization: 'Bearer ' + token })
        .send({
          title: 'new title',
          content: 'new content',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0]).to.be.a('object');
          expect(res.body[0]._id).to.be.equal(documentID);
          expect(res.body[0].title).to.be.equal('new title');
          expect(res.body[0].content).to.be.equal('new content');
          done();
        });
    });
  });

  describe('VALIDATION', () => {
    it('Validates that a new user document created has a published date defined', done => {
      chai.request(api)
        .get('/documents')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.docs[0]).to.include.keys('createdAt');
          done();
        });
    });
  });

  describe('DELETE', () => {
    it('/documents/<id>: Delete document.', done => {
      const documentID = userDetails.user.docs[0]._id;
      chai.request(api)
        .delete('/documents/' + documentID)
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Removed');
          done();
        });
    });
  });
});
