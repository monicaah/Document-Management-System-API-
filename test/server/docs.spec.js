const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../../server');
const mongoose = require('mongoose');

const User = mongoose.model('Users');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Documents', () => {
  describe('POST', () => {
    it('/documents/: Creates a new document instance.');
  });

  describe('GET', () => {
    it('/documents/: Returns all documents.');
    it('/documents/<id>: Find document.');
    it('/users/<id>/documents: Find all documents belonging to the user.');
  });

  describe('UPDATE', () => {
    it('/documents/<id>: Update document attributes.');
  });

  describe('DELETE', () => {
    it('/documents/<id>: Delete document.');
  });

  describe('VALIDATION', () => {
    it('Validates that a new user document created has a published date defined');
    it('Documents.all: validates that all documents are returned, limited by a specified number.');
    it('Validate that documents can be fetched in chunks');
    it('Validates that all documents are returned in order of their published dates.');
  });
});
