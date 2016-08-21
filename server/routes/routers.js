const router = require('express').Router();

// Controllers
const test = require('../controllers/index');
const users = require('../controllers/usersCtrl');
const docs = require('../controllers/docsCtrl');

router.get('/', test.index);

// Define routes and mapping them to controllers

// USER ENDPOINTS
router.route('/users')
  .post(users.create) // Creates a new user.
  .get(users.getAll); // Find matching instances of user.

router.route('/users/login')
  .post(users.login); // Logs a user in.

router.route('/users/logout')
  .post(users.logout); // Logs a user out.


router.route('/users/:user_id')
  .get(users.getUser) // Find user.
  .put(users.update) // Update user info.
  .delete(users.delete); // Delete user

// DOCUMENT ENDPOINTS
router.route('/documents')
  .post(docs.create) // Creates a new documents.
  .get(docs.getAll); // Find matching instances of documents.

router.route('/documents/:doc_id')
  .get(docs.getDoc) // Find document.
  .put(docs.update) // Update document.
  .delete(docs.delete); // Delete document

// USER  DOCUMENTS
router.route('users/:user_id/documents')
  .get(docs.find); // Find all documents belonging to the user.

module.exports = router;