const router = require('express').Router();

const test = require('../controllers/index');

router.get('/', test.index);

module.exports = router;
