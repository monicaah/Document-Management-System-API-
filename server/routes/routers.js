const router = require('express').Router();
const expressJWT = require('express-jwt');

// Controllers
const test = require('../controllers/index');
const users = require('../controllers/usersCtrl');
const docs = require('../controllers/docsCtrl');
const roles = require('../controllers/rolesCtrl');
// Config
const config = require('./../config/dbconfig');

const superSecret = config.sessionSecret;

// Middleware
const auth = require('../middleware/middleware');
const hasAccess = require('../middleware/middleware');

router.get('/', test.index);

// USE EXPRESS JWT
router.use(expressJWT({ secret: superSecret }).unless({ path: ['/users/login', '/users'] }));


// Define routes and mapping them to controllers
// USER ENDPOINTS
router.route('/users')
  .post(users.create); // Creates a new user.

router.route('/users/login')
  .post(users.login); // Logs a user in.


// Middleware for authentication
router.use(auth.authenticate);

router.route('/users')
  .get(hasAccess.accessLevel, users.getAll); // Find matching instances of user.

router.route('/users/logout')
  .post(users.logout); // Logs a user out.


router.route('/users/:user_id')
  .get(users.getUser) // Find user.
  .put(users.update) // Update user info.
  .delete(users.delete); // Delete user

// DOCUMENT ENDPOINTS
router.route('/documents')
  .post(docs.create) // Creates a new documents.
  .get(hasAccess.accessLevel, docs.getAll); // Find matching instances of documents.

router.route('/documents/:doc_id')
  .get(docs.getDoc) // Find document.
  .put(docs.update) // Update document.
  .delete(docs.delete); // Delete document

// USER  DOCUMENTS
router.route('/users/:user_id/documents')
  .get(docs.find); // Find all documents belonging to the user.

// ROLES ENDPOINTS
router.route('/roles')
  .get(hasAccess.accessLevel, roles.getAll);

router.route('/roles/:role_id')
  .get(hasAccess.accessLevel, roles.getRole)
  .put(hasAccess.accessLevel, roles.update)
  .delete(hasAccess.accessLevel, roles.delete);

module.exports = router;
