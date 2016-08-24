require('dotenv').load();

module.exports = {
  db: {
    development: process.env.MONGODB_DEV,
    test: process.env.MONGODB_TEST,
  },
  sessionSecret: process.env.SESSION_SECRET,
};
